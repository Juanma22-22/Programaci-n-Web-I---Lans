/* Módulo 1 · Introducción al desarrollo web y HTML5 */
(function () {
  var C = Course;
  var PIX = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="240" height="120"><rect width="240" height="120" fill="#1E5B43"/><text x="120" y="68" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#F4D77A">Imagen cargada</text></svg>');

  /* ===== 1.1a Cliente-servidor y anatomía de etiquetas ===== */
  C.add({
    id: '1.1a',
    lead: 'Antes de escribir una sola etiqueta hay que entender quién pide, quién responde y qué viaja entre los dos.',
    blocks: [
      { t: 'h', text: 'Arquitectura web: el modelo cliente-servidor', min: 40 },
      { t: 'p', html: '<p>Cuando escribes <code>https://www.google.com</code> y pulsas Enter ocurre una conversación entre dos actores. El <b>cliente</b> es tu dispositivo con su navegador: pide páginas y las dibuja. El <b>servidor</b> es un computador conectado todo el día a internet: escucha peticiones, ejecuta lógica (Java, Python, Node.js), consulta bases de datos como MySQL y devuelve una respuesta.</p>' },
      { t: 'ana', title: 'Analogía: el restaurante web', rows: [
        ['Comensal', 'El navegador. No entra a la cocina: mira el menú y pide.'],
        ['Mesero', 'El protocolo HTTP/HTTPS. Lleva la petición y trae la respuesta.'],
        ['Cocina y chef', 'El servidor: la lógica que aprendiste en Programación I y II.'],
        ['Alacena', 'La base de datos (Bases de Datos I): donde están los ingredientes.'],
        ['El plato servido', 'Tres archivos: HTML (la comida), CSS (el emplatado) y JavaScript (el efecto especial en la mesa).']] },
      { t: 'custom', build: function (w, x, U) {
        var el = U.el, esc = U.esc;
        var lanes = ['Navegador (cliente)', 'Servidor web', 'Base de datos'];
        var S = [[0, 1, 'GET /index.html', 'Escribes la URL y pulsas Enter. El navegador envía una petición HTTP.'], [1, 2, 'SELECT … FROM noticias', 'El servidor ejecuta su lógica y consulta la base de datos.'], [2, 1, 'Filas de resultados', 'La base de datos devuelve los registros pedidos.'], [1, 0, '200 OK + HTML', 'El servidor arma la respuesta y la envía como texto plano.'], [0, 1, 'GET /styles.css y /app.js', 'El navegador lee el HTML y descubre que necesita más archivos.'], [1, 0, '200 OK + CSS y JS', 'Llegan los estilos y el comportamiento.'], [0, 0, 'Renderizado', 'El navegador construye el DOM y dibuja la interfaz.']];
        var n = -1, box = el('div', { class: 'play' }); box.appendChild(el('h4', null, 'Una petición, paso a paso'));
        var head = el('div', { style: 'display:grid;grid-template-columns:repeat(3,1fr);gap:4px;text-align:center;font-weight:600;font-size:14px;margin-bottom:6px' }, lanes.map(function (l) { return '<div class="panel">' + l + '</div>'; }).join(''));
        box.appendChild(head); var rows = el('div'); box.appendChild(rows); var det = el('div', { class: 'note tip' }, '<b class="nt">Detalle</b>Pulsa “Siguiente paso” para empezar.'); box.appendChild(det);
        S.forEach(function (s, i) {
          var a = Math.min(s[0], s[1]), b = Math.max(s[0], s[1]), arrow = s[0] < s[1] ? '→ ' : s[0] > s[1] ? '← ' : '● ';
          rows.appendChild(el('div', { 'data-r': i, style: 'display:grid;grid-template-columns:repeat(3,1fr);gap:4px;opacity:.25;transition:opacity .3s;margin:4px 0' }, '<div class="mono-box" style="grid-column:' + (a + 1) + ' / ' + (b + 2) + ';text-align:center">' + arrow + esc(s[2]) + '</div>'));
        });
        var bar = el('div', { class: 'seg' }), nx = el('button', { class: 'on' }, 'Siguiente paso'), rs = el('button', null, 'Reiniciar');
        function draw() { U.$$('[data-r]', rows).forEach(function (r, i) { r.style.opacity = i <= n ? 1 : .25; r.firstChild.style.outline = i === n ? '2px solid #D9A845' : 'none'; }); if (n >= 0) det.innerHTML = '<b class="nt">Paso ' + (n + 1) + ' de ' + S.length + '</b>' + esc(S[n][3]); else det.innerHTML = '<b class="nt">Detalle</b>Pulsa “Siguiente paso” para empezar.'; }
        nx.onclick = function () { n = Math.min(S.length - 1, n + 1); draw(); }; rs.onclick = function () { n = -1; draw(); };
        bar.appendChild(nx); bar.appendChild(rs); box.appendChild(bar); w.appendChild(box); draw();
      } },
      { t: 'note', kind: 'key', html: '<p>El servidor no envía una “imagen” de la página: envía <b>texto plano</b> (HTML, CSS, JS). Es el navegador quien lo lee de arriba abajo y lo dibuja. En este curso nos concentramos en el cliente (frontend): maquetar la bandeja que recibe el usuario.</p>' },

      { t: 'h', text: 'HTML5 y la anatomía de una etiqueta', min: 40 },
      { t: 'p', html: '<p><b>HTML</b> significa <i>HyperText Markup Language</i>. <b>No es un lenguaje de programación</b>: no tiene variables, ciclos ni condicionales. Es un lenguaje de <i>marcado</i> que usa etiquetas para dar estructura y significado al contenido.</p>' },
      { t: 'hot', parts: [['<p', 0], [' class', 1], ['=', 1], ['"destacado"', 1], ['>', 0], ['Este es un párrafo de texto.', 2], ['</p', 3], ['>', 3]],
        notes: [['Etiqueta de apertura', 'Dice al navegador dónde empieza el elemento: el signo <code>&lt;</code>, el nombre de la etiqueta y <code>&gt;</code>.'], ['Atributo (nombre="valor")', 'Configuración extra dentro de la etiqueta de apertura. Aquí <code>class</code> vale <code>destacado</code> y servirá para dar estilo con CSS.'], ['Contenido', 'El texto u otros elementos que viven dentro del contenedor.'], ['Etiqueta de cierre', 'Se distingue por la barra <code>/</code> antes del nombre. Si la olvidas, el navegador “adivina” y la página se descuadra.']] },
      { t: 'cards', items: [
        { h: 'Pareadas (con contenido)', html: '<p>Abren y cierran, y encierran contenido: <code>&lt;h1&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;div&gt;</code>, <code>&lt;button&gt;</code>.</p>' },
        { h: 'Autocontenidas (void)', html: '<p>No encierran nada y no llevan cierre: <code>&lt;img&gt;</code>, <code>&lt;br&gt;</code>, <code>&lt;hr&gt;</code>, <code>&lt;input&gt;</code>.</p>' },
        { h: 'Atributos universales', html: '<p><code>class</code> (reutilizable), <code>id</code> (único en el documento) y <code>title</code> (tooltip). Específicos: <code>href</code>, <code>src</code>, <code>alt</code>.</p>' }] },
      { t: 'table', head: ['Buena práctica', 'Ejemplo'], rows: [['Etiquetas y atributos en minúsculas', '<code>&lt;p class="tarjeta"&gt;</code>'], ['Valores de atributos siempre entre comillas dobles', '<code>class="tarjeta"</code>, no <code>class=tarjeta</code>'], ['Sangría al anidar', 'Lo que está dentro de otra etiqueta se desplaza dos o cuatro espacios']] },

      { t: 'h', text: 'Demostración guiada: anatomía en vivo', min: 25 },
      { t: 'steps', items: [
        { t: 'Crea la carpeta clase1-html y el archivo index.html', html: '<p>Ábrelos en VS Code. Lanza la página con Live Server (clic derecho, “Open with Live Server”).</p>' },
        { t: 'Escribe el cascarón y las etiquetas de texto', html: '<p>Copia el código de abajo. Observa que el navegador no muestra <code>&lt;p&gt;</code> ni <code>&lt;h1&gt;</code>: los interpreta.</p>', code: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Anatomía de etiquetas</title>\n</head>\n<body>\n  <h1 id="titulo-pagina">Anatomía de las etiquetas HTML5</h1>\n  <p>HTML marca el contenido. Una palabra en <strong>negrita</strong> o en <em>cursiva</em>.</p>\n  <hr>\n  <a href="https://code.visualstudio.com" target="_blank" title="Ir a VS Code">Descargar VS Code</a>\n</body>\n</html>', lang: 'html', ct: 'index.html' },
        { t: 'Rompe algo a propósito', html: '<p>Borra una comilla de un atributo o un <code>&lt;/p&gt;</code>. Mira cómo el motor de renderizado intenta adivinar y la página cambia.</p>' }] },

      { t: 'h', text: 'Laboratorio: ficha técnica de un producto', min: 50 },
      { t: 'lab', id: 'ficha', title: 'Ficha técnica de un producto tecnológico', intro: 'Completa el documento. Las pruebas de la derecha se marcan solas a medida que cumples cada requisito.', height: 380, files: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>Ficha técnica</title>\n</head>\n<body>\n  <!-- 1. Agrega un <h1> con el nombre del producto y un id -->\n\n  <!-- 2. Un <p class="..."> con una palabra en <strong> y otra en <em> -->\n\n  <!-- 3. Una línea divisora <hr> -->\n\n  <!-- 4. Una <img> con src y alt -->\n\n  <!-- 5. Un <a> con href y target="_blank" -->\n\n</body>\n</html>' }],
        tests: [
          { t: 'Documento en modo estándar con lang="es"', f: function () { return document.compatMode === 'CSS1Compat' && document.documentElement.lang === 'es'; } },
          { t: '<h1> con el nombre del producto y un atributo id', f: function () { var h = q('h1'); return !!h && txt(h).length > 2 && h.id.length > 0; } },
          { t: '<p> con clase, que contiene <strong> y <em>', f: function () { return !!q('p[class] strong') && !!q('p[class] em'); } },
          { t: 'Una línea divisora <hr>', f: function () { return !!q('hr'); } },
          { t: 'Imagen con src y alt descriptivo', f: function () { var i = q('img'); return !!i && !!i.getAttribute('src') && (i.getAttribute('alt') || '').length > 3; } },
          { t: 'Enlace con href que abre en pestaña nueva', f: function () { var a = q('a[href]'); return !!a && a.target === '_blank'; } }],
        solution: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>Ficha técnica</title>\n</head>\n<body>\n  <h1 id="titulo-producto">Smartphone X10</h1>\n  <p class="descripcion">Un teléfono <strong>rápido</strong> con una cámara <em>sobresaliente</em>.</p>\n  <hr>\n  <img src="x10.jpg" alt="Smartphone X10 visto de frente">\n  <a href="https://example.com/x10" target="_blank">Comprar en la tienda oficial</a>\n</body>\n</html>' }] },
      { t: 'quiz', qs: [
        ['¿Qué tipo de lenguaje es HTML?', ['De programación orientado a objetos', 'De marcado', 'De consulta de datos'], 1, 'No tiene variables ni ciclos: marca la estructura del contenido.'],
        ['¿Cuál de estas etiquetas es autocontenida (no lleva cierre)?', ['<p>', '<img>', '<h1>'], 1, 'Las imágenes, <br>, <hr> e <input> no encierran contenido.'],
        ['En el restaurante web, ¿qué papel juega el protocolo HTTP?', ['El chef', 'El mesero', 'El menú'], 1, 'Lleva la petición a la cocina y trae la respuesta.'],
        ['¿Qué archivo se encarga del “emplatado” (presentación)?', ['HTML', 'CSS', 'JavaScript'], 1, 'HTML estructura, CSS decora y JavaScript da comportamiento.']] }
    ]
  });

  /* ===== 1.1b Estructura documental ===== */
  C.add({
    id: '1.1b',
    lead: 'Todo archivo HTML válido nace de la misma osamenta. Si la defines mal, el navegador entra en modo de compatibilidad y rompe tildes, imágenes y diseño móvil.',
    blocks: [
      { t: 'h', text: 'La osamenta del documento', min: 35 },
      { t: 'ana', title: 'Analogía: el pasaporte', rows: [
        ['<code>&lt;!DOCTYPE html&gt;</code>', 'El sello oficial: declara que el documento sigue el estándar HTML5.'],
        ['<code>&lt;html lang="es"&gt;</code>', 'El pasaporte completo. <code>lang</code> avisa el idioma a lectores de pantalla y traductores.'],
        ['<code>&lt;head&gt;</code>', 'Los datos administrativos que el navegador lee pero que no se imprimen en la foto.'],
        ['<code>&lt;body&gt;</code>', 'La página visible: todo lo que el usuario ve.']] },
      { t: 'hot', empty: 'Pasa el cursor por el esqueleto para ver qué hace cada parte.', parts: [
        ['<!DOCTYPE html>', 0], ['\n', null], ['<html lang="es">', 1], ['\n  ', null], ['<head>', 2], ['\n    ', null], ['<meta charset="UTF-8">', 3], ['\n    ', null], ['<meta name="viewport" content="width=device-width, initial-scale=1.0">', 4], ['\n    ', null], ['<title>Mi página</title>', 5], ['\n    ', null], ['<link rel="stylesheet" href="styles.css">', 6], ['\n  ', null], ['</head>', 2], ['\n  ', null], ['<body>', 7], ['\n    ', null], ['<h1>Hola</h1>', 7], ['\n  ', null], ['</body>', 7], ['\n', null], ['</html>', 1]],
        notes: [['DOCTYPE', 'Activa el <b>modo estándar</b>. Sin él, el navegador usa el <i>Quirks Mode</i> heredado y calcula mal tamaños y márgenes.'], ['Elemento raíz html', 'Encierra todo. El atributo <code>lang="es"</code> es clave para accesibilidad y SEO.'], ['head', 'Metainformación. Nada de lo que pongas aquí se dibuja, salvo el título en la pestaña.'], ['meta charset', 'Mapa de caracteres. Sin UTF-8 verás la ñ, las tildes y © como símbolos rotos.'], ['meta viewport', 'Sin esta etiqueta el celular dibuja la web como un monitor de escritorio y obliga a hacer zoom.'], ['title', 'Nombre en la pestaña, en favoritos y en el resultado de Google.'], ['link', 'Conecta un archivo CSS externo. Lo veremos a fondo en el Módulo 2.'], ['body', 'Contenedor de toda la interfaz: encabezados, párrafos, div, imágenes, botones, tablas.']] },
      { t: 'note', kind: 'tip', html: '<p>En VS Code, en un archivo <code>.html</code> vacío escribe <code>!</code> y pulsa <code>Tab</code>. <b>Emmet</b> genera todo el cascarón en un instante. Úsalo, pero tienes que entender cada línea.</p>' },

      { t: 'h', text: 'Demostración guiada en vivo', min: 25 },
      { t: 'steps', items: [
        { t: 'Genera el cascarón con Emmet', html: '<p>Crea <code>estructura.html</code>, escribe <code>!</code> y pulsa <code>Tab</code>.</p>' },
        { t: 'Personaliza el head', html: '<p>Agrega descripción, autor y el enlace al CSS.</p>', code: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <meta name="description" content="Página de la asignatura Programación para Entornos Web 1">\n  <meta name="author" content="Universidad de Caldas">\n  <title>Estructura estándar - Web 1</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <h1>Demostración de la estructura documental</h1>\n  <p>Observa la diferencia entre el <code>head</code> y el <code>body</code>.</p>\n</body>\n</html>', lang: 'html', ct: 'estructura.html' },
        { t: 'Inspecciona con F12', html: '<p>En la pestaña Elementos despliega <code>&lt;head&gt;</code>: existe en el DOM pero no ocupa espacio visual. Cambia el <code>&lt;title&gt;</code> y mira la pestaña del navegador.</p>' }] },

      { t: 'h', text: 'Laboratorio: tu cascarón técnico', min: 45 },
      { t: 'lab', id: 'cascaron', title: 'Cascarón con metadatos completos', intro: 'Parte del código roto: sin DOCTYPE, sin idioma y con la codificación mal puesta. Corrígelo hasta que todas las pruebas pasen. Cambia el DOCTYPE y mira cómo reaccionan las pruebas.', height: 380, files: [{ name: 'mi-estructura.html', code: '<html>\n<head>\n  <title>Mi página</title>\n</head>\n<body>\n  <p>Texto con ñ, tildes (á é í ó ú) y el símbolo ©.</p>\n</body>\n</html>' }],
        tests: [
          { t: 'DOCTYPE en la primera línea (modo estándar)', f: function () { return document.compatMode === 'CSS1Compat'; } },
          { t: '<html lang="es">', f: function () { return document.documentElement.lang === 'es'; } },
          { t: 'meta charset UTF-8', f: function () { var m = q('meta[charset]'); return !!m && m.getAttribute('charset').toLowerCase() === 'utf-8'; } },
          { t: 'meta viewport con width=device-width', f: function () { var m = q('meta[name="viewport"]'); return !!m && /width=device-width/.test(m.content); } },
          { t: 'meta author con tu nombre', f: function () { var m = q('meta[name="author"]'); return !!m && m.content.length > 2; } },
          { t: 'Título con el formato “Nombre - Módulo 1 Web 1”', f: function () { return /\S+\s*-\s*Módulo 1 Web 1/i.test(document.title); } },
          { t: 'Enlace a principal.css con <link>', f: function () { return /<link[^>]+href=["']principal\.css["']/i.test(SRC); } },
          { t: '<h1> “Página Estructurada Correctamente”', f: function () { return /Página Estructurada Correctamente/.test(txt(q('h1'))); } },
          { t: 'Un párrafo con ñ, tildes y ©', f: function () { var t = txt(q('p')); return /ñ/.test(t) && /[áéíóú]/.test(t) && /©/.test(t); } }],
        solution: [{ name: 'mi-estructura.html', code: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <meta name="author" content="Ana Gómez">\n  <title>Ana Gómez - Módulo 1 Web 1</title>\n  <link rel="stylesheet" href="principal.css">\n</head>\n<body>\n  <h1>Página Estructurada Correctamente</h1>\n  <p>Año nuevo, niño, canción y © 2026.</p>\n</body>\n</html>' }] },
      { t: 'quiz', qs: [
        ['¿Para qué sirve <!DOCTYPE html>?', ['Para importar CSS', 'Para activar el modo estándar del navegador', 'Para definir el título'], 1, 'Sin él entras en Quirks Mode.'],
        ['¿Qué pasa si falta <meta charset="UTF-8">?', ['Nada', 'La ñ y las tildes pueden verse rotas', 'El CSS no carga'], 1, 'El navegador no sabe qué mapa de caracteres usar.'],
        ['¿Qué contenido del <head> se dibuja en pantalla?', ['Ninguno, salvo el título en la pestaña', 'Todo', 'Solo los meta'], 0, 'El head es información para el navegador, no para el lienzo.'],
        ['¿Qué logra la etiqueta viewport?', ['Adaptar el ancho de la página al dispositivo', 'Cambiar la tipografía', 'Acelerar la carga'], 0, 'Es la base del diseño responsive.']] }
    ]
  });

  /* ===== 1.2a Texto, enlaces, listas e imágenes ===== */
  C.add({
    id: '1.2a',
    lead: 'Las etiquetas no existen para “hacer que se vea diferente” sino para dar significado a personas, buscadores y lectores de pantalla.',
    blocks: [
      { t: 'h', text: 'El periódico: jerarquía y significado', min: 35 },
      { t: 'ana', title: 'Analogía: la portada de un periódico', rows: [
        ['Titular principal', '<code>&lt;h1&gt;</code>: uno solo por página.'],
        ['Títulos de sección', '<code>&lt;h2&gt;</code> a <code>&lt;h6&gt;</code>: indican estructura, no tamaño.'],
        ['Cuerpo de la noticia', '<code>&lt;p&gt;</code> con <code>&lt;strong&gt;</code> (importancia) y <code>&lt;em&gt;</code> (énfasis).'],
        ['Puntos clave', '<code>&lt;ul&gt;</code> si el orden no importa, <code>&lt;ol&gt;</code> si es una secuencia.'],
        ['Fotografía y referencias', '<code>&lt;img&gt;</code> y <code>&lt;a&gt;</code>.']] },
      { t: 'custom', build: function (w, x, U) {
        var el = U.el, esc = U.esc, box = el('div', { class: 'play' });
        box.appendChild(el('h4', null, 'Detector de jerarquía de títulos'));
        box.appendChild(el('p', { class: 'hint' }, 'Edita el HTML. El esquema y las advertencias se actualizan al escribir, como lo “ve” un lector de pantalla.'));
        var ta = el('textarea', { spellcheck: 'false', 'aria-label': 'HTML a analizar', style: 'width:100%;height:170px;background:var(--cd);color:var(--cf);border:0;border-radius:4px;padding:10px;font:13px JetBrains Mono,monospace' }), out = el('div', { class: 'panel', style: 'margin-top:8px' });
        ta.value = '<h1>TechNews</h1>\n<h2>Inteligencia artificial</h2>\n<h4>Un nivel saltado</h4>\n<h2>Bases de datos</h2>\n<h1>Otro h1 repetido</h1>';
        function an() {
          var d = new DOMParser().parseFromString(ta.value, 'text/html'), hs = [].slice.call(d.querySelectorAll('h1,h2,h3,h4,h5,h6')), warn = [], last = 0;
          var h1 = hs.filter(function (h) { return h.tagName === 'H1'; }).length;
          if (!hs.length) { out.innerHTML = '<span class="hint">Escribe algunos títulos.</span>'; return; }
          if (h1 === 0) warn.push('No hay ningún &lt;h1&gt;.'); if (h1 > 1) warn.push('Hay ' + h1 + ' &lt;h1&gt;: debería haber uno solo.');
          var tree = hs.map(function (h) { var n = +h.tagName[1]; if (last && n > last + 1) warn.push('Salto de nivel: de h' + last + ' a h' + n + ' en “' + esc(h.textContent) + '”.'); last = n; return '<div style="padding-left:' + (n - 1) * 18 + 'px"><span class="pill">h' + n + '</span> ' + esc(h.textContent) + '</div>'; }).join('');
          out.innerHTML = '<h4>Esquema del documento</h4>' + tree + '<div style="margin-top:8px">' + (warn.length ? warn.map(function (t) { return '<div class="pill bad" style="margin:2px 0">' + t + '</div>'; }).join('<br>') : '<span class="pill ok">Jerarquía correcta</span>') + '</div>';
        }
        ta.oninput = an; box.appendChild(ta); box.appendChild(out); w.appendChild(box); an();
      } },
      { t: 'h', text: 'Enlaces, listas e imágenes', min: 40 },
      { t: 'hot', parts: [['<a', 0], [' href', 1], ['="https://www.google.com"', 1], [' target', 2], ['="_blank"', 2], [' rel', 3], ['="noopener noreferrer"', 3], ['>', 0], ['Ir a Google', 4], ['</a>', 0]],
        notes: [['Etiqueta de enlace', 'El <code>&lt;a&gt;</code> (anchor) conecta documentos y archivos.'], ['href', 'Hypertext Reference: el destino. Puede ser absoluto (<code>https://…</code>) o relativo (<code>./contacto.html</code>, <code>#seccion</code>).'], ['target="_blank"', 'Abre el destino en una pestaña nueva.'], ['rel="noopener noreferrer"', 'Buena práctica de seguridad cuando abres pestañas nuevas: la página destino no puede manipular la tuya.'], ['Texto del enlace', 'Que diga a dónde lleva. Evita “clic aquí”.']] },
      { t: 'cards', items: [
        { h: 'Lista desordenada &lt;ul&gt;', html: '<p>Viñetas. Ingredientes, requisitos, menús de navegación.</p>' },
        { h: 'Lista ordenada &lt;ol&gt;', html: '<p>Números automáticos. Pasos de instalación, algoritmos, posiciones.</p>' },
        { h: 'Regla del &lt;li&gt;', html: '<p>Un <code>&lt;li&gt;</code> siempre es hijo directo de un <code>&lt;ul&gt;</code> o un <code>&lt;ol&gt;</code>.</p>' }] },
      { t: 'play', title: 'El atributo alt en acción', intro: 'Cambia el origen de la imagen. Cuando falla, el navegador muestra el texto alternativo; un lector de pantalla siempre lo lee.',
        controls: [{ k: 'src', label: 'Origen de la imagen', type: 'select', opts: ['archivo válido', 'ruta rota'], val: 'archivo válido' }, { k: 'alt', label: 'Texto alt', type: 'select', opts: ['descriptivo', 'vacío'], val: 'descriptivo' }],
        html: function (v) { var s = v.src === 'ruta rota' ? 'foto-falsa.jpg' : PIX, a = v.alt === 'vacío' ? '' : 'Banner ilustrativo de programación web'; return '<img src="' + s + '" alt="' + a + '" width="240" height="120" style="display:block;background:var(--cf,#eee)">'; }, css: '', showCss: false,
        readout: function (v) { return v.alt === 'vacío' ? '<span class="pill bad">Sin alt: una persona ciega no sabe qué hay aquí.</span>' : '<span class="pill ok">Con alt: se lee incluso si la imagen falla.</span>'; } },
      { t: 'h', text: 'Laboratorio: guía de un tutorial', min: 50 },
      { t: 'lab', id: 'tutorial', title: 'Maqueta un tutorial de tecnología', intro: 'Arma la guía completa. Mira cómo el detector de arriba juzgaría tu jerarquía de títulos.', height: 400, files: [{ name: 'articulo.html', code: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>Tutorial</title>\n</head>\n<body>\n  <!-- Completa: un h1, dos h2, dos párrafos con strong y em,\n       una ul de requisitos, una ol de pasos, una img, un enlace\n       externo y al menos un hr -->\n</body>\n</html>' }],
        tests: [
          { t: 'Un solo <h1>', f: function () { return qa('h1').length === 1; } },
          { t: 'Al menos dos <h2>', f: function () { return qa('h2').length >= 2; } },
          { t: 'Mínimo dos <p> con <strong> y <em>', f: function () { return qa('p').length >= 2 && !!q('strong') && !!q('em'); } },
          { t: 'Lista desordenada <ul> con <li>', f: function () { return qa('ul > li').length >= 2; } },
          { t: 'Lista ordenada <ol> con pasos', f: function () { return qa('ol > li').length >= 2; } },
          { t: 'Imagen con src y alt', f: function () { var i = q('img'); return !!i && !!i.getAttribute('src') && (i.getAttribute('alt') || '').length > 3; } },
          { t: 'Enlace externo con target="_blank"', f: function () { var a = q('a[href^="http"]'); return !!a && a.target === '_blank'; } },
          { t: 'Al menos una línea <hr>', f: function () { return !!q('hr'); } }],
        solution: [{ name: 'articulo.html', code: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>Tutorial</title>\n</head>\n<body>\n  <h1>Instala Git en 10 minutos</h1>\n  <h2>Requisitos</h2>\n  <p>Necesitas un computador con <strong>conexión a internet</strong> y un poco de <em>paciencia</em>.</p>\n  <ul>\n    <li>Windows, macOS o Linux</li>\n    <li>Cuenta de GitHub</li>\n  </ul>\n  <hr>\n  <h2>Pasos</h2>\n  <p>Sigue la lista en orden; <strong>no te saltes</strong> ninguno.</p>\n  <ol>\n    <li>Descarga el instalador</li>\n    <li>Acepta las opciones por defecto</li>\n  </ol>\n  <img src="git.png" alt="Logotipo de Git">\n  <a href="https://git-scm.com" target="_blank">Sitio oficial</a>\n</body>\n</html>' }] },
      { t: 'quiz', qs: [
        ['¿Cuántos <h1> debe tener una página?', ['Uno', 'Uno por sección', 'Los que quieras'], 0, 'Representa el tema central del documento.'],
        ['¿Cuándo se usa <ol> en lugar de <ul>?', ['Cuando el orden importa', 'Cuando hay muchos elementos', 'Nunca'], 0, 'Pasos de una receta o instalación.'],
        ['¿Para qué sirve el atributo alt?', ['Para cambiar el tamaño', 'Para describir la imagen a quien no la ve', 'Para enlazarla'], 1, 'Accesibilidad y respaldo si la ruta se rompe.'],
        ['¿Qué diferencia a <strong> de <em>?', ['Importancia frente a énfasis', 'Ninguna', 'strong es cursiva'], 0, 'Ambos tienen significado, no solo apariencia.']] }
    ]
  });

  /* ===== 1.2b El contenedor <div> ===== */
  var NEWS_HTML = '<div class="encabezado-sitio"><h1>Portal de Noticias Tech</h1><p>Software y bases de datos</p></div><div class="contenedor-principal"><div class="tarjeta-noticia"><h2>Lanzamiento de HTML5</h2><p>Estructura páginas de forma moderna. Una palabra <span class="resaltado">importante</span> se marca con span.</p><a href="#">Leer noticia completa</a></div><div class="tarjeta-noticia"><h2>Bases de datos relacionales</h2><p>El modelo entidad-relación es clave para apps escalables.</p><a href="#">Leer noticia completa</a></div></div>';
  var NEWS_CSS = '.encabezado-sitio{padding:10px 12px;background:rgba(30,91,67,.12)}.contenedor-principal{padding:10px;margin-top:10px;border:1px dashed #9AAEA3}.tarjeta-noticia{padding:10px 12px;margin-bottom:10px;border:1px solid #9AAEA3}h1,h2{font-size:17px;margin:0 0 4px}p{margin:0 0 4px;font-size:14px}.resaltado{background:#F4D77A;color:#222}a{color:#2E7D5B;font-size:13px}';
  C.add({
    id: '1.2b',
    lead: 'Una página web es una pila de cajas. El div es la caja neutra que te permite agrupar, mover y dar estilo a un conjunto de elementos a la vez.',
    blocks: [
      { t: 'h', text: 'Mira las cajas como las ve el navegador', min: 20 },
      { t: 'inspect', html: NEWS_HTML, css: NEWS_CSS, allLabel: 'Mostrar el contorno de todos los <div>' },
      { t: 'h', text: 'Qué es el div y por qué existe', min: 25 },
      { t: 'p', html: '<p>La mayoría de etiquetas dicen qué son: un <code>&lt;p&gt;</code> es un párrafo y un <code>&lt;img&gt;</code> una imagen. Al maquetar necesitamos <b>cajas neutras</b> para agrupar elementos relacionados, organizarlos o aplicarles estilo en conjunto. Para eso existe <code>&lt;div&gt;</code> (<i>division</i>): un contenedor genérico de nivel de bloque, sin significado propio, que sirve de puente hacia CSS y JavaScript cuando le asignas <code>class</code> o <code>id</code>.</p>' },
      { t: 'ana', title: 'Analogía: las cajas de una mudanza', rows: [
        ['La caja lisa', 'El <code>&lt;div&gt;</code>: ni libro ni lámpara, solo un recipiente.'],
        ['Lo que guardas', 'Las etiquetas hijas: <code>&lt;img&gt;</code> (la lámpara), <code>&lt;h2&gt;</code> (el libro), <code>&lt;p&gt;</code> (la carta).'],
        ['El rótulo de la caja', 'El atributo <code>class="modulo-lectura"</code>.'],
        ['La orden a los mudanceros', '“Muevan la caja modulo-lectura al segundo piso y píntenla de azul”: eso hace CSS.']] },
      { t: 'play', title: 'Un div vacío no tiene altura', intro: 'El alto de una caja lo da su contenido. Activa y desactiva el contenido y mira la medida real.',
        controls: [{ k: 'c', label: 'Con contenido', type: 'toggle', val: false, on: 1, off: 0 }, { k: 'pad', label: 'Relleno (padding)', type: 'range', min: 0, max: 40, val: 0, unit: 'px' }],
        html: function (v) { return '<div class="caja">' + (+v.c ? '<p style="margin:0">Hola, soy contenido.</p>' : '') + '</div>'; }, css: '.caja{background:#B7862A;padding:{{pad}}px;border:2px solid #14221B}',
        readout: function (v, sh) { var e = sh.querySelector('.caja'), r = e.getBoundingClientRect(); return 'Medida real del div: <b>' + Math.round(r.width) + ' × ' + Math.round(r.height) + ' px</b>' + (+v.c ? '' : ' (sin contenido solo queda el borde y el relleno)'); } },
      { t: 'h', text: 'Bloque frente a en línea', min: 30 },
      { t: 'p', html: '<p>Los elementos en bloque (<code>div</code>, <code>p</code>, <code>h1</code>, <code>ul</code>) ocupan todo el ancho y empiezan en línea nueva. Los elementos en línea (<code>span</code>, <code>a</code>, <code>strong</code>, <code>em</code>, <code>img</code>) ocupan solo su contenido y se ponen uno al lado del otro. El <code>&lt;span&gt;</code> es el gemelo en línea del div: envuelve una palabra o frase sin romper el párrafo.</p>' },
      { t: 'play', title: 'Mismo contenido, tres comportamientos', controls: [{ k: 'd', label: 'Valor de display', type: 'select', opts: ['block', 'inline', 'inline-block'], val: 'block' }],
        html: '<div class="m"><span>Uno</span><span>Dos</span><span>Tres</span></div>', css: '.m{padding:10px;border:1px dashed #9AAEA3}span{display:{{d}};background:#B7862A;color:#14221B;padding:6px 10px;margin:3px;font-weight:600}',
        readout: function (v) { return v.d === 'block' ? 'Cada span se apila y ocupa todo el ancho.' : v.d === 'inline' ? 'Se alinean en la misma línea; el relleno vertical no empuja a los vecinos.' : 'Se alinean en línea, pero aceptan ancho y alto como una caja.'; } },
      { t: 'h', text: '¿Div o etiqueta semántica?', min: 25 },
      { t: 'p', html: '<p>Antes de HTML5 se armaba todo con div. Hoy existen etiquetas que nombran cada zona de la página. Se ven igual, pero no significan lo mismo.</p>' },
      { t: 'cards', items: [
        { h: 'Solo div', html: '<pre class="mono-box">&lt;div class="encabezado"&gt;…&lt;/div&gt;\n&lt;div class="principal"&gt;\n  &lt;div class="noticia"&gt;…&lt;/div&gt;\n&lt;/div&gt;\n&lt;div class="pie"&gt;…&lt;/div&gt;</pre><p>El navegador solo ve cajas iguales. Un lector de pantalla no sabe cuál es el contenido principal.</p>' },
        { h: 'Etiquetas semánticas', html: '<pre class="mono-box">&lt;header&gt;…&lt;/header&gt;\n&lt;main&gt;\n  &lt;article&gt;…&lt;/article&gt;\n&lt;/main&gt;\n&lt;footer&gt;…&lt;/footer&gt;</pre><p>Navegadores, buscadores y lectores de pantalla entienden cada zona. Usa div cuando ninguna etiqueta describa el contenido.</p>' }] },
      { t: 'note', kind: 'tip', html: '<p>En este módulo maquetamos con <code>div</code> para dominar el agrupamiento. En el Taller 1.1 y en el proyecto final combinarás ambas: etiquetas semánticas para las zonas grandes y <code>div</code> para agrupar detalles.</p>' },
      { t: 'h', text: 'Buenas prácticas con div', min: 15 },
      { t: 'cards', items: [
        { h: 'Nombra por la función', html: '<p><code>tarjeta-noticia</code> dice qué es. <code>caja-azul-2</code> se vuelve inútil cuando cambias el color.</p>' },
        { h: 'Evita la “divitis”', html: '<p>Si tienes cinco div anidados y ninguno aporta estilo ni agrupación, sobran cuatro.</p>' },
        { h: 'Usa la etiqueta correcta', html: '<p>Una lista es <code>ul</code>, un botón es <code>button</code>, la navegación es <code>nav</code>.</p>' },
        { h: 'Comenta los cierres largos', html: '<p><code>&lt;/div&gt; &lt;!-- /contenedor-productos --&gt;</code> evita perderte en el F12.</p>' }] },
      { t: 'h', text: 'Demostración guiada y análisis', min: 25 },
      { t: 'steps', items: [
        { t: 'Crea agrupamiento.html', html: '<p>Usa el cascarón con Emmet y copia el portal de noticias del inspector de arriba.</p>' },
        { t: 'Ábrelo con Live Server e inspecciona con F12', html: '<p>Pasa el cursor sobre <code>&lt;div class="tarjeta-noticia"&gt;</code>: el cuadro azul abarca todo el ancho. Es un elemento en bloque.</p>' },
        { t: 'Inspecciona el span', html: '<p>La caja solo abraza la palabra “importante”: es un elemento en línea.</p>' },
        { t: 'Explica el agrupamiento', html: '<p>Cada tarjeta encierra un <code>&lt;h2&gt;</code>, un <code>&lt;p&gt;</code> y un <code>&lt;a&gt;</code> dentro de una sola caja.</p>' }] },
      { t: 'h', text: 'Laboratorio: tu primer catálogo', min: 50 },
      { t: 'lab', id: 'catalogo', title: 'Catálogo modular con contenedores', intro: 'Es un documento HTML completo. Edítalo y mira cómo se arma. Retos: agrega un tercer producto, cambia el color de .precio, pon el footer oscuro y cambia el título.', height: 420, points: false, files: [{ name: 'catalogo.html', code: '<!DOCTYPE html>\n<html lang="es">\n<head>\n <meta charset="UTF-8">\n <meta name="viewport" content="width=device-width, initial-scale=1.0">\n <title>Mi catálogo</title>\n <style>\n  body{font-family:sans-serif;margin:0}\n  .header-catalogo{background:#1E5B43;color:#fff;padding:12px}\n  .contenedor-productos{display:flex;gap:12px;padding:12px}\n  .caja-producto{border:1px solid #ccc;padding:10px;flex:1}\n  .precio{color:#B7862A;font-weight:bold}\n  .footer-catalogo{padding:10px;background:#eee;font-size:12px}\n </style>\n</head>\n<body>\n <div class="header-catalogo">\n  <h1>Mi catálogo</h1>\n  <p>Productos destacados</p>\n </div>\n <div class="contenedor-productos">\n  <div class="caja-producto">\n   <h3>Cuaderno</h3>\n   <img src="cuaderno.jpg" alt="Cuaderno de 100 hojas" width="80">\n   <p>Cuaderno de 100 hojas.</p>\n   <span class="precio">$8.000</span>\n   <button>Agregar al carrito</button>\n  </div>\n  <div class="caja-producto">\n   <h3>Lapicero</h3>\n   <img src="lapicero.jpg" alt="Lapicero de tinta negra" width="80">\n   <p>Tinta negra.</p>\n   <span class="precio">$2.000</span>\n   <button>Agregar al carrito</button>\n  </div>\n </div>\n <div class="footer-catalogo">© 2026 Universidad de Caldas</div>\n</body>\n</html>' }],
        tests: [
          { t: 'Estructura HTML5 con lang="es"', f: function () { return document.compatMode === 'CSS1Compat' && document.documentElement.lang === 'es'; } },
          { t: 'div.header-catalogo con <h1> y <p>', f: function () { return !!q('div.header-catalogo h1') && !!q('div.header-catalogo p'); } },
          { t: 'div.contenedor-productos con al menos dos productos', f: function () { return qa('div.contenedor-productos > div.caja-producto').length >= 2; } },
          { t: 'Cada producto tiene h3, img, p y span.precio', f: function () { var c = qa('div.caja-producto'); return c.length > 0 && c.every(function (d) { return d.querySelector('h3') && d.querySelector('img') && d.querySelector('p') && d.querySelector('span.precio'); }); } },
          { t: 'Botón “Agregar al carrito” en cada producto', f: function () { var c = qa('div.caja-producto'); return c.length > 0 && c.every(function (d) { var b = d.querySelector('button'); return b && /agregar al carrito/i.test(b.textContent); }); } },
          { t: 'div.footer-catalogo con derechos de autor', f: function () { return /©|derechos|copyright/i.test(txt(q('div.footer-catalogo'))); } }] },
      { t: 'check', title: 'Entrega en tu computador', items: ['Carpeta taller-agrupamiento con catalogo.html', 'Estructura HTML5 con lang="es"', 'div.header-catalogo con h1 y p', 'div.contenedor-productos con al menos dos cajas', 'Cada producto en su div.caja-producto con h3, img, p, span.precio y botón', 'div.footer-catalogo con los derechos de autor', 'Probado con Live Server e inspeccionado con F12'] },
      { t: 'quiz', qs: [
        ['¿Qué hace un elemento en bloque?', ['Ocupa solo su contenido', 'Ocupa todo el ancho y empieza en línea nueva', 'No se puede estilizar'], 1, 'Por eso dos div seguidos se apilan.'],
        ['¿Cuál es el gemelo en línea del div?', ['span', 'section', 'br'], 0, 'Envuelve una palabra o frase sin romper el párrafo.'],
        ['¿Para qué sirve ponerle class a un div?', ['Para que sea visible', 'Para que CSS o JavaScript apunten a esa caja', 'Para que cargue más rápido'], 1, 'Es el rótulo de la caja de mudanza.'],
        ['Necesitas marcar el menú principal. ¿Qué conviene usar?', ['Un div con class="menu"', 'La etiqueta nav', 'Un span'], 1, 'Si existe una etiqueta semántica, úsala.'],
        ['¿Qué es la “divitis”?', ['Un error del navegador', 'Anidar div innecesarios que no aportan nada', 'Usar muchas clases CSS'], 1, 'Cada div debe tener una razón de ser.'],
        ['¿Qué nombre de clase es más recomendable?', ['caja-azul-2', 'tarjeta-noticia', 'x1'], 1, 'Nombra por la función; el color puede cambiar mañana.']] }
    ]
  });

  /* ===== Taller 1.1 ===== */
  var PORTAL = '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <meta name="description" content="Portal de noticias tecnológicas">\n  <title>TechNews - Portal de Innovación Digital</title>\n</head>\n<body>\n  <div class="encabezado" id="inicio">\n    <h1>TechNews: Periodismo Tecnológico</h1>\n    <p>Actualidad sobre software, inteligencia artificial y bases de datos</p>\n    <div class="menu-navegacion">\n      <ul>\n        <li><a href="#inicio">Inicio</a></li>\n        <li><a href="#noticia">Noticia destacada</a></li>\n        <li><a href="#recursos">Recursos</a></li>\n      </ul>\n    </div>\n  </div>\n  <hr>\n  <div class="contenido-principal">\n    <div class="seccion" id="noticia">\n      <h2>La IA asistida en el desarrollo web</h2>\n      <p>Por <span class="autor">Redacción TechNews</span> | <strong>Ingeniería de Software</strong></p>\n      <img src="ia.jpg" alt="Programador trabajando con un asistente de código">\n      <p>Herramientas como <strong>GitHub Copilot</strong> optimizan el código repetitivo y dejan tiempo para la <em>lógica de negocio</em>.</p>\n      <p>Su uso aporta ventajas claras al flujo de trabajo.</p>\n      <h3>Beneficios</h3>\n      <ul>\n        <li><strong>Menos tiempo:</strong> código base automático.</li>\n        <li><strong>Depuración:</strong> errores detectados antes.</li>\n      </ul>\n      <h3>Pasos para integrarlo</h3>\n      <ol>\n        <li>Instala Visual Studio Code.</li>\n        <li>Instala la extensión del asistente.</li>\n        <li>Escribe especificaciones antes de generar código.</li>\n      </ol>\n    </div>\n    <div class="seccion" id="recursos">\n      <h2>Enlaces para estudiantes</h2>\n      <p>Consulta la documentación oficial.</p>\n      <a href="https://developer.mozilla.org/es/docs/Web/HTML" target="_blank" rel="noopener noreferrer">MDN Web Docs</a>\n    </div>\n  </div>\n  <hr>\n  <div class="pie-pagina">\n    <p><strong>Universidad de Caldas</strong> - Programación para Entornos Web 1</p>\n    <p>Desarrollado por Ana Gómez · © 2026 Todos los derechos reservados.</p>\n  </div>\n</body>\n</html>';
  C.add({
    id: '1.2t',
    lead: 'Consolida todo el Módulo 1 en un proyecto real: el portal de noticias o portafolio de un proyecto tecnológico, con estructura limpia y válida.',
    blocks: [
      { t: 'h', text: 'Contexto y plano del edificio', min: 20 },
      { t: 'ana', title: 'Analogía: el plano de construcción', intro: 'Antes de pintar la fachada (CSS) o instalar la electricidad (JavaScript), el arquitecto levanta muros y columnas en el lugar exacto. Este taller es solo la estructura de ladrillo.', rows: [
        ['Fachada y letrero', '<code>div.encabezado</code> con <code>&lt;h1&gt;</code> y el menú <code>&lt;ul&gt;/&lt;li&gt;/&lt;a&gt;</code>'],
        ['Piso principal', '<code>div.contenido-principal</code> con las secciones, títulos, imagen, texto y listas'],
        ['Zócalo', '<code>div.pie-pagina</code> con derechos y autor']] },
      { t: 'note', kind: 'mision', html: '<p>Elige una temática: <b>A</b> sistema de gestión para una biblioteca o clínica, <b>B</b> portafolio personal de proyectos, o <b>C</b> portal de noticias de una tecnología (Mundo Java, Ecosistema MySQL…). Trabajo individual o en parejas, con VS Code y Live Server.</p>' },
      { t: 'h', text: 'Taller con calificación automática (100 puntos)', min: 120 },
      { t: 'lab', id: 'portal', title: 'Portal web completo', intro: 'El puntaje sigue la rúbrica del curso: documento 10, encabezado y navegación 20, contenido 40, pie de página 15 y calidad del código 15.', points: true, height: 520, files: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Mi proyecto</title>\n</head>\n<body>\n\n  <!-- 1. div.encabezado con id="inicio", un h1 y un menú ul con 3 enlaces #id -->\n\n  <!-- 2. div.contenido-principal con dos div.seccion (con id) -->\n\n  <!-- 3. div.pie-pagina con información institucional, autor y año -->\n\n</body>\n</html>' }],
        tests: [
          { t: 'DOCTYPE en modo estándar', pts: 3, f: function () { return document.compatMode === 'CSS1Compat'; } },
          { t: 'html con lang="es"', pts: 3, f: function () { return document.documentElement.lang === 'es'; } },
          { t: 'meta charset UTF-8 y viewport', pts: 2, f: function () { return !!q('meta[charset]') && !!q('meta[name="viewport"]'); } },
          { t: '<title> descriptivo', pts: 2, f: function () { return document.title.trim().length > 5; } },
          { t: 'div.encabezado con id="inicio"', pts: 5, f: function () { return !!q('div.encabezado#inicio'); } },
          { t: 'Un único <h1>', pts: 5, f: function () { return qa('h1').length === 1; } },
          { t: 'Menú ul con al menos 3 enlaces a #id que existen', pts: 10, f: function () { var a = qa('ul li a[href^="#"]'); return a.length >= 3 && a.every(function (x) { return !!document.getElementById(x.getAttribute('href').slice(1)); }); } },
          { t: 'div.contenido-principal', pts: 5, f: function () { return !!q('div.contenido-principal'); } },
          { t: 'Al menos dos div.seccion', pts: 8, f: function () { return qa('div.seccion').length >= 2; } },
          { t: 'Jerarquía h2 para secciones y h3 para subsecciones', pts: 5, f: function () { return qa('h2').length >= 2 && qa('h3').length >= 1; } },
          { t: 'Al menos 3 párrafos', pts: 4, f: function () { return qa('p').length >= 3; } },
          { t: 'strong y em dentro de párrafos', pts: 4, f: function () { return !!q('p strong') && !!q('p em'); } },
          { t: 'Una lista ul y una ol con li', pts: 6, f: function () { return qa('div.contenido-principal ul > li').length >= 1 && qa('ol > li').length >= 1; } },
          { t: 'Imagen con src y alt descriptivo', pts: 4, f: function () { var i = q('img'); return !!i && !!i.getAttribute('src') && (i.getAttribute('alt') || '').length > 3; } },
          { t: 'Enlace externo con target="_blank"', pts: 4, f: function () { var a = q('a[href^="http"]'); return !!a && a.target === '_blank'; } },
          { t: 'div.pie-pagina', pts: 5, f: function () { return !!q('div.pie-pagina'); } },
          { t: 'Pie con al menos dos párrafos', pts: 5, f: function () { return qa('div.pie-pagina p').length >= 2; } },
          { t: 'Pie con el año actual', pts: 5, f: function () { return /20\d\d/.test(txt(q('div.pie-pagina'))); } },
          { t: 'Etiquetas y atributos en minúsculas', pts: 5, f: function () { return !/<\/?[A-Z]/.test(SRC.replace(/<!DOCTYPE/i, '')); } },
          { t: 'Código con sangría (identación)', pts: 5, f: function () { return SRC.split('\n').filter(function (l) { return /^\s{2,}</.test(l); }).length >= 8; } },
          { t: 'Sin enlaces ni imágenes vacíos', pts: 5, f: function () { return qa('a').every(function (a) { return (a.getAttribute('href') || '').length > 0; }) && qa('img').every(function (i) { return (i.getAttribute('src') || '').length > 0; }); } }],
        solution: [{ name: 'index.html', code: PORTAL }] },
      { t: 'h', text: 'Verificación e inspección', min: 15 },
      { t: 'steps', items: [
        { t: 'Abre con Live Server', html: '<p>Haz clic en los enlaces internos: los <code>id</code> funcionan como anclas de navegación dentro de la misma página.</p>' },
        { t: 'Inspecciona con F12', html: '<p>Comprueba cómo los <code>div</code> empaquetan títulos, párrafos, listas e imágenes en el árbol del DOM.</p>' },
        { t: 'Sube el trabajo a Git', html: '<p>Haz un commit con el mensaje <code>feat: estructura semántica del portal</code>. Practicaremos Git a fondo en el Módulo 4.</p>' }] },
      { t: 'table', head: ['Criterio', 'Excelente (100%)', 'Aceptable (70%)', 'Deficiente (0-40%)'], rows: [
        ['Estructura documental', 'DOCTYPE, html con lang, head con metadatos completos y body bien delimitado', 'Omite metadatos secundarios o el idioma', 'No incluye la estructura base'],
        ['Jerarquía semántica', 'Un único h1 y subtítulos en secuencia lógica', 'Varios h1 o niveles saltados', 'Usa encabezados solo por su tamaño visual'],
        ['Listas y medios', 'ul y ol bien formadas, imagen con alt y enlace con target', 'Omite el alt o usa etiquetas distintas de li', 'Enlaces o imágenes rotos'],
        ['Agrupamiento y limpieza', 'div con clases e id descriptivos e identación limpia', 'Uso limitado de div o sin identación', 'Código desordenado sin cajas ni clases']] }
    ]
  });
})();
