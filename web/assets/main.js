/* ════════════════════════════════════════════════════════════════
   The RenAIssance Edition — recreation study engine
   creative-web-replicator techniques applied:
   · --u mathematical layout (CSS)   · one motionDisabled() gate
   · Lenis on GSAP ticker            · parallax painting chapters
   · procedural Web Audio (skill §5) · hidden-object easter eggs
   ════════════════════════════════════════════════════════════════ */
"use strict";
const motionDisabled = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches || !!navigator.webdriver;

/* ── chapter data — factual changelog contents, retold briefly ── */
const G = {
  teal: "linear-gradient(135deg,#175145,#0D2E28)",
  gold: "linear-gradient(135deg,#D9B96F,#9A7A3E)",
  pink: "linear-gradient(135deg,#FF4FA8,#B30E6C)",
  ink:  "linear-gradient(135deg,#3A3D33,#14150F)",
  sky:  "linear-gradient(135deg,#7FA8A0,#2E5A50)",
  rust: "linear-gradient(135deg,#C97B4A,#7A3E1E)",
};
const CHAPTERS = [
{ id:"sidekick", rn:"I", title:"Sidekick", painting:"images/sidekick.jpg", pos:"center 30%",
  lede:"The AI-powered expert who is just as obsessed with your business as you are.",
  groups:[
   { head:"Insights, proactively delivered", cards:[
     { t:"Sidekick Pulse", d:"Personalised recommendations and next steps for your store, researched from your data and market trends — an advisor that never sleeps.", art:G.gold, glyph:"P" },
     { t:"Better memory", d:"Sidekick now remembers your chats and your preferences, so every conversation picks up where the last one left off.", art:G.teal, glyph:"M" } ],
     minors:[
       { t:"Target selection", d:"Click any part of the admin and Sidekick answers in that context." },
       { t:"App discovery", d:"Ask Sidekick to find, compare and install the right app for the job." } ] },
   { head:"Complexity, delegated", cards:[
     { t:"Custom app generation", d:"Describe what your business needs and Sidekick builds a custom app for it, right inside the admin.", art:G.pink, glyph:"A" },
     { t:"Workflow automations", d:"Describe the workflow in plain words; Sidekick builds it in Flow for you.", art:G.teal, glyph:"F" },
     { t:"Custom analytics reports", d:"Reports and visualisations generated directly in the query editor, from a sentence.", art:G.sky, glyph:"R" } ],
     minors:[
       { t:"Segmentation support", d:"Build customer segments from scratch, or get help refining the ones you have." },
       { t:"Multi-step task completion", d:"Sidekick can now plan, keep a to-do list, and carry out several actions in sequence." } ] },
   { head:"Designs, refined", cards:[
     { t:"Generate theme edits", d:"“Make this button rounded.” Say the change you want and watch the theme adjust instantly.", art:G.rust, glyph:"T" },
     { t:"Studio-quality photos", d:"Change backgrounds, add or remove elements, expand the canvas — prompted photo editing in the file editor.", art:G.gold, glyph:"S" } ],
     minors:[
       { t:"Mobile image editor", d:"Turn any phone photo into a polished product shot with the mobile app's editor." } ] },
   { head:"Tedious tasks, simplified", cards:[
     { t:"Skills for prompts", d:"Turn your best Sidekick prompts into reusable Skills — share favourites and discover the community's.", art:G.ink, glyph:"K" },
     { t:"Wide mode", d:"Sidekick goes full screen, giving complex tasks the room they deserve.", art:G.sky, glyph:"W" } ],
     minors:[] },
  ]},
{ id:"agentic", rn:"II", title:"Agentic", painting:"images/agentic.jpg", pos:"center 40%",
  lede:"Sell directly in AI chats, with built-in tools that syndicate your products to every AI platform.",
  groups:[ { head:"Your products, in every conversation", cards:[
     { t:"Agentic Storefronts", d:"Manage how your brand appears to the millions shopping inside ChatGPT, Copilot and Perplexity — set your data up once and be surfaced everywhere.", art:G.teal, glyph:"A" },
     { t:"Catalog for all", d:"Search billions of products across merchants through MCP tools or REST, straight from the Dev Dashboard.", art:G.gold, glyph:"C" } ],
     minors:[
       { t:"Checkout Kit for web", d:"Bring a merchant's checkout into any agentic flow in the browser — also on Swift, Android and React Native." },
       { t:"Build commerce agents", d:"Native shopping inside AI conversations, powered by the Catalog API and Checkout MCP." } ] } ]},
{ id:"online", rn:"III", title:"Online", painting:"images/agentic.jpg", pos:"center 65%", filter:"hue-rotate(-14deg) saturate(1.05)",
  lede:"Validate store changes with A/B testing — and an AI tool that simulates shopping behaviour.",
  groups:[ { head:"Launch with confidence", cards:[
     { t:"Rollouts", d:"Schedule theme changes and A/B test them, built directly into the admin. Gut feelings become data.", art:G.pink, glyph:"R" },
     { t:"SimGym", d:"A flight simulator for your store: AI shoppers trained on billions of purchases test changes before real customers see them.", art:G.teal, glyph:"G" },
     { t:"Tinker", d:"A new playground app where entrepreneurs can experiment with the latest AI tools in one place.", art:G.gold, glyph:"T" } ],
     minors:[
       { t:"Manage store details in the theme editor", d:"Edit products, collections, markets and metafields without leaving your workflow." },
       { t:"Theme generation on mobile", d:"Generate, preview and publish a theme from your phone." },
       { t:"Sell on WordPress", d:"Add products, a cart and checkout to any WordPress site with the plugin." },
       { t:"Unlisted product status", d:"Hide products from search and collections while keeping them reachable by direct link." },
       { t:"Unit pricing for all", d:"Prices by weight, volume, length or count — metric, imperial or counts, now global." },
       { t:"Improved theme discovery", d:"Sharper search, precise industry filters, templates with less manual setup." } ] } ]},
{ id:"retail", rn:"IV", title:"Retail", painting:"images/retail.jpg", pos:"center 35%",
  lede:"New in-store hardware that provides unwavering reliability.",
  groups:[ { head:"Not your standard hub", cards:[
     { t:"The POS Hub", d:"The reliability of wired connections with the processing power of a computer — card readers, printers and scanners plug in and simply stay connected. No pairing, no drops.", art:G.ink, glyph:"H" },
     { t:"Quick count with POS", d:"Scan and update inventory directly from the point of sale, keeping stock accurate across every channel.", art:G.teal, glyph:"Q", tag:"POS Pro" } ],
     minors:[
       { t:"The only hub with processing power", d:"Built-in software keeps data flowing between hardware and POS — ARM Cortex-A7, health monitoring with automatic fault recovery, automatic firmware updates, 3× USB-A + 1× USB-C." },
       { t:"POS customisation in one editor", d:"Customer display, smart grid, receipts and lock screen, all in a single editor." },
       { t:"Same-day delivery with Uber Direct", d:"Fast local delivery with live tracking, offered straight from POS.", tag:"Plus" },
       { t:"QR code payments", d:"Customers pay in store by scanning a code — iDEAL, Swish, Twint, MobilePay and USDC." },
       { t:"Markets for retail", d:"Unique prices and published products per retail location.", tag:"POS Pro" },
       { t:"Customisable return receipts", d:"Return policy, logo and contact details on receipts, via the Liquid editor." } ] } ]},
{ id:"marketing", rn:"V", title:"Marketing", painting:"images/hero.jpg", pos:"center 70%", filter:"saturate(.92) brightness(1.03)",
  lede:"Grow your sales with a first-of-its-kind product network.",
  groups:[ { head:"A network that sells for you", cards:[
     { t:"Product Network", d:"Fill the gaps in your catalogue by surfacing products from other brands in your search, collections, emails and post-purchase pages — and earn commission on every sale.", art:G.pink, glyph:"N" },
     { t:"Shop Campaigns, in your store", d:"Automatic promotion across collections, search and post-purchase pages on other relevant stores.", art:G.gold, glyph:"C" } ],
     minors:[
       { t:"SMS marketing in Messaging", d:"Create, schedule, send and track SMS campaigns inside the Messaging app." },
       { t:"Auto-translation for Forms", d:"Forms translate themselves from English into 19 other languages." },
       { t:"Improved segmentation templates", d:"A refreshed, searchable library of customer segmentation templates." } ] } ]},
{ id:"checkout", rn:"VI", title:"Checkout", painting:"images/checkout.jpg", pos:"center 22%", beanie:true,
  lede:"Convert customers with personalised checkout experiences and more payment options.",
  groups:[ { head:"The last step, perfected", cards:[
     { t:"Personalised Shop button", d:"The last four digits of a customer's saved card now appear on their Shop Pay button — a small, reassuring detail.", art:G.teal, glyph:"S" },
     { t:"Checkout per market", d:"Customise checkout and account pages per country and for B2B buyers, directly in the editor.", art:G.rust, glyph:"M" } ],
     minors:[
       { t:"More payment methods in France", d:"Bancontact, iDEAL, Twint, Blik, Przelewy24, MobilePay and EPS for cross-border shoppers." },
       { t:"Psst — the beanie", d:"Something in this chapter's painting is shoppable. The price is a painter's birth year.", tag:"Secret" } ] } ]},
{ id:"operations", rn:"VII", title:"Operations", painting:"images/sidekick.jpg", pos:"center 70%", filter:"hue-rotate(10deg) brightness(.96)",
  lede:"Improve everyday workflows with flexible inventory modelling and trend-spotting analytics.",
  groups:[ { head:"The engine room, oiled", cards:[
     { t:"Flexible inventory transfers", d:"Receive items from unspecified locations and edit shipments in transit — inventory that matches the real world.", art:G.sky, glyph:"I" },
     { t:"Heatmaps in analytics", d:"See data across two variables at once — sales by hour and day — and spot your highest-selling moments.", art:G.rust, glyph:"H" } ],
     minors:[
       { t:"Quick sale in the mobile app", d:"Sell in person instantly; take Tap to Pay or a payment link." },
       { t:"Apple Watch widgets", d:"Store metrics and customisable widgets, from your wrist." },
       { t:"Password-free login", d:"Passkeys for your store — fingerprint, face or PIN." },
       { t:"Enhanced Managed Markets", d:"Instant compliance checks, faster payouts, full HS-code control.", tag:"US" } ] } ]},
{ id:"shop-app", rn:"VIII", title:"Shop App", painting:"images/retail.jpg", pos:"center 75%", filter:"hue-rotate(-10deg)",
  lede:"Reach millions of high-intent shoppers with personalised buying experiences.",
  groups:[ { head:"A storefront that rearranges itself", cards:[
     { t:"Dynamic storefronts", d:"Your Shop storefront personalises itself per shopper, leading with the products most relevant to them.", art:G.pink, glyph:"D" },
     { t:"Shoppable videos", d:"Add video to your storefront; AI optimises its distribution with built-in ranking and recommendations.", art:G.teal, glyph:"V" } ],
     minors:[
       { t:"Deals feed", d:"Discounts, price drops and Shop Campaigns get a dedicated feed of their own." },
       { t:"Order tracking in 21 more countries", d:"From Germany to Latvia, shoppers track purchases in many more places." } ] } ]},
{ id:"b2b", rn:"IX", title:"B2B", painting:"images/developer.jpg", pos:"center 70%", filter:"saturate(.9) brightness(1.04)",
  lede:"Take your wholesale business global, discover new retailers, and get paid in more ways.",
  groups:[ { head:"Wholesale, worldwide", cards:[
     { t:"Collective goes global", d:"Source and sell other brands directly from the admin — now in 35 additional countries.", art:G.gold, glyph:"C" },
     { t:"ACH payments for B2B", d:"Accept bank payments at checkout and charge saved accounts from the admin.", art:G.ink, glyph:"A", tag:"Plus" } ],
     minors:[
       { t:"Payment requests per fulfilment", d:"One request per shipment on multi-shipment orders.", tag:"Plus" },
       { t:"Store credit for B2B", d:"Issue credit to company locations from their profile or an order refund." },
       { t:"Order review rules", d:"Dynamic rules decide which orders need a human look, via Functions.", tag:"Plus" },
       { t:"ERP integrations", d:"NetSuite, Brightpearl, Fulfil, Sage and Acumatica sync out of the box." },
       { t:"EDI workflows connect", d:"Purchase orders from Crstl and SPS Commerce arrive as draft orders." } ] } ]},
{ id:"finance", rn:"X", title:"Finance", painting:"images/checkout.jpg", pos:"center 78%", filter:"hue-rotate(8deg) saturate(.95)",
  lede:"Modern financial tools designed for growing your business — and getting that coin.",
  groups:[ { head:"Money that keeps moving", cards:[
     { t:"Capital flex account", d:"Apply once for continuous funding; pay fees only on your outstanding balance, and get replenished as you repay.", art:G.gold, glyph:"F" },
     { t:"Automatic transfers in Balance", d:"Rules split every payout across expenses, inventory, marketing and savings — automatically.", art:G.teal, glyph:"B" } ],
     minors:[
       { t:"Credits on USDC transactions", d:"Automatic credits on every USDC-paid order, settled in fiat or USDC." },
       { t:"Unified card disputes", d:"File and track disputes from Balance and Credit in one self-serve flow." },
       { t:"Higher Credit rewards cap", d:"3% cashback on up to $250,000 in your top category each year." } ] } ]},
{ id:"shipping", rn:"XI", title:"Shipping", painting:"images/agentic.jpg", pos:"center 20%", filter:"brightness(1.05) saturate(.9)",
  lede:"Ship confidently — and cheetah-fast — with more label, partner and carrier options.",
  groups:[ { head:"Labels without the legwork", cards:[
     { t:"FedEx return labels", d:"Create, send and track return labels in the admin at discounted pay-on-scan rates.", art:G.rust, glyph:"R" },
     { t:"Default package per variant", d:"Accurate rates at checkout and faster labels for single-item orders.", art:G.sky, glyph:"P" } ],
     minors:[
       { t:"Custom sender name on labels", d:"Protect privacy, meet legal requirements, keep gifts discreet." },
       { t:"Expanded cross-border labels", d:"DHL Express DDP/DDU and Canada Post DDP in Canada; DHL eCommerce DDU in the US." },
       { t:"More global carriers", d:"Buy labels in-admin for Royal Mail, Australia Post and DHL Express Canada." } ] } ]},
{ id:"developer", rn:"XII", title:"Developer", painting:"images/developer.jpg", pos:"center 35%",
  lede:"A completely new way to build for commerce, with the power of AI.",
  groups:[
   { head:"Agentic commerce", cards:[
     { t:"Build commerce agents", d:"Native shopping inside AI conversations — Catalog API and Checkout MCP, all from the new Dev Dash.", art:G.ink, glyph:"D" },
     { t:"Full MCP support", d:"The Dev MCP validates every API call in real time and generates production-ready code.", art:G.teal, glyph:"M" },
     { t:"Tangle", d:"An open-source platform for building ML and data pipelines together, with a visual editor.", art:G.rust, glyph:"T" } ],
     minors:[
       { t:"Sidekick app extensions", d:"Expose your app's data and actions inside merchant conversations with Sidekick." },
       { t:"Admin Intents API", d:"Launch admin workflows for any resource with a single line of code." },
       { t:"Faster bulk operations", d:"Every Admin API mutation, 100MB files, five operations at once." } ] },
   { head:"Storefronts + extensions", cards:[
     { t:"Shop Minis SDK", d:"Immersive experiences — virtual try-on, live shopping — distributed straight to Shop app users.", art:G.pink, glyph:"S" },
     { t:"New code editor for themes", d:"Multi-file search, syntax highlighting, autocomplete, shortcuts and side-by-side diffs.", art:G.gold, glyph:"E" } ],
     minors:[
       { t:"POS Extensions Storage API", d:"Persistent, namespaced storage inside POS — fewer API calls, better performance." },
       { t:"Nested cart lines", d:"Add-ons like extended warranties, nested in cart, checkout and post-purchase." },
       { t:"Transfers API", d:"Model real-world transfers, including from locations the platform doesn't track." },
       { t:"Expiring tokens", d:"OAuth 2.0 token refresh for more secure apps, with programmatic exchange." } ] },
  ]},
];

