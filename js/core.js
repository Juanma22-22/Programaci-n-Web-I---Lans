/* Motor del aula: navegación, progreso y componentes interactivos reutilizables. */
(function () {
  'use strict';
  var C = window.Course, B = {}, U = (C.ui = {}), cleanups = [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) { if (k === 'class') e.className = attrs[k]; else e.setAttribute(k, attrs[k]); }
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem('cw1:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem('cw1:' + k, JSON.stringify(v)); } catch (e) {} }
  };
  var mem = {};
  function J(x) { return JSON.stringify(x).replace(/</g, '\\u003c'); }

  /* ---------- resaltado de sintaxis ---------- */
  var KW = {
    js: 'const|let|var|function|return|if|else|for|while|of|in|new|class|extends|async|await|try|catch|throw|import|export|from|default|true|false|null|undefined|this|interface|type|implements|public|private|static|void|string|number|boolean|switch|case|break|typeof',
    java: 'public|class|static|void|int|double|String|boolean|if|else|for|while|return|new|extends|implements|private|protected|import|package|this|super|final|null|true|false|abstract|interface|char|long|ArrayList|List|Scanner|System',
    sql: 'SELECT|FROM|WHERE|INNER|JOIN|LEFT|ON|CREATE|TABLE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|PRIMARY|KEY|FOREIGN|REFERENCES|NOT|NULL|AND|OR|ORDER|BY|GROUP|AUTO_INCREMENT|VARCHAR|INT|DECIMAL|DATABASE|USE|AS|COUNT|AVG|DESC|ASC|LIMIT|UNIQUE|DEFAULT|DATE',
    bash: 'git|npm|node|cd|mkdir|java|mvn|echo|checkout|commit|push|pull|merge|branch|add|init|status|log|clone|run|install',
    yaml: 'name|on|jobs|runs-on|steps|uses|with|run|push|branches|env|needs|if'
  };
  function hl(code, lang) {
    var s = esc(code), l = lang || 'html';
    if (l === 'text') return s;
    if (l === 'html') return s.replace(/(&lt;!--[\s\S]*?--&gt;)|("[^"\n]*"|'[^'\n]*')|(&lt;\/?[a-zA-Z][\w-]*)|([\w:@-]+)(?==)/g, function (m, c, st, tg, at) {
      return c ? '<i class="k-c">' + c + '</i>' : st ? '<i class="k-s">' + st + '</i>' : tg ? '<i class="k-t">' + tg + '</i>' : '<i class="k-a">' + at + '</i>'; });
    if (l === 'css') return s.replace(/(\/\*[\s\S]*?\*\/)|("[^"\n]*"|'[^'\n]*')|(@[\w-]+)|(#[0-9a-fA-F]{3,8}\b)|(\b\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|s|ms|fr|deg)?\b)|([a-z-]+)(?=\s*:\s*[^;{}]*;)/g, function (m, c, st, at, hx, n, p) {
      return c ? '<i class="k-c">' + c + '</i>' : st ? '<i class="k-s">' + st + '</i>' : at ? '<i class="k-t">' + at + '</i>' : hx ? '<i class="k-n">' + hx + '</i>' : n ? '<i class="k-n">' + n + '</i>' : '<i class="k-a">' + p + '</i>'; });
    var kw = KW[l] || KW.js, com = (l === 'sql') ? '--[^\\n]*' : (l === 'bash' || l === 'yaml') ? '#[^\\n]*' : '\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/';
    var re = new RegExp('(' + com + ')|(`[^`]*`|"[^"\\n]*"|\'[^\'\\n]*\')|\\b(' + kw + ')\\b|(\\b\\d+(?:\\.\\d+)?\\b)', l === 'sql' ? 'gi' : 'g');
    return s.replace(re, function (m, c, st, k, n) {
      return c ? '<i class="k-c">' + c + '</i>' : st ? '<i class="k-s">' + st + '</i>' : k ? '<i class="k-k">' + k + '</i>' : '<i class="k-n">' + n + '</i>'; });
  }
  function copy(text, btn) {
    var done = function () { var o = btn.textContent; btn.textContent = 'Copiado'; setTimeout(function () { btn.textContent = o; }, 1200); };
    var fb = function () { var t = el('textarea'); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); done(); } catch (e) {} t.remove(); };
    try { navigator.clipboard.writeText(text).then(done, fb); } catch (e) { fb(); }
  }
  function every(fn, ms) { var t = setInterval(fn, ms); cleanups.push(function () { clearInterval(t); }); return t; }
  U.el = el; U.esc = esc; U.hl = hl; U.store = store; U.$ = $; U.$$ = $$; U.copy = copy; U.every = every; U.cleanup = function (f) { cleanups.push(f); };

  /* ---------- bloques simples ---------- */
  B.h = function (b, x) { return el('h2', { class: 'sec', id: 's' + x.n }, esc(b.text) + (b.min ? '<span class="mn">' + b.min + ' min</span>' : '')); };
  B.sub = function (b) { return el('h3', { class: 'sub' }, b.html || esc(b.text)); };
  B.p = function (b) { var d = el('div'); d.innerHTML = b.html; return d; };
  B.note = function (b) { var k = b.kind || 'key', lab = { tip: 'Consejo', warn: 'Ojo', key: 'Idea clave', mision: 'Misión del estudiante' }[k]; return el('div', { class: 'note ' + k }, '<b class="nt">' + (b.title || lab) + '</b>' + b.html); };
  B.cards = function (b) { return el('div', { class: 'cards' }, b.items.map(function (i) { return '<div><h4>' + i.h + '</h4>' + i.html + '</div>'; }).join('')); };
  B.table = function (b) {
    var h = '<div class="tbl"><table>' + (b.head ? '<thead><tr>' + b.head.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr></thead>' : '') + '<tbody>' +
      b.rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
    return el('div', null, h);
  };
  B.ana = function (b) {
    return el('div', { class: 'ana' }, '<h4>' + (b.title || 'Analogía') + '</h4>' + (b.intro ? '<div class="in">' + b.intro + '</div>' : '') +
      b.rows.map(function (r) { return '<div class="r"><b>' + r[0] + '</b><span>' + r[1] + '</span></div>'; }).join(''));
  };
  B.code = function (b) {
    var w = el('div', { class: 'codebox' }), bar = el('div', { class: 'codebar' }, '<span>' + esc(b.title || (b.lang || 'html').toUpperCase()) + '</span>');
    var btn = el('button', null, 'Copiar'); btn.onclick = function () { copy(b.code, btn); }; bar.appendChild(btn); w.appendChild(bar);
    w.appendChild(el('pre', { class: 'code' }, hl(b.code, b.lang))); return w;
  };
  B.steps = function (b, x) {
    var key = 'st:' + x.lid + ':' + x.n, s = store.get(key, []), w = el('div', { class: 'steps' });
    b.items.forEach(function (it, i) {
      var d = el('div', { class: 'step' + (s.indexOf(i) > -1 ? ' x' : '') });
      var cb = el('input', { type: 'checkbox', 'aria-label': 'Paso completado' }); cb.checked = s.indexOf(i) > -1;
      cb.onchange = function () { var k = s.indexOf(i); if (cb.checked && k < 0) s.push(i); if (!cb.checked && k > -1) s.splice(k, 1); store.set(key, s); d.classList.toggle('x', cb.checked); };
      var bd = el('div', { class: 'bd' }, '<h4>' + it.t + '</h4>' + (it.html || ''));
      if (it.code) bd.appendChild(B.code({ code: it.code, lang: it.lang || 'bash', title: it.ct }));
      d.appendChild(cb); d.appendChild(bd); w.appendChild(d);
    });
    return w;
  };
  B.check = function (b, x) {
    var key = 'ck:' + x.lid + ':' + x.n, s = store.get(key, []), w = el('div', { class: 'ckw' }, b.title ? '<h4>' + b.title + '</h4>' : ''), p = el('div', { class: 'ckp' });
    function upd() { p.textContent = s.length + ' de ' + b.items.length + ' requisitos cumplidos'; }
    b.items.forEach(function (t, i) {
      var l = el('label', { class: 'ck' + (s.indexOf(i) > -1 ? ' x' : '') }), cb = el('input', { type: 'checkbox' }); cb.checked = s.indexOf(i) > -1;
      cb.onchange = function () { var k = s.indexOf(i); if (cb.checked && k < 0) s.push(i); if (!cb.checked && k > -1) s.splice(k, 1); store.set(key, s); l.classList.toggle('x', cb.checked); upd(); };
      l.appendChild(cb); l.appendChild(el('span', null, t)); w.appendChild(l);
    });
    upd(); w.appendChild(p); return w;
  };
  B.quiz = function (b, x) {
    var w = el('div', { class: 'quiz' }), sc = 0, an = 0, res = el('p', { class: 'hint' });
    b.qs.forEach(function (q, i) {
      var d = el('div', { class: 'q' }, '<b>' + (i + 1) + '. ' + q[0] + '</b>');
      q[1].forEach(function (o, j) {
        var btn = el('button', null, o);
        btn.onclick = function () {
          if (d.dataset.done) return; d.dataset.done = 1; an++;
          if (j === q[2]) { sc++; btn.classList.add('ok'); } else { btn.classList.add('no'); d.querySelectorAll('button')[q[2]].classList.add('ok'); }
          d.appendChild(el('p', null, q[3] || ''));
          if (an === b.qs.length) { res.textContent = 'Resultado: ' + sc + ' de ' + b.qs.length + ' · nota ' + (sc / b.qs.length * 5).toFixed(1) + ' / 5.0'; store.set('quiz:' + x.lid + ':' + x.n, sc); }
        };
        d.appendChild(btn);
      });
      w.appendChild(d);
    });
    w.appendChild(res); return w;
  };
  B.hot = function (b) {
    var w = el('div', { class: 'hot' }), pre = el('pre'), nb = el('div', { class: 'nb' }, b.empty || 'Pasa el cursor (o toca) una parte del código para ver qué hace.'), spans = [];
    b.parts.forEach(function (p) {
      var s = el('span', p[1] == null ? null : { class: 'h' }, esc(p[0]));
      if (p[1] != null) {
        var on = function () { spans.forEach(function (q) { q.classList.remove('on'); }); $$('span[data-n="' + p[1] + '"]', pre).forEach(function (q) { q.classList.add('on'); }); var n = b.notes[p[1]]; nb.innerHTML = '<b>' + n[0] + '</b><br>' + n[1]; };
        s.setAttribute('data-n', p[1]); s.onmouseenter = on; s.onclick = on; s.tabIndex = 0; s.onfocus = on; spans.push(s);
      }
      pre.appendChild(s);
    });
    w.appendChild(pre); w.appendChild(nb); return w;
  };
  B.custom = function (b, x) { var w = el('div', { class: 'custom' }); b.build(w, x, U); return w; };

  /* ---------- inspector estilo F12 ---------- */
  B.inspect = function (b) {
    var w = el('div', { class: 'cols' }), left = el('div'), wrap = el('div', { style: 'position:relative' }), host = el('div', { class: 'stagebox' }), tip = el('div', { class: 'tip' }), tree = el('div', { class: 'tree' });
    var sh = host.attachShadow({ mode: 'open' });
    sh.innerHTML = '<style>:host{display:block}.__r *{box-sizing:border-box}' + (b.css || '') + '[data-hl]{outline:2px solid #3B82F6!important;background:rgba(59,130,246,.22)!important}.__r.all div{outline:1px dashed #B7862A}</style><div class="__r">' + b.html + '</div>';
    var root = sh.querySelector('.__r'), els = [];
    function lab(e) { return e.tagName.toLowerCase() + (e.getAttribute('class') ? ' class="' + e.getAttribute('class') + '"' : '') + (e.id ? ' id="' + e.id + '"' : ''); }
    function build(e, d) { var h = ''; for (var i = 0; i < e.children.length; i++) { var c = e.children[i], n = els.push(c) - 1; c.setAttribute('data-i', n); h += '<div class="row" data-i="' + n + '" style="padding-left:' + d * 16 + 'px">' + esc('<' + lab(c) + '>') + '</div>' + build(c, d + 1); } return h; }
    tree.innerHTML = build(root, 0);
    function clear() { els.forEach(function (e) { e.removeAttribute('data-hl'); }); $$('.on', tree).forEach(function (r) { r.classList.remove('on'); }); tip.style.opacity = 0; }
    function show(n) {
      clear(); var e = els[n]; e.setAttribute('data-hl', ''); var row = $('[data-i="' + n + '"]', tree); row.classList.add('on'); row.scrollIntoView({ block: 'nearest' });
      var r = e.getBoundingClientRect(), s = wrap.getBoundingClientRect();
      tip.textContent = e.tagName.toLowerCase() + (e.classList[0] ? '.' + e.classList[0] : '') + '  ' + Math.round(r.width) + ' × ' + Math.round(r.height) + '  ' + getComputedStyle(e).display;
      tip.style.left = Math.max(0, r.left - s.left) + 'px'; tip.style.top = Math.max(0, r.top - s.top - 24) + 'px'; tip.style.opacity = 1;
    }
    sh.addEventListener('mouseover', function (e) { var t = e.target.closest ? e.target.closest('[data-i]') : null; if (t && t.getAttribute('data-i') != null) show(+t.getAttribute('data-i')); });
    tree.onmouseover = function (e) { var t = e.target.closest('.row'); if (t) show(+t.dataset.i); };
    host.onmouseleave = tree.onmouseleave = clear;
    wrap.appendChild(host); wrap.appendChild(tip); left.appendChild(wrap);
    var lb = el('label', { class: 'hint' }, '<input type="checkbox"> ' + (b.allLabel || 'Mostrar el contorno de todas las cajas'));
    lb.firstChild.onchange = function () { root.classList.toggle('all', this.checked); };
    left.appendChild(lb); w.appendChild(left);
    var right = el('div'); right.appendChild(tree); right.appendChild(el('p', { class: 'hint' }, b.hint || 'Es la vista de la pestaña Elementos del navegador. Pasa el cursor sobre una línea del árbol y la caja se resalta.')); w.appendChild(right);
    return w;
  };

  /* ---------- panel con controles que cambian la vista ---------- */
  B.play = function (b) {
    var w = el('div', { class: 'play' }), vals = {}, outs = {};
    w.appendChild(el('h4', null, b.title || 'Prueba los controles'));
    if (b.intro) w.appendChild(el('p', { class: 'hint' }, b.intro));
    var ctl = el('div', { class: 'ctl' });
    b.controls.forEach(function (c) {
      vals[c.k] = c.val; var l = el('label'), o = el('output', null, c.type === 'toggle' ? '' : c.val + (c.unit || ''));
      if (c.type === 'range') {
        l.innerHTML = c.label + ' '; l.appendChild(o); var r = el('input', { type: 'range', min: c.min, max: c.max, step: c.step || 1 }); r.value = c.val;
        r.oninput = function () { vals[c.k] = r.value; o.textContent = r.value + (c.unit || ''); draw(); }; l.appendChild(r);
      } else if (c.type === 'select') {
        l.textContent = c.label; var s = el('select'); c.opts.forEach(function (op) { var oe = el('option', { value: op }, op); if (op === c.val) oe.selected = true; s.appendChild(oe); });
        s.onchange = function () { vals[c.k] = s.value; draw(); }; l.appendChild(s);
      } else {
        l.className = 'tg'; var cb = el('input', { type: 'checkbox' }); cb.checked = !!c.val; vals[c.k] = cb.checked ? (c.on || 1) : (c.off || 0);
        cb.onchange = function () { vals[c.k] = cb.checked ? (c.on || 1) : (c.off || 0); draw(); }; l.appendChild(cb); l.appendChild(document.createTextNode(c.label));
      }
      ctl.appendChild(l);
    });
    w.appendChild(ctl);
    var pv = el('div', { class: 'pv' }), host = el('div'), sh = host.attachShadow({ mode: 'open' }), cd = el('div'), ro = el('div', { class: 'hint' });
    pv.appendChild(host); w.appendChild(pv); if (b.readout) w.appendChild(ro); if (b.showCss !== false) w.appendChild(cd);
    function tpl(s) { return String(s).replace(/\{\{(\w+)\}\}/g, function (m, k) { return vals[k]; }); }
    function draw() {
      var css = tpl(typeof b.css === 'function' ? b.css(vals) : b.css), html = typeof b.html === 'function' ? b.html(vals) : tpl(b.html);
      sh.innerHTML = '<style>:host{display:block}' + (b.base || '') + css + '</style>' + html;
      if (b.showCss !== false) { cd.innerHTML = ''; cd.appendChild(B.code({ code: css.replace(/;\s*/g, ';\n').replace(/\{\s*/g, '{\n').replace(/\}\s*/g, '}\n').replace(/\n+/g, '\n').trim(), lang: 'css', title: 'CSS generado' })); }
      if (b.readout) ro.innerHTML = b.readout(vals, sh);
    }
    draw(); return w;
  };

  /* ---------- seguimiento paso a paso de un algoritmo ---------- */
  B.trace = function (b) {
    var w = el('div', { class: 'play' }), i = -1, lines = b.code.split('\n');
    w.appendChild(el('h4', null, b.title || 'Seguimiento paso a paso'));
    var g = el('div', { class: 'cols' }), cb = el('div', { class: 'mono-box' }), side = el('div'), vt = el('div', { class: 'panel' }), ot = el('div', { class: 'panel' }), nt = el('div', { class: 'hint' });
    side.appendChild(vt); side.appendChild(ot); side.appendChild(nt); g.appendChild(cb); g.appendChild(side); w.appendChild(g);
    var bar = el('div', { class: 'seg' }); ['Reiniciar', 'Anterior', 'Siguiente'].forEach(function (t, k) { var bt = el('button', { class: k === 2 ? 'on' : '' }, t); bt.onclick = function () { if (k === 0) i = -1; if (k === 1) i = Math.max(-1, i - 1); if (k === 2) i = Math.min(b.steps.length - 1, i + 1); draw(); }; bar.appendChild(bt); });
    w.appendChild(bar);
    function draw() {
      var s = b.steps[i] || { l: 0, vars: {}, out: '', note: 'Pulsa “Siguiente” para ejecutar la primera línea.' };
      cb.innerHTML = lines.map(function (t, k) { return '<span class="' + (k + 1 === s.l ? 'ln-hl' : '') + '" style="display:block"><span style="color:var(--kc)">' + String(k + 1).padStart(2, ' ') + '  </span>' + (esc(t) || ' ') + '</span>'; }).join('');
      var vs = Object.keys(s.vars || {});
      vt.innerHTML = '<h4>Variables</h4>' + (vs.length ? '<table style="font-size:14px">' + vs.map(function (k) { return '<tr><td><code>' + esc(k) + '</code></td><td>= <b>' + esc(s.vars[k]) + '</b></td></tr>'; }).join('') + '</table>' : '<span class="hint">Aún no hay variables.</span>');
      ot.innerHTML = '<h4>Salida</h4><pre class="mono" style="margin:0;white-space:pre-wrap">' + esc(s.out || '(vacía)') + '</pre>';
      nt.innerHTML = s.note || '';
    }
    draw(); return w;
  };

  /* ---------- vista previa a distintos anchos ---------- */
  B.device = function (b, x) {
    var w = el('div', { class: 'play' }), id = 'dv' + x.n + Math.random().toString(36).slice(2, 6);
    w.appendChild(el('h4', null, b.title || 'Cambia el ancho de pantalla'));
    var ctl = el('div', { class: 'ctl' }), o = el('output', null), r = el('input', { type: 'range', min: 300, max: 1100, step: 10 }); r.value = 360; r.setAttribute('aria-label', 'Ancho de pantalla');
    var l = el('label', null, 'Ancho '); l.appendChild(o); l.appendChild(r); ctl.appendChild(l);
    (b.presets || [['Celular', 360], ['Tablet', 768], ['Portátil', 1024]]).forEach(function (p) { var bt = el('button', { class: 'btn' }, p[0] + ' ' + p[1]); bt.onclick = function () { r.value = p[1]; set(); }; ctl.appendChild(bt); });
    w.appendChild(ctl);
    var dev = el('div', { class: 'dev' }), f = el('iframe', { sandbox: 'allow-scripts', title: 'Vista previa responsive' }); f.style.height = (b.height || 420) + 'px'; dev.appendChild(f); w.appendChild(dev);
    var ro = el('div', { class: 'hint' }); w.appendChild(ro);
    f.srcdoc = '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>' + b.css + '</style></head><body>' + b.html + '<script>function s(){parent.postMessage({dv:"' + id + '",w:innerWidth},"*")}addEventListener("resize",s);addEventListener("load",s)<\/script></body></html>';
    function set() { f.style.width = (+r.value + 12) + 'px'; o.textContent = r.value + ' px'; }
    var h = function (e) { if (e.data && e.data.dv === id) { var bp = '', list = b.bps || []; list.forEach(function (q) { if (e.data.w >= q[0]) bp = q[1]; }); ro.innerHTML = 'Ancho real del contenido: <b>' + e.data.w + ' px</b>' + (list.length ? ' · punto de quiebre activo: <b>' + (bp || 'base (móvil)') + '</b>' : ''); } };
    window.addEventListener('message', h); cleanups.push(function () { window.removeEventListener('message', h); });
    r.oninput = set; set(); return w;
  };

  /* ---------- terminal Git simulada ---------- */
  B.gitsim = function (b) {
    var S = { init: false, remote: false, wt: (b.files || ['index.html', 'styles.css']).slice(), staged: [], br: {}, head: 'main', commits: {}, n: 0, pushed: {}, log: [] };
    var w = el('div', { class: 'play' }), term = el('div', { class: 'term' }), out = el('div'), form = el('form'), inp = el('input', { 'aria-label': 'Comando', autocomplete: 'off', spellcheck: 'false' });
    w.appendChild(el('h4', null, b.title || 'Terminal Git (simulada)'));
    w.appendChild(el('p', { class: 'hint' }, 'Escribe comandos reales de Git. Usa <code>edit archivo</code> para simular que modificas un archivo y <code>help</code> para ver la lista.'.replace(/<[^>]+>/g, '')));
    form.appendChild(el('span', { class: 'pr' }, '$')); form.appendChild(inp); term.appendChild(out); term.appendChild(form);
    var g = el('div', { class: 'cols' }), side = el('div'), gp = el('div', { class: 'panel' }), mk = el('div', { class: 'ckw' });
    side.appendChild(gp); side.appendChild(mk); g.appendChild(term); g.appendChild(side); w.appendChild(g);
    var missions = b.missions || [
      ['Inicializa el repositorio (git init)', function (s) { return s.init; }],
      ['Haz tu primer commit en main', function (s) { return !!s.br.main; }],
      ['Crea y cambia a la rama feat-modo-oscuro', function (s) { return !!s.br['feat-modo-oscuro']; }],
      ['Haz un commit dentro de feat-modo-oscuro', function (s) { return Object.keys(s.commits).some(function (k) { return s.commits[k].on === 'feat-modo-oscuro'; }); }],
      ['Vuelve a main y fusiona la rama (git merge)', function (s) { var ids = Object.keys(s.commits); return ids.some(function (k) { return s.commits[k].merged; }) || (s.br.main && s.br.main === s.br['feat-modo-oscuro'] && Object.keys(s.commits).length > 1); }],
      ['Conecta el remoto y haz push de main', function (s) { return s.remote && !!s.pushed.main; }]
    ];
    function print(t, cls) { out.appendChild(el('div', { class: 'l ' + (cls || '') }, esc(t))); term.scrollTop = term.scrollHeight; }
    function short(id) { return id ? id : '(sin commits)'; }
    function anc(id) { var set = {}, st = [id]; while (st.length) { var c = st.pop(); if (!c || set[c]) continue; set[c] = 1; (S.commits[c].parents || []).forEach(function (p) { st.push(p); }); } return set; }
    function newId(msg) { S.n++; var h = 0, s = msg + S.n; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return ('0000000' + h.toString(16)).slice(-7); }
    function draw() {
      var ids = Object.keys(S.commits).sort(function (a, c) { return S.commits[c].n - S.commits[a].n; });
      gp.innerHTML = '<h4>Historial (HEAD en <b>' + esc(S.head) + '</b>)</h4>' + (ids.length ? ids.map(function (id) {
        var tags = Object.keys(S.br).filter(function (k) { return S.br[k] === id; }).map(function (k) { return '<span class="pill ' + (k === S.head ? 'ok' : '') + '">' + esc(k) + (k === S.head ? ' ← HEAD' : '') + '</span>'; }).join(' ');
        return '<div class="mono" style="padding:2px 0">● ' + id + ' ' + esc(S.commits[id].msg) + ' ' + tags + '</div>'; }).join('') : '<span class="hint">Todavía no hay commits.</span>') +
        '<div class="hint">Cambios sin preparar: ' + (S.wt.join(', ') || 'ninguno') + '<br>En staging: ' + (S.staged.join(', ') || 'ninguno') + '</div>';
      mk.innerHTML = '<h4>Misiones</h4>'; var ok = 0;
      missions.forEach(function (m) { var d = !!m[1](S); if (d) ok++; mk.appendChild(el('div', { class: 'ck' + (d ? ' x' : '') }, '<span>' + (d ? '✓ ' : '○ ') + esc(m[0]) + '</span>')); });
      mk.appendChild(el('div', { class: 'ckp' }, ok + ' de ' + missions.length + ' misiones'));
    }
    function run(line) {
      print('$ ' + line, 'pr'); var a = line.trim().split(/\s+/); if (!a[0]) return;
      if (a[0] === 'clear') { out.innerHTML = ''; return; }
      if (a[0] === 'help') { print('Comandos: git init · git status · git add . · git commit -m "msg" · git branch [nombre] · git checkout [-b] nombre · git merge nombre · git log --oneline · git remote add origin URL · git push origin rama · edit archivo · clear'); return; }
      if (a[0] === 'edit') { var f = a[1]; if (!f) return print('Uso: edit archivo', 'er'); if (S.wt.indexOf(f) < 0) S.wt.push(f); print('Modificaste ' + f); return; }
      if (a[0] !== 'git') return print('Comando no reconocido. Escribe help.', 'er');
      var c = a[1];
      if (c === 'init') { S.init = true; S.br.main = null; S.head = 'main'; return print('Initialized empty Git repository'); }
      if (!S.init) return print('fatal: not a git repository. Ejecuta primero: git init', 'er');
      if (c === 'status') {
        print('On branch ' + S.head); if (S.staged.length) print('Changes to be committed:\n  ' + S.staged.join('\n  ')); if (S.wt.length) print('Changes not staged for commit:\n  ' + S.wt.join('\n  '));
        if (!S.staged.length && !S.wt.length) print('nothing to commit, working tree clean'); return;
      }
      if (c === 'add') { var t = a[2]; if (!t) return print('Nothing specified, nothing added.', 'er'); if (t === '.') { S.staged = S.staged.concat(S.wt.filter(function (x) { return S.staged.indexOf(x) < 0; })); S.wt = []; } else if (S.wt.indexOf(t) > -1) { S.staged.push(t); S.wt.splice(S.wt.indexOf(t), 1); } else return print("fatal: pathspec '" + t + "' did not match any files", 'er'); return; }
      if (c === 'commit') {
        var m = line.match(/-a?m\s+["'](.+)["']/); if (/-am/.test(line)) { S.staged = S.staged.concat(S.wt); S.wt = []; }
        if (!m) return print('Falta el mensaje: git commit -m "mensaje"', 'er'); if (!S.staged.length) return print('nothing to commit (usa git add primero)', 'er');
        var id = newId(m[1]), par = S.br[S.head]; S.commits[id] = { msg: m[1], parents: par ? [par] : [], n: S.n, on: S.head }; S.br[S.head] = id; var cnt = S.staged.length; S.staged = [];
        return print('[' + S.head + ' ' + id + '] ' + m[1] + '\n ' + cnt + ' file(s) changed');
      }
      if (c === 'branch') { if (!a[2]) { return print(Object.keys(S.br).map(function (k) { return (k === S.head ? '* ' : '  ') + k; }).join('\n')); } if (!S.br.main) return print('Haz un commit antes de crear ramas.', 'er'); S.br[a[2]] = S.br[S.head]; return print('Rama ' + a[2] + ' creada'); }
      if (c === 'checkout' || c === 'switch') {
        var nb = a[2] === '-b' ? a[3] : a[2]; if (!nb) return print('Indica la rama', 'er');
        if (a[2] === '-b' || (c === 'switch' && a[2] === '-c')) { if (!S.br.main) return print('Haz un commit antes de crear ramas.', 'er'); nb = a[3]; S.br[nb] = S.br[S.head]; S.head = nb; return print("Switched to a new branch '" + nb + "'"); }
        if (!(nb in S.br)) return print("error: no existe la rama '" + nb + "'", 'er'); S.head = nb; return print("Switched to branch '" + nb + "'");
      }
      if (c === 'merge') {
        var tb = a[2]; if (!(tb in S.br)) return print("merge: no existe la rama '" + tb + "'", 'er'); var h = S.br[S.head], t2 = S.br[tb];
        if (h === t2 || anc(h)[t2]) return print('Already up to date.');
        if (!h || anc(t2)[h]) { S.br[S.head] = t2; return print('Fast-forward'); }
        var mid = newId('merge'); S.commits[mid] = { msg: "Merge branch '" + tb + "'", parents: [h, t2], n: S.n, merged: true }; S.br[S.head] = mid; return print("Merge made by the 'ort' strategy.");
      }
      if (c === 'log') { var ids = Object.keys(anc(S.br[S.head] || '')).filter(Boolean).sort(function (x, y) { return S.commits[y].n - S.commits[x].n; }); if (!ids.length) return print('No hay commits todavía.'); return print(ids.map(function (id) { return id + ' ' + S.commits[id].msg; }).join('\n')); }
      if (c === 'remote') { S.remote = true; return print('Remoto origin configurado.'); }
      if (c === 'push') { if (!S.remote) return print("fatal: no hay remoto. Usa: git remote add origin URL", 'er'); var bn = a[3] || S.head; if (!S.br[bn]) return print('error: nada que enviar en ' + bn, 'er'); S.pushed[bn] = S.br[bn]; return print('To github.com:usuario/repositorio.git\n * ' + bn + ' -> ' + bn); }
      print("git: '" + c + "' no está en esta simulación. Escribe help.", 'er');
    }
    form.onsubmit = function (e) { e.preventDefault(); var v = inp.value; inp.value = ''; run(v); draw(); };
    print('Repositorio vacío. Archivos con cambios: ' + S.wt.join(', ')); draw(); return w;
  };

  /* ---------- laboratorio: editor, vista previa y pruebas automáticas ---------- */
  function mockFetchInit(FAIL) {
    var A = 'https://rickandmortyapi.com/api/character/avatar/';
    var CH = [[1, 'Rick Sanchez', 'Alive', 'Human', 'Male'], [2, 'Morty Smith', 'Alive', 'Human', 'Male'], [3, 'Summer Smith', 'Alive', 'Human', 'Female'], [4, 'Beth Smith', 'Alive', 'Human', 'Female'], [5, 'Jerry Smith', 'Alive', 'Human', 'Male'], [6, 'Abadango Cluster Princess', 'Alive', 'Alien', 'Female'], [7, 'Abradolf Lincler', 'unknown', 'Human', 'Male'], [8, 'Adjudicator Rick', 'Dead', 'Human', 'Male']].map(function (r) { return { id: r[0], name: r[1], status: r[2], species: r[3], gender: r[4], image: A + r[0] + '.jpeg' }; });
    var LO = [{ id: 1, name: 'Earth (C-137)', type: 'Planet', dimension: 'Dimension C-137' }, { id: 2, name: 'Abadango', type: 'Cluster', dimension: 'unknown' }, { id: 3, name: 'Citadel of Ricks', type: 'Space station', dimension: 'unknown' }];
    var EP = [{ id: 1, name: 'Pilot', air_date: 'December 2, 2013', episode: 'S01E01' }, { id: 2, name: 'Lawnmower Dog', air_date: 'December 9, 2013', episode: 'S01E02' }, { id: 3, name: 'Anatomy Park', air_date: 'December 16, 2013', episode: 'S01E03' }];
    window.fetch = function (url) {
      return new Promise(function (res, rej) {
        setTimeout(function () {
          if (FAIL) { rej(new TypeError('Failed to fetch')); return; }
          var u = String(url), m = u.match(/\/api\/(character|location|episode)(?:\/(\d+))?\/?(?:\?(.*))?$/), st = 200, body;
          if (!m) { st = 404; body = { error: 'Endpoint no encontrado' }; }
          else {
            var set = m[1] === 'character' ? CH : m[1] === 'location' ? LO : EP;
            if (m[2]) { var f = set.filter(function (x) { return x.id === +m[2]; })[0]; if (f) body = f; else { st = 404; body = { error: 'Not found' }; } }
            else {
              var q = (m[3] || '').match(/name=([^&]*)/), r = set;
              if (q) { var t = decodeURIComponent(q[1]).toLowerCase(); r = set.filter(function (x) { return x.name.toLowerCase().indexOf(t) > -1; }); }
              if (!r.length) { st = 404; body = { error: 'There is nothing here' }; } else body = { info: { count: r.length, pages: 1, next: null, prev: null }, results: r };
            }
          }
          res({ ok: st < 400, status: st, statusText: st === 200 ? 'OK' : 'Not Found', json: function () { return Promise.resolve(body); } });
        }, 450);
      });
    };
  }
  function bootScript(id, seed, b, fail) {
    var s = '<script>(function(){var id=' + J(id) + ';window.__logs=[];function P(m){m.id=id;try{parent.postMessage(m,"*")}catch(e){}}' +
      'function fmt(a){return [].slice.call(a).map(function(x){try{return typeof x==="object"&&x!==null?JSON.stringify(x):String(x)}catch(e){return String(x)}}).join(" ")}' +
      '["log","info","warn","error"].forEach(function(n){var o=console[n];console[n]=function(){var t=fmt(arguments);if(n==="log"||n==="info")window.__logs.push(t);P({k:"log",l:n,t:t});try{o.apply(console,arguments)}catch(e){}}});' +
      'window.addEventListener("error",function(e){P({k:"log",l:"error",t:e.message+(e.lineno?" (línea "+e.lineno+")":"")})});' +
      'window.addEventListener("unhandledrejection",function(e){P({k:"log",l:"error",t:"Promesa rechazada: "+(e.reason&&e.reason.message||e.reason)})});' +
      'window.addEventListener("submit",function(e){if(!e.defaultPrevented)e.preventDefault()});' +
      '(function(){function mk(d,rep){var s=Object.assign({},d);return {getItem:function(k){return Object.prototype.hasOwnProperty.call(s,k)?s[k]:null},setItem:function(k,v){s[k]=String(v);if(rep)P({k:"store",d:s})},removeItem:function(k){delete s[k];if(rep)P({k:"store",d:s})},clear:function(){s={};if(rep)P({k:"store",d:s})},key:function(i){return Object.keys(s)[i]||null},get length(){return Object.keys(s).length}}}' +
      'try{window.localStorage.getItem("x")}catch(e){Object.defineProperty(window,"localStorage",{value:mk(' + J(seed) + ',true),configurable:true})}try{window.sessionStorage.getItem("x")}catch(e){Object.defineProperty(window,"sessionStorage",{value:mk({},false),configurable:true})}})();';
    if (b.mock) s += '(' + mockFetchInit.toString() + ')(' + (fail ? 'true' : 'false') + ');';
    if (b.prelude) s += b.prelude;
    return s + '})()<\/script>';
  }
  function harnessScript(tests, id, files) {
    var arr = tests.map(function (t) { return 'function(){try{return (' + t.f.toString() + ')()}catch(e){return false}}'; }).join(',');
    var FS = {}; files.forEach(function (f) { FS[f.name] = f.code; });
    var mn = files.filter(function (f) { return /\.html?$/i.test(f.name); })[0];
    return '<script>(function(){var id=' + J(id) + ',logs=window.__logs,FILES=' + J(FS) + ',SRC=' + J(mn ? mn.code : '') + ';var q=function(s){return document.querySelector(s)},qa=function(s){return [].slice.call(document.querySelectorAll(s))},cs=function(e,p){return e?getComputedStyle(e)[p]:""},px=function(v){return parseFloat(v)||0},txt=function(e){return e?e.textContent.trim():""};var T=[' + arr +
      '];var busy=false,again=false;function run(fin){if(busy){again=true;return}busy=true;var r=[],p=Promise.resolve();T.forEach(function(f,i){p=p.then(function(){return Promise.race([Promise.resolve().then(f),new Promise(function(ok){setTimeout(function(){ok(false)},4000)})]).then(function(x){r[i]=x?1:0},function(){r[i]=0})})});p.then(function(){busy=false;parent.postMessage({id:id,k:"res",fin:fin,r:r},"*");if(again){again=false;run(true)}})}window.addEventListener("load",function(){setTimeout(function(){run(false)},400);setTimeout(function(){run(true)},1800)});})()<\/script>';
  }
  function buildDoc(files, b, id, seed, fail) {
    var by = {}; files.forEach(function (f) { by[f.name.replace(/^\.\//, '')] = f; });
    var look = function (h) { return by[(h || '').replace(/^\.\//, '')]; };
    var main = files.filter(function (f) { return /\.html?$/i.test(f.name); })[0], html = main ? main.code : '', deferred = [];
    html = html.replace(/<link\b[^>]*>/gi, function (m) {
      if (!/rel\s*=\s*["']?stylesheet/i.test(m)) return m; var h = m.match(/href\s*=\s*["']([^"']+)["']/i); if (!h || /^(https?:)?\/\//.test(h[1])) return m;
      var f = look(h[1]); return f ? '<style>' + f.code + '</style>' : '<!-- No se encontró ' + h[1] + ' -->';
    });
    html = html.replace(/<script\b([^>]*?)\bsrc\s*=\s*["']([^"']+)["']([^>]*)>\s*<\/script>/gi, function (m, a, src, c) {
      if (/^(https?:)?\/\//.test(src)) return m; var f = look(src); if (!f) return '<!-- No se encontró ' + src + ' -->';
      var mod = /type\s*=\s*["']module/i.test(a + c) ? ' type="module"' : '', code = '<script' + mod + '>' + f.code.replace(/<\/script/gi, '<\\/script') + '<\/script>';
      if (/\bdefer\b/i.test(a + c) || mod) { deferred.push(code); return ''; } return code;
    });
    var boot = bootScript(id, seed, b, fail), mt, tail = deferred.join('') + (b.tests && b.tests.length ? harnessScript(b.tests, id, files) : '');
    if ((mt = html.match(/<head[^>]*>/i))) html = html.replace(mt[0], function () { return mt[0] + boot; });
    else if ((mt = html.match(/<html[^>]*>/i))) html = html.replace(mt[0], function () { return mt[0] + boot; });
    else if ((mt = html.match(/^\s*<!doctype[^>]*>/i))) html = html.replace(mt[0], function () { return mt[0] + boot; });
    else html = boot + html;
    var bi = html.toLowerCase().lastIndexOf('</body>');
    return bi > -1 ? html.slice(0, bi) + tail + html.slice(bi) : html + tail;
  }
  B.lab = function (b, x) {
    var id = x.lid + '/' + (b.id || x.n), saved = store.get('lab:' + id, null), cur = 0, seed = {}, fail = false, tests = b.tests || [], res = [], timer;
    var files = b.files.map(function (f) { return { name: f.name, ro: f.ro, start: f.code, code: saved && saved[f.name] != null ? saved[f.name] : f.code }; });
    var w = el('section', { class: 'lab' }); w.style.setProperty('--h', (b.height || 360) + 'px');
    w.appendChild(el('h3', null, b.title || 'Laboratorio')); if (b.intro) w.appendChild(el('p', { class: 'it' }, b.intro));
    var tabs = el('div', { class: 'tabs' }), ta = el('textarea', { spellcheck: 'false', 'aria-label': 'Editor de código', autocapitalize: 'off' }), ifr = el('iframe', { sandbox: 'allow-scripts allow-modals allow-forms', title: 'Vista previa' }), con = el('div', { class: 'con' });
    function drawTabs() {
      tabs.innerHTML = '';
      files.forEach(function (f, i) { var t = el('button', { class: i === cur ? 'on' : '' }, esc(f.name)); t.onclick = function () { cur = i; ta.value = files[i].code; ta.readOnly = !!files[i].ro; drawTabs(); }; tabs.appendChild(t); });
      tabs.appendChild(el('span', { class: 'sp' }));
      if (b.mock) { var lb = el('label', { class: 'opt' }, '<input type="checkbox"> Simular fallo de red'); lb.firstChild.checked = fail; lb.firstChild.onchange = function () { fail = this.checked; run(); }; tabs.appendChild(lb); }
      var rl = el('button', { class: 'ac' }, '↻ Recargar'); rl.title = 'Vuelve a cargar la página (el almacenamiento guardado se conserva)'; rl.onclick = run; tabs.appendChild(rl);
      var rs = el('button', { class: 'ac' }, 'Restablecer'); rs.onclick = function () { files.forEach(function (f) { f.code = f.start; }); seed = {}; ta.value = files[cur].code; persist(); run(); }; tabs.appendChild(rs);
    }
    function persist() { var o = {}; files.forEach(function (f) { o[f.name] = f.code; }); store.set('lab:' + id, o); }
    function run() { con.innerHTML = '<small>Consola de la vista previa</small>'; res = []; paint(); ifr.srcdoc = buildDoc(files, b, id, seed, fail); }
    ta.value = files[0].code; ta.readOnly = !!files[0].ro;
    ta.oninput = function () { files[cur].code = ta.value; persist(); clearTimeout(timer); timer = setTimeout(run, 450); };
    ta.onkeydown = function (e) { if (e.key === 'Tab' && !e.shiftKey) { e.preventDefault(); var s = ta.selectionStart; ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(ta.selectionEnd); ta.selectionStart = ta.selectionEnd = s + 2; ta.oninput(); } };
    drawTabs(); w.appendChild(tabs);
    var g = el('div', { class: 'gr' }), l = el('div'), r = el('div'); l.appendChild(ta); r.appendChild(ifr); r.appendChild(con); g.appendChild(l); g.appendChild(r); w.appendChild(g);
    var tl, sc;
    if (tests.length) {
      tl = el('ul', { class: 'tst' }); sc = el('div', { class: 'sc' }); w.appendChild(tl); w.appendChild(sc);
    }
    function paint() {
      if (!tests.length) return; var tot = 0, got = 0; tl.innerHTML = '';
      tests.forEach(function (t, i) { var p = t.pts || 1; tot += p; var ok = res[i] === 1; if (ok) got += p; tl.appendChild(el('li', { class: res.length ? (ok ? 'ok' : 'no') : '' }, esc(t.t) + (t.pts ? ' <span class="hint">(' + t.pts + ' pts)</span>' : ''))); });
      var pct = Math.round(got / tot * 100), all = got === tot && res.length;
      sc.innerHTML = '<span>' + (b.points ? 'Puntaje: ' + got + ' / ' + tot : 'Requisitos: ' + res.filter(Boolean).length + ' de ' + tests.length) + '</span><div class="bar"><i style="width:' + pct + '%"></i></div>' + (all ? '<span class="win">¡Completo!</span>' : '');
      if (all) store.set('labok:' + id, 1);
    }
    var onmsg = function (e) {
      var d = e.data; if (!d || d.id !== id || e.source !== ifr.contentWindow) return;
      if (d.k === 'log') { var ln = el('div', d.l === 'error' ? { class: 'e' } : null, esc(d.t)); con.appendChild(ln); while (con.children.length > 120) con.removeChild(con.children[1]); con.scrollTop = con.scrollHeight; }
      else if (d.k === 'store') { seed = d.d; }
      else if (d.k === 'res') { res = d.r; paint(); }
    };
    window.addEventListener('message', onmsg); cleanups.push(function () { window.removeEventListener('message', onmsg); clearTimeout(timer); });
    if (b.solution) {
      var dt = el('details', null, '<summary>Ver solución de referencia</summary>');
      b.solution.forEach(function (f) { dt.appendChild(B.code({ code: f.code, lang: f.lang || (/\.css$/.test(f.name) ? 'css' : /\.js$/.test(f.name) ? 'js' : 'html'), title: f.name })); });
      w.appendChild(dt);
    }
    paint(); setTimeout(run, 0); return w;
  };

  /* mocks y utilidades que usan las lecciones */
  U.mockFetchInit = mockFetchInit;

  /* ---------- navegación, inicio y lecciones ---------- */
  var main = $('#main'), navEl = $('#nav'), current = null;
  function doneSet() { return store.get('completed', []); }
  function drawNav() {
    var all = 0, mine = doneSet(), h = '', cnt = 0;
    C.modules.forEach(function (m) {
      h += '<h4>' + esc(m.name) + '</h4>';
      m.topics.forEach(function (t) {
        if (t.name) h += '<div class="tp">' + esc(t.name) + '</div>';
        t.lessons.forEach(function (l) {
          var id = l[0], st = C.done.indexOf(id) > -1 ? 'd' : id === C.cur ? 'c' : 'soon', me = mine.indexOf(id) > -1;
          if (id !== 'pia') { all++; if (me) cnt++; }
          h += '<a class="' + st + (id === current ? ' on' : '') + '" data-id="' + id + '" href="#' + id + '"><span class="st">' + (st === 'd' ? '✓' : st === 'c' ? '●' : '○') + '</span><span>' + esc(l[1]) + '</span>' + (me ? '<span class="me" title="Marcado por ti como completado">✔</span>' : '') + '</a>';
        });
      });
    });
    navEl.innerHTML = '<b>Tu avance</b><div class="bar"><i style="width:' + Math.round(cnt / all * 100) + '%"></i></div><div class="navp">' + cnt + ' de ' + all + ' temas marcados como completados</div>' +
      '<div class="navp">✓ visto en clase · ● estamos aquí · ○ próximamente</div>' + h;
  }
  function go(id) { try { if (location.hash.slice(1) !== id) location.hash = id; } catch (e) {} render(id); }
  navEl.addEventListener('click', function (e) { var a = e.target.closest('a'); if (a) { e.preventDefault(); go(a.dataset.id); document.body.classList.remove('m'); } });
  function cleanup() { cleanups.forEach(function (f) { try { f(); } catch (e) {} }); cleanups = []; }
  function home() {
    cleanup(); current = null; drawNav(); var cm = C.meta(C.cur), n = C.order().length - 1;
    main.innerHTML = '<section class="hero"><p class="kick">Universidad de Caldas · Facultad de Inteligencia Artificial e Ingenierías · Tecnología en Sistemas Informáticos</p><h1>Programación para Entornos Web 1</h1>' +
      '<p class="lead">Del navegador al despliegue: HTML5, CSS3, JavaScript y TypeScript, con cada concepto explicado y practicado en esta misma página.</p>' +
      '<div class="chips"><span class="chip">Código ' + C.code + '</span><span class="chip">4 créditos</span><span class="chip">48 h presenciales · 12 semanas</span><span class="chip">Teórico-práctica</span></div></section>' +
      '<div class="now"><div><b>Estamos aquí</b><br>' + esc(cm ? cm.title : '') + '<div class="hint">' + esc(cm ? cm.mod : '') + '</div></div><a class="btn pri" href="#' + C.cur + '" data-go="' + C.cur + '" style="text-decoration:none">Abrir la clase</a></div>' +
      '<h2 class="sec">Los seis módulos</h2><div class="mods">' + C.modules.filter(function (m) { return m.id !== 'pia'; }).map(function (m) {
        return '<div class="mod"><h3>' + esc(m.name) + '</h3>' + m.topics.map(function (t) { return t.lessons.map(function (l) { return '<a href="#' + l[0] + '" data-go="' + l[0] + '">' + (C.done.indexOf(l[0]) > -1 ? '✓ ' : l[0] === C.cur ? '● ' : '○ ') + esc(l[1]) + '</a>'; }).join(''); }).join('') + '</div>'; }).join('') + '</div>' +
      '<h2 class="sec">Mapa de las 12 semanas<span class="mn">propuesta</span></h2><div class="wk">' + C.weeks.map(function (w) { return '<div><b>' + w[0] + '</b>' + esc(w[1]) + '</div>'; }).join('') + '</div>' +
      '<p class="hint">Cada semana es una sesión de 4 horas. Las prácticas se guardan en tu navegador; si cambias de equipo empezarás desde cero.</p>';
    $$('[data-go]', main).forEach(function (a) { a.onclick = function (e) { e.preventDefault(); go(a.dataset.go); }; });
    window.scrollTo(0, 0);
  }
  function render(id) {
    var m = C.meta(id); if (!id || !m) { home(); return; }
    cleanup(); current = id; drawNav();
    var L = C.lessons[id], mine = doneSet(), h = '';
    main.innerHTML = '';
    var st = C.done.indexOf(id) > -1 ? '<span class="chip">Visto en clase</span>' : id === C.cur ? '<span class="chip go">Estamos aquí</span>' : '<span class="chip">Próximamente</span>';
    var mins = 0; ((L && L.blocks) || []).forEach(function (b) { if (b.t === 'h' && b.min) mins += b.min; });
    var kind = { tema: 'Tema', taller: 'Taller práctico', proy: 'Proyecto integrador', eval: 'Evaluación', doc: 'Documento' }[m.kind];
    main.appendChild(el('div', null, '<p class="kick">' + esc(m.mod) + (m.topic ? ' · ' + esc(m.topic) : '') + '</p><h1>' + esc(m.title) + '</h1>' + (L && L.lead ? '<p class="lead">' + L.lead + '</p>' : '') +
      '<div class="chips">' + st + '<span class="chip">' + kind + '</span>' + (mins ? '<span class="chip">' + Math.round(mins / 6) / 10 + ' h de contenido (' + mins + ' min)</span>' : '') + '</div>'));
    var ord = C.order(), locked = C.openUntil && id !== 'pia' && ord.indexOf(id) > ord.indexOf(C.openUntil);
    if (locked) {
      var hs = ((L && L.blocks) || []).filter(function (b) { return b.t === 'h'; });
      main.appendChild(el('div', { class: 'note key' }, '<b class="nt">Se habilita cuando lleguemos a este tema en clase</b><p>Todavía no está disponible. Esto es lo que vamos a practicar:</p>' + (hs.length ? '<ul>' + hs.map(function (b) { return '<li>' + esc(b.text) + '</li>'; }).join('') + '</ul>' : '')));
    }
    else if (!L) { main.appendChild(el('div', { class: 'note tip' }, '<b class="nt">En preparación</b>Esta clase todavía no tiene contenido publicado.')); }
    else {
      var secs = L.blocks.map(function (b, i) { return b.t === 'h' ? [i, b] : null; }).filter(Boolean);
      if (secs.length > 1) main.appendChild(el('div', { class: 'agenda' }, '<h3>Agenda de la clase</h3><ol>' + secs.map(function (s) { return '<li><a href="#" data-sec="s' + s[0] + '">' + esc(s[1].text) + '</a>' + (s[1].min ? '<span class="mn">' + s[1].min + ' min</span>' : '') + '</li>'; }).join('') + '</ol>'));
      $$('[data-sec]', main).forEach(function (a) { a.onclick = function (e) { e.preventDefault(); var t = document.getElementById(a.dataset.sec); if (t) t.scrollIntoView({ behavior: 'smooth' }); }; });
      L.blocks.forEach(function (b, i) { var f = B[b.t]; if (!f) return; try { main.appendChild(f(b, { lid: id, n: i })); } catch (err) { main.appendChild(el('div', { class: 'note warn' }, 'No se pudo mostrar un bloque (' + esc(b.t) + '): ' + esc(err.message))); } });
    }
    var dr = el('div', { class: 'done-row' }), bt = el('button', { class: 'btn' + (mine.indexOf(id) > -1 ? ' pri' : '') }, mine.indexOf(id) > -1 ? '✔ Completado' : 'Marcar este tema como completado');
    bt.onclick = function () { var s = doneSet(), k = s.indexOf(id); if (k > -1) s.splice(k, 1); else s.push(id); store.set('completed', s); render(id); };
    dr.appendChild(bt); main.appendChild(dr);
    var o = C.order(), i = o.indexOf(id), np = el('div', { class: 'nextprev' });
    if (i > 0) np.appendChild(el('a', { href: '#' + o[i - 1] }, '<small>← Anterior</small>' + esc(C.meta(o[i - 1]).title)));
    if (i < o.length - 1) np.appendChild(el('a', { href: '#' + o[i + 1], class: 'nx' }, '<small>Siguiente →</small>' + esc(C.meta(o[i + 1]).title)));
    $$('a', np).forEach(function (a) { a.onclick = function (e) { e.preventDefault(); go(a.getAttribute('href').slice(1)); }; });
    main.appendChild(np); window.scrollTo(0, 0);
  }
  $('#mb').onclick = function () { document.body.classList.toggle('m'); };
  $('#tb').onclick = function () { var r = document.documentElement, d = r.dataset.theme ? r.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme:dark)').matches; r.dataset.theme = d ? 'light' : 'dark'; };
  $('#brand').onclick = function () { try { location.hash = ''; } catch (e) {} home(); };
  window.addEventListener('hashchange', function () { var id = location.hash.slice(1); if (id !== current) render(id); });
  C.blocks = B; C.start = function () { var id = location.hash.slice(1); if (id && C.meta(id)) render(id); else home(); };
})();
