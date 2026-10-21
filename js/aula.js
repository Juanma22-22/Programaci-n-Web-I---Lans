/* Herramientas de aula para dictar la clase como tablero digital.
   Atajos: B menú · F pantalla completa · M modo enfoque · + / − tamaño · L láser · D pizarra · T temporizador · K buscar · ← → anterior/siguiente · ? ayuda */
(function () {
  var C = window.Course;
  var KEY = 'cw1:aula';
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  var S = Object.assign({ nonav: false, focus: false, zoom: 100, docente: false }, load());
  var body = document.body, main = document.getElementById('main');

  function h(tag, attrs, html) { var e = document.createElement(tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); if (html != null) e.innerHTML = html; return e; }
  var aviso = h('div', { class: 'aviso-a', role: 'status' }); body.appendChild(aviso);
  var tm;
  function say(t) { aviso.textContent = t; aviso.classList.add('on'); clearTimeout(tm); tm = setTimeout(function () { aviso.classList.remove('on'); }, 1600); }

  /* ---------- menú, enfoque, zoom, pantalla completa ---------- */
  function applyView() {
    body.classList.toggle('nonav', !!S.nonav); body.classList.toggle('focus', !!S.focus);
    main.style.zoom = S.zoom === 100 ? '' : (S.zoom / 100);
    btn.nav.setAttribute('aria-pressed', String(!!S.nonav)); btn.focus.setAttribute('aria-pressed', String(!!S.focus)); btn.zoomv.textContent = S.zoom + ' %';
    btn.docente.setAttribute('aria-pressed', String(!!S.docente));
    save();
  }
  function toggleNav() { S.nonav = !S.nonav; applyView(); say(S.nonav ? 'Menú oculto' : 'Menú visible'); }
  function toggleFocus() { S.focus = !S.focus; applyView(); say(S.focus ? 'Modo enfoque' : 'Encabezado visible'); }
  function zoom(d) { S.zoom = Math.max(70, Math.min(200, S.zoom + d)); applyView(); say('Tamaño ' + S.zoom + ' %'); }
  function fs() {
    var d = document;
    if (!d.fullscreenElement) { (d.documentElement.requestFullscreen || function () { return Promise.reject(); }).call(d.documentElement).catch(function () { say('Tu navegador no permite pantalla completa aquí'); }); }
    else d.exitFullscreen();
  }
  document.addEventListener('fullscreenchange', function () { btn.fs.setAttribute('aria-pressed', String(!!document.fullscreenElement)); });

  /* ---------- modo docente: abre todas las lecciones ---------- */
  var openUntil0 = C.openUntil;
  function docente() {
    S.docente = !S.docente; C.openUntil = S.docente ? null : openUntil0; applyView(); C.start();
    say(S.docente ? 'Modo docente: todo desbloqueado en este equipo' : 'Modo estudiante: se respeta openUntil');
  }
  if (S.docente) C.openUntil = null;

  /* ---------- láser ---------- */
  var laser = h('div', { class: 'laser' }); body.appendChild(laser);
  document.addEventListener('pointermove', function (e) { if (body.classList.contains('laser-on')) { laser.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)'; } });
  function toggleLaser() { var on = body.classList.toggle('laser-on'); btn.laser.setAttribute('aria-pressed', String(on)); say(on ? 'Puntero láser activado' : 'Puntero láser apagado'); }

  /* ---------- pizarra ---------- */
  var cv = h('canvas', { class: 'pizarra', 'aria-label': 'Pizarra para dibujar sobre la clase' }), ctx = cv.getContext('2d');
  var pt = h('div', { class: 'ptools', role: 'toolbar', 'aria-label': 'Herramientas de pizarra' });
  var strokes = [], cur = null, tool = 'pen', color = '#E53935', size = 4, fondo = 'transparente';
  var COLORS = ['#E53935', '#1E88E5', '#43A047', '#FDD835', '#FFFFFF', '#111111'];
  function size_() { var r = window.devicePixelRatio || 1; cv.width = innerWidth * r; cv.height = innerHeight * r; ctx.setTransform(r, 0, 0, r, 0, 0); redraw(); }
  function stroke(s) {
    if (!s.p.length) return;
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (s.tool === 'eraser') { ctx.globalCompositeOperation = 'destination-out'; ctx.lineWidth = s.w * 4; ctx.strokeStyle = '#000'; }
    else if (s.tool === 'hl') { ctx.globalAlpha = .35; ctx.lineWidth = s.w * 4; ctx.strokeStyle = s.c; }
    else { ctx.lineWidth = s.w; ctx.strokeStyle = s.c; }
    ctx.beginPath(); ctx.moveTo(s.p[0][0], s.p[0][1]);
    if (s.p.length === 1) ctx.lineTo(s.p[0][0] + .01, s.p[0][1]);
    for (var i = 1; i < s.p.length; i++) ctx.lineTo(s.p[i][0], s.p[i][1]);
    ctx.stroke(); ctx.restore();
  }
  function redraw() { ctx.clearRect(0, 0, innerWidth, innerHeight); strokes.forEach(stroke); }
  cv.addEventListener('pointerdown', function (e) { cv.setPointerCapture(e.pointerId); cur = { tool: tool, c: color, w: size, p: [[e.clientX, e.clientY]] }; strokes.push(cur); stroke(cur); e.preventDefault(); });
  cv.addEventListener('pointermove', function (e) { if (!cur) return; cur.p.push([e.clientX, e.clientY]); redraw(); });
  function end() { cur = null; }
  cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
  function mk(label, fn, extra) { var b = h('button', Object.assign({ type: 'button' }, extra || {}), label); b.onclick = fn; return b; }
  var bt = {}, sw = [];
  function setTool(t) { tool = t; ['pen', 'hl', 'eraser'].forEach(function (k) { bt[k].setAttribute('aria-pressed', String(k === t)); }); }
  bt.pen = mk('Lápiz', function () { setTool('pen'); }); bt.hl = mk('Resaltador', function () { setTool('hl'); }); bt.eraser = mk('Borrador', function () { setTool('eraser'); });
  pt.appendChild(bt.pen); pt.appendChild(bt.hl); pt.appendChild(bt.eraser);
  COLORS.forEach(function (c) { var b = mk('', function () { color = c; if (tool === 'eraser') setTool('pen'); sw.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); }, { 'aria-label': 'Color ' + c, 'aria-pressed': String(c === color) }); b.className = 'sw'; b.style.background = c; sw.push(b); pt.appendChild(b); });
  var sz = h('select', { 'aria-label': 'Grosor' }, '<option value="2">Fino</option><option value="4" selected>Medio</option><option value="8">Grueso</option><option value="14">Muy grueso</option>'); sz.onchange = function () { size = +sz.value; }; pt.appendChild(sz);
  var fd = h('select', { 'aria-label': 'Fondo' }, '<option value="transparente">Sobre la página</option><option value="blanca">Pizarra blanca</option><option value="negra">Pizarra oscura</option>'); fd.onchange = function () { fondo = fd.value; cv.classList.remove('fondo-blanca', 'fondo-negra'); if (fondo !== 'transparente') cv.classList.add('fondo-' + fondo); }; pt.appendChild(fd);
  pt.appendChild(mk('Deshacer', function () { strokes.pop(); redraw(); }));
  pt.appendChild(mk('Borrar todo', function () { strokes = []; redraw(); }));
  pt.appendChild(mk('Cerrar', function () { board(false); }));
  setTool('pen'); body.appendChild(cv); body.appendChild(pt); addEventListener('resize', function () { if (cv.classList.contains('on')) size_(); });
  function board(on) {
    if (on === undefined) on = !cv.classList.contains('on');
    cv.classList.toggle('on', on); pt.classList.toggle('on', on); btn.board.setAttribute('aria-pressed', String(on));
    if (on) size_(); say(on ? 'Pizarra activa · Esc o D para volver a la clase' : 'Pizarra cerrada (los trazos se conservan en esta lección)');
  }
  window.addEventListener('hashchange', function () { strokes = []; redraw(); });

  /* ---------- temporizador ---------- */
  var rl = h('div', { class: 'reloj', role: 'timer' }), rt = h('div', { class: 't' }, '00:00'), rs = h('small', null, ''), left = 0, running = false, iv = null, started = Date.now();
  function fmt(s) { var m = Math.floor(Math.abs(s) / 60), r = Math.abs(s) % 60; return (s < 0 ? '+' : '') + String(m).padStart(2, '0') + ':' + String(r).padStart(2, '0'); }
  function beep() { try { var a = new (window.AudioContext || window.webkitAudioContext)(), o = a.createOscillator(), g = a.createGain(); o.connect(g); g.connect(a.destination); o.frequency.value = 880; g.gain.value = .15; o.start(); o.stop(a.currentTime + .6); } catch (e) {} }
  function paintT() { rt.textContent = fmt(left); rt.classList.toggle('fin', left <= 0 && running); rt.classList.toggle('poco', left > 0 && left <= 60); rs.textContent = 'Clase iniciada hace ' + Math.floor((Date.now() - started) / 60000) + ' min · ' + new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }); }
  function tick() { if (running) { left--; if (left === 0) { beep(); say('Se acabó el tiempo'); } } paintT(); }
  function setT(min) { left = min * 60; running = true; paintT(); }
  rl.appendChild(rt); var row = h('div', { class: 'row' });
  [5, 10, 15, 25, 45].forEach(function (m) { row.appendChild(mk(m + ' min', function () { setT(m); })); });
  rl.appendChild(row); var row2 = h('div', { class: 'row' });
  row2.appendChild(mk('Pausa / seguir', function () { running = !running; paintT(); })); row2.appendChild(mk('+1 min', function () { left += 60; paintT(); })); row2.appendChild(mk('Reiniciar', function () { left = 0; running = false; paintT(); }));
  rl.appendChild(row2); rl.appendChild(rs); body.appendChild(rl);
  function toggleTimer() { var on = rl.classList.toggle('on'); btn.timer.setAttribute('aria-pressed', String(on)); if (on && !iv) { iv = setInterval(tick, 1000); paintT(); } }

  /* ---------- buscador de lecciones y ayuda ---------- */
  function modal(cls) { var m = h('div', { class: 'modal-a ' + (cls || ''), role: 'dialog', 'aria-modal': 'true' }), b = h('div', { class: 'box' }); m.appendChild(b); m.onclick = function (e) { if (e.target === m) m.classList.remove('on'); }; body.appendChild(m); return { m: m, b: b }; }
  var find = modal(), fin = h('input', { type: 'search', placeholder: 'Ir a una lección… (escribe parte del título o el número)', 'aria-label': 'Buscar lección' }), fl = h('ul'), fsel = 0, fitems = [];
  find.b.appendChild(fin); find.b.appendChild(fl);
  function lessons() { var r = []; C.modules.forEach(function (m) { m.topics.forEach(function (t) { t.lessons.forEach(function (l) { r.push({ id: l[0], title: l[1], mod: m.name }); }); }); }); return r; }
  function paintFind() {
    var q = fin.value.trim().toLowerCase(); fitems = lessons().filter(function (l) { return !q || (l.id + ' ' + l.title + ' ' + l.mod).toLowerCase().indexOf(q) >= 0; }).slice(0, 30); fsel = Math.min(fsel, Math.max(0, fitems.length - 1));
    fl.innerHTML = ''; fitems.forEach(function (l, i) { var li = h('li'), a = h('a', { href: '#' + l.id, class: i === fsel ? 'sel' : '' }); a.textContent = l.id + ' · ' + l.title; var s = h('small'); s.textContent = l.mod; a.appendChild(s); a.onclick = function () { find.m.classList.remove('on'); }; li.appendChild(a); fl.appendChild(li); });
  }
  fin.oninput = function () { fsel = 0; paintFind(); };
  fin.onkeydown = function (e) {
    if (e.key === 'ArrowDown') { fsel = Math.min(fsel + 1, fitems.length - 1); paintFind(); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { fsel = Math.max(fsel - 1, 0); paintFind(); e.preventDefault(); }
    else if (e.key === 'Enter' && fitems[fsel]) { location.hash = fitems[fsel].id; find.m.classList.remove('on'); }
  };
  function openFind() { find.m.classList.add('on'); fin.value = ''; fsel = 0; paintFind(); setTimeout(function () { fin.focus(); }, 30); }
  var help = modal('ayuda');
  help.b.innerHTML = '<h3 style="margin-top:0">Atajos de teclado</h3><table>' + [
    ['B', 'Mostrar u ocultar el menú de secciones'], ['F', 'Pantalla completa'], ['M', 'Modo enfoque (oculta el encabezado)'], ['+  /  −', 'Aumentar o reducir el tamaño del contenido'], ['0', 'Tamaño normal'],
    ['L', 'Puntero láser'], ['D', 'Pizarra para dibujar (Esc para salir)'], ['T', 'Temporizador de actividades'], ['K  o  Ctrl+K', 'Buscar e ir a una lección'], ['←  /  →', 'Lección anterior / siguiente'], ['?', 'Esta ayuda']
  ].map(function (r) { return '<tr><td><kbd>' + r[0] + '</kbd></td><td>' + r[1] + '</td></tr>'; }).join('') + '</table><p class="hint" style="color:var(--mu)">Los atajos no actúan mientras escribes en un editor de código o en un campo de texto.</p>';

  /* ---------- barra flotante ---------- */
  var dock = h('div', { class: 'aula' }), tray = h('div', { class: 'tray' }), fab = h('button', { class: 'fab', type: 'button', 'aria-label': 'Herramientas de aula', 'aria-expanded': 'false' }, 'Aula');
  fab.onclick = function () { var o = dock.classList.toggle('open'); fab.setAttribute('aria-expanded', String(o)); };
  var btn = {};
  function add(id, label, key, fn) { var b = h('button', { type: 'button', 'aria-pressed': 'false' }, label + (key ? ' <kbd>' + key + '</kbd>' : '')); b.onclick = fn; btn[id] = b; tray.appendChild(b); return b; }
  add('nav', 'Menú', 'B', toggleNav); add('fs', 'Pantalla completa', 'F', fs); add('focus', 'Enfoque', 'M', toggleFocus);
  add('zm', 'A−', '−', function () { zoom(-10); }); btn.zoomv = h('button', { type: 'button' }, '100 %'); btn.zoomv.onclick = function () { S.zoom = 100; applyView(); }; tray.appendChild(btn.zoomv); add('zp', 'A+', '+', function () { zoom(10); });
  add('laser', 'Láser', 'L', toggleLaser); add('board', 'Pizarra', 'D', function () { board(); }); add('timer', 'Temporizador', 'T', toggleTimer);
  add('find', 'Ir a…', 'K', openFind); add('docente', 'Modo docente', '', docente); add('help', 'Atajos', '?', function () { help.m.classList.add('on'); });
  dock.appendChild(tray); dock.appendChild(fab); body.appendChild(dock);

  /* ---------- teclado ---------- */
  function typing(t) { return t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable); }
  function step(d) { var o = C.order(), cur = location.hash.slice(1), i = o.indexOf(cur); var n = o[i + d]; if (i < 0 && d > 0) n = o[0]; if (n) location.hash = n; }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { find.m.classList.remove('on'); help.m.classList.remove('on'); if (cv.classList.contains('on')) board(false); return; }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openFind(); return; }
    if (typing(e.target) || e.ctrlKey || e.metaKey || e.altKey) return;
    var k = e.key;
    if (k === 'b' || k === 'B') toggleNav(); else if (k === 'f' || k === 'F') fs(); else if (k === 'm' || k === 'M') toggleFocus();
    else if (k === '+' || k === '=') zoom(10); else if (k === '-' || k === '_') zoom(-10); else if (k === '0') { S.zoom = 100; applyView(); }
    else if (k === 'l' || k === 'L') toggleLaser(); else if (k === 'd' || k === 'D') board(); else if (k === 't' || k === 'T') toggleTimer();
    else if (k === 'k' || k === 'K') { e.preventDefault(); openFind(); } else if (k === '?') help.m.classList.add('on');
    else if (k === 'ArrowLeft' && !cv.classList.contains('on')) step(-1); else if (k === 'ArrowRight' && !cv.classList.contains('on')) step(1);
  });
  applyView();
})();