/* ── render: TOC + chapters ─────────────────────────────────── */
const toc = document.getElementById("toc");
const tocM = document.getElementById("tocMobile");
const host = document.getElementById("chapters");
const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;");
const countOf = ch => ch.groups.reduce((n,g)=> n + g.cards.length + g.minors.length, 0);

toc.innerHTML = CHAPTERS.map(ch =>
  `<a href="#ch-${ch.id}" data-ch="${ch.id}"><span class="rn">${ch.rn}</span><span>${ch.title}</span><span class="leader"></span><span class="cnt">${countOf(ch)}</span></a>`).join("");
tocM.innerHTML = CHAPTERS.map(ch =>
  `<a href="#ch-${ch.id}" data-ch="${ch.id}">${ch.rn} · ${ch.title}</a>`).join("");

host.innerHTML = CHAPTERS.map(ch => `
<section class="chapter" id="ch-${ch.id}" data-ch="${ch.id}">
  <div class="chapter-head">
    <div class="painting" data-parallax data-cursor="View"><img src="${ch.painting}" alt="" loading="lazy" style="object-position:${ch.pos};${ch.filter?`filter:${ch.filter};`:""}"></div>
    <div class="shade"></div>
    <div class="chapter-rn" aria-hidden="true">${ch.rn}</div>
    ${ch.beanie ? `<button class="beanie-hotspot" id="beanieHotspot" type="button" aria-label="A hidden shoppable surprise — the pink beanie"><span class="hint">psst — the beanie is shoppable</span></button>` : ""}
    <div class="chapter-head-text">
      <p class="kicker">Chapter ${ch.rn} · ${countOf(ch)} updates</p>
      <h2 class="chapter-title rv">${ch.title}</h2>
      <p class="chapter-lede rv">${esc(ch.lede)}</p>
    </div>
  </div>
  <div class="chapter-body paper">
    ${ch.groups.map(g => `
    <div class="group">
      <p class="kicker">${ch.title}</p>
      <h3 class="group-head rv"><span class="dropcap">${esc(g.head.charAt(0))}</span>${esc(g.head.slice(1))}</h3>
      ${g.cards.length ? `<div class="cards">${g.cards.map(c => `
        <article class="card rv" data-cursor="Read">
          <div class="card-chrome"><i></i><i></i><i></i><span class="card-url">admin · ${ch.id}/${c.t.toLowerCase().replace(/[^a-z0-9]+/g,"-")}</span></div>
          <div class="card-art" data-glyph="${esc(c.glyph)}" style="background:${c.art}"></div>
          <div class="card-body"><h4>${esc(c.t)}</h4><p>${esc(c.d)}</p><a class="card-link" href="#ch-${ch.id}">Read the update →</a></div>
        </article>`).join("")}</div>` : ""}
      ${g.minors.length ? `<div class="minors">${g.minors.map(m => `
        <div class="minor rv"><h5>${esc(m.t)}${m.tag?`<span class="tag">${esc(m.tag)}</span>`:""}</h5><p>${esc(m.d)}</p></div>`).join("")}</div>` : ""}
    </div>`).join("")}
    <p class="backnav"><a href="#top">↑ Back to navigation</a></p>
  </div>
  <div class="torn torn-paper" aria-hidden="true"><svg viewBox="0 0 1440 42" preserveAspectRatio="none"><path d="M0,0 L1440,0 L1440,16 L1402,13 L1356,25 L1308,14 L1260,26 L1214,12 L1166,24 L1118,15 L1070,27 L1024,13 L976,25 L928,16 L880,28 L834,12 L786,24 L738,14 L690,26 L644,11 L596,25 L548,15 L498,27 L452,13 L408,24 L356,16 L310,28 L262,12 L214,25 L168,14 L120,26 L74,15 L38,24 L0,18 Z"/></svg></div>
</section>`).join("");

