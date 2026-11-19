/* =========================================================
   The star chart on the homepage.
   Draws a night sky on a <canvas>, then places one invisible
   button over each project star so it can be hovered, tapped,
   or reached with the keyboard.
   Project data lives in projects.js.
   ========================================================= */

(function () {
  const canvas = document.getElementById("sky");
  const ctx = canvas.getContext("2d");
  const readout = document.getElementById("readout");
  const projects = window.PROJECTS || [];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let W = 0, H = 0, dpr = 1;
  let dust = [];          // background stars
  let active = null;      // project currently shown
  let mouseX = 0.5, mouseY = 0.5;
  let start = performance.now();

  // A tiny seeded random so the sky looks the same on every visit
  let seed = 7;
  function rand() {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  }

  const isPhone = () => W < 640;

  function pos(p) {
    const x = isPhone() ? p.mx : p.x;
    const y = isPhone() ? p.my : p.y;
    return { x: x * W, y: y * H + (isPhone() ? 40 : 0) };
  }

  // ---------- Build the background ----------
  function makeDust() {
    seed = 7;
    dust = [];
    const count = Math.round((W * H) / 2200);
    for (let i = 0; i < count; i++) {
      dust.push({
        x: rand(), y: rand(),
        r: Math.pow(rand(), 3) * 1.4 + 0.25,
        a: rand() * 0.6 + 0.15,
        depth: rand(),
        phase: rand() * Math.PI * 2,
        speed: 0.4 + rand() * 1.2
      });
    }
    // A faint band, like the Milky Way, crossing the sky on a diagonal
    for (let i = 0; i < count * 1.2; i++) {
      const t = rand();
      const spread = (rand() + rand() + rand() - 1.5) * 0.16;
      dust.push({
        x: t * 1.3 - 0.15 + spread * 0.5,
        y: 1.05 - t * 0.95 + spread,
        r: rand() * 0.6 + 0.2,
        a: rand() * 0.28 + 0.05,
        depth: rand() * 0.4,
        phase: rand() * Math.PI * 2,
        speed: 0.3 + rand()
      });
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    makeDust();
    placeButtons();
  }

  // ---------- Drawing ----------
  function drawDust(t) {
    const px = (mouseX - 0.5) * 14;
    const py = (mouseY - 0.5) * 10;
    for (const s of dust) {
      const tw = reduceMotion ? 1 : 0.75 + 0.25 * Math.sin(t * 0.001 * s.speed + s.phase);
      ctx.globalAlpha = s.a * tw;
      ctx.fillStyle = "#ece6d6";
      ctx.beginPath();
      ctx.arc(s.x * W - px * s.depth, s.y * H - py * s.depth, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawLines(t) {
    // The constellation draws itself once when the page opens
    const progress = reduceMotion ? 1 : Math.min(1, (t - start - 300) / 1800);
    if (progress <= 0) return;
    const eased = 1 - Math.pow(1 - progress, 3);
    ctx.lineWidth = 1;
    for (const p of projects) {
      for (const id of p.links) {
        const q = projects.find((o) => o.id === id);
        if (!q) continue;
        const a = pos(p), b = pos(q);
        const lit = active && (active === p || active === q);
        ctx.strokeStyle = lit ? "rgba(242,200,121,0.55)" : "rgba(141,149,174,0.22)";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(a.x + (b.x - a.x) * eased, a.y + (b.y - a.y) * eased);
        ctx.stroke();
      }
    }
  }

  function drawStar(p, t) {
    const { x, y } = pos(p);
    const on = active === p;
    const pulse = reduceMotion ? 1 : 1 + 0.08 * Math.sin(t * 0.002 + x);
    const color = on ? "242,200,121" : "236,230,214";

    // soft glow
    const g = ctx.createRadialGradient(x, y, 0, x, y, 18 * pulse);
    g.addColorStop(0, `rgba(${color},0.55)`);
    g.addColorStop(1, `rgba(${color},0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, 18 * pulse, 0, Math.PI * 2);
    ctx.fill();

    // diffraction spikes, like a star in a telescope photo
    const L = (on ? 16 : 10) * pulse;
    ctx.strokeStyle = `rgba(${color},${on ? 0.8 : 0.45})`;
    ctx.lineWidth = 0.75;
    ctx.beginPath();
    ctx.moveTo(x - L, y); ctx.lineTo(x + L, y);
    ctx.moveTo(x, y - L); ctx.lineTo(x, y + L);
    ctx.stroke();

    // core
    ctx.fillStyle = `rgb(${color})`;
    ctx.beginPath();
    ctx.arc(x, y, on ? 3 : 2.2, 0, Math.PI * 2);
    ctx.fill();

    // chart ring on the selected star
    if (on) {
      ctx.strokeStyle = "rgba(242,200,121,0.7)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function frame(t) {
    ctx.clearRect(0, 0, W, H);
    drawDust(t);
    drawLines(t);
    for (const p of projects) drawStar(p, t);
    requestAnimationFrame(frame);
  }

  // ---------- Buttons, labels, and the readout panel ----------
  const hits = [];

  function build() {
    for (const p of projects) {
      const b = document.createElement("button");
      b.className = "star-hit";
      b.type = "button";
      b.setAttribute("aria-label", p.name);
      b.addEventListener("mouseenter", () => open(p));
      b.addEventListener("focus", () => open(p));
      b.addEventListener("click", (e) => { e.stopPropagation(); open(p, true); });

      const label = document.createElement("span");
      label.className = "star-label";
      label.textContent = p.name;
      label.setAttribute("aria-hidden", "true");

      document.body.appendChild(b);
      document.body.appendChild(label);
      hits.push({ p, b, label });
    }
  }

  function placeButtons() {
    for (const h of hits) {
      const { x, y } = pos(h.p);
      h.b.style.left = x + "px";
      h.b.style.top = y + "px";
      h.label.style.left = x + "px";
      h.label.style.top = y + "px";
      // flip the label to the left side near the right edge
      const flip = x > W - 150;
      h.label.style.transform = flip ? "translate(calc(-100% - 14px), -50%)" : "translate(14px, -50%)";
    }
    if (active) positionReadout(active);
  }

  function link(href, text) {
    return `<a class="text-link" href="${href}" target="_blank" rel="noopener">${text}</a>`;
  }

  function open(p) {
    active = p;
    const acts = [];
    if (p.live) acts.push(link(p.live, "Open the app"));
    if (p.code) acts.push(link(p.code, "See the code"));
    if (!acts.length) acts.push(`<span class="pending">Code not public yet</span>`);

    readout.innerHTML = `
      <button class="close" type="button" aria-label="Close">&times;</button>
      <h2>${p.name}</h2>
      <p class="meta">${p.meta}</p>
      <p class="desc">${p.desc}</p>
      <div class="acts">${acts.join("")}</div>`;
    readout.querySelector(".close").addEventListener("click", close);
    readout.classList.add("open");
    for (const h of hits) h.label.classList.toggle("on", h.p === p);
    positionReadout(p);
  }

  function close() {
    active = null;
    readout.classList.remove("open");
    for (const h of hits) h.label.classList.remove("on");
  }

  function positionReadout(p) {
    const { x, y } = pos(p);
    const r = readout.getBoundingClientRect();
    const gap = 34;
    let left = x + gap;
    if (left + r.width > W - 16) left = x - gap - r.width;
    let top = y - 28;
    top = Math.max(80, Math.min(top, H - r.height - 16));
    readout.style.left = Math.max(16, left) + "px";
    readout.style.top = top + "px";
  }

  // Keep the panel open while the pointer is over it
  let leaveTimer = null;
  readout.addEventListener("mouseenter", () => clearTimeout(leaveTimer));
  readout.addEventListener("mouseleave", () => { leaveTimer = setTimeout(close, 250); });
  document.addEventListener("mouseover", (e) => {
    if (!active) return;
    if (e.target.closest(".star-hit") || e.target.closest(".readout")) {
      clearTimeout(leaveTimer);
    } else {
      clearTimeout(leaveTimer);
      leaveTimer = setTimeout(close, 400);
    }
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".readout") && !e.target.closest(".star-hit")) close();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX / W;
    mouseY = e.clientY / H;
  });
  window.addEventListener("resize", resize);

  build();
  resize();
  requestAnimationFrame(frame);
})();
