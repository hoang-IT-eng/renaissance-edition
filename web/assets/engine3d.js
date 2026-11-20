/* RenAIssance — living-painting engine (v2).
   One renderer, one canvas, re-parented into whichever painting is
   on screen. Each painting is paired with a machine-estimated depth
   map (Depth Anything v2, run locally over our own artwork) and a
   custom shader shifts every pixel by its depth — foreground
   figures drift against their backgrounds with the pointer, the
   scroll and a slow idle sway, under a warm travelling light and a
   veil of gold dust. No borrowed models, no borrowed code beyond
   the Three.js library. Falls back silently to the static
   paintings when WebGL or motion is unavailable. */
(function () {
  "use strict";
  if (typeof THREE === "undefined") return;
  if (typeof motionDisabled === "function" && motionDisabled()) return;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: "high-performance" });
  } catch (e) { return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  var canvas = renderer.domElement;
  canvas.className = "gl-canvas";

  var scene = new THREE.Scene();
  var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
  camera.position.z = 5;

  var VERT = [
    "varying vec2 vUv;",
    "void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }"
  ].join("\n");
  var FRAG = [
    "precision highp float;",
    "varying vec2 vUv;",
    "uniform sampler2D uTex;",
    "uniform sampler2D uDepth;",
    "uniform vec2 uMouse;",     /* -1..1, lerped */
    "uniform float uTime;",
    "uniform float uVel;",      /* smoothed |scroll velocity| 0..1 */
    "uniform float uReveal;",   /* 0..1 fade-in */
    "uniform vec2 uCoverScale;",/* cover-fit uv window */
    "uniform vec2 uCoverOff;",
    "void main(){",
    "  vec2 uv = vUv * uCoverScale + uCoverOff;",
    "  float d = texture2D(uDepth, uv).r;",
    /* remap: backgrounds stay near zero, mid-tone subjects (where the
       figures live, d ~ 0.3-0.5) move clearly, extreme foreground capped */
    "  float depthC = clamp(pow(d, 1.35) * 1.15 - 0.10, -0.25, 0.60);",
    "  vec2 sway = vec2(sin(uTime * 0.23), cos(uTime * 0.17)) * 0.008;",
    "  vec2 shift = (uMouse * vec2(0.046, 0.028) * (1.0 + uVel * 0.7) + sway) * depthC * 2.0;",
    "  vec3 col = texture2D(uTex, uv + shift).rgb;",
    /* travelling warm light, caught more by near surfaces */
    "  float band = 0.5 + 0.62 * sin(uTime * 0.10);",
    "  float sweep = smoothstep(0.42, 0.0, abs(uv.x * 0.82 + uv.y * 0.30 - band)) * 0.085 * (0.30 + d);",
    "  col += vec3(1.0, 0.84, 0.52) * sweep;",
    /* near surfaces a touch brighter, far a touch deeper */
    "  col *= 0.90 + 0.16 * d;",
    "  col = mix(vec3(0.015, 0.02, 0.018), col, uReveal);",
    "  gl_FragColor = vec4(col, 1.0);",
    "}"
  ].join("\n");

  var planeGeo = new THREE.PlaneGeometry(2, 2);

  /* gold dust, shared by every scene */
  var DUST_N = 150, dustPos = new Float32Array(DUST_N * 3), dustSeed = [];
  for (var i = 0; i < DUST_N; i++) {
    dustPos[i * 3] = (Math.random() * 2 - 1) * 1.05;
    dustPos[i * 3 + 1] = Math.random() * 2 - 1;
    dustPos[i * 3 + 2] = 0.4 + Math.random() * 0.8;
    dustSeed.push(0.008 + Math.random() * 0.02);
  }
  var dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  var dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0xe6c887, size: 2.6, sizeAttenuation: false, transparent: true, opacity: 0.55,
    blending: THREE.AdditiveBlending, depthWrite: false
  }));

  /* ---------- hosts: the painting containers themselves ---------- */
  var loader = new THREE.TextureLoader();
  loader.setCrossOrigin("anonymous");
  var hosts = [];
  function coverFor(boxW, boxH, texW, texH, posStr) {
    var boxA = boxW / boxH, texA = texW / texH, sx = 1, sy = 1;
    if (texA > boxA) sx = boxA / texA; else sy = texA / boxA;
    var p = (posStr || "50% 50%").split(/\s+/);
    var px = parseFloat(p[0]) / 100, py = parseFloat(p[1]) / 100;
    if (isNaN(px)) px = 0.5; if (isNaN(py)) py = 0.5;
    return { scale: [sx, sy], off: [(1 - sx) * px, (1 - sy) * (1 - py)] };
  }
  function addHost(el) {
    var img = el.querySelector("img");
    if (!img) return;
    var src = img.getAttribute("src");
    var name = src.split("/").pop().replace(/\.(jpg|jpeg|png)$/i, "");
    hosts.push({
      el: el, img: img, src: src, depthSrc: "images/depth/" + name + ".png",
      pos: img.style.objectPosition || "50% 50%",
      visible: false, ready: false, failed: false, mat: null, reveal: 0
    });
  }
  var heroP = document.querySelector(".hero-painting"); if (heroP) addHost(heroP);
  document.querySelectorAll(".chapter-head .painting").forEach(addHost);
  var epiP = document.querySelector(".epilogue-painting"); if (epiP) addHost(epiP);
  if (!hosts.length) return;

  var current = null;
  var mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener("pointermove", function (e) {
    if (!current) return;
    var r = current.el.getBoundingClientRect();
    mouse.tx = ((e.clientX - r.left) / Math.max(r.width, 1) - 0.5) * 2;
    mouse.ty = -((e.clientY - r.top) / Math.max(r.height, 1) - 0.5) * 2;
  }, { passive: true });

  function activate(h) {
    if (current === h) return;
    current = h;
    h.el.appendChild(canvas);
    resize();
    if (h.mat) { swap(h); return; }
    if (h.failed) return;
    var pending = 2, tex = null, dep = null;
    function done() {
      if (--pending) return;
      h.mat = new THREE.ShaderMaterial({
        vertexShader: VERT, fragmentShader: FRAG,
        uniforms: {
          uTex: { value: tex }, uDepth: { value: dep },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uTime: { value: 0 }, uVel: { value: 0 }, uReveal: { value: 0 },
          uCoverScale: { value: new THREE.Vector2(1, 1) },
          uCoverOff: { value: new THREE.Vector2(0, 0) }
        }
      });
      h.texSize = [tex.image.width, tex.image.height];
      h.ready = true;
      if (current === h) swap(h);
      resize();
    }
    loader.load(h.src, function (t) { tex = t; done(); }, undefined, function () { h.failed = true; });
    loader.load(h.depthSrc, function (t) { dep = t; done(); }, undefined, function () { h.failed = true; });
  }
  var plane = null;
  function swap(h) {
    while (scene.children.length) scene.remove(scene.children[0]);
    plane = new THREE.Mesh(planeGeo, h.mat);
    scene.add(plane); scene.add(dust);
    h.el.classList.add("gl-live");
  }
  function resize() {
    if (!current) return;
    var w = current.el.clientWidth, hh = current.el.clientHeight;
    if (!w || !hh) return;
    renderer.setSize(w, hh);
    if (current.mat && current.texSize) {
      var c = coverFor(w, hh, current.texSize[0], current.texSize[1], current.pos);
      current.mat.uniforms.uCoverScale.value.set(c.scale[0], c.scale[1]);
      current.mat.uniforms.uCoverOff.value.set(c.off[0], c.off[1]);
    }
  }
  window.addEventListener("resize", resize);

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      var h = hosts.filter(function (x) { return x.el === en.target; })[0];
      if (h) h.visible = en.isIntersecting;
    });
    var vis = hosts.filter(function (x) { return x.visible; });
    if (vis.length) activate(vis[0]);
  }, { threshold: 0.10 });
  hosts.forEach(function (h) { io.observe(h.el); });

  var clock = new THREE.Clock();
  var velSm = 0, tAcc = 0;
  function tick() {
    requestAnimationFrame(tick);
    if (!current || !current.ready || !current.visible) return;
    var dt = Math.min(clock.getDelta(), 0.1);
    tAcc += dt;
    var t = tAcc;
    /* frame-rate independent smoothing: converges in ~0.5 s even
       on slow devices where rAF runs at a handful of fps */
    var k = 1 - Math.exp(-dt * 5.0);
    mouse.x += (mouse.tx - mouse.x) * k;
    mouse.y += (mouse.ty - mouse.y) * k;
    var vel = Math.min(Math.abs(window.__scrollVel || 0) / 2600, 1);
    velSm += (vel - velSm) * 0.06;
    if (current.reveal < 1) current.reveal = Math.min(1, current.reveal + 0.02);
    var u = current.mat.uniforms;
    u.uTime.value = t;
    u.uMouse.value.set(mouse.x, mouse.y);
    u.uVel.value = velSm;
    u.uReveal.value = current.reveal;
    var pos = dustGeo.attributes.position.array;
    var dustStep = Math.max(dt, 0.008) * 60;
    for (var i = 0; i < DUST_N; i++) {
      pos[i * 3 + 1] += dustSeed[i] * 0.016 * dustStep;
      pos[i * 3] += Math.sin(t * 0.4 + i) * 0.0006;
      if (pos[i * 3 + 1] > 1.05) pos[i * 3 + 1] = -1.05;
    }
    dustGeo.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  }
  document.body.classList.add("gl-on");
  tick();
})();