/* ── intro curtain ──────────────────────────────────────────── */
const intro = document.getElementById("intro");
const liftCurtain = () => intro.classList.add("gone");
window.addEventListener("load", () => setTimeout(liftCurtain, motionDisabled() ? 60 : 1250));
setTimeout(liftCurtain, 3400); /* never trap the reader */

/* ── starfield canvas (hero only, cheap) ────────────────────── */
(() => {
  const cv = document.getElementById("stars"); if (!cv || motionDisabled()) return;
  const ctx = cv.getContext("2d"); let W, H, stars = [];
  const size = () => { W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight;
    stars = Array.from({length: 90}, () => ({ x: Math.random()*W, y: Math.random()*H, r: Math.random()*1.3+.3, p: Math.random()*6.28, s: .008+Math.random()*.02 })); };
  size(); addEventListener("resize", size);
  (function tick(){ ctx.clearRect(0,0,W,H);
    for (const st of stars){ st.p += st.s; const a = .25 + .55*Math.abs(Math.sin(st.p));
      ctx.globalAlpha = a; ctx.fillStyle = "#FFE9B0"; ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, 6.29); ctx.fill(); }
    ctx.globalAlpha = 1; requestAnimationFrame(tick); })();
})();

/* ── smooth scroll + motion ─────────────────────────────────── */
let lenis = null;
if (!motionDisabled() && window.Lenis && window.gsap) {
  gsap.registerPlugin(ScrollTrigger);
  lenis = new Lenis({ duration: 1.15, easing: t => 1.001 - Math.pow(2, -10 * t) });
  lenis.on("scroll", ScrollTrigger.update);

  /* scroll velocity feeds the 3D engine and lends the chapter
     titles a whisper of skew while the page is moving fast */
  let skewReset;
  ScrollTrigger.create({ onUpdate: self => {
    window.__scrollVel = self.getVelocity();
    const v = gsap.utils.clamp(-4, 4, self.getVelocity() / -350);
    gsap.to(".chapter-title", { skewY: v, duration: .35, overwrite: "auto", ease: "power2.out" });
    clearTimeout(skewReset);
    skewReset = setTimeout(() => gsap.to(".chapter-title", { skewY: 0, duration: .6, ease: "power3.out" }), 150);
  }});
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  /* THE signature move of the original: the painting begins inside a
     portrait title-page frame, then the frame expands to full-bleed
     as you start scrolling (hero pinned for one extra viewport). */
  if (window.matchMedia("(min-width: 901px)").matches) {
    gsap.timeline({
      scrollTrigger: { trigger: ".hero", start: "top top", end: "+=95%", pin: true, scrub: true }
    })
    .fromTo(".hero-painting",
      { clipPath: "inset(6% 26.5% 6% 26.5% round 6px)", scale: 1.12 },
      { clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1.02, ease: "power1.inOut", duration: 1 })
    .to(".hero-frame", { scale: .92, opacity: 0, ease: "power1.in", duration: .38 }, 0.55)
    .fromTo(".hero-shade", { opacity: 0 }, { opacity: 1, duration: .5 }, 0.5);
  } else {
    gsap.to(".hero-frame", { yPercent: -30, opacity: 0, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "72% top", scrub: true } });
  }
  /* after the expansion, the painting keeps a gentle drift */
  gsap.to(".hero-painting", { yPercent: 9, ease: "none",
    scrollTrigger: { trigger: ".prologue", start: "top bottom", end: "top top", scrub: true } });

  /* every chapter painting parallaxes inside its frame */
  document.querySelectorAll(".chapter-head .painting, .epilogue-painting").forEach(el => {
    gsap.fromTo(el, { yPercent: -6 }, { yPercent: 6, ease: "none",
      scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
  });

  /* reveals */
  document.querySelectorAll(".rv").forEach(el => {
    gsap.fromTo(el, { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: .9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" } });
  });

  /* progress hairline */
  gsap.to("#progress", { scaleX: 1, ease: "none",
    scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: .3 } });

  /* prologue counters */
  document.querySelectorAll("[data-count]").forEach(el => {
    const end = +el.dataset.count, obj = { v: 0 };
    gsap.to(obj, { v: end, duration: 1.4, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
      onUpdate: () => el.textContent = Math.round(obj.v) + (end === 150 ? "+" : "") });
  });

  /* mouse parallax on the hero painting */
  const hero = document.querySelector(".hero");
  hero.addEventListener("pointermove", e => {
    const dx = (e.clientX / innerWidth - .5), dy = (e.clientY / innerHeight - .5);
    gsap.to(".hero-painting", { x: dx * -16, duration: .8, ease: "power2.out", overwrite: "auto" });
    gsap.to(".hero-frame", { x: dx * 10, duration: .8, ease: "power2.out", overwrite: "auto" });
  });
} else {
  document.getElementById("progress").style.display = "none";
  document.querySelectorAll("[data-count]").forEach(el => {
    el.textContent = el.dataset.count + (el.dataset.count === "150" ? "+" : "");
  });
}

/* anchor jumps go through Lenis when present */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    audio.tap();
    if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    else target.scrollIntoView({ behavior: "smooth" });
  });
});

