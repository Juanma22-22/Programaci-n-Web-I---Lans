/* Módulo 3 · Responsive design y frameworks de utilidad */
(function () {
  var C = Course;

  var CARDS_HTML = '<header class="top"><b>MiTienda</b><nav class="links"><a href="#">Inicio</a><a href="#">Productos</a><a href="#">Contacto</a></nav></header><section class="grid"><article class="card"><h3>Cuaderno</h3><p>$8.000</p></article><article class="card"><h3>Lapicero</h3><p>$2.000</p></article><article class="card"><h3>Memoria USB</h3><p>$35.000</p></article><article class="card"><h3>Borrador</h3><p>$1.000</p></article></section>';
  var MOBILE_FIRST = '*{box-sizing:border-box}body{margin:0;font-family:sans-serif}.top{background:#1E5B43;color:#fff;padding:12px;display:flex;flex-direction:column;gap:8px}.links{display:flex;flex-direction:column;gap:4px}.links a{color:#fff}.grid{display:grid;grid-template-columns:1fr;gap:10px;padding:12px}.card{border:1px solid #9AAEA3;padding:14px;background:#fff;color:#14221B}.card h3{margin:0 0 6px}.card p{margin:0}' +
    '@media (min-width:640px){.top{flex-direction:row;justify-content:space-between;align-items:center}.links{flex-direction:row;gap:16px}.grid{grid-template-columns:repeat(2,1fr)}}' +
    '@media (min-width:1024px){.grid{grid-template-columns:repeat(4,1fr)}}';

  /* ===== 3.1a viewport y mobile-first ===== */
  C.add({
    id: '3.1a',
    lead: 'Más de la mitad del tráfico web llega desde un celular. Diseñar primero para la pantalla pequeña no es una moda: es la forma más simple de que una página funcione en todas.',
    blocks: [
      { t: 'h', text: 'El problema: pantallas de todos los tamaños', min: 20 },
      { t: 'ana', title: 'Analogía: el agua y el recipiente', rows: [
        ['El contenido', 'El agua: no tiene forma propia.'],
        ['El dispositivo', 'El recipiente: un vaso, una jarra, una botella.'],
        ['El diseño responsive', 'El agua toma la forma del recipiente sin derramarse ni quedar vacía.']] },
      { t: 'h', text: 'La etiqueta viewport', min: 25 },
      { t: 'p', html: '<p>Los celulares simulan por defecto una pantalla de unos 980 px para que los sitios antiguos “quepan”. El resultado: letra diminuta y zoom manual. La etiqueta <code>viewport</code> le dice al navegador móvil que use el ancho real del dispositivo.</p>' },
      { t: 'hot', parts: [['<meta', 0], [' name="viewport"', 1], [' content="', 2], ['width=device-width', 3], [', ', null], ['initial-scale=1.0', 4], ['">', 2]],
        notes: [['Etiqueta de metadatos', 'Va dentro del <code>&lt;head&gt;</code>. No se dibuja, configura la página.'], ['name="viewport"', 'Identifica que el ajuste es del área visible.'], ['content', 'Lista de opciones separadas por comas.'], ['width=device-width', 'El ancho del diseño es el ancho real de la pantalla del dispositivo, no un valor fijo.'], ['initial-scale=1.0', 'Sin zoom al cargar: 1 píxel CSS = 1 unidad del dispositivo.']] },
      { t: 'note', kind: 'warn', html: '<p>Sin esta etiqueta, las media queries del resto de la clase <b>no funcionan en el celular</b>. Es la causa número uno de “mi diseño responsive no responde”.</p>' },
      { t: 'h', text: 'Mobile-First y media queries', min: 35 },
      { t: 'p', html: '<p><b>Mobile-First</b> significa escribir primero los estilos base para el celular (una columna, botones grandes) y luego <i>agregar</i> mejoras con <code>min-width</code> a medida que la pantalla crece. El móvil carga solo lo necesario.</p>' },
      { t: 'table', head: ['Punto de quiebre', 'Ancho mínimo', 'Dispositivo típico'], rows: [['Base', 'sin media query', 'Celular vertical (320 – 639 px)'], ['<code>sm</code>', '640 px', 'Celular horizontal / tablet pequeña'], ['<code>md</code>', '768 px', 'Tablet'], ['<code>lg</code>', '1024 px', 'Portátil'], ['<code>xl</code>', '1280 px', 'Escritorio']] },
      { t: 'code', lang: 'css', title: 'styles.css (mobile-first)', code: '/* Base: celular */\n.grid { display: grid; grid-template-columns: 1fr; gap: 10px; }\n\n/* Desde 640px: dos columnas */\n@media (min-width: 640px) {\n  .grid { grid-template-columns: repeat(2, 1fr); }\n}\n\n/* Desde 1024px: cuatro columnas */\n@media (min-width: 1024px) {\n  .grid { grid-template-columns: repeat(4, 1fr); }\n}' },
      { t: 'device', title: 'Arrastra el ancho y mira cómo se reorganiza', html: CARDS_HTML, css: MOBILE_FIRST, bps: [[640, 'sm (≥ 640 px)'], [1024, 'lg (≥ 1024 px)']], height: 360 },
      { t: 'h', text: 'Herramientas modernas para adaptar', min: 30 },
      { t: 'cards', items: [
        { h: 'Imágenes fluidas', html: '<pre class="mono-box">img {\n  max-width: 100%;\n  height: auto;\n}</pre>' },
        { h: 'CSS Grid auto-fit', html: '<pre class="mono-box">.grid {\n  display: grid;\n  grid-template-columns:\n    repeat(auto-fit, minmax(220px, 1fr));\n  gap: 16px;\n}</pre><p>Sin media queries: tantas columnas como quepan.</p>' },
        { h: 'Tipografía fluida', html: '<pre class="mono-box">h1 { font-size: clamp(1.5rem, 4vw, 3rem); }</pre><p>Nunca menos de 1.5rem ni más de 3rem.</p>' },
        { h: 'Zonas táctiles', html: '<p>Los botones deben medir al menos <b>44 × 44 px</b> para que un dedo los pulse sin error.</p>' }] },
      { t: 'play', title: 'Grid auto-fit en acción', intro: 'Cambia el ancho mínimo de cada tarjeta dentro de una vista de 520 px.',
        controls: [{ k: 'min', label: 'minmax mínimo', type: 'range', min: 80, max: 300, val: 140, unit: 'px' }],
        html: '<div class="g"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div></div>', css: '.g{display:grid;grid-template-columns:repeat(auto-fit,minmax({{min}}px,1fr));gap:8px;width:520px;max-width:100%}.g div{background:#1E5B43;color:#fff;padding:20px;text-align:center}',
        readout: function (v) { return 'Caben <b>' + Math.max(1, Math.floor((520 + 8) / (+v.min + 8))) + '</b> columnas en 520 px.'; } },
      { t: 'h', text: 'Laboratorio: tu página que se adapta', min: 55 },
      { t: 'lab', id: 'resp', title: 'Convierte la maqueta a mobile-first', intro: 'La vista previa mide menos de 640px: verás la versión móvil. Las pruebas leen la hoja de estilos para verificar tus media queries.', height: 440,
        files: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <!-- 1. Falta la etiqueta viewport -->\n  <title>Responsive</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <h1>Catálogo</h1>\n  <section class="grid">\n    <article class="card">Cuaderno</article>\n    <article class="card">Lapicero</article>\n    <article class="card">Memoria USB</article>\n    <article class="card">Borrador</article>\n  </section>\n  <img src="" alt="Banner" class="banner">\n</body>\n</html>' }, { name: 'styles.css', code: '* { box-sizing: border-box; }\nbody { margin: 0; padding: 12px; font-family: sans-serif; }\n.card { border: 1px solid #9AAEA3; padding: 18px; }\n\n/* 2. .grid: grid de una columna con gap 12px (móvil)\n   3. Desde 640px: 2 columnas. Desde 1024px: 4 columnas\n   4. img: max-width 100% y height auto\n   5. h1: tamaño fluido con clamp() */\n' }],
        tests: [
          { t: 'Meta viewport con width=device-width', pts: 1, f: function () { var m = q('meta[name="viewport"]'); return !!m && /width=device-width/.test(m.content); } },
          { t: '.grid usa display:grid', f: function () { return cs(q('.grid'), 'display') === 'grid'; } },
          { t: 'Gap de 12px', f: function () { return px(cs(q('.grid'), 'rowGap')) === 12; } },
          { t: 'Una media query con min-width: 640px', f: function () { var ok = false; [].slice.call(document.styleSheets).forEach(function (s) { try { [].slice.call(s.cssRules).forEach(function (r) { if (r.media && /min-width:\s*640px/.test(r.conditionText || r.media.mediaText)) ok = true; }); } catch (e) {} }); return ok; } },
          { t: 'Una media query con min-width: 1024px', f: function () { var ok = false; [].slice.call(document.styleSheets).forEach(function (s) { try { [].slice.call(s.cssRules).forEach(function (r) { if (r.media && /min-width:\s*1024px/.test(r.conditionText || r.media.mediaText)) ok = true; }); } catch (e) {} }); return ok; } },
          { t: 'En el ancho actual hay una sola columna (mobile-first)', f: function () { return innerWidth >= 640 || cs(q('.grid'), 'gridTemplateColumns').split(' ').length === 1; } },
          { t: 'Imágenes con max-width: 100%', f: function () { return cs(q('img'), 'maxWidth') === '100%'; } },
          { t: 'h1 con tamaño fluido (clamp en el CSS)', f: function () { return /clamp\(/.test(FILES['styles.css']); } }],
        solution: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Responsive</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <h1>Catálogo</h1>\n  <section class="grid">\n    <article class="card">Cuaderno</article>\n    <article class="card">Lapicero</article>\n    <article class="card">Memoria USB</article>\n    <article class="card">Borrador</article>\n  </section>\n  <img src="" alt="Banner" class="banner">\n</body>\n</html>' }, { name: 'styles.css', code: '* { box-sizing: border-box; }\nbody { margin: 0; padding: 12px; font-family: sans-serif; }\n.card { border: 1px solid #9AAEA3; padding: 18px; }\n.grid { display: grid; grid-template-columns: 1fr; gap: 12px; }\nimg { max-width: 100%; height: auto; }\nh1 { font-size: clamp(1.5rem, 4vw, 3rem); }\n@media (min-width: 640px) {\n  .grid { grid-template-columns: repeat(2, 1fr); }\n}\n@media (min-width: 1024px) {\n  .grid { grid-template-columns: repeat(4, 1fr); }\n}' }] },
      { t: 'quiz', qs: [
        ['¿Qué problema resuelve la etiqueta viewport?', ['Que el celular use el ancho real de su pantalla', 'Que la página cargue más rápido', 'Que se vean mejor las imágenes'], 0, 'Sin ella, el móvil simula 980 px.'],
        ['En Mobile-First, las media queries usan…', ['min-width', 'max-width', 'width exacto'], 0, 'Agregas mejoras a medida que crece la pantalla.'],
        ['¿Qué logra max-width: 100% en una imagen?', ['Que nunca se salga de su contenedor', 'Que ocupe toda la pantalla', 'Que se estire'], 0, 'Se encoge, pero no se agranda más que su tamaño real.'],
        ['El tamaño mínimo recomendado para un botón táctil es…', ['16 × 16 px', '44 × 44 px', '100 × 100 px'], 1, 'Un dedo es más grande que un cursor.']] }
    ]
  });

  /* ===== 3.1b Tailwind CSS ===== */
  var TW = {
    flex: 'display:flex', grid: 'display:grid', block: 'display:block', hidden: 'display:none', 'flex-col': 'flex-direction:column', 'flex-wrap': 'flex-wrap:wrap', 'items-center': 'align-items:center', 'items-start': 'align-items:flex-start', 'justify-center': 'justify-content:center', 'justify-between': 'justify-content:space-between', 'text-center': 'text-align:center', 'font-bold': 'font-weight:700', 'font-semibold': 'font-weight:600', uppercase: 'text-transform:uppercase', 'w-full': 'width:100%', 'rounded': 'border-radius:.25rem', 'rounded-lg': 'border-radius:.5rem', 'rounded-full': 'border-radius:9999px', 'border': 'border-width:1px;border-style:solid;border-color:#d1d5db', 'shadow': 'box-shadow:0 1px 3px rgba(0,0,0,.2)', 'shadow-lg': 'box-shadow:0 10px 15px rgba(0,0,0,.2)',
    'text-white': 'color:#fff', 'text-gray-600': 'color:#4b5563', 'text-green-700': 'color:#15803d', 'bg-white': 'background:#fff', 'bg-gray-100': 'background:#f3f4f6', 'bg-green-700': 'background:#15803d', 'bg-amber-500': 'background:#f59e0b', 'bg-red-600': 'background:#dc2626', 'border-green-700': 'border-color:#15803d',
    'text-sm': 'font-size:.875rem', 'text-base': 'font-size:1rem', 'text-xl': 'font-size:1.25rem', 'text-2xl': 'font-size:1.5rem', 'text-4xl': 'font-size:2.25rem'
  };
  function twRule(c) {
    var sp = { p: 'padding', m: 'margin', gap: 'gap' }, m;
    if (TW[c]) return TW[c];
    if ((m = c.match(/^(p|m)([xytblr]?)-(\d+(?:\.\d+)?)$/))) { var v = (m[3] * 0.25) + 'rem', side = { x: ['-left', '-right'], y: ['-top', '-bottom'], t: ['-top'], b: ['-bottom'], l: ['-left'], r: ['-right'], '': [''] }[m[2]]; return side.map(function (s) { return sp[m[1]] + s + ':' + v; }).join(';'); }
    if ((m = c.match(/^gap-(\d+)$/))) return 'gap:' + (m[1] * 0.25) + 'rem';
    if ((m = c.match(/^grid-cols-(\d+)$/))) return 'grid-template-columns:repeat(' + m[1] + ',minmax(0,1fr))';
    if ((m = c.match(/^w-(\d+)$/))) return 'width:' + (m[1] * 0.25) + 'rem';
    if ((m = c.match(/^h-(\d+)$/))) return 'height:' + (m[1] * 0.25) + 'rem';
    return null;
  }
  C.add({
    id: '3.1b',
    lead: 'Tailwind CSS cambia la pregunta: en lugar de inventar nombres de clases y escribir un archivo CSS, compones el diseño con pequeñas clases de utilidad directamente en el HTML.',
    blocks: [
      { t: 'h', text: 'CSS tradicional frente a utilidades', min: 25 },
      { t: 'cards', items: [
        { h: 'CSS tradicional', html: '<pre class="mono-box">.btn {\n  background: #15803d;\n  color: #fff;\n  padding: .5rem 1rem;\n  border-radius: .5rem;\n}</pre><pre class="mono-box">&lt;button class="btn"&gt;Comprar&lt;/button&gt;</pre><p>Inventas nombres y vas y vienes entre dos archivos.</p>' },
        { h: 'Tailwind CSS', html: '<pre class="mono-box">&lt;button class="bg-green-700 text-white\n  px-4 py-2 rounded-lg"&gt;\n  Comprar\n&lt;/button&gt;</pre><p>Cada clase hace una sola cosa. Todo el diseño está a la vista.</p>' }] },
      { t: 'ana', title: 'Analogía: bloques de LEGO', rows: [
        ['CSS tradicional', 'Un juguete prefabricado: bonito, pero tal cual lo diseñaron.'],
        ['Tailwind', 'Piezas pequeñas (<code>p-4</code>, <code>rounded</code>, <code>flex</code>) que combinas para armar lo que imaginas.']] },
      { t: 'h', text: 'Instalación para el curso', min: 15 },
      { t: 'code', lang: 'html', title: 'index.html', code: '<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Tailwind</title>\n  <script src="https://cdn.tailwindcss.com"></script>\n</head>' },
      { t: 'note', kind: 'tip', html: '<p>Esta línea (la versión CDN) es ideal para aprender y hacer prototipos. En producción, Tailwind se instala con npm y genera un CSS pequeño con solo las clases que usas; lo veremos al desplegar.</p>' },
      { t: 'h', text: 'El vocabulario esencial', min: 40 },
      { t: 'table', head: ['Familia', 'Clases', 'Equivale a'], rows: [
        ['Espaciado', '<code>p-4</code>, <code>px-6</code>, <code>mt-2</code>, <code>gap-4</code>', 'padding / margin / gap en múltiplos de .25rem'],
        ['Tipografía', '<code>text-xl</code>, <code>font-bold</code>, <code>text-center</code>, <code>uppercase</code>', 'tamaño, grosor, alineación, transformación'],
        ['Color', '<code>bg-green-700</code>, <code>text-white</code>, <code>border-gray-300</code>', 'fondo, texto, borde'],
        ['Layout', '<code>flex</code>, <code>justify-between</code>, <code>items-center</code>, <code>grid grid-cols-3</code>', 'Flexbox y Grid'],
        ['Bordes y sombras', '<code>rounded-lg</code>, <code>border</code>, <code>shadow-lg</code>', 'radius, border, box-shadow'],
        ['Tamaño', '<code>w-full</code>, <code>h-12</code>, <code>max-w-md</code>', 'width / height / max-width']] },
      { t: 'h', text: 'Variantes: responsive y estados con prefijos', min: 30 },
      { t: 'p', html: '<p>Un prefijo antes de la clase la hace condicional. <code>md:</code> aplica desde 768 px (mobile-first, igual que <code>min-width</code>); <code>hover:</code> al pasar el cursor; <code>focus:</code> al enfocar; <code>dark:</code> en modo oscuro.</p>' },
      { t: 'code', lang: 'html', title: 'tarjeta.html', code: '<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">\n  <article class="rounded-lg border p-4 shadow hover:shadow-lg">\n    <h3 class="text-xl font-bold">Cuaderno</h3>\n    <p class="text-gray-600">$8.000</p>\n    <button class="mt-3 rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800">\n      Agregar\n    </button>\n  </article>\n</div>' },
      { t: 'custom', build: function (w, x, U) {
        var el = U.el, esc = U.esc, box = el('div', { class: 'play' });
        box.appendChild(el('h4', null, 'Traductor de utilidades a CSS'));
        box.appendChild(el('p', { class: 'hint' }, 'Escribe clases de Tailwind. Esta versión de práctica conoce las más comunes y te muestra el CSS que producen.'));
        var inp = el('input', { type: 'text', 'aria-label': 'Clases de Tailwind', value: 'bg-green-700 text-white p-4 rounded-lg shadow text-xl font-bold', style: 'width:100%;padding:8px;font:14px JetBrains Mono,monospace;border:1px solid var(--ln);background:var(--sf);color:var(--ink)' });
        var host = el('div', { class: 'stagebox' }), sh = host.attachShadow({ mode: 'open' }), tb = el('div');
        box.appendChild(inp); box.appendChild(host); box.appendChild(tb);
        function run() {
          var cls = inp.value.split(/\s+/).filter(Boolean), css = '', rows = '';
          cls.forEach(function (c) { var r = twRule(c); rows += '<tr><td><code>' + esc(c) + '</code></td><td>' + (r ? '<code>' + esc(r.replace(/;/g, '; ')) + '</code>' : '<span class="hint">no incluida en esta práctica</span>') + '</td></tr>'; if (r) css += '.x{' + r + '}'; });
          var one = cls.map(twRule).filter(Boolean).join(';');
          sh.innerHTML = '<style>.x{' + one + '}</style><div class="x">Programación Web 1</div>';
          tb.innerHTML = '<div class="tbl"><table><thead><tr><th>Clase</th><th>CSS</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
        }
        inp.oninput = run; w.appendChild(box); run();
      } },
      { t: 'h', text: 'Laboratorio: componentes con Tailwind', min: 60 },
      { t: 'lab', id: 'tw', title: 'Tarjeta de producto y barra de navegación', intro: 'Esta vista carga Tailwind desde su CDN; necesitas internet. Las pruebas leen las clases que escribes en el HTML.', height: 460,
        files: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Tailwind</title>\n  <script src="https://cdn.tailwindcss.com"></script>\n</head>\n<body class="bg-gray-100 p-4">\n  <!-- 1. nav: flex, justify-between, items-center, bg-green-700, text-white, p-4 -->\n  <nav>\n    <span>MiTienda</span>\n    <a href="#">Carrito</a>\n  </nav>\n\n  <!-- 2. section: grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4 -->\n  <section>\n    <!-- 3. Tres article: bg-white, rounded-lg, shadow, p-4, hover:shadow-lg -->\n    <article>\n      <h3>Cuaderno</h3>\n      <p>$8.000</p>\n      <!-- 4. button: bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 -->\n      <button>Agregar</button>\n    </article>\n  </section>\n</body>\n</html>' }],
        tests: [
          { t: 'Tailwind está cargado desde el CDN', f: function () { return !!q('script[src*="tailwindcss"]'); } },
          { t: 'nav con flex justify-between items-center', f: function () { var n = q('nav'); return ['flex', 'justify-between', 'items-center'].every(function (c) { return n.classList.contains(c); }); } },
          { t: 'nav con fondo verde, texto blanco y padding', f: function () { var n = q('nav'); return n.classList.contains('bg-green-700') && n.classList.contains('text-white') && /^p[xy]?-\d/.test(n.className.split(/\s+/).filter(function (c) { return /^p[xy]?-\d/.test(c); })[0] || ''); } },
          { t: 'Grid responsive: grid-cols-1, sm:grid-cols-2, lg:grid-cols-3', f: function () { var s = q('section'); return s.classList.contains('grid') && s.classList.contains('grid-cols-1') && s.classList.contains('sm:grid-cols-2') && s.classList.contains('lg:grid-cols-3'); } },
          { t: 'Hay al menos 3 <article>', f: function () { return qa('article').length >= 3; } },
          { t: 'Cada article con bg-white rounded-lg shadow p-4', f: function () { return qa('article').every(function (a) { return ['bg-white', 'rounded-lg', 'shadow'].every(function (c) { return a.classList.contains(c); }); }); } },
          { t: 'Efecto hover:shadow-lg en las tarjetas', f: function () { return qa('article').every(function (a) { return a.classList.contains('hover:shadow-lg'); }); } },
          { t: 'Botones con bg-green-700, text-white y hover:bg-green-800', f: function () { return qa('button').length > 0 && qa('button').every(function (b) { return b.classList.contains('bg-green-700') && b.classList.contains('text-white') && b.classList.contains('hover:bg-green-800'); }); } }],
        solution: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Tailwind</title>\n  <script src="https://cdn.tailwindcss.com"></script>\n</head>\n<body class="bg-gray-100 p-4">\n  <nav class="flex justify-between items-center bg-green-700 text-white p-4">\n    <span>MiTienda</span>\n    <a href="#">Carrito</a>\n  </nav>\n  <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">\n    <article class="bg-white rounded-lg shadow p-4 hover:shadow-lg">\n      <h3 class="text-xl font-bold">Cuaderno</h3>\n      <p>$8.000</p>\n      <button class="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">Agregar</button>\n    </article>\n    <article class="bg-white rounded-lg shadow p-4 hover:shadow-lg">\n      <h3 class="text-xl font-bold">Cuaderno</h3>\n      <p>$8.000</p>\n      <button class="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">Agregar</button>\n    </article>\n    <article class="bg-white rounded-lg shadow p-4 hover:shadow-lg">\n      <h3 class="text-xl font-bold">Cuaderno</h3>\n      <p>$8.000</p>\n      <button class="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">Agregar</button>\n    </article>\n  </section>\n</body>\n</html>' }] },
      { t: 'note', kind: 'key', html: '<p>Una objeción común: “el HTML queda lleno de clases”. La respuesta está en el reuso: cuando repites un patrón, lo conviertes en un componente (una función, una plantilla). Lo haremos con JavaScript en el Módulo 4.</p>' },
      { t: 'quiz', qs: [
        ['¿Qué significa md:flex?', ['Flex siempre', 'Flex desde 768 px', 'Flex solo en celular'], 1, 'Los prefijos son mobile-first.'],
        ['p-4 equivale a…', ['padding: 4px', 'padding: 1rem', 'margin: 1rem'], 1, '4 × 0.25rem = 1rem.'],
        ['¿Qué hace hover:bg-green-800?', ['Cambia el fondo al pasar el cursor', 'Cambia el fondo siempre', 'Oculta el elemento'], 0, 'Es una variante de estado.'],
        ['¿Qué ventaja tiene Tailwind?', ['No necesitas inventar nombres de clases', 'No usa CSS', 'Elimina los media queries'], 0, 'Compones con utilidades ya definidas.']] }
    ]
  });

  /* ===== 3.t Taller formulario ===== */
  C.add({
    id: '3.t',
    lead: 'Los formularios son el punto donde el usuario te da datos y donde más se rompen las aplicaciones. Construimos un registro accesible, responsive y validado.',
    blocks: [
      { t: 'h', text: 'Anatomía de un buen formulario', min: 25 },
      { t: 'cards', items: [
        { h: 'Etiqueta asociada', html: '<p>Cada campo lleva un <code>&lt;label for="id"&gt;</code>. Hace clic en el texto para enfocar y los lectores de pantalla lo leen.</p>' },
        { h: 'Tipo correcto', html: '<p><code>email</code>, <code>password</code>, <code>number</code>, <code>tel</code>, <code>date</code>: el móvil muestra el teclado adecuado.</p>' },
        { h: 'Validación nativa', html: '<p><code>required</code>, <code>minlength</code>, <code>pattern</code>, <code>min</code>/<code>max</code>: el navegador bloquea el envío y avisa.</p>' },
        { h: 'Validación con JavaScript', html: '<p>Para reglas que HTML no sabe: “las contraseñas deben coincidir”. Se usa <code>setCustomValidity</code>.</p>' }] },
      { t: 'note', kind: 'warn', html: '<p>La validación en el navegador es para <b>ayudar al usuario</b>, no para proteger. Un atacante puede saltársela, por eso el servidor siempre debe validar de nuevo.</p>' },
      { t: 'code', lang: 'html', title: 'registro.html', code: '<form id="registro" novalidate>\n  <label for="correo">Correo</label>\n  <input type="email" id="correo" name="correo" required>\n\n  <label for="clave">Contraseña (mínimo 8)</label>\n  <input type="password" id="clave" name="clave" minlength="8" required>\n\n  <label for="edad">Edad</label>\n  <input type="number" id="edad" min="16" max="99">\n\n  <button type="submit">Registrarme</button>\n</form>' },
      { t: 'table', head: ['Atributo', 'Efecto', 'Pseudoclase CSS'], rows: [['<code>required</code>', 'El campo no puede quedar vacío', '<code>:required</code>'], ['<code>minlength="8"</code>', 'Mínimo de caracteres', '<code>:invalid</code>'], ['<code>pattern="[A-Za-z]+"</code>', 'Debe cumplir la expresión regular', '<code>:invalid</code> / <code>:valid</code>'], ['<code>type="email"</code>', 'Debe parecer un correo', '<code>:invalid</code>']] },
      { t: 'h', text: 'Taller 3.1: formulario de registro', min: 120 },
      { t: 'note', kind: 'mision', html: '<p>Construye el registro de una plataforma de cursos. Campos con estos <code>id</code>: <code>nombre</code>, <code>correo</code>, <code>clave</code>, <code>confirmar</code>, <code>terminos</code>. Debe verse bien en celular, mostrar mensajes de error claros y no dejar enviar con datos inválidos.</p>' },
      { t: 'lab', id: 'form', title: 'Registro con validaciones', intro: 'Tres archivos: HTML, CSS y JavaScript. Las pruebas escriben datos de ejemplo en tus campos para verificar la validación.', points: true, height: 520,
        files: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Registro</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <main>\n    <h1>Crea tu cuenta</h1>\n    <form id="registro">\n      <!-- label + input por cada campo: nombre, correo, clave, confirmar, terminos (checkbox) -->\n      <!-- p.error vacío bajo cada campo para mostrar mensajes -->\n      <button type="submit">Registrarme</button>\n    </form>\n    <p id="estado" role="status"></p>\n  </main>\n  <script src="app.js"></script>\n</body>\n</html>' }, { name: 'styles.css', code: '* { box-sizing: border-box; }\nbody { margin: 0; font-family: sans-serif; background: #F6F3EC; }\nmain { max-width: 420px; margin: 0 auto; padding: 20px; }\n\n/* input:invalid después de interactuar: borde rojo; input:valid: borde verde */\n/* .error: color rojo, tamaño pequeño */\n/* button: ancho completo, mínimo 44px de alto */\n' }, { name: 'app.js', code: 'const form = document.getElementById("registro");\n// 1. Cuando cambien clave o confirmar, si no coinciden usa\n//    confirmar.setCustomValidity("Las contraseñas no coinciden"); si coinciden, setCustomValidity("")\n// 2. En submit: preventDefault(); si form.checkValidity() muestra "¡Cuenta creada!" en #estado\n//    si no, form.reportValidity()\n' }],
        tests: [
          { t: 'Meta viewport', pts: 5, f: function () { return !!q('meta[name="viewport"]'); } },
          { t: 'Los cinco campos existen con los id pedidos', pts: 10, f: function () { return ['nombre', 'correo', 'clave', 'confirmar', 'terminos'].every(function (i) { return !!document.getElementById(i); }); } },
          { t: 'Cada campo tiene su <label for>', pts: 10, f: function () { return ['nombre', 'correo', 'clave', 'confirmar', 'terminos'].every(function (i) { return !!q('label[for="' + i + '"]'); }); } },
          { t: 'correo es type="email"; claves son type="password"', pts: 10, f: function () { var g = function (i) { var e = document.getElementById(i); return e && e.type; }; return g('correo') === 'email' && g('clave') === 'password' && g('confirmar') === 'password'; } },
          { t: 'nombre, correo y clave son required', pts: 10, f: function () { return ['nombre', 'correo', 'clave'].every(function (i) { var e = document.getElementById(i); return e && e.required; }); } },
          { t: 'clave exige mínimo 8 caracteres', pts: 10, f: function () { var e = document.getElementById('clave'); return !!e && e.minLength >= 8; } },
          { t: 'El formulario vacío no es válido', pts: 5, f: function () { return !document.getElementById('registro').checkValidity(); } },
          { t: 'Contraseñas distintas: el formulario sigue inválido', pts: 15, f: function () { var g = function (i) { return document.getElementById(i); }; g('nombre').value = 'Ana Gómez'; g('correo').value = 'ana@ucaldas.edu.co'; g('clave').value = 'Abcdef12'; g('confirmar').value = 'otra-cosa'; g('terminos').checked = true; ['clave', 'confirmar'].forEach(function (i) { g(i).dispatchEvent(new Event('input', { bubbles: true })); }); return !g('registro').checkValidity(); } },
          { t: 'Datos correctos: el formulario es válido', pts: 15, f: function () { var g = function (i) { return document.getElementById(i); }; g('confirmar').value = 'Abcdef12'; g('confirmar').dispatchEvent(new Event('input', { bubbles: true })); g('clave').dispatchEvent(new Event('input', { bubbles: true })); return g('registro').checkValidity(); } },
          { t: 'Botón de al menos 44px de alto', pts: 5, f: function () { return q('button').getBoundingClientRect().height >= 44; } },
          { t: 'Estilos para :invalid o :valid en el CSS', pts: 5, f: function () { return /:(in)?valid/.test(FILES['styles.css']); } }],
        solution: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Registro</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <main>\n    <h1>Crea tu cuenta</h1>\n    <form id="registro">\n      <label for="nombre">Nombre completo</label>\n      <input type="text" id="nombre" required>\n      <p class="error"></p>\n    \n      <label for="correo">Correo</label>\n      <input type="email" id="correo" required>\n      <p class="error"></p>\n    \n      <label for="clave">Contraseña</label>\n      <input type="password" id="clave" minlength="8" required>\n      <p class="error"></p>\n    \n      <label for="confirmar">Confirmar contraseña</label>\n      <input type="password" id="confirmar" required>\n      <p class="error"></p>\n    \n      <input type="checkbox" id="terminos" required>\n      <label for="terminos">Acepto los términos</label>\n      <button type="submit">Registrarme</button>\n    </form>\n    <p id="estado" role="status"></p>\n  </main>\n  <script src="app.js"></script>\n</body>\n</html>' }, { name: 'app.js', code: 'const form = document.getElementById("registro");\nconst clave = document.getElementById("clave");\nconst confirmar = document.getElementById("confirmar");\nfunction comparar() {\n  confirmar.setCustomValidity(clave.value === confirmar.value ? "" : "Las contraseñas no coinciden");\n}\nclave.addEventListener("input", comparar);\nconfirmar.addEventListener("input", comparar);\nform.addEventListener("submit", (e) => {\n  e.preventDefault();\n  if (form.checkValidity()) {\n    document.getElementById("estado").textContent = "¡Cuenta creada!";\n  } else {\n    form.reportValidity();\n  }\n});' }, { name: 'styles.css', code: '* { box-sizing: border-box; }\nbody { margin: 0; font-family: sans-serif; background: #F6F3EC; }\nmain { max-width: 420px; margin: 0 auto; padding: 20px; }\ninput { display: block; width: 100%; }\ninput:invalid:not(:placeholder-shown) { border-color: #B02A2A; }\ninput:valid { border-color: #2E7D5B; }\n.error { color: #B02A2A; font-size: 13px; }\nbutton { width: 100%; min-height: 44px; }' }] },
      { t: 'note', kind: 'tip', html: '<p>Reto extra: mientras el usuario escribe, muestra en el <code>p.error</code> el texto de <code>campo.validationMessage</code>, y habilita el botón solo cuando <code>form.checkValidity()</code> sea verdadero.</p>' },
      { t: 'check', title: 'Entrega', items: ['Formulario accesible: cada campo con su label', 'Validación nativa con required, type, minlength', 'Validación personalizada de contraseñas', 'Se ve bien a 360 px y a 1024 px', 'Commit: feat: formulario de registro con validaciones'] }
    ]
  });
})();
