/* Módulo 2 · Ingeniería de interfaces, CSS3 y maquetación */
(function () {
  var C = Course;

  /* ===== 2.1a Sintaxis CSS ===== */
  C.add({
    id: '2.1a',
    lead: 'HTML es el esqueleto; CSS es la piel, la ropa y la postura. Aprendemos a hablarle al navegador en términos de selectores, propiedades y valores.',
    blocks: [
      { t: 'h', text: 'Qué es CSS y por qué se separa del HTML', min: 20 },
      { t: 'ana', title: 'Analogía: el guardarropa', rows: [
        ['El maniquí', 'El HTML: el cuerpo desnudo con estructura.'],
        ['El estilista', 'El CSS: decide colores, tallas y combinaciones sin tocar al maniquí.'],
        ['Cambiar de temporada', 'Reemplazas una sola hoja de estilos y todo el sitio se transforma.']] },
      { t: 'p', html: '<p><b>CSS</b> (<i>Cascading Style Sheets</i>) separa la <b>presentación</b> del <b>contenido</b>. Mantener ambas cosas aparte permite reutilizar el estilo en cien páginas, rediseñar sin tocar el HTML y que cada archivo tenga una sola responsabilidad.</p>' },
      { t: 'h', text: 'Anatomía de una regla', min: 20 },
      { t: 'hot', parts: [['h1', 0], [' ', null], ['{', 1], ['\n  ', null], ['color', 2], [':', 1], [' ', null], ['#1E5B43', 3], [';', 1], ['\n  ', null], ['font-size', 2], [':', 1], [' ', null], ['2rem', 3], [';', 1], ['\n', null], ['}', 1]],
        notes: [['Selector', 'Indica <b>a quién</b> se aplica la regla. Aquí, a todos los <code>&lt;h1&gt;</code>.'], ['Llaves y signos', 'Las llaves agrupan la declaración. Cada declaración usa <code>:</code> y termina con <code>;</code>.'], ['Propiedad', 'Qué característica vas a cambiar: color, tamaño de letra, margen…'], ['Valor', 'Cómo lo vas a cambiar: un color, una medida, una palabra clave.']] },
      { t: 'h', text: 'Tres formas de conectar CSS', min: 25 },
      { t: 'table', head: ['Forma', 'Dónde se escribe', 'Cuándo usarla'], rows: [
        ['En línea', '<code>&lt;p style="color:red"&gt;</code>', 'Casi nunca. Es difícil de mantener y no se reutiliza.'],
        ['Interna', 'Dentro de <code>&lt;style&gt;</code> en el head', 'Pruebas rápidas o una sola página.'],
        ['Externa', 'Archivo <code>.css</code> enlazado con <code>&lt;link&gt;</code>', '<b>La buena práctica.</b> Una hoja sirve a todo el sitio.']] },
      { t: 'code', lang: 'html', title: 'index.html', code: '<head>\n  <meta charset="UTF-8">\n  <title>Mi sitio</title>\n  <link rel="stylesheet" href="css/styles.css">\n</head>' },
      { t: 'h', text: 'Colores, unidades y tipografía', min: 35 },
      { t: 'play', title: 'Taller de estilo de texto', intro: 'Cambia los controles y mira el CSS que se genera al lado.',
        controls: [{ k: 'c', label: 'Color', type: 'select', opts: ['#14221B', '#1E5B43', '#B7862A', '#9B2C2C'], val: '#1E5B43' }, { k: 'fs', label: 'Tamaño', type: 'range', min: 14, max: 48, val: 28, unit: 'px' }, { k: 'fw', label: 'Grosor', type: 'select', opts: ['400', '600', '800'], val: '600' }, { k: 'ls', label: 'Espaciado entre letras', type: 'range', min: 0, max: 8, val: 0, unit: 'px' }, { k: 'ta', label: 'Alineación', type: 'select', opts: ['left', 'center', 'right'], val: 'left' }],
        html: '<h1>Programación Web</h1><p>Un párrafo de ejemplo para ver el efecto del interlineado y la lectura.</p>', css: 'h1{color:{{c}};font-size:{{fs}}px;font-weight:{{fw}};letter-spacing:{{ls}}px;text-align:{{ta}};margin:0 0 8px}p{text-align:{{ta}}}' },
      { t: 'cards', items: [
        { h: 'Unidades absolutas', html: '<p><code>px</code>: un punto de pantalla. Predecible, pero no se adapta al usuario.</p>' },
        { h: 'Unidades relativas', html: '<p><code>rem</code> (según el tamaño base del navegador), <code>em</code> (según el padre), <code>%</code>, <code>vw/vh</code> (según la ventana). Son la base de lo responsive.</p>' },
        { h: 'Formatos de color', html: '<p>Nombre (<code>tomato</code>), hexadecimal (<code>#1E5B43</code>), <code>rgb(30,91,67)</code> y <code>hsl(155,50%,24%)</code>.</p>' }] },
      { t: 'note', kind: 'tip', html: '<p>Para fuentes de Google: agrega el <code>&lt;link&gt;</code> en el head y usa <code>font-family: "Public Sans", sans-serif;</code>. Siempre deja una familia genérica de respaldo.</p>' },
      { t: 'h', text: 'La cascada y la herencia', min: 20 },
      { t: 'p', html: '<p>“Cascading” significa que varias reglas pueden competir por el mismo elemento. Gana la más <b>específica</b>; si empatan, gana la que aparece <b>más abajo</b>. Además, algunas propiedades (<code>color</code>, <code>font-family</code>) se <b>heredan</b> de padres a hijos; otras (<code>margin</code>, <code>border</code>) no.</p>' },
      { t: 'play', title: 'Herencia en vivo', controls: [{ k: 'c', label: 'Color del contenedor', type: 'select', opts: ['#1E5B43', '#9B2C2C', '#2B4C8C'], val: '#1E5B43' }, { k: 'b', label: 'Borde en el contenedor', type: 'toggle', val: true, on: 1, off: 0 }],
        html: '<div class="pad"><p>Soy un párrafo hijo: heredo el color.</p><p>Pero <b>no</b> heredo el borde.</p></div>', css: '.pad{color:{{c}};padding:12px;border:{{b}}px solid {{c}}}.pad p{margin:6px 0}' },
      { t: 'h', text: 'Laboratorio: dale estilo a tu perfil', min: 50 },
      { t: 'lab', id: 'perfil', title: 'Tarjeta de presentación con hoja externa', intro: 'Dos archivos: index.html y styles.css. Escribe las reglas en styles.css.', height: 400,
        files: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>Mi perfil</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <h1>Ana Gómez</h1>\n  <p class="rol">Estudiante de Sistemas Informáticos</p>\n  <p>Me gustan las bases de datos y el diseño web.</p>\n</body>\n</html>' }, { name: 'styles.css', code: '/* 1. body: fuente sans-serif, color de texto #14221B y fondo #F6F3EC */\n\n/* 2. h1: color #1E5B43 y tamaño 2.5rem */\n\n/* 3. .rol: color #B7862A, mayúsculas con text-transform y letter-spacing */\n' }],
        tests: [
          { t: 'Hoja de estilos externa enlazada', f: function () { return !!q('link[rel="stylesheet"]') || qa('style').length > 0; } },
          { t: 'body con fuente sans-serif', f: function () { return /sans|arial|helvetica|public/i.test(cs(document.body, 'fontFamily')); } },
          { t: 'body con color de texto #14221B', f: function () { return cs(document.body, 'color') === 'rgb(20, 34, 27)'; } },
          { t: 'body con fondo #F6F3EC', f: function () { return cs(document.body, 'backgroundColor') === 'rgb(246, 243, 236)'; } },
          { t: 'h1 verde #1E5B43', f: function () { return cs(q('h1'), 'color') === 'rgb(30, 91, 67)'; } },
          { t: 'h1 de 2.5rem (40px)', f: function () { return px(cs(q('h1'), 'fontSize')) === 40; } },
          { t: '.rol en mayúsculas con espaciado', f: function () { var r = q('.rol'); return cs(r, 'textTransform') === 'uppercase' && px(cs(r, 'letterSpacing')) > 0; } }],
        solution: [{ name: 'styles.css', code: 'body {\n  font-family: "Public Sans", sans-serif;\n  color: #14221B;\n  background: #F6F3EC;\n}\nh1 {\n  color: #1E5B43;\n  font-size: 2.5rem;\n}\n.rol {\n  color: #B7862A;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n}' }] },
      { t: 'quiz', qs: [
        ['¿Cuál es la mejor forma de aplicar estilos a un sitio de 20 páginas?', ['Atributo style en cada etiqueta', 'Una hoja externa enlazada', 'Etiqueta style en cada página'], 1, 'Se reutiliza y se mantiene en un solo lugar.'],
        ['¿Qué significa rem?', ['Relativo al tamaño de letra base', 'Relativo al padre', 'Píxeles reales'], 0, 'Escala con la configuración del usuario.'],
        ['Una regla termina cada declaración con…', ['una coma', 'punto y coma', 'dos puntos'], 1, 'propiedad: valor;'],
        ['¿Cuál de estas propiedades se hereda?', ['border', 'margin', 'color'], 2, 'El texto hijo toma el color del padre.']] }
    ]
  });

  /* ===== 2.1b Clases vs ID ===== */
  function specificity(sel) {
    var s = sel.replace(/"[^"]*"|'[^']*'/g, ''), a = 0, b = 0, c = 0, m;
    s = s.replace(/::[\w-]+/g, function () { c++; return ' '; });
    s = s.replace(/#[\w-]+/g, function () { a++; return ' '; });
    s = s.replace(/\[[^\]]*\]/g, function () { b++; return ' '; });
    s = s.replace(/\.[\w-]+/g, function () { b++; return ' '; });
    s = s.replace(/:(not|is|where)\(([^)]*)\)/g, function (x, n, inner) { var r = specificity(inner); if (n !== 'where') { a += r[0]; b += r[1]; c += r[2]; } return ' '; });
    s = s.replace(/:[\w-]+(\([^)]*\))?/g, function () { b++; return ' '; });
    (s.match(/(^|[\s>+~])[a-zA-Z][\w-]*/g) || []).forEach(function () { c++; });
    return [a, b, c];
  }
  C.add({
    id: '2.1b',
    lead: 'Elegir bien el selector es la diferencia entre un CSS limpio y un CSS imposible de mantener. Hoy dominamos clases, ID y la especificidad que decide quién gana.',
    blocks: [
      { t: 'h', text: 'Los selectores básicos', min: 30 },
      { t: 'table', head: ['Selector', 'Ejemplo', 'A quién apunta'], rows: [
        ['Etiqueta', '<code>p { }</code>', 'A todos los elementos de ese tipo'],
        ['Clase', '<code>.tarjeta { }</code>', 'A todos los que tengan <code>class="tarjeta"</code>'],
        ['ID', '<code>#portada { }</code>', 'Al único con <code>id="portada"</code>'],
        ['Universal', '<code>* { }</code>', 'A todos'],
        ['Descendiente', '<code>.menu a { }</code>', 'A los <code>a</code> que estén dentro de <code>.menu</code>'],
        ['Hijo directo', '<code>ul &gt; li { }</code>', 'Solo a hijos inmediatos'],
        ['Agrupado', '<code>h1, h2 { }</code>', 'A varios a la vez'],
        ['Atributo', '<code>a[target="_blank"] { }</code>', 'Por el valor de un atributo'],
        ['Pseudoclase', '<code>a:hover { }</code>', 'Según el estado del elemento']] },
      { t: 'h', text: 'Clase frente a ID', min: 25 },
      { t: 'ana', title: 'Analogía: el uniforme y la cédula', rows: [
        ['Clase = uniforme', 'Muchas personas visten el mismo uniforme (<code>.enfermero</code>). Cambias el uniforme y cambian todos.'],
        ['ID = cédula', 'Es única: identifica a una sola persona (<code>#paciente-4821</code>) y sirve para encontrarla (anclas, JavaScript).']] },
      { t: 'cards', items: [
        { h: 'Usa clases para estilizar', html: '<p>Son reutilizables, se pueden combinar (<code>class="tarjeta destacada"</code>) y mantienen baja la especificidad.</p>' },
        { h: 'Usa ID para identificar', html: '<p>Anclas (<code>#contacto</code>), etiquetas de formularios y buscar un elemento con <code>getElementById</code>. Debe ser único.</p>' },
        { h: 'Convención de nombres', html: '<p>Minúsculas con guiones: <code>.tarjeta-noticia</code>, nunca con espacios ni tildes. Nombra por función, no por apariencia.</p>' }] },
      { t: 'h', text: 'Probador de selectores', min: 30 },
      { t: 'custom', build: function (w, x, U) {
        var el = U.el, esc = U.esc, box = el('div', { class: 'play' });
        box.appendChild(el('h4', null, 'Escribe un selector y mira qué elementos atrapa'));
        var html = '<div id="portada" class="bloque"><h1 class="titulo">Tienda</h1><p class="texto destacado">Oferta del día</p></div><ul class="menu"><li class="item activo"><a href="#" target="_blank">Inicio</a></li><li class="item"><a href="#">Productos</a></li><li class="item"><a href="#">Contacto</a></li></ul><p class="texto">Pie de página</p>';
        var inp = el('input', { type: 'text', value: '.item', 'aria-label': 'Selector CSS', style: 'width:100%;padding:8px;font:14px JetBrains Mono,monospace;border:1px solid var(--ln);background:var(--sf);color:var(--ink)' });
        var info = el('div', { class: 'hint' }), host = el('div', { class: 'stagebox' }), sh = host.attachShadow({ mode: 'open' }), sg = el('div', { class: 'seg' });
        sh.innerHTML = '<style>[data-m]{outline:2px solid #3B82F6;background:rgba(59,130,246,.25)}div,ul,p,li,h1{margin:4px 0;padding:2px 6px}li{display:inline-block;list-style:none;border:1px solid #9AAEA3}h1{font-size:18px}</style><div class="r">' + html + '</div>';
        var r = sh.querySelector('.r');
        function run() {
          U.$$('[data-m]', r).forEach(function (e) { e.removeAttribute('data-m'); });
          try { var m = r.querySelectorAll(inp.value); m.forEach(function (e) { e.setAttribute('data-m', ''); }); var s = specificity(inp.value); info.innerHTML = '<b>' + m.length + '</b> elemento(s) coinciden · especificidad <b>(' + s.join(', ') + ')</b>'; } catch (e) { info.textContent = 'Selector no válido todavía…'; }
        }
        ['.item', '.item.activo', '#portada', '.menu a', 'ul > li', '.texto', 'a[target="_blank"]', 'li:first-child', 'p'].forEach(function (s) { var b = el('button', null, s); b.onclick = function () { inp.value = s; run(); }; sg.appendChild(b); });
        inp.oninput = run; box.appendChild(inp); box.appendChild(sg); box.appendChild(host); box.appendChild(info); w.appendChild(box); run();
      } },
      { t: 'h', text: 'Especificidad: quién gana la pelea', min: 30 },
      { t: 'p', html: '<p>Cada selector tiene un “peso” formado por tres números <b>(ID, clases, etiquetas)</b>. Se comparan de izquierda a derecha: un solo ID le gana a cien clases. Los estilos en línea ganan a todo, y <code>!important</code> rompe las reglas (evítalo).</p>' },
      { t: 'custom', build: function (w, x, U) {
        var el = U.el, box = el('div', { class: 'play' });
        box.appendChild(el('h4', null, 'Calculadora de especificidad'));
        var ta = el('textarea', { spellcheck: 'false', 'aria-label': 'Selectores', style: 'width:100%;height:130px;background:var(--cd);color:var(--cf);border:0;padding:10px;font:13px JetBrains Mono,monospace;border-radius:4px' }), out = el('div');
        ta.value = 'p\n.texto\np.texto\n#portada\n#portada .texto\n.menu li a:hover\nul > li.item.activo';
        function run() {
          var rows = ta.value.split('\n').filter(function (l) { return l.trim(); }).map(function (l) { return [l.trim(), specificity(l)]; });
          var best = rows.slice().sort(function (p, q) { return (q[1][0] - p[1][0]) || (q[1][1] - p[1][1]) || (q[1][2] - p[1][2]); })[0];
          out.innerHTML = '<div class="tbl"><table><thead><tr><th>Selector</th><th>ID</th><th>Clases</th><th>Etiquetas</th></tr></thead><tbody>' + rows.map(function (r) { return '<tr' + (best && r === best ? ' style="background:rgba(183,134,42,.2)"' : '') + '><td><code>' + U.esc(r[0]) + '</code></td><td>' + r[1][0] + '</td><td>' + r[1][1] + '</td><td>' + r[1][2] + '</td></tr>'; }).join('') + '</tbody></table></div><p class="hint">Resaltado: el selector más fuerte de la lista.</p>';
        }
        ta.oninput = run; box.appendChild(ta); box.appendChild(out); w.appendChild(box); run();
      } },
      { t: 'play', title: 'El duelo: clase contra ID contra etiqueta', intro: 'Activa y desactiva reglas. ¿De qué color acaba el párrafo?',
        controls: [{ k: 'a', label: 'Regla de etiqueta (azul)', type: 'toggle', val: true, on: 1, off: 0 }, { k: 'b', label: 'Regla de clase (verde)', type: 'toggle', val: true, on: 1, off: 0 }, { k: 'c', label: 'Regla de ID (rojo)', type: 'toggle', val: false, on: 1, off: 0 }],
        html: '<p id="x" class="y">¿Qué color tengo?</p>', showCss: false,
        css: function (v) { return (+v.a ? 'p{color:#2B4C8C}' : '') + (+v.b ? '.y{color:#1E8A4C}' : '') + (+v.c ? '#x{color:#B02A2A}' : '') + 'p{font-size:22px;font-weight:600}'; },
        readout: function (v) { return +v.c ? 'Gana el <b>ID (1,0,0)</b>.' : +v.b ? 'Gana la <b>clase (0,1,0)</b> sobre la etiqueta (0,0,1).' : +v.a ? 'Solo queda la <b>etiqueta</b>.' : 'Ninguna regla: color por defecto.'; } },
      { t: 'h', text: 'Laboratorio: tarjeta con clases y un ID', min: 45 },
      { t: 'lab', id: 'clases', title: 'Estilos con clases y un ID de portada', intro: 'Corrige el CSS para que las pruebas pasen.', height: 400,
        files: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>Clases e ID</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <h1 id="portada">Catálogo</h1>\n  <div class="tarjeta">Cuaderno</div>\n  <div class="tarjeta destacada">Lapicero</div>\n  <div class="tarjeta">Borrador</div>\n</body>\n</html>' }, { name: 'styles.css', code: '/* 1. Todas las .tarjeta: padding de 12px, borde 1px sólido #9AAEA3, margen inferior de 10px */\n\n/* 2. .destacada: fondo #F4D77A (debe verse sobre .tarjeta) */\n\n/* 3. #portada: color #1E5B43 y texto centrado */\n\n/* 4. Al pasar el cursor sobre .tarjeta: fondo #E8EFEA, excepto .destacada */\n' }],
        tests: [
          { t: '.tarjeta con padding 12px', f: function () { return px(cs(q('.tarjeta'), 'paddingTop')) === 12; } },
          { t: '.tarjeta con borde de 1px', f: function () { return px(cs(q('.tarjeta'), 'borderTopWidth')) === 1; } },
          { t: '.tarjeta con margen inferior 10px', f: function () { return px(cs(q('.tarjeta'), 'marginBottom')) === 10; } },
          { t: '.destacada con fondo dorado', f: function () { return cs(q('.destacada'), 'backgroundColor') === 'rgb(244, 215, 122)'; } },
          { t: '#portada verde y centrado', f: function () { var h = q('#portada'); return cs(h, 'color') === 'rgb(30, 91, 67)' && cs(h, 'textAlign') === 'center'; } },
          { t: 'Existe una regla :hover para .tarjeta', f: function () { var ok = false; [].slice.call(document.styleSheets).forEach(function (s) { try { [].slice.call(s.cssRules).forEach(function (r) { if (r.selectorText && /\.tarjeta[^,{]*:hover/.test(r.selectorText)) ok = true; }); } catch (e) {} }); return ok; } }],
        solution: [{ name: 'styles.css', code: '.tarjeta {\n  padding: 12px;\n  border: 1px solid #9AAEA3;\n  margin-bottom: 10px;\n}\n.destacada {\n  background: #F4D77A;\n}\n#portada {\n  color: #1E5B43;\n  text-align: center;\n}\n.tarjeta:not(.destacada):hover {\n  background: #E8EFEA;\n}' }] },
      { t: 'quiz', qs: [
        ['¿Qué selector pesa más?', ['.menu li a', '#menu', 'ul li'], 1, '#menu vale (1,0,0). .menu li a vale (0,1,2).'],
        ['¿Cuántas veces puede aparecer un mismo ID en una página?', ['Las que quieras', 'Una sola', 'Dos'], 1, 'Debe ser único.'],
        ['¿Qué selecciona .a.b ?', ['Elementos con las clases a y b a la vez', 'Elementos con clase a o b', 'b dentro de a'], 0, 'Sin espacio entre ellas: ambas clases en el mismo elemento.'],
        ['¿Qué selecciona ul > li?', ['Cualquier li dentro de ul', 'Los li hijos directos de ul', 'El primer li'], 1, 'Se limita al primer nivel.']] }
    ]
  });

  /* ===== 2.2a Box Model ===== */
  C.add({
    id: '2.2a',
    lead: 'Para el navegador todo elemento es una caja rectangular. Entender sus cuatro capas explica por qué un elemento mide lo que mide y por qué las cosas “se desbordan”.',
    blocks: [
      { t: 'h', text: 'Las cuatro capas de la caja', min: 25 },
      { t: 'ana', title: 'Analogía: el cuadro enmarcado', rows: [
        ['Contenido', 'La pintura: el texto o la imagen.'],
        ['Padding (relleno)', 'El paspartú: aire entre la pintura y el marco, dentro de la caja.'],
        ['Border (borde)', 'El marco.'],
        ['Margin (margen)', 'La distancia a la pared y a los otros cuadros; es espacio fuera de la caja y siempre transparente.']] },
      { t: 'custom', build: function (w, x, U) {
        var el = U.el, box = el('div', { class: 'play' });
        box.appendChild(el('h4', null, 'Diagrama del modelo de caja (interactivo)'));
        var v = { m: 20, b: 6, p: 16, w: 160, bs: 'content-box' };
        var ctl = el('div', { class: 'ctl' }), out = el('div'), ro = el('div', { class: 'hint' });
        [['m', 'margin', 0, 50], ['b', 'border', 0, 20], ['p', 'padding', 0, 50], ['w', 'width', 80, 260]].forEach(function (c) {
          var l = el('label'), o = el('output', null, v[c[0]] + 'px'), r = el('input', { type: 'range', min: c[2], max: c[3] }); r.value = v[c[0]]; l.innerHTML = c[1] + ' '; l.appendChild(o); l.appendChild(r);
          r.oninput = function () { v[c[0]] = +r.value; o.textContent = r.value + 'px'; draw(); }; ctl.appendChild(l);
        });
        var l2 = el('label', null, 'box-sizing '), s2 = el('select'); ['content-box', 'border-box'].forEach(function (o) { s2.appendChild(el('option', { value: o }, o)); }); s2.onchange = function () { v.bs = s2.value; draw(); }; l2.appendChild(s2); ctl.appendChild(l2);
        box.appendChild(ctl); box.appendChild(out); box.appendChild(ro);
        function draw() {
          var inner = v.bs === 'content-box' ? v.w : Math.max(0, v.w - 2 * v.p - 2 * v.b), tw = inner + 2 * v.p + 2 * v.b, full = tw + 2 * v.m;
          out.innerHTML = '<div style="background:#E8A84A;padding:' + v.m + 'px;text-align:center;font:11px sans-serif;color:#222;overflow:auto"><div style="background:#C9A227;padding:' + v.b + 'px;"><div style="background:#7BB382;padding:' + v.p + 'px"><div style="background:#7DB1E8;width:' + inner + 'px;max-width:100%;min-height:48px;display:grid;place-items:center;margin:0 auto;color:#10201A">contenido</div></div></div></div>' +
            '<div class="hint" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:6px"><span><i style="background:#E8A84A;display:inline-block;width:10px;height:10px"></i> margin</span><span><i style="background:#C9A227;display:inline-block;width:10px;height:10px"></i> border</span><span><i style="background:#7BB382;display:inline-block;width:10px;height:10px"></i> padding</span><span><i style="background:#7DB1E8;display:inline-block;width:10px;height:10px"></i> contenido</span></div>';
          ro.innerHTML = 'Contenido: <b>' + inner + 'px</b> · Caja visible (contenido + padding + borde): <b>' + tw + 'px</b> · Espacio total que ocupa (con margen): <b>' + full + 'px</b>' + (v.bs === 'content-box' ? '<br>Con <code>content-box</code>, el <code>width</code> mide solo el contenido: el padding y el borde se suman por fuera.' : '<br>Con <code>border-box</code>, el <code>width</code> ya incluye padding y borde: la caja siempre mide ' + v.w + 'px.');
        }
        draw(); w.appendChild(box);
      } },
      { t: 'h', text: 'Propiedades abreviadas', min: 25 },
      { t: 'table', head: ['Escritura', 'Significado'], rows: [
        ['<code>padding: 10px;</code>', 'Los cuatro lados iguales'],
        ['<code>padding: 10px 20px;</code>', 'Arriba y abajo 10; izquierda y derecha 20'],
        ['<code>padding: 10px 20px 30px;</code>', 'Arriba 10; laterales 20; abajo 30'],
        ['<code>padding: 10px 20px 30px 40px;</code>', 'Sentido del reloj: arriba, derecha, abajo, izquierda'],
        ['<code>margin: 0 auto;</code>', 'Centra horizontalmente un bloque con ancho definido'],
        ['<code>border: 2px solid #1E5B43;</code>', 'Grosor, estilo y color']] },
      { t: 'h', text: 'box-sizing: la regla que salva vidas', min: 20 },
      { t: 'code', lang: 'css', title: 'styles.css', code: '*, *::before, *::after {\n  box-sizing: border-box;\n}' },
      { t: 'note', kind: 'key', html: '<p>Con esta regla al inicio de tu CSS, <code>width: 300px</code> significa de verdad 300px en pantalla, aunque agregues padding y borde. Es el primer paso en casi todos los proyectos profesionales.</p>' },
      { t: 'h', text: 'Margen: colapso y centrado', min: 20 },
      { t: 'play', title: 'Colapso de márgenes', intro: 'Dos cajas apiladas tienen margen de 30px. ¿Cuánto espacio queda entre ellas?',
        controls: [{ k: 'm1', label: 'Margen inferior de A', type: 'range', min: 0, max: 60, val: 30, unit: 'px' }, { k: 'm2', label: 'Margen superior de B', type: 'range', min: 0, max: 60, val: 20, unit: 'px' }],
        html: '<div class="a">A</div><div class="b">B</div>', css: '.a,.b{background:#1E5B43;color:#fff;padding:10px;text-align:center}.a{margin-bottom:{{m1}}px}.b{margin-top:{{m2}}px;background:#B7862A}',
        readout: function (v) { return 'Espacio real entre A y B: <b>' + Math.max(+v.m1, +v.m2) + 'px</b>, no ' + (+v.m1 + +v.m2) + 'px. Los márgenes verticales adyacentes <b>se fusionan</b> y gana el mayor.'; } },
      { t: 'h', text: 'Inspecciona el modelo de caja en el navegador', min: 15 },
      { t: 'steps', items: [
        { t: 'Abre cualquier página y pulsa F12', html: '<p>Ve a la pestaña <b>Elementos</b> y selecciona un párrafo.</p>' },
        { t: 'Busca el diagrama de cajas', html: '<p>En la pestaña “Computed” (Calculado) o en “Layout” verás el mismo diagrama de colores que acabamos de construir.</p>' },
        { t: 'Edita valores en vivo', html: '<p>Cambia el padding o el margen en el panel de estilos. El navegador recalcula al instante; así se depuran los espacios en la vida real.</p>' }] },
      { t: 'h', text: 'Laboratorio: construye una tarjeta de producto', min: 50 },
      { t: 'lab', id: 'caja', title: 'Dominando las cajas', intro: 'La tarjeta debe medir exactamente 300px de ancho en pantalla, aunque lleve padding y borde.', height: 420,
        files: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>Box model</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <div class="tarjeta">\n    <h2>Memoria USB</h2>\n    <p>32 GB, USB 3.0</p>\n    <p class="precio">$35.000</p>\n  </div>\n</body>\n</html>' }, { name: 'styles.css', code: '/* 1. Aplica border-box a todos los elementos */\n\n/* 2. .tarjeta: width 300px, padding 20px, borde 2px sólido #1E5B43,\n      centrada horizontalmente con margin auto, margen superior 30px */\n\n/* 3. .precio: margin-top 16px y padding-top 10px con borde superior punteado */\n' }],
        tests: [
          { t: 'box-sizing: border-box en .tarjeta', f: function () { return cs(q('.tarjeta'), 'boxSizing') === 'border-box'; } },
          { t: 'La tarjeta mide 300px en pantalla', f: function () { return Math.round(q('.tarjeta').getBoundingClientRect().width) === 300; } },
          { t: 'Padding de 20px', f: function () { return px(cs(q('.tarjeta'), 'paddingLeft')) === 20; } },
          { t: 'Borde de 2px', f: function () { return px(cs(q('.tarjeta'), 'borderLeftWidth')) === 2; } },
          { t: 'Tarjeta centrada horizontalmente', f: function () { var r = q('.tarjeta').getBoundingClientRect(); return Math.abs(r.left - (innerWidth - r.right)) < 3; } },
          { t: 'Margen superior de 30px', f: function () { return px(cs(q('.tarjeta'), 'marginTop')) === 30; } },
          { t: '.precio con borde superior punteado', f: function () { var p = q('.precio'); return cs(p, 'borderTopStyle') === 'dotted' && px(cs(p, 'paddingTop')) === 10; } }],
        solution: [{ name: 'styles.css', code: '* { box-sizing: border-box; }\n.tarjeta {\n  width: 300px;\n  padding: 20px;\n  border: 2px solid #1E5B43;\n  margin: 30px auto 0;\n}\n.precio {\n  margin-top: 16px;\n  padding-top: 10px;\n  border-top: 2px dotted #9AAEA3;\n}' }] },
      { t: 'quiz', qs: [
        ['¿Qué capa está entre el contenido y el borde?', ['margin', 'padding', 'outline'], 1, 'Es el relleno interno.'],
        ['Con content-box, width 200 + padding 20 + borde 5 mide…', ['200px', '250px', '225px'], 1, '200 + 2×20 + 2×5 = 250.'],
        ['¿Qué hace margin: 0 auto?', ['Quita márgenes', 'Centra horizontalmente un bloque con ancho', 'Alinea el texto'], 1, 'El margen automático reparte el espacio sobrante.'],
        ['Margen inferior 30px + margen superior 20px entre dos bloques dejan…', ['50px', '30px', '20px'], 1, 'Colapsan al mayor.']] }
    ]
  });

  /* ===== 2.2b Flexbox ===== */
  C.add({
    id: '2.2b',
    lead: 'Flexbox resuelve la tarea que durante años fue una pesadilla: alinear, distribuir y centrar elementos de forma flexible. Es la herramienta de layout que más usarás.',
    blocks: [
      { t: 'h', text: 'La idea: contenedor y elementos', min: 20 },
      { t: 'ana', title: 'Analogía: el estante elástico', rows: [
        ['Contenedor flex', 'Un estante elástico: <code>display: flex</code> convierte a sus hijos directos en elementos flexibles.'],
        ['Eje principal', 'La dirección en que se colocan los objetos (por defecto, horizontal).'],
        ['Eje transversal', 'El perpendicular al principal.'],
        ['<code>gap</code>', 'El espacio que dejas entre objetos.']] },
      { t: 'p', html: '<p>Solo los <b>hijos directos</b> del contenedor se vuelven flexibles. Las propiedades se dividen en dos grupos: las del <b>contenedor</b> y las de cada <b>elemento</b>.</p>' },
      { t: 'h', text: 'Laboratorio visual del contenedor', min: 40 },
      { t: 'play', title: 'Controla el contenedor', intro: 'Cambia cada propiedad y observa el CSS generado.',
        controls: [{ k: 'dir', label: 'flex-direction', type: 'select', opts: ['row', 'row-reverse', 'column', 'column-reverse'], val: 'row' }, { k: 'jc', label: 'justify-content', type: 'select', opts: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'], val: 'flex-start' }, { k: 'ai', label: 'align-items', type: 'select', opts: ['stretch', 'flex-start', 'center', 'flex-end'], val: 'stretch' }, { k: 'fw', label: 'flex-wrap', type: 'select', opts: ['nowrap', 'wrap'], val: 'nowrap' }, { k: 'g', label: 'gap', type: 'range', min: 0, max: 40, val: 8, unit: 'px' }],
        html: '<div class="c"><div class="i">1</div><div class="i t">2</div><div class="i">3</div><div class="i t">4</div><div class="i">5</div></div>',
        css: '.c{display:flex;flex-direction:{{dir}};justify-content:{{jc}};align-items:{{ai}};flex-wrap:{{fw}};gap:{{g}}px;height:240px;width:100%;border:2px dashed #9AAEA3;padding:6px;box-sizing:border-box}.i{background:#1E5B43;color:#fff;padding:12px 22px;min-width:70px;text-align:center;font-weight:600}.i.t{padding:26px 22px;background:#B7862A}',
        readout: function (v) { var main = /row/.test(v.dir) ? 'horizontal' : 'vertical'; return 'Eje principal: <b>' + main + '</b>. <code>justify-content</code> reparte sobre el eje principal; <code>align-items</code> sobre el transversal.'; } },
      { t: 'table', head: ['Propiedad', 'Controla', 'Valores frecuentes'], rows: [
        ['<code>display: flex</code>', 'Activa el modo flexible', '<code>flex</code>, <code>inline-flex</code>'],
        ['<code>flex-direction</code>', 'Dirección del eje principal', '<code>row</code>, <code>column</code>'],
        ['<code>justify-content</code>', 'Distribución en el eje principal', '<code>center</code>, <code>space-between</code>'],
        ['<code>align-items</code>', 'Alineación en el eje transversal', '<code>center</code>, <code>stretch</code>'],
        ['<code>flex-wrap</code>', 'Permite saltar de línea', '<code>wrap</code>'],
        ['<code>gap</code>', 'Espacio entre elementos', '<code>16px</code>']] },
      { t: 'h', text: 'Propiedades de los elementos', min: 30 },
      { t: 'play', title: 'Reparto del espacio sobrante', intro: 'El elemento 2 puede crecer, encogerse o fijar su base.',
        controls: [{ k: 'gr', label: 'flex-grow del elemento 2', type: 'range', min: 0, max: 5, val: 0 }, { k: 'basis', label: 'flex-basis del elemento 2', type: 'range', min: 40, max: 300, val: 100, unit: 'px' }, { k: 'as', label: 'align-self del elemento 3', type: 'select', opts: ['auto', 'flex-start', 'center', 'flex-end'], val: 'auto' }],
        html: '<div class="c"><div class="i">1</div><div class="i dos">2</div><div class="i tres">3</div></div>',
        css: '.c{display:flex;gap:8px;height:150px;border:2px dashed #9AAEA3;padding:6px;box-sizing:border-box;align-items:flex-start}.i{background:#1E5B43;color:#fff;padding:14px;text-align:center}.dos{background:#B7862A;flex:{{gr}} 1 {{basis}}px}.tres{align-self:{{as}};background:#2B4C8C}' },
      { t: 'note', kind: 'key', html: '<p><code>flex: 1</code> es la abreviatura más usada: “repártanse el espacio sobrante en partes iguales”. Tres tarjetas con <code>flex: 1</code> siempre miden lo mismo, sin calcular porcentajes.</p>' },
      { t: 'h', text: 'Cuatro patrones que usarás toda la vida', min: 30 },
      { t: 'cards', items: [
        { h: 'Centrar todo', html: '<pre class="mono-box">.c {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}</pre>' },
        { h: 'Barra de navegación', html: '<pre class="mono-box">nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}</pre>' },
        { h: 'Fila de tarjetas', html: '<pre class="mono-box">.fila {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.fila > .card { flex: 1 1 240px; }</pre>' },
        { h: 'Pie pegado abajo', html: '<pre class="mono-box">body {\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n}\nmain { flex: 1; }</pre>' }] },
      { t: 'h', text: 'Retos con pruebas automáticas', min: 60 },
      { t: 'lab', id: 'reto1', title: 'Reto 1 · Centra la caja', intro: 'Centra .caja horizontal y verticalmente dentro de .escenario, que mide 260px de alto.', height: 300,
        files: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es"><head><meta charset="UTF-8"><title>Reto 1</title><link rel="stylesheet" href="styles.css"></head>\n<body><div class="escenario"><div class="caja">Centrada</div></div></body></html>' }, { name: 'styles.css', code: '* { box-sizing: border-box; }\nbody { margin: 0; }\n.escenario {\n  height: 260px;\n  background: #E8EFEA;\n}\n.caja {\n  width: 120px;\n  padding: 16px;\n  background: #1E5B43;\n  color: #fff;\n}\n' }],
        tests: [
          { t: '.escenario usa display:flex', f: function () { return cs(q('.escenario'), 'display') === 'flex'; } },
          { t: '.caja está centrada horizontalmente', f: function () { var a = q('.escenario').getBoundingClientRect(), b = q('.caja').getBoundingClientRect(); return Math.abs((a.left + a.right) / 2 - (b.left + b.right) / 2) < 2; } },
          { t: '.caja está centrada verticalmente', f: function () { var a = q('.escenario').getBoundingClientRect(), b = q('.caja').getBoundingClientRect(); return Math.abs((a.top + a.bottom) / 2 - (b.top + b.bottom) / 2) < 2; } }],
        solution: [{ name: 'styles.css', code: '.escenario {\n  height: 260px;\n  background: #E8EFEA;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}' }] },
      { t: 'lab', id: 'reto2', title: 'Reto 2 · Barra de navegación', intro: 'Logo a la izquierda, enlaces a la derecha, todo centrado verticalmente, y con 20px de espacio entre enlaces.', height: 300,
        files: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es"><head><meta charset="UTF-8"><title>Reto 2</title><link rel="stylesheet" href="styles.css"></head>\n<body>\n<nav class="barra">\n  <div class="logo">MiTienda</div>\n  <ul class="enlaces">\n    <li><a href="#">Inicio</a></li>\n    <li><a href="#">Productos</a></li>\n    <li><a href="#">Contacto</a></li>\n  </ul>\n</nav>\n</body></html>' }, { name: 'styles.css', code: '* { box-sizing: border-box; }\nbody { margin: 0; font-family: sans-serif; }\n.barra { background: #1E5B43; color: #fff; padding: 14px 20px; height: 70px; }\n.enlaces { list-style: none; margin: 0; padding: 0; }\na { color: #fff; text-decoration: none; }\n' }],
        tests: [
          { t: '.barra es un contenedor flex', f: function () { return cs(q('.barra'), 'display') === 'flex'; } },
          { t: 'Logo a la izquierda y enlaces a la derecha', f: function () { return cs(q('.barra'), 'justifyContent') === 'space-between'; } },
          { t: 'Centrado vertical en la barra', f: function () { return cs(q('.barra'), 'alignItems') === 'center'; } },
          { t: 'Los enlaces están en fila', f: function () { var l = qa('.enlaces li'); return cs(q('.enlaces'), 'display') === 'flex' && l[0].getBoundingClientRect().top === l[2].getBoundingClientRect().top; } },
          { t: 'Hay 20px de separación entre enlaces', f: function () { var l = qa('.enlaces li'); return Math.round(l[1].getBoundingClientRect().left - l[0].getBoundingClientRect().right) === 20; } }],
        solution: [{ name: 'styles.css', code: '.barra {\n  background: #1E5B43; color: #fff; padding: 14px 20px; height: 70px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.enlaces {\n  list-style: none; margin: 0; padding: 0;\n  display: flex;\n  gap: 20px;\n}' }] },
      { t: 'lab', id: 'reto3', title: 'Reto 3 · Galería que se reacomoda', intro: 'Cinco tarjetas que se reparten el ancho, saltan de línea y nunca miden menos de 180px.', height: 320,
        files: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es"><head><meta charset="UTF-8"><title>Reto 3</title><link rel="stylesheet" href="styles.css"></head>\n<body>\n<div class="galeria">\n  <div class="card">1</div><div class="card">2</div><div class="card">3</div><div class="card">4</div><div class="card">5</div>\n</div>\n</body></html>' }, { name: 'styles.css', code: '* { box-sizing: border-box; }\nbody { margin: 0; padding: 12px; font-family: sans-serif; }\n.card { background: #1E5B43; color: #fff; padding: 24px; text-align: center; }\n' }],
        tests: [
          { t: '.galeria es flex con wrap', f: function () { var g = q('.galeria'); return cs(g, 'display') === 'flex' && cs(g, 'flexWrap') === 'wrap'; } },
          { t: 'Hay 16px de gap', f: function () { return px(cs(q('.galeria'), 'columnGap')) === 16; } },
          { t: 'Las tarjetas crecen (flex-grow ≥ 1)', f: function () { return px(cs(q('.card'), 'flexGrow')) >= 1; } },
          { t: 'Base mínima de 180px', f: function () { return px(cs(q('.card'), 'flexBasis')) === 180; } },
          { t: 'Nada se desborda horizontalmente', f: function () { return document.documentElement.scrollWidth <= innerWidth + 1; } }],
        solution: [{ name: 'styles.css', code: '.galeria {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.card {\n  flex: 1 1 180px;\n  background: #1E5B43; color: #fff; padding: 24px; text-align: center;\n}' }] },
      { t: 'quiz', qs: [
        ['¿Qué propiedad distribuye elementos sobre el eje principal?', ['align-items', 'justify-content', 'flex-wrap'], 1, 'justify-content trabaja sobre el eje principal.'],
        ['Con flex-direction: column, el eje principal es…', ['horizontal', 'vertical', 'diagonal'], 1, 'Los ejes se intercambian.'],
        ['¿Qué logra flex: 1 en tres tarjetas?', ['Que midan lo mismo', 'Que desaparezcan', 'Que se apilen'], 0, 'Se reparten el espacio sobrante por igual.'],
        ['Para centrar algo en ambos ejes se usa…', ['justify-content y align-items: center', 'margin: auto en el texto', 'text-align: center'], 0, 'Es el patrón clásico.']] }
    ]
  });

  /* ===== 2.t Taller integrador ===== */
  C.add({
    id: '2.t',
    lead: 'Cerramos el módulo conectando todo: un registro de la base de datos se convierte en una tarjeta web con HTML, CSS, box model y Flexbox.',
    blocks: [
      { t: 'h', text: 'Del registro SQL a la tarjeta', min: 20 },
      { t: 'p', html: '<p>Un cliente de la tienda pide mostrar los productos como tarjetas. Esta es la consulta y su primera fila:</p>' },
      { t: 'code', lang: 'sql', title: 'consulta.sql', code: 'SELECT p.nombre, p.precio, p.stock, c.nombre AS categoria\nFROM producto p\nINNER JOIN categoria c ON p.categoria_id = c.id\nWHERE p.id = 1;' },
      { t: 'table', head: ['nombre', 'precio', 'stock', 'categoria'], rows: [['Cuaderno', '8000', '10', 'Papelería']] },
      { t: 'ana', title: 'Traduce columnas a elementos', rows: [
        ['<code>nombre</code>', '<code>&lt;h3 class="nombre"&gt;</code>'],
        ['<code>categoria</code>', '<code>&lt;span class="etiqueta"&gt;</code> con aspecto de insignia'],
        ['<code>precio</code>', '<code>&lt;p class="precio"&gt;</code> destacado'],
        ['<code>stock</code>', '<code>&lt;p class="stock"&gt;</code> con una nota si es menor a 5'],
        ['Acción', '<code>&lt;button&gt;</code> de “Agregar al carrito”']] },
      { t: 'note', kind: 'mision', html: '<p>Construye una galería de <b>tres tarjetas</b> (una con stock bajo) que cumpla la rúbrica: estructura semántica 20, clases y organización del CSS 20, box model 20, Flexbox 25 y detalle visual 15.</p>' },
      { t: 'h', text: 'Taller con calificación automática', min: 120 },
      { t: 'lab', id: 'tarjetas', title: 'Galería de productos', intro: 'Trabaja en index.html y styles.css. La puntuación sigue la rúbrica.', points: true, height: 520,
        files: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Galería de productos</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <h1>Productos</h1>\n  <div class="galeria">\n    <!-- Tres div.tarjeta con: span.etiqueta, h3.nombre, p.precio, p.stock y button -->\n  </div>\n</body>\n</html>' }, { name: 'styles.css', code: '/* Reglas globales */\n\n/* .galeria */\n\n/* .tarjeta */\n\n/* .etiqueta, .nombre, .precio, .stock */\n\n/* button y :hover */\n' }],
        tests: [
          { t: 'Hay al menos 3 .tarjeta dentro de .galeria', pts: 8, f: function () { return qa('.galeria > .tarjeta').length >= 3; } },
          { t: 'Cada tarjeta tiene etiqueta, nombre, precio, stock y botón', pts: 10, f: function () { var t = qa('.tarjeta'); return t.length >= 3 && t.every(function (c) { return c.querySelector('.etiqueta') && c.querySelector('h3.nombre') && c.querySelector('.precio') && c.querySelector('.stock') && c.querySelector('button'); }); } },
          { t: 'Un solo <h1> y lang="es"', pts: 6, f: function () { return qa('h1').length === 1 && document.documentElement.lang === 'es'; } },
          { t: 'box-sizing: border-box aplicado', pts: 5, f: function () { return cs(q('.tarjeta'), 'boxSizing') === 'border-box'; } },
          { t: '.tarjeta con padding de al menos 16px', pts: 7, f: function () { return px(cs(q('.tarjeta'), 'paddingLeft')) >= 16; } },
          { t: '.tarjeta con borde y esquinas redondeadas', pts: 5, f: function () { var t = q('.tarjeta'); return px(cs(t, 'borderTopWidth')) >= 1 && px(cs(t, 'borderTopLeftRadius')) >= 4; } },
          { t: 'Espacio entre elementos (margin o gap)', pts: 5, f: function () { return px(cs(q('.galeria'), 'columnGap')) >= 8 || px(cs(q('.tarjeta'), 'marginBottom')) >= 8; } },
          { t: '.galeria es flex con wrap', pts: 12, f: function () { var g = q('.galeria'); return cs(g, 'display') === 'flex' && cs(g, 'flexWrap') === 'wrap'; } },
          { t: 'Las tarjetas se reparten el ancho (flex)', pts: 10, f: function () { return px(cs(q('.tarjeta'), 'flexGrow')) >= 1; } },
          { t: 'Nada se desborda horizontalmente', pts: 7, f: function () { return document.documentElement.scrollWidth <= innerWidth + 1; } },
          { t: '.etiqueta con fondo y bordes redondeados', pts: 5, f: function () { var e = q('.etiqueta'); return cs(e, 'backgroundColor') !== 'rgba(0, 0, 0, 0)' && px(cs(e, 'borderTopLeftRadius')) >= 4; } },
          { t: '.precio destacado (tamaño ≥ 20px o negrita)', pts: 5, f: function () { var p = q('.precio'); return px(cs(p, 'fontSize')) >= 20 || px(cs(p, 'fontWeight')) >= 600; } },
          { t: 'Botón con fondo propio y cursor pointer', pts: 5, f: function () { var b = q('.tarjeta button'); return cs(b, 'backgroundColor') !== 'rgb(239, 239, 239)' && cs(b, 'cursor') === 'pointer'; } },
          { t: 'Regla :hover definida para el botón o la tarjeta', pts: 5, f: function () { var ok = false; [].slice.call(document.styleSheets).forEach(function (s) { try { [].slice.call(s.cssRules).forEach(function (r) { if (r.selectorText && /:hover/.test(r.selectorText)) ok = true; }); } catch (e) {} }); return ok; } },
          { t: 'Una tarjeta marca stock bajo con clase propia', pts: 5, f: function () { return !!q('.tarjeta.bajo, .tarjeta.agotado, .stock.bajo, .stock.alerta'); } }],
        solution: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Galería de productos</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <h1>Productos</h1>\n  <div class="galeria">\n    <div class="tarjeta">\n      <span class="etiqueta">Papelería</span>\n      <h3 class="nombre">Cuaderno</h3>\n      <p class="precio">$8.000</p>\n      <p class="stock">Stock: 10</p>\n      <button>Agregar al carrito</button>\n    </div>\n    <div class="tarjeta">\n      <span class="etiqueta">Papelería</span>\n      <h3 class="nombre">Lapicero</h3>\n      <p class="precio">$2.000</p>\n      <p class="stock">Stock: 50</p>\n      <button>Agregar al carrito</button>\n    </div>\n    <div class="tarjeta">\n      <span class="etiqueta">Tecnología</span>\n      <h3 class="nombre">Memoria USB</h3>\n      <p class="precio">$35.000</p>\n      <p class="stock bajo">¡Quedan 3!</p>\n      <button>Agregar al carrito</button>\n    </div>\n  </div>\n</body>\n</html>' }, { name: 'styles.css', code: '* { box-sizing: border-box; }\nbody { font-family: "Public Sans", sans-serif; margin: 0; padding: 20px; color: #14221B; background: #F6F3EC; }\n.galeria { display: flex; flex-wrap: wrap; gap: 16px; }\n.tarjeta { flex: 1 1 200px; padding: 20px; border: 1px solid #9AAEA3; border-radius: 8px; background: #fff; }\n.etiqueta { display: inline-block; background: #1E5B43; color: #fff; padding: 2px 10px; border-radius: 999px; font-size: 12px; }\n.nombre { margin: 10px 0 4px; }\n.precio { font-size: 24px; font-weight: 700; margin: 0; }\n.stock { color: #555; }\n.stock.bajo { color: #B02A2A; font-weight: 600; }\nbutton { background: #B7862A; color: #fff; border: 0; padding: 10px 14px; border-radius: 6px; cursor: pointer; }\nbutton:hover { background: #8C6620; }' }] },
      { t: 'check', title: 'Cierre del módulo', items: ['Mis tarjetas funcionan con 3, 5 y 8 productos', 'Usé clases para estilizar y evité estilos en línea', 'Apliqué border-box globalmente', 'Probé el resultado con F12 y vi el diagrama de caja', 'Hice commit: feat: galería de productos con flexbox'] }
    ]
  });
})();