/* ── TOC active chapter ─────────────────────────────────────── */
(() => {
  const links = document.querySelectorAll("#toc a, #tocMobile a");
  const io = new IntersectionObserver(entries => {
    for (const en of entries) if (en.isIntersecting) {
      links.forEach(l => l.classList.toggle("active", l.dataset.ch === en.target.dataset.ch));
    }
  }, { rootMargin: "-38% 0px -55% 0px" });
  document.querySelectorAll(".chapter").forEach(s => io.observe(s));
})();

/* ── procedural audio (creative-web-replicator §5) ──────────── */
const audio = (() => {
  let ctx = null, drone = null, on = false;
  const ensure = () => { if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)(); if (ctx.state === "suspended") ctx.resume(); };
  return {
    toggle() {
      ensure();
      if (on) { drone && drone.stop(); drone = null; on = false; return false; }
      const osc = ctx.createOscillator(), filter = ctx.createBiquadFilter(), gain = ctx.createGain();
      osc.type = "sawtooth"; osc.frequency.value = 48.99;               /* G1 sub-bass drone */
      filter.type = "lowpass"; filter.frequency.value = 240; filter.Q.value = 3.5;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.055, ctx.currentTime + 1.6);
      osc.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
      osc.start(); drone = { stop(){ try{ gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + .5); osc.stop(ctx.currentTime + .55); }catch(e){} } };
      on = true; return true;
    },
    tap() { /* tactile glass tap on navigation */
      if (!on || !ctx) return;
      const o = ctx.createOscillator(), g = ctx.createGain(), now = ctx.currentTime;
      o.type = "sine"; o.frequency.setValueAtTime(2350, now);
      o.frequency.exponentialRampToValueAtTime(1150, now + .16);
      g.gain.setValueAtTime(.07, now); g.gain.exponentialRampToValueAtTime(.001, now + .16);
      o.connect(g); g.connect(ctx.destination); o.start(now); o.stop(now + .17);
    }
  };
})();
const soundBtn = document.getElementById("soundBtn");
soundBtn.addEventListener("click", () => {
  const on = audio.toggle();
  soundBtn.setAttribute("aria-pressed", on);
  soundBtn.classList.toggle("playing", on);
  document.getElementById("soundState").textContent = on ? "on" : "off";
});

