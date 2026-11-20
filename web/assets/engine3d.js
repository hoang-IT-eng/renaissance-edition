/* RenAIssance — Tier B+ WebGL engine.
   One renderer, one canvas, re-parented into whichever showcase is on
   screen (hero or a chapter head). Every chapter gets an authored 3D
   prop built from primitives — no borrowed models, no borrowed code
   beyond the Three.js library itself. Falls back silently to the
   static Tier C experience when WebGL or motion is unavailable. */
(function () {
  "use strict";
  if (typeof THREE === "undefined") return;
  if (typeof motionDisabled === "function" && motionDisabled()) return;

  var GOLD = 0xc9a15e, GOLD_L = 0xe6c887, PINK = 0xe11d8f, PINK_D = 0xb3136d,
      IVORY = 0xf0ead8, PAPER = 0xdeddd0, INK = 0x22241c, WOOD = 0xa87f4f;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch (e) { return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  var canvas = renderer.domElement;
  canvas.className = "gl-canvas";

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
  camera.position.set(0, 0, 8);

  scene.add(new THREE.AmbientLight(0xfff2dd, 0.85));
  var key = new THREE.DirectionalLight(0xffe9c4, 1.1); key.position.set(3, 4, 6); scene.add(key);
  var rim = new THREE.PointLight(0xe11d8f, 0.55, 30); rim.position.set(-4, -2, 3); scene.add(rim);
  var fill = new THREE.PointLight(0xc9a15e, 0.5, 30); fill.position.set(4, 2, 2); scene.add(fill);

  function std(c, r, m) { return new THREE.MeshStandardMaterial({ color: c, roughness: r == null ? 0.45 : r, metalness: m == null ? 0.25 : m }); }
  var MAT = {
    gold: std(GOLD, 0.28, 0.9), goldL: std(GOLD_L, 0.22, 0.95),
    pink: std(PINK, 0.5, 0.05), pinkD: std(PINK_D, 0.55, 0.05),
    ivory: std(IVORY, 0.6, 0.02), paper: std(PAPER, 0.8, 0.0),
    ink: std(INK, 0.5, 0.3), wood: std(WOOD, 0.85, 0.0),
    glass: new THREE.MeshPhongMaterial({ color: 0xbfd4d8, transparent: true, opacity: 0.22, shininess: 120, side: THREE.DoubleSide }),
    screen: new THREE.MeshBasicMaterial({ color: 0xf5efdd })
  };
  function mesh(geo, mat, x, y, z) { var m = new THREE.Mesh(geo, mat); if (x != null) m.position.set(x || 0, y || 0, z || 0); return m; }
  function torus(r, t, mat) { return mesh(new THREE.TorusGeometry(r, t, 14, 64), mat); }
  function box(w, h, d, mat) { return mesh(new THREE.BoxGeometry(w, h, d), mat); }
  function sph(r, mat, w, h) { return mesh(new THREE.SphereGeometry(r, w || 28, h || 20), mat); }

  /* ---------- prop factories ---------- */
  var F = {};
  F.hero = function () {
    var g = new THREE.Group();
    var r1 = torus(1.05, 0.022, MAT.goldL); r1.rotation.x = 1.1;
    var r2 = torus(0.78, 0.016, MAT.gold); r2.rotation.set(0.4, 0.8, 0.2);
    var core = mesh(new THREE.IcosahedronGeometry(0.16, 0), MAT.goldL);
    g.add(r1, r2, core);
    var n = 110, pos = new Float32Array(n * 3);
    for (var i = 0; i < n; i++) {
      var th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1), rr = 1.25 + Math.random() * 1.5;
      pos[i * 3] = rr * Math.sin(ph) * Math.cos(th); pos[i * 3 + 1] = rr * Math.sin(ph) * Math.sin(th); pos[i * 3 + 2] = rr * Math.cos(ph) * 0.5;
    }
    var geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    var dust = new THREE.Points(geo, new THREE.PointsMaterial({ color: GOLD_L, size: 0.05, transparent: true, opacity: 0.85 }));
    g.add(dust);
    g.userData.animate = function (t) { r1.rotation.z = t * 0.25; r2.rotation.z = -t * 0.35; dust.rotation.y = t * 0.05; core.rotation.y = t * 0.8; };
    return g;
  };
  F.sidekick = function () {
    var g = new THREE.Group();
    var a = torus(1.0, 0.035, MAT.gold);
    var b = torus(0.86, 0.03, MAT.goldL); b.rotation.x = Math.PI / 2.4;
    var c = torus(0.72, 0.028, MAT.gold); c.rotation.set(Math.PI / 3, Math.PI / 4, 0);
    var core = sph(0.3, MAT.ivory); var rod = mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.5, 10), MAT.goldL); rod.rotation.z = Math.PI / 5;
    var base = torus(0.42, 0.05, MAT.gold); base.rotation.x = Math.PI / 2; base.position.y = -1.25;
    g.add(a, b, c, core, rod, base);
    g.userData.animate = function (t) { b.rotation.z = t * 0.5; c.rotation.z = -t * 0.35; };
    return g;
  };
  F.agentic = function () {
    var g = new THREE.Group();
    var l = box(1.05, 1.35, 0.07, MAT.ivory); l.position.x = -0.5; l.rotation.y = 0.5;
    var r = box(1.05, 1.35, 0.07, MAT.ivory); r.position.x = 0.5; r.rotation.y = -0.5;
    var spine = box(0.1, 1.35, 0.1, MAT.pinkD);
    g.add(l, r, spine);
    var cubes = [];
    for (var i = 0; i < 5; i++) { var cu = box(0.2, 0.2, 0.2, i % 2 ? MAT.pink : MAT.gold); g.add(cu); cubes.push(cu); }
    g.userData.animate = function (t) {
      cubes.forEach(function (cu, i) { var a = t * 0.7 + i * (Math.PI * 2 / 5); cu.position.set(Math.cos(a) * 1.5, Math.sin(a * 1.3) * 0.55, Math.sin(a) * 0.5); cu.rotation.x = t + i; cu.rotation.y = t * 0.7; });
    };
    return g;
  };
  F.online = function () {
    var g = new THREE.Group();
    var card = new THREE.Group();
    var p1 = box(0.92, 1.35, 0.05, MAT.pink); p1.position.x = -0.47;
    var p2 = box(0.92, 1.35, 0.05, MAT.ivory); p2.position.x = 0.47;
    card.add(p1, p2); g.add(card);
    var dot = sph(0.11, MAT.goldL); g.add(dot);
    g.userData.animate = function (t) {
      card.rotation.y = Math.sin(t * 0.6) * 0.85;
      dot.position.set(Math.cos(t * 1.4) * 1.45, Math.sin(t * 1.4) * 0.8, 0.3);
    };
    return g;
  };
  F.retail = function () {
    var g = new THREE.Group();
    var body = box(1.35, 0.95, 0.14, MAT.ink); body.rotation.x = -0.28; body.position.y = 0.25;
    var scr = mesh(new THREE.PlaneGeometry(1.15, 0.75), MAT.screen); scr.position.set(0, 0.28, 0.085); scr.rotation.x = -0.28;
    var stand = mesh(new THREE.CylinderGeometry(0.07, 0.1, 0.7, 12), MAT.gold); stand.position.y = -0.5;
    var foot = mesh(new THREE.CylinderGeometry(0.42, 0.48, 0.08, 24), MAT.gold); foot.position.y = -0.85;
    var cardM = box(0.5, 0.32, 0.03, MAT.pink); cardM.position.set(0.95, -0.35, 0.3); cardM.rotation.z = -0.3;
    g.add(body, scr, stand, foot, cardM);
    g.userData.animate = function (t) { cardM.position.y = -0.35 + Math.sin(t * 1.6) * 0.09; };
    return g;
  };
  F.marketing = function () {
    var g = new THREE.Group();
    var board = box(1.9, 1.1, 0.07, MAT.pink); board.position.y = 0.35;
    var frame = box(2.0, 1.2, 0.04, MAT.gold); frame.position.set(0, 0.35, -0.03);
    var p1 = mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.1, 10), MAT.ink); p1.position.set(-0.7, -0.55, 0);
    var p2 = p1.clone(); p2.position.x = 0.7;
    var mega = mesh(new THREE.ConeGeometry(0.34, 0.7, 24, 1, true), MAT.goldL); mega.position.set(1.25, -0.6, 0.25); mega.rotation.z = -1.9;
    g.add(frame, board, p1, p2, mega);
    g.userData.animate = function (t) { mega.rotation.z = -1.9 + Math.sin(t * 2.0) * 0.1; };
    return g;
  };
  F.checkout = function () {
    var g = new THREE.Group(); g.name = "beanie";
    var dome = mesh(new THREE.SphereGeometry(0.78, 28, 18, 0, Math.PI * 2, 0, 1.95), MAT.pink);
    var brim = torus(0.76, 0.13, MAT.pinkD); brim.rotation.x = Math.PI / 2; brim.position.y = -0.28;
    var pom = sph(0.2, MAT.ivory); pom.position.y = 0.78;
    g.add(dome, brim, pom);
    g.userData.animate = function (t) { pom.position.y = 0.78 + Math.sin(t * 2.4) * 0.045; };
    return g;
  };
  F.operations = function () {
    var g = new THREE.Group();
    var glass = sph(0.95, MAT.glass, 36, 24);
    var wire = mesh(new THREE.SphereGeometry(0.97, 14, 10), new THREE.MeshBasicMaterial({ color: GOLD, wireframe: true, transparent: true, opacity: 0.5 }));
    var core = mesh(new THREE.IcosahedronGeometry(0.42, 0), MAT.ivory);
    var ring = torus(1.35, 0.025, MAT.goldL); ring.rotation.x = Math.PI / 2.3;
    g.add(glass, wire, core, ring);
    g.userData.animate = function (t) { wire.rotation.y = t * 0.3; core.rotation.y = -t * 0.5; ring.rotation.z = t * 0.4; };
    return g;
  };
  F.shop = function () {
    var g = new THREE.Group();
    var body = box(0.88, 1.75, 0.1, MAT.ink);
    var scr = mesh(new THREE.PlaneGeometry(0.74, 1.58), MAT.screen); scr.position.z = 0.056;
    var bag = box(0.4, 0.46, 0.16, MAT.pink); bag.position.set(0.85, -0.5, 0.2); bag.rotation.z = 0.15;
    var handle = torus(0.13, 0.025, MAT.goldL); handle.position.set(0.85, -0.22, 0.2);
    g.add(body, scr, bag, handle);
    g.userData.animate = function (t) { bag.position.y = -0.5 + Math.sin(t * 1.8) * 0.07; };
    return g;
  };
  F.b2b = function () {
    var g = new THREE.Group();
    var pil1 = box(0.42, 1.5, 0.42, MAT.ink); pil1.position.set(-0.85, -0.2, 0);
    var pil2 = pil1.clone(); pil2.position.x = 0.85;
    var beam = box(2.15, 0.34, 0.46, MAT.gold); beam.position.y = 0.72;
    var cont = box(0.95, 0.6, 0.6, MAT.pink); cont.position.y = -0.45;
    g.add(pil1, pil2, beam, cont);
    g.userData.animate = function (t) { cont.position.y = -0.45 + Math.sin(t * 1.3) * 0.06; };
    return g;
  };
  F.finance = function () {
    var g = new THREE.Group();
    var basin = mesh(new THREE.CylinderGeometry(0.85, 0.6, 0.35, 24, 1, true), MAT.gold); basin.position.y = -0.8;
    var stem = mesh(new THREE.CylinderGeometry(0.09, 0.13, 0.6, 12), MAT.gold); stem.position.y = -0.45;
    g.add(basin, stem);
    var coins = [];
    for (var i = 0; i < 26; i++) {
      var c = mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.035, 18), MAT.goldL);
      c.userData.ph = Math.random() * Math.PI * 2; c.userData.sp = 0.5 + Math.random() * 0.7; c.userData.rd = Math.random() * 0.55;
      g.add(c); coins.push(c);
    }
    g.userData.animate = function (t) {
      coins.forEach(function (c) {
        var p = ((t * c.userData.sp + c.userData.ph) % (Math.PI * 2)) / (Math.PI * 2);
        var a = c.userData.ph * 3;
        c.position.set(Math.cos(a) * c.userData.rd * p, -0.55 + p * 1.9 - p * p * 1.2, Math.sin(a) * c.userData.rd * p);
        c.rotation.x = t * 2 + c.userData.ph; c.rotation.z = t * 1.4;
      });
    };
    return g;
  };
  F.shipping = function () {
    var g = new THREE.Group();
    var crate = box(1.15, 1.15, 1.15, MAT.wood);
    var e1 = box(1.22, 0.1, 1.22, MAT.ink); e1.position.y = 0.45;
    var e2 = e1.clone(); e2.position.y = -0.45;
    var e3 = box(0.1, 1.22, 1.22, MAT.ink);
    g.add(crate, e1, e2, e3);
    var orbit = torus(1.55, 0.018, MAT.goldL); orbit.rotation.x = Math.PI / 2.6; g.add(orbit);
    var runner = sph(0.11, MAT.pink); g.add(runner);
    g.userData.animate = function (t) {
      var a = t * 2.6;
      runner.position.set(Math.cos(a) * 1.55, Math.sin(a) * 1.55 * Math.cos(Math.PI / 2.6 - Math.PI / 2) + Math.sin(a) * 0.62, Math.sin(a) * 1.55 * 0.42);
      runner.position.y = Math.sin(a) * 1.55 * 0.62; runner.position.z = Math.sin(a) * 1.55 * -0.35 + Math.cos(a) * 0.0;
      runner.position.x = Math.cos(a) * 1.55;
    };
    return g;
  };
  F.developer = function () {
    var g = new THREE.Group();
    var ico = mesh(new THREE.IcosahedronGeometry(1.0, 0), new THREE.MeshBasicMaterial({ color: GOLD, wireframe: true }));
    var octa = mesh(new THREE.OctahedronGeometry(0.55, 0), MAT.pink);
    var gear = torus(1.3, 0.07, MAT.gold); gear.rotation.x = Math.PI / 2.2;
    g.add(ico, octa, gear);
    for (var i = 0; i < 8; i++) { var tooth = box(0.16, 0.16, 0.1, MAT.gold); var a = i / 8 * Math.PI * 2; tooth.position.set(Math.cos(a) * 1.3, Math.sin(a) * 1.3 * 0.42, Math.sin(a) * 0.9); gear.parent === null && g.add(tooth); tooth.rotation.z = a; }
    g.userData.animate = function (t) { ico.rotation.y = t * 0.4; ico.rotation.x = t * 0.15; octa.rotation.y = -t * 0.7; gear.rotation.z = t * 0.2; };
    return g;
  };

  /* ---------- hosts & switching ---------- */
  var hosts = [];
  function addHost(el, id, opts) {
    var host = document.createElement("div");
    host.className = "gl-host";
    el.appendChild(host);
    hosts.push({ el: host, id: id, opts: opts || {}, visible: false });
  }
  var heroStage = document.getElementById("hero");
  if (heroStage) addHost(heroStage, "hero", { x: 0, y: 0.78, s: 1.12 });
  document.querySelectorAll(".chapter").forEach(function (ch) {
    var head = ch.querySelector(".chapter-head");
    if (head && F[ch.id.replace("ch-", "")]) addHost(head, ch.id.replace("ch-", ""), { x: 1.85, y: 0.05, s: 1.0 });
  });

  var current = null, prop = null, grow = 0;
  var spin = { vy: 0.25, vx: 0.06, drag: 0, tx: 0, ty: 0, mx: 0, my: 0 };

  function activate(h) {
    if (current === h) return;
    current = h;
    h.el.appendChild(canvas);
    if (prop) { scene.remove(prop); prop = null; }
    prop = F[h.id]();
    prop.position.set(h.opts.x, h.opts.y, 0);
    prop.scale.setScalar(0.01);
    scene.add(prop);
    grow = 0;
    resize();
    if (h.id === "checkout") document.body.classList.add("gl-beanie-on");
    else document.body.classList.remove("gl-beanie-on");
  }
  function resize() {
    if (!current) return;
    var w = current.el.clientWidth, hh = current.el.clientHeight;
    if (!w || !hh) return;
    renderer.setSize(w, hh);
    camera.aspect = w / hh; camera.updateProjectionMatrix();
    var small = w < 760;
    if (prop && current.id !== "hero") {
      prop.position.x = small ? 0 : current.opts.x;
      prop.position.y = small ? 1.05 : current.opts.y;
      prop.scale.setScalar((small ? 0.72 : current.opts.s) * Math.max(grow, 0.01));
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
  }, { threshold: 0.18 });
  hosts.forEach(function (h) { io.observe(h.el); });

  /* ---------- pointer: tilt, drag-spin, beanie raycast ---------- */
  var ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), dragging = false, lastX = 0;
  canvas.style.touchAction = "pan-y";
  canvas.addEventListener("pointermove", function (e) {
    var r = canvas.getBoundingClientRect();
    spin.tx = ((e.clientX - r.left) / r.width - 0.5) * 0.7;
    spin.ty = ((e.clientY - r.top) / r.height - 0.5) * 0.5;
    if (dragging) { spin.drag += (e.clientX - lastX) * 0.012; lastX = e.clientX; }
  });
  canvas.addEventListener("pointerdown", function (e) { dragging = true; lastX = e.clientX; });
  window.addEventListener("pointerup", function () { dragging = false; });
  canvas.addEventListener("click", function (e) {
    if (!current || current.id !== "checkout" || !prop) return;
    var r = canvas.getBoundingClientRect();
    ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    ray.setFromCamera(ndc, camera);
    if (ray.intersectObject(prop, true).length) {
      document.dispatchEvent(new CustomEvent("beanie3d"));
    }
  });

  /* ---------- loop ---------- */
  var clock = new THREE.Clock();
  function tick() {
    requestAnimationFrame(tick);
    if (!current || !prop || !current.visible) return;
    var t = clock.getElapsedTime();
    if (grow < 1) { grow = Math.min(1, grow + 0.025); var s = (current.el.clientWidth < 760 && current.id !== "hero" ? 0.72 : current.opts.s) * (0.55 + 0.45 * grow); if (current.id === "hero") s = current.opts.s * (0.55 + 0.45 * grow); prop.scale.setScalar(s); }
    var vel = Math.min(Math.abs(window.__scrollVel || 0) / 900, 1.6);
    spin.drag *= 0.94;
    prop.rotation.y += 0.004 + spin.drag + vel * 0.012;
    prop.rotation.x += ((spin.ty * 0.6) - prop.rotation.x) * 0.04;
    prop.position.y = (current.el.clientWidth < 760 && current.id !== "hero" ? 1.05 : current.opts.y) + Math.sin(t * 0.9) * 0.07;
    camera.position.x += ((spin.tx * 0.9) - camera.position.x) * 0.05;
    camera.lookAt(0, 0, 0);
    if (prop.userData.animate) prop.userData.animate(t);
    renderer.render(scene, camera);
  }
  document.body.classList.add("gl-on");
  tick();
})();
