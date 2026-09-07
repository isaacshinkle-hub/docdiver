/* DocDiver — tiny vanilla JS. No build step.
   Sections: nav · helpers · adventure cards · filters · pins · post nav · lightbox */
(function () {
  'use strict';

  var t = document.querySelector('.nav-toggle'), n = document.getElementById('nav-links');
  if (t && n) {
    function setOpen(open) {
      n.classList.toggle('open', open);
      t.setAttribute('aria-expanded', open);
      t.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('nav-open', open);
    }
    t.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!n.classList.contains('open'));
    });
    n.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && n.classList.contains('open')) { setOpen(false); t.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (n.classList.contains('open') && !e.target.closest('.site-header')) setOpen(false);
    });
  }
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function parseDate(s) { if (!s) return null; var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function fmtDate(s) { var d = parseDate(s); return d ? MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() : ''; }
  function fmtRange(a, b) {
    var da = parseDate(a), db = parseDate(b);
    if (!da) return '';
    if (!db || a === b) return fmtDate(a);
    if (da.getFullYear() === db.getFullYear() && da.getMonth() === db.getMonth()) return MONTHS[da.getMonth()] + ' ' + da.getDate() + '–' + db.getDate() + ', ' + da.getFullYear();
    if (da.getFullYear() === db.getFullYear()) return MONTHS[da.getMonth()] + ' ' + da.getDate() + ' – ' + MONTHS[db.getMonth()] + ' ' + db.getDate() + ', ' + da.getFullYear();
    return fmtDate(a) + ' – ' + fmtDate(b);
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  var root = document.body.getAttribute('data-root') || '';

  /* placeholder cover: teal gradient with a wave, as a data URI */
  var PH = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a4d6e"/><stop offset="1" stop-color="#03141c"/></linearGradient></defs><rect width="800" height="500" fill="url(#g)"/><path d="M0,330 C150,300 250,370 400,340 C550,310 650,380 800,350 L800,500 L0,500 Z" fill="rgba(46,200,184,0.10)"/><path d="M0,380 C150,350 250,420 400,390 C550,360 650,430 800,400 L800,500 L0,500 Z" fill="rgba(46,200,184,0.14)"/><g fill="rgba(58,212,197,0.20)" transform="translate(520 120) scale(1.6)"><path d="M6 30c16-14 42-16 64-6l10-20 6 20 20-14-12 16 16 2-16 4 12 18-12-12-10 18C52 44 26 42 10 36 4 40 2 34 6 30z"/></g></svg>');

  function card(a, featured) {
    var cover = a.cover ? root + a.cover : PH;
    return '<a class="adv-card' + (featured ? ' featured' : '') + '" href="' + root + 'adventures/' + esc(a.slug) + '.html" data-type="' + esc(a.type) + '" data-region="' + esc(a.region) + '">' +
      '<div class="adv-cover"><img src="' + cover + '" alt="" loading="lazy"><span class="tag type">' + esc(a.type) + '</span></div>' +
      '<div class="adv-body"><div class="where">' + esc(a.where) + '</div><h3>' + esc(a.title) + '</h3><p>' + esc(a.summary) + '</p><div class="when">' + fmtRange(a.start, a.end) + '</div></div></a>';
  }

  /* Home: latest adventures */
  var latest = document.getElementById('latest-adventures');
  if (latest && window.ADVENTURES) {
    latest.innerHTML = window.ADVENTURES.slice(0, 3).map(function (a, i) { return card(a, false); }).join('');
  }

  /* Adventures page: featured + grid + filters */
  var grid = document.getElementById('adventure-grid');
  if (grid && window.ADVENTURES) {
    var all = window.ADVENTURES.slice();
    var types = [], regions = [];
    all.forEach(function (a) { if (types.indexOf(a.type) < 0) types.push(a.type); if (regions.indexOf(a.region) < 0) regions.push(a.region); });
    var fT = document.getElementById('filter-type'), fR = document.getElementById('filter-region');
    var curT = 'all', curR = 'all';
    function btn(v, label, pressed) { return '<button data-v="' + esc(v) + '" aria-pressed="' + pressed + '">' + esc(label) + '</button>'; }
    if (fT) fT.innerHTML = btn('all', 'All types', true) + types.map(function (v) { return btn(v, v, false); }).join('');
    if (fR) fR.innerHTML = btn('all', 'Everywhere', true) + regions.map(function (v) { return btn(v, v, false); }).join('');
    function render() {
      var shown = all.filter(function (a) { return (curT === 'all' || a.type === curT) && (curR === 'all' || a.region === curR); });
      var feat = (curT === 'all' && curR === 'all') ? shown.filter(function (a) { return a.featured; })[0] : null;
      grid.innerHTML = (feat ? card(feat, true) : '') + shown.filter(function (a) { return a !== feat; }).map(function (a) { return card(a, false); }).join('') ||
        '<div class="empty-marine"><svg viewBox="0 0 128 64" aria-hidden="true"><path d="M4 38c12-14 32-22 52-18l12-14 6 16c8 6 16 12 22 18l18-12c6-4 12 0 10 6L96 42c-4 10-20 18-40 16S30 48 22 40c-8 8-16 8-20 2 6-2 10-4 12-6-4 2-8 2-10 2z"/></svg><p class="muted">Nothing here yet for that combination.</p></div>';
      var c = document.getElementById('adv-count'); if (c) c.textContent = shown.length + (shown.length === 1 ? ' adventure' : ' adventures');
    }
    function wire(el, set) {
      if (!el) return;
      el.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        set(b.getAttribute('data-v'));
        Array.prototype.forEach.call(el.querySelectorAll('button'), function (x) { x.setAttribute('aria-pressed', x === b); });
        render();
      });
    }
    wire(fT, function (v) { curT = v; }); wire(fR, function (v) { curR = v; });
    render();
  }

  /* Home: where I've been + wish list pins */
  var pins = document.getElementById('pins');
  if (pins && window.ADVENTURES) {
    var seen = {};
    window.ADVENTURES.forEach(function (a) { if (a.region !== 'Planning' && !seen[a.where]) seen[a.where] = a.slug; });
    var been = Object.keys(seen).map(function (w) { return '<a class="pin" href="' + root + 'adventures/' + esc(seen[w]) + '.html"><i></i>' + esc(w) + '</a>'; }).join('');
    var wish = (window.WISHLIST || []).map(function (w) { return '<span class="pin soon" title="' + esc(w.note) + '"><i></i>' + esc(w.where) + '</span>'; }).join('');
    pins.innerHTML = (been || '<span class="muted small">First trip write-up coming soon.</span>') + wish;
  }

  /* Post pages: date line + prev/next from the manifest */
  var post = document.querySelector('[data-slug]');
  if (post && window.ADVENTURES) {
    var slug = post.getAttribute('data-slug'), idx = -1;
    window.ADVENTURES.forEach(function (a, i) { if (a.slug === slug) idx = i; });
    if (idx >= 0) {
      var a = window.ADVENTURES[idx];
      var dl = document.getElementById('post-dates'); if (dl) dl.textContent = fmtRange(a.start, a.end);
      var nav = document.getElementById('post-nav');
      if (nav) {
        var newer = window.ADVENTURES[idx - 1], older = window.ADVENTURES[idx + 1];
        nav.innerHTML = (older ? '<a href="' + esc(older.slug) + '.html">← ' + esc(older.title) + '</a>' : '<span></span>') +
                        (newer ? '<a href="' + esc(newer.slug) + '.html">' + esc(newer.title) + ' →</a>' : '<span></span>');
      }
    }
  }

  /* Lightbox for .gallery a[href] */
  var links = Array.prototype.slice.call(document.querySelectorAll('.gallery a[href]'));
  if (links.length) {
    var lb = document.createElement('div'); lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Photo viewer');
    lb.innerHTML = '<button class="close" type="button" aria-label="Close">×</button><button class="prev" type="button" aria-label="Previous">‹</button><img alt=""><button class="next" type="button" aria-label="Next">›</button><div class="cap"></div>';
    document.body.appendChild(lb);
    var img = lb.querySelector('img'), cap = lb.querySelector('.cap'), i = 0, lastFocus = null;
    function show(k) {
      lastFocus = document.activeElement;
      i = (k + links.length) % links.length;
      img.src = links[i].getAttribute('href');
      img.alt = links[i].querySelector('img').alt || '';
      cap.textContent = links[i].getAttribute('data-caption') || img.alt || '';
      lb.classList.add('open');
      lb.querySelector('.close').focus();
    }
    function hide() { lb.classList.remove('open'); img.src = ''; img.alt = ''; if (lastFocus && lastFocus.focus) lastFocus.focus(); }
    links.forEach(function (l, k) { l.addEventListener('click', function (e) { e.preventDefault(); show(k); }); });
    lb.querySelector('.close').addEventListener('click', hide);
    lb.querySelector('.prev').addEventListener('click', function () { show(i - 1); });
    lb.querySelector('.next').addEventListener('click', function () { show(i + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) hide(); });
    document.addEventListener('keydown', function (e) { if (!lb.classList.contains('open')) return; if (e.key === 'Escape') hide(); if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); });
  }
})();