/* ── easter egg 1 · the hidden key → graffiti layer ─────────── */
const keyBtn = document.getElementById("keyBtn");
keyBtn.addEventListener("click", () => {
  const on = document.body.classList.toggle("graffiti-on");
  keyBtn.setAttribute("aria-pressed", on);
  audio.tap();
  if (on) { const h = document.getElementById("hero"); if (lenis) lenis.scrollTo(h, { duration: 1.2 }); else h.scrollIntoView({ behavior: "smooth" }); }
});

/* ── easter egg 2 · the beanie in the Checkout painting ────── */
const panel = document.getElementById("beaniePanel");
const hotspot = document.getElementById("beanieHotspot");
if (hotspot) hotspot.addEventListener("click", () => { panel.hidden = false; audio.tap(); });
panel.querySelector(".beanie-close").addEventListener("click", () => panel.hidden = true);
document.getElementById("beanieBuy").addEventListener("click", () => {
  document.getElementById("beanieBought").hidden = false; audio.tap();
});

/* ── Tier B+ · the 3D beanie also opens the shop panel ─────── */
document.addEventListener("beanie3d", () => { panel.hidden = false; audio.tap(); });

/* hint shown inside the Checkout head once the GL engine boots */
(() => {
  const head = document.querySelector("#ch-checkout .chapter-head");
  if (!head) return;
  const h = document.createElement("p");
  h.className = "prop-hint";
  h.textContent = "the beanie, rebuilt in 3D — drag to spin it, click it to shop ↑";
  head.appendChild(h);
})();

