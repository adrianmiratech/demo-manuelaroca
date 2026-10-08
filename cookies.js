/* Gestión de cookies: banner, preferencia (12 meses) y carga del mapa de Google solo con consentimiento */
(function () {
  var KEY = "cookie-consent", YEAR = 365 * 864e5;
  function get() {
    try { var o = JSON.parse(localStorage.getItem(KEY)); if (o && Date.now() - o.t < YEAR) return o.v; } catch (e) {}
    return null;
  }
  function set(v) { try { localStorage.setItem(KEY, JSON.stringify({ v: v, t: Date.now() })); } catch (e) {} }

  var css = "#cookie-banner{position:fixed;left:16px;right:16px;bottom:16px;max-width:560px;z-index:300;background:#211715;color:#f5efe9;border:1px solid #4a362e;border-radius:18px;padding:1.2rem 1.3rem;box-shadow:0 24px 60px rgba(0,0,0,.6);font:400 .92rem/1.5 'Public Sans',system-ui,sans-serif}" +
    "#cookie-banner[hidden]{display:none}#cookie-banner h2{font:700 1.05rem 'Bricolage Grotesque',system-ui,sans-serif;margin-bottom:.4rem}" +
    "#cookie-banner p{color:#c9bcb4}#cookie-banner a{color:#ff8a4d}" +
    "#cookie-banner .ck-row{display:flex;gap:.6rem;margin-top:1rem}" +
    "#cookie-banner button{flex:1;padding:.7rem 1rem;border-radius:10px;border:2px solid #ff6a1f;background:transparent;color:#f5efe9;font:600 .92rem 'Public Sans',system-ui,sans-serif;cursor:pointer}" +
    "#cookie-banner button:hover{background:rgba(255,106,31,.15)}#cookie-banner button:focus-visible{outline:3px solid #ff6a1f;outline-offset:2px}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var banner = document.createElement("div");
  banner.id = "cookie-banner"; banner.setAttribute("role", "dialog"); banner.setAttribute("aria-label", "Aviso de cookies"); banner.hidden = true;
  banner.innerHTML = '<h2>Cookies</h2><p>Usamos solo las cookies necesarias. El mapa de Google Maps puede instalar cookies de Google, por lo que solo se carga si lo aceptas. Más información en la <a href="legal.html#cookies">política de cookies</a>.</p>' +
    '<div class="ck-row"><button type="button" data-ck="none">Rechazar</button><button type="button" data-ck="all">Aceptar</button></div>';

  var slot, placeholder;
  function renderMap() {
    if (!slot) return;
    if (get() === "all") {
      var f = document.createElement("iframe");
      f.src = slot.getAttribute("data-src"); f.title = slot.getAttribute("data-title") || "Mapa";
      f.loading = "lazy"; f.referrerPolicy = "no-referrer-when-downgrade";
      slot.replaceChildren(f);
    } else { slot.innerHTML = placeholder; }
  }
  function choose(v) { set(v); banner.hidden = true; renderMap(); }

  document.addEventListener("DOMContentLoaded", function () {
    document.body.appendChild(banner);
    slot = document.getElementById("map-slot");
    if (slot) placeholder = slot.innerHTML;
    renderMap();
    if (get() === null) banner.hidden = false;
  });
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-ck]");
    if (b) { choose(b.getAttribute("data-ck")); return; }
    if (e.target.closest("[data-map-accept]")) { choose("all"); return; }
    if (e.target.closest("[data-cookie-settings]")) { banner.hidden = false; var f = banner.querySelector("button"); if (f) f.focus(); }
  });
})();