/* ── Tier B+ · Sidekick playground (simulated, on purpose) ──── */
(() => {
  const body = document.querySelector("#ch-sidekick .chapter-body");
  if (!body) return;
  const PROMPTS = [
    ["Write a product description for my new candle", "Sidekick drafts it in your brand voice, pulls the scent notes straight from your product data, and queues it for approval. Thirty seconds, not thirty minutes."],
    ["Which products are about to stock out?", "Pulse flags three SKUs trending to zero within nine days at current velocity — and the purchase orders are already drafted."],
    ["Build me a BFCM discount campaign", "Done: the campaign is assembled, last year's buyers are segmented, and the email and SMS copy are written and waiting for your sign-off."],
    ["Why did sales dip last Tuesday?", "Traffic held; conversion fell 18% after the promo banner expired at noon. Here's the chart — not a spreadsheet."],
    ["Turn this photo into a product listing", "Vision reads the image, writes the title, tags and alt text, prices it against your catalogue, and files it in the right collection."],
    ["Who are my best customers this quarter?", "A live report, grouped by lifetime value and pinned to your Home. The top decile buys 4.1× more often than the median."]
  ];
  const wrap = document.createElement("div");
  wrap.className = "play";
  wrap.innerHTML =
    '<p class="kicker">Try it · Sidekick, simulated</p>' +
    '<h3 class="play-head">Ask it <span class="script">anything</span></h3>' +
    '<div class="chips">' + PROMPTS.map((p, i) => '<button type="button" class="chip" data-i="' + i + '">' + p[0] + "</button>").join("") + "</div>" +
    '<div class="play-panel"><p class="play-q" hidden></p>' +
    '<p class="play-a"><span class="play-a-text">Pick a prompt above — Sidekick answers from your store\u2019s own data. A simulation, in the spirit of the edition.</span><span class="caret" aria-hidden="true"></span></p></div>';
  body.insertBefore(wrap, body.querySelector(".group"));
  const q = wrap.querySelector(".play-q"), aText = wrap.querySelector(".play-a-text");
  let timer = null;
  wrap.querySelectorAll(".chip").forEach(chip => chip.addEventListener("click", () => {
    const pair = PROMPTS[+chip.dataset.i];
    wrap.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c === chip));
    q.hidden = false; q.textContent = "\u201C" + pair[0] + "\u201D";
    audio.tap();
    clearInterval(timer);
    if (motionDisabled()) { aText.textContent = pair[1]; return; }
    aText.textContent = ""; let i = 0;
    timer = setInterval(() => { aText.textContent = pair[1].slice(0, ++i); if (i >= pair[1].length) clearInterval(timer); }, 13);
  }));
})();

/* ── Tier B+ · gold cursor with labels (fine pointers only) ── */
(() => {
  const cur = document.getElementById("cursor");
  if (!cur || motionDisabled() || !window.gsap) return;
  if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
  document.body.classList.add("has-cursor");
  const label = cur.querySelector("span");
  const xTo = gsap.quickTo(cur, "x", { duration: .45, ease: "power3.out" });
  const yTo = gsap.quickTo(cur, "y", { duration: .45, ease: "power3.out" });
  addEventListener("pointermove", e => { xTo(e.clientX); yTo(e.clientY); });
  document.addEventListener("mouseover", e => {
    const t = e.target;
    if (!t.closest) return;
    if (t.closest(".gl-canvas")) { label.textContent = "Drag"; cur.classList.add("big"); return; }
    const tagged = t.closest("[data-cursor]");
    if (tagged) { label.textContent = tagged.dataset.cursor; cur.classList.add("big"); }
    else cur.classList.remove("big");
  });
})();
