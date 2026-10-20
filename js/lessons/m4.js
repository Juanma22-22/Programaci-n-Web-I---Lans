/* Módulo 4 · JavaScript y asincronismo */
(function () {
  var C = Course;

  /* ---------- utilidad: simulador de pila / colas del Event Loop ---------- */
  function loopSim(w, U, scenarios) {
    var el = U.el, esc = U.esc, box = el('div', { class: 'play' }), sc = 0, i = 0;
    box.appendChild(el('h4', null, 'Visualizador del Event Loop'));
    var seg = el('div', { class: 'seg' }); scenarios.forEach(function (s, k) { var b = el('button', { class: k === 0 ? 'on' : '' }, s.name); b.onclick = function () { sc = k; i = 0; U.$$('button', seg).forEach(function (q, j) { q.classList.toggle('on', j === k); }); draw(); }; seg.appendChild(b); });
    box.appendChild(seg);
    var g = el('div', { class: 'cols' }), code = el('div', { class: 'mono-box' }), right = el('div');
    var P = {}; ['Pila de llamadas (Call Stack)', 'Web APIs (temporizadores)', 'Cola de microtareas (Promesas)', 'Cola de macrotareas (setTimeout)'].forEach(function (t, k) { P[k] = el('div', { class: 'panel', style: 'margin:4px 0' }); right.appendChild(P[k]); P[k].dataset.t = t; });
    var out = el('div', { class: 'panel' }), note = el('div', { class: 'note tip' });
    right.appendChild(out); g.appendChild(code); g.appendChild(right); box.appendChild(g); box.appendChild(note);
    var bar = el('div', { class: 'seg' });
    [['Reiniciar', function () { i = 0; }], ['Anterior', function () { i = Math.max(0, i - 1); }], ['Siguiente', function () { i = Math.min(scenarios[sc].steps.length, i + 1); }]].forEach(function (a, k) { var b = el('button', { class: k === 2 ? 'on' : '' }, a[0]); b.onclick = function () { a[1](); draw(); }; bar.appendChild(b); });
    box.appendChild(bar);
    function chips(arr) { return arr && arr.length ? arr.map(function (t) { return '<span class="pill" style="margin:2px">' + esc(t) + '</span>'; }).join('') : '<span class="hint">vacía</span>'; }
    function draw() {
      var S = scenarios[sc], s = i === 0 ? { l: 0, stack: [], web: [], micro: [], macro: [], out: [], note: 'Pulsa “Siguiente” para ejecutar el programa un paso a la vez.' } : S.steps[i - 1];
      code.innerHTML = S.code.split('\n').map(function (t, k) { return '<span class="' + (k + 1 === s.l ? 'ln-hl' : '') + '" style="display:block">' + (esc(t) || ' ') + '</span>'; }).join('');
      var keys = ['stack', 'web', 'micro', 'macro'];
      for (var k = 0; k < 4; k++) P[k].innerHTML = '<b>' + P[k].dataset.t + '</b><br>' + chips(s[keys[k]]);
      out.innerHTML = '<b>Consola</b><pre class="mono" style="margin:4px 0 0">' + esc((s.out || []).join('\n') || '(vacía)') + '</pre>';
      note.innerHTML = '<b class="nt">Paso ' + i + ' de ' + S.steps.length + '</b>' + s.note;
    }
    w.appendChild(box); draw();
  }

  /* ===== 4.1a Contextos, scope y funciones ===== */
  C.add({
    id: '4.1a',
    lead: 'JavaScript es el lenguaje que le da vida a la página. Antes de tocar el DOM necesitamos dominar cómo se ejecuta el código, qué variables ve cada función y qué formas hay de escribirlas.',
    blocks: [
      { t: 'h', text: 'Qué es JavaScript y dónde se ejecuta', min: 20 },
      { t: 'ana', title: 'Analogía: los tres lenguajes de la web', rows: [
        ['HTML', 'El esqueleto.'],
        ['CSS', 'La apariencia.'],
        ['JavaScript', 'Los músculos: reacciona a los clics, pide datos, cambia la página sin recargarla.']] },
      { t: 'code', lang: 'html', title: 'index.html', code: '<body>\n  <h1 id="titulo">Hola</h1>\n  <!-- Siempre al final del body, o con defer en el head -->\n  <script src="app.js" defer></script>\n</body>' },
      { t: 'note', kind: 'tip', html: '<p>Abre la consola del navegador (<code>F12</code> → Consola). Es tu laboratorio: escribe <code>2 + 2</code> y pulsa Enter. Usarás <code>console.log()</code> constantemente para ver qué pasa dentro de tu programa.</p>' },
      { t: 'h', text: 'Variables y tipos de datos', min: 30 },
      { t: 'table', head: ['Palabra', 'Reasignable', 'Alcance', 'Cuándo usarla'], rows: [
        ['<code>const</code>', 'No', 'Bloque', '<b>Por defecto.</b> Para valores que no vuelves a asignar.'],
        ['<code>let</code>', 'Sí', 'Bloque', 'Contadores y valores que cambian.'],
        ['<code>var</code>', 'Sí', 'Función', 'Evítala: tiene reglas confusas (hoisting).']] },
      { t: 'cards', items: [
        { h: 'Primitivos', html: '<p><code>string</code>, <code>number</code>, <code>boolean</code>, <code>null</code>, <code>undefined</code>. Se copian por valor.</p>' },
        { h: 'Objetos', html: '<p><code>{ nombre: "Ana" }</code>, arreglos <code>[1,2,3]</code>, funciones. Se copian por referencia.</p>' },
        { h: 'Verdadero y falso', html: '<p>Son “falsy”: <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>, <code>false</code>. Todo lo demás es “truthy”.</p>' }] },
      { t: 'h', text: 'Contexto de ejecución y pila de llamadas', min: 30 },
      { t: 'p', html: '<p>Cuando JavaScript ejecuta código crea un <b>contexto de ejecución</b>: un cuadro con las variables disponibles y la referencia a su entorno exterior. El primero es el contexto <i>global</i>; cada vez que llamas una función se apila uno nuevo (<b>Call Stack</b>) y se desapila al terminar.</p>' },
      { t: 'trace', title: 'La pila en acción', code: 'function doble(n) {\n  return n * 2;\n}\nfunction cuadruple(n) {\n  return doble(doble(n));\n}\nconst r = cuadruple(3);\nconsole.log(r);', steps: [
        { l: 7, vars: { 'pila': 'global' }, note: 'Empieza el contexto global y se llama a cuadruple(3).' },
        { l: 5, vars: { 'pila': 'global → cuadruple', n: 3 }, note: 'Se apila el contexto de cuadruple con n = 3.' },
        { l: 6, vars: { 'pila': 'global → cuadruple → doble', n: 3 }, note: 'Se evalúa el doble interno, que se apila.' },
        { l: 2, vars: { 'pila': 'global → cuadruple → doble', n: 3 }, note: 'doble(3) devuelve 6 y se desapila.' },
        { l: 6, vars: { 'pila': 'global → cuadruple → doble', n: 6 }, note: 'Se apila doble otra vez, ahora con n = 6.' },
        { l: 2, vars: { 'pila': 'global → cuadruple', n: 3 }, note: 'doble(6) devuelve 12; cuadruple devuelve 12 y también se desapila.' },
        { l: 7, vars: { r: 12, 'pila': 'global' }, note: 'En el contexto global, r vale 12.' },
        { l: 8, vars: { r: 12 }, out: '12', note: 'Se imprime el resultado.' }] },
      { t: 'h', text: 'Alcance (scope) y closures', min: 35 },
      { t: 'ana', title: 'Analogía: las casas con ventanas', rows: [
        ['Alcance global', 'La calle: todo el mundo la ve.'],
        ['Alcance de función', 'Una casa: desde adentro ves la calle, desde la calle no ves adentro.'],
        ['Alcance de bloque', 'Un cuarto con <code>let</code> y <code>const</code>: lo declarado en un <code>{ }</code> solo vive ahí.'],
        ['Closure', 'Una función que se lleva en la mochila las variables de la casa donde nació, aunque salga de ella.']] },
      { t: 'code', lang: 'js', title: 'closure.js', code: 'function crearContador() {\n  let cuenta = 0;          // vive en la "casa" de crearContador\n  return function () {     // esta función recuerda cuenta\n    cuenta++;\n    return cuenta;\n  };\n}\n\nconst a = crearContador();\nconst b = crearContador();\nconsole.log(a(), a(), a());  // 1 2 3\nconsole.log(b());            // 1  (otro closure, otra cuenta)' },
      { t: 'note', kind: 'warn', html: '<p><b>Hoisting:</b> las declaraciones <code>function</code> se “elevan” y se pueden usar antes de aparecer. Con <code>let</code> y <code>const</code>, usar la variable antes de declararla lanza un <code>ReferenceError</code> (zona muerta temporal).</p>' },
      { t: 'h', text: 'Tres maneras de escribir funciones', min: 25 },
      { t: 'table', head: ['Forma', 'Ejemplo', 'Notas'], rows: [
        ['Declaración', '<code>function sumar(a, b) { return a + b; }</code>', 'Se eleva (hoisting)'],
        ['Expresión', '<code>const sumar = function (a, b) { return a + b; };</code>', 'No se eleva'],
        ['Flecha', '<code>const sumar = (a, b) =&gt; a + b;</code>', 'Más corta; es la más usada con arreglos y callbacks']] },
      { t: 'code', lang: 'js', title: 'arreglos.js', code: 'const precios = [8000, 2000, 35000, 12000];\n\nconst conIva = precios.map(p => p * 1.19);        // transforma cada elemento\nconst baratos = precios.filter(p => p < 10000);   // se queda con los que cumplen\nconst total = precios.reduce((acc, p) => acc + p, 0); // acumula en un solo valor\nprecios.forEach(p => console.log(p));             // recorre sin devolver nada\n\nconst producto = { nombre: "Cuaderno", precio: 8000 };\nconst { nombre, precio } = producto;              // desestructuración\nconst copia = { ...producto, precio: 9000 };     // spread: copia con cambios\nconsole.log(`${nombre} cuesta $${precio}`);       // plantilla de texto' },
      { t: 'h', text: 'Laboratorio: funciones y closures', min: 45 },
      { t: 'lab', id: 'funciones', title: 'Domina funciones, closures y arreglos', intro: 'Completa app.js. Las pruebas llaman a tus funciones con distintos datos.', height: 380,
        files: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es"><head><meta charset="UTF-8"><title>Funciones</title></head>\n<body><p>Mira la consola.</p><script src="app.js"></script></body></html>' }, { name: 'app.js', code: '// 1. Función flecha: devuelve a + b\nconst sumar = (a, b) => {\n};\n\n// 2. Devuelve una función que cada vez que se llama incrementa en "paso" y devuelve el total (empieza en 0)\nfunction crearSumador(paso) {\n}\n\n// 3. Devuelve un arreglo nuevo solo con los números pares\nconst soloPares = (arr) => {\n};\n\n// 4. Devuelve la suma de los precios con IVA (19%) usando map y reduce\nfunction totalConIva(precios) {\n}\n\n// 5. Devuelve un objeto { nombre, precio } -> "Cuaderno: $8000"\nconst etiqueta = ({ nombre, precio }) => {\n};\n\nconsole.log(sumar(2, 3), soloPares([1, 2, 3, 4]));' }],
        tests: [
          { t: 'sumar(2, 3) devuelve 5 y es función flecha', f: function () { return sumar(2, 3) === 5 && !/function\s+sumar/.test(FILES['app.js']); } },
          { t: 'crearSumador(5) acumula 5, 10, 15', f: function () { var s = crearSumador(5); return s() === 5 && s() === 10 && s() === 15; } },
          { t: 'Dos sumadores no comparten su cuenta', f: function () { var a = crearSumador(1), b = crearSumador(10); a(); a(); return b() === 10 && a() === 3; } },
          { t: 'soloPares devuelve un arreglo nuevo con los pares', f: function () { var o = [1, 2, 3, 4, 6], r = soloPares(o); return JSON.stringify(r) === '[2,4,6]' && o.length === 5; } },
          { t: 'totalConIva([100, 200]) ≈ 357', f: function () { return Math.abs(totalConIva([100, 200]) - 357) < 0.001; } },
          { t: 'etiqueta usa desestructuración y plantilla', f: function () { return etiqueta({ nombre: 'Cuaderno', precio: 8000 }) === 'Cuaderno: $8000'; } }],
        solution: [{ name: 'app.js', code: 'const sumar = (a, b) => a + b;\nfunction crearSumador(paso) {\n  let total = 0;\n  return () => (total += paso);\n}\nconst soloPares = (arr) => arr.filter(n => n % 2 === 0);\nfunction totalConIva(precios) {\n  return precios.map(p => p * 1.19).reduce((a, p) => a + p, 0);\n}\nconst etiqueta = ({ nombre, precio }) => `${nombre}: $${precio}`;' }] },
      { t: 'quiz', qs: [
        ['¿Qué palabra usas por defecto para declarar una variable que no cambiará?', ['var', 'let', 'const'], 2, 'const evita reasignaciones accidentales.'],
        ['¿Qué es un closure?', ['Una función que recuerda las variables de donde nació', 'Un bucle cerrado', 'Un error de sintaxis'], 0, 'Por eso cada contador tiene su propia cuenta.'],
        ['¿Qué devuelve [1,2,3].map(n => n * 2)?', ['[2,4,6]', '6', '[1,2,3]'], 0, 'map transforma cada elemento y devuelve un arreglo nuevo.'],
        ['¿Qué ocurre al usar una variable let antes de declararla?', ['Vale undefined', 'ReferenceError', 'Vale 0'], 1, 'Está en la zona muerta temporal.']] }
    ]
  });

  /* ===== 4.1b Lógica estructural y DOM ===== */
  C.add({
    id: '4.1b',
    lead: 'El DOM convierte tu HTML en objetos que JavaScript puede leer y modificar. Aquí aprendemos a seleccionar elementos, cambiarlos, reaccionar a eventos y planear antes de programar.',
    blocks: [
      { t: 'h', text: 'El DOM: tu HTML convertido en árbol de objetos', min: 25 },
      { t: 'p', html: '<p>Cuando el navegador lee el HTML construye el <b>DOM</b> (<i>Document Object Model</i>): un árbol donde cada etiqueta es un <b>nodo</b> con propiedades y métodos. Si cambias el árbol, la pantalla se actualiza. Recuerda la herencia del Módulo 0: cada nodo es un objeto con sus métodos.</p>' },
      { t: 'inspect', html: '<ul id="lista" class="menu"><li class="item activo"><a href="#">Inicio</a></li><li class="item"><a href="#">Productos</a></li><li class="item"><a href="#">Contacto</a></li></ul>', css: 'ul{margin:0;padding:6px 6px 6px 24px}li{padding:4px}', hint: 'Cada fila es un nodo del árbol. Para JavaScript, el ul es un objeto con hijos (children), un padre (parentElement) y hermanos.' },
      { t: 'h', text: 'Seleccionar, leer y modificar', min: 40 },
      { t: 'table', head: ['Qué quieres', 'Método'], rows: [
        ['Un elemento por id', '<code>document.getElementById("lista")</code>'],
        ['El primero que coincida con un selector CSS', '<code>document.querySelector(".item.activo")</code>'],
        ['Todos los que coincidan (NodeList)', '<code>document.querySelectorAll(".item")</code>'],
        ['Cambiar el texto (seguro)', '<code>el.textContent = "Hola"</code>'],
        ['Cambiar un atributo', '<code>el.setAttribute("href", "/x")</code>'],
        ['Agregar o quitar una clase', '<code>el.classList.add("activo")</code> · <code>.remove()</code> · <code>.toggle()</code>'],
        ['Crear un elemento', '<code>document.createElement("li")</code>'],
        ['Insertarlo / quitarlo', '<code>padre.append(hijo)</code> · <code>el.remove()</code>']] },
      { t: 'custom', build: function (w, x, U) {
        var el = U.el, esc = U.esc, box = el('div', { class: 'play' });
        box.appendChild(el('h4', null, 'Consola del DOM: edita y ejecuta'));
        box.appendChild(el('p', { class: 'hint' }, 'El código se ejecuta sobre la página de muestra. Prueba los ejemplos o escribe el tuyo.'));
        var host = el('div', { class: 'stagebox' }), sh = host.attachShadow({ mode: 'open' }), base = '<style>.activo{background:#F4D77A}.hecha{text-decoration:line-through;opacity:.6}.oculto{display:none}li{padding:2px 4px}</style><div id="raiz"><h2 id="titulo">Mi lista</h2><ul id="lista"><li class="item">Estudiar</li><li class="item">Programar</li></ul><button id="boton">Un botón</button></div>';
        sh.innerHTML = base;
        var d = { getElementById: function (i) { return sh.getElementById(i); }, querySelector: function (s) { return sh.querySelector(s); }, querySelectorAll: function (s) { return sh.querySelectorAll(s); }, createElement: function (t) { return document.createElement(t); } };
        var ta = el('textarea', { spellcheck: 'false', 'aria-label': 'Código', style: 'width:100%;height:110px;background:var(--cd);color:var(--cf);border:0;padding:10px;font:13px JetBrains Mono,monospace;border-radius:4px' });
        var err = el('div', { class: 'hint' }), seg = el('div', { class: 'seg' });
        var ex = { 'Cambiar texto': 'document.getElementById("titulo").textContent = "Tareas de hoy";', 'Resaltar': 'document.querySelector(".item").classList.add("activo");', 'Crear tarea': 'const li = document.createElement("li");\nli.className = "item";\nli.textContent = "Descansar";\ndocument.getElementById("lista").append(li);', 'Marcar todas': 'document.querySelectorAll(".item").forEach(li => li.classList.toggle("hecha"));', 'Borrar la última': 'const items = document.querySelectorAll(".item");\nitems[items.length - 1].remove();' };
        ta.value = ex['Cambiar texto'];
        Object.keys(ex).forEach(function (k) { var b = el('button', null, k); b.onclick = function () { ta.value = ex[k]; }; seg.appendChild(b); });
        var run = el('button', { class: 'btn pri' }, 'Ejecutar'), rs = el('button', { class: 'btn' }, 'Reiniciar página');
        run.onclick = function () { err.textContent = ''; try { new Function('document', ta.value)(d); } catch (e) { err.textContent = 'Error: ' + e.message; } };
        rs.onclick = function () { sh.innerHTML = base; err.textContent = ''; };
        box.appendChild(seg); box.appendChild(ta); box.appendChild(run); box.appendChild(rs); box.appendChild(err); box.appendChild(host); w.appendChild(box);
      } },
      { t: 'note', kind: 'warn', html: '<p>Usa <code>textContent</code> para insertar texto. <code>innerHTML</code> interpreta etiquetas y, si metes texto del usuario o de una API, permite inyectar código malicioso (ataque XSS). Úsalo solo con HTML que tú escribiste.</p>' },
      { t: 'h', text: 'Eventos: reaccionar al usuario', min: 35 },
      { t: 'hot', parts: [['boton', 0], ['.addEventListener(', 1], ['"click"', 2], [', ', null], ['(e) => {', 3], ['\n  ', null], ['console.log(e.target);', 4], ['\n', null], ['}', 3], [');', 1]],
        notes: [['Elemento', 'El nodo al que le pondremos la “antena”.'], ['addEventListener', 'Registra una función que se ejecutará cuando ocurra el evento. Puedes agregar varias.'], ['Tipo de evento', '<code>click</code>, <code>input</code>, <code>submit</code>, <code>keydown</code>, <code>change</code>, <code>mouseover</code>…'], ['Callback (manejador)', 'La función que se ejecuta. Recibe el objeto del evento <code>e</code>.'], ['e.target', 'El elemento exacto donde ocurrió el evento. Con <code>e.preventDefault()</code> evitas el comportamiento por defecto (por ejemplo, enviar un formulario).']] },
      { t: 'cards', items: [
        { h: 'Delegación de eventos', html: '<p>En lugar de poner un listener en cada <code>&lt;li&gt;</code>, pones uno en el <code>&lt;ul&gt;</code> y preguntas <code>e.target.matches(".borrar")</code>. Funciona también con elementos creados después.</p>' },
        { h: 'BOM: el navegador', html: '<p><code>window</code>, <code>location.href</code>, <code>history.back()</code>, <code>navigator.language</code>, <code>setTimeout</code>. Es todo lo que rodea al documento.</p>' }] },
      { t: 'h', text: 'Especificaciones antes del código', min: 25 },
      { t: 'ana', title: 'Analogía: el plano antes de construir', rows: [
        ['Sin especificación', 'Empiezas a poner ladrillos y descubres a la mitad que faltaba la puerta.'],
        ['Con especificación', 'Defines qué entra, qué sale y qué reglas aplican. Después el código es casi una traducción.']] },
      { t: 'p', html: '<p>Una buena especificación responde cinco preguntas. Sirve tanto para ti como para pedirle ayuda a una herramienta de IA: cuanto más precisa, mejor el resultado, y más fácil auditarlo (Módulo 5).</p>' },
      { t: 'table', head: ['Sección', 'Ejemplo: lista de tareas'], rows: [
        ['Objetivo', 'Permitir agregar, completar y borrar tareas.'],
        ['Entradas', 'Texto de un campo; clics en la tarea y en el botón de borrar.'],
        ['Salidas', 'Una lista de <code>li</code> y un contador de pendientes.'],
        ['Reglas', 'No se aceptan textos vacíos o solo espacios. La tarea nueva va al final. El contador cuenta solo las no completadas.'],
        ['Casos borde', 'Lista vacía, 100 tareas, texto con símbolos HTML (<code>&lt;b&gt;</code>).']] },
      { t: 'h', text: 'Laboratorio 1: lista de tareas', min: 60 },
      { t: 'lab', id: 'todo', title: 'Lista de tareas con delegación de eventos', intro: 'Sigue la especificación de arriba. El HTML ya está listo; escribe app.js.', height: 420, points: true,
        files: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>Mis tareas</title>\n  <style>\n    body{font-family:sans-serif;max-width:420px;margin:20px auto}\n    li{display:flex;justify-content:space-between;padding:6px;border-bottom:1px solid #ddd}\n    li.hecha .texto{text-decoration:line-through;opacity:.6}\n    .texto{cursor:pointer;flex:1}\n  </style>\n</head>\n<body>\n  <h1>Mis tareas</h1>\n  <form id="form"><input id="nueva" placeholder="Nueva tarea" required> <button id="agregar" type="submit">Agregar</button></form>\n  <p id="contador">0 pendientes</p>\n  <ul id="lista"></ul>\n  <script src="app.js"></script>\n</body>\n</html>' }, { name: 'app.js', code: '/*\n  ESPECIFICACIÓN\n  - Al enviar el formulario: crea <li><span class="texto">…</span><button class="borrar">✕</button></li> al final de #lista.\n  - Rechaza textos vacíos o solo espacios. Limpia el campo tras agregar.\n  - Clic en .texto: alterna la clase "hecha" del li.\n  - Clic en .borrar: elimina el li. (Usa UN solo listener en #lista)\n  - #contador muestra "N pendientes" (o "1 pendiente").\n*/\nconst form = document.getElementById("form");\nconst input = document.getElementById("nueva");\nconst lista = document.getElementById("lista");\nconst contador = document.getElementById("contador");\n\n' }],
        tests: [
          { t: 'Agrega una tarea al final de la lista', pts: 20, f: function () { var f = q('#form'), i = q('#nueva'), n = qa('#lista li').length; i.value = 'Tarea A'; f.requestSubmit(); var ok = qa('#lista li').length === n + 1 && /Tarea A/.test(txt(q('#lista li:last-child'))); var b = q('#lista li:last-child .borrar'); if (b) b.click(); return ok; } },
          { t: 'Limpia el campo después de agregar', pts: 10, f: function () { var f = q('#form'), i = q('#nueva'); i.value = 'Tarea B'; f.requestSubmit(); var ok = i.value === ''; var b = q('#lista li:last-child .borrar'); if (b) b.click(); return ok; } },
          { t: 'Rechaza textos con solo espacios', pts: 15, f: function () { var f = q('#form'), i = q('#nueva'), n = qa('#lista li').length; i.value = '    '; f.requestSubmit(); var ok = qa('#lista li').length === n; i.value = ''; return ok; } },
          { t: 'Cada tarea tiene span.texto y button.borrar', pts: 10, f: function () { var f = q('#form'), i = q('#nueva'); i.value = 'Tarea C'; f.requestSubmit(); var li = q('#lista li:last-child'), ok = !!li && !!li.querySelector('span.texto') && !!li.querySelector('button.borrar'); var b = li && li.querySelector('.borrar'); if (b) b.click(); return ok; } },
          { t: 'Clic en el texto alterna la clase "hecha"', pts: 15, f: function () { var f = q('#form'), i = q('#nueva'); i.value = 'Tarea D'; f.requestSubmit(); var li = q('#lista li:last-child'), t = li && li.querySelector('.texto'); if (!t) return false; t.click(); var a = li.classList.contains('hecha'); t.click(); var b = !li.classList.contains('hecha'); li.querySelector('.borrar').click(); return a && b; } },
          { t: 'El botón borrar elimina la tarea', pts: 10, f: function () { var f = q('#form'), i = q('#nueva'); i.value = 'Tarea E'; f.requestSubmit(); var n = qa('#lista li').length; q('#lista li:last-child .borrar').click(); return qa('#lista li').length === n - 1; } },
          { t: 'El contador muestra los pendientes', pts: 15, f: function () { var f = q('#form'), i = q('#nueva'); i.value = 'Tarea F'; f.requestSubmit(); i.value = 'Tarea G'; f.requestSubmit(); q('#lista li:last-child .texto').click(); var p = qa('#lista li:not(.hecha)').length, ok = txt(q('#contador')).indexOf(String(p)) === 0; qa('#lista .borrar').forEach(function (b) { b.click(); }); return ok; } },
          { t: 'Usa delegación: un único listener en #lista', pts: 5, f: function () { return /lista\.addEventListener\(\s*["']click["']/.test(FILES['app.js']); } }],
        solution: [{ name: 'app.js', code: 'const form = document.getElementById("form");\nconst input = document.getElementById("nueva");\nconst lista = document.getElementById("lista");\nconst contador = document.getElementById("contador");\n\nfunction actualizar() {\n  const p = lista.querySelectorAll("li:not(.hecha)").length;\n  contador.textContent = p + (p === 1 ? " pendiente" : " pendientes");\n}\n\nform.addEventListener("submit", (e) => {\n  e.preventDefault();\n  const texto = input.value.trim();\n  if (!texto) return;\n  const li = document.createElement("li");\n  const span = document.createElement("span");\n  span.className = "texto";\n  span.textContent = texto;\n  const b = document.createElement("button");\n  b.className = "borrar";\n  b.textContent = "✕";\n  b.setAttribute("aria-label", "Borrar tarea");\n  li.append(span, b);\n  lista.append(li);\n  input.value = "";\n  actualizar();\n});\n\nlista.addEventListener("click", (e) => {\n  if (e.target.matches(".borrar")) e.target.closest("li").remove();\n  else if (e.target.matches(".texto")) e.target.closest("li").classList.toggle("hecha");\n  actualizar();\n});' }] },
      { t: 'h', text: 'Laboratorio 2: modo oscuro con ramas de Git', min: 50 },
      { t: 'p', html: '<p>Nueva funcionalidad para el sitio de viajes <b>TravelNow</b>: un botón de modo oscuro que recuerde la preferencia. Primero practica el flujo profesional de ramas con la terminal; luego programa la función.</p>' },
      { t: 'gitsim', title: 'Flujo de trabajo: rama de funcionalidad', files: ['index.html', 'app.js', 'styles.css'] },
      { t: 'lab', id: 'oscuro', title: 'Botón de modo oscuro persistente', intro: 'Alterna la clase "oscuro" en el body, guarda la preferencia en localStorage y restáurala al cargar. Mira cómo cambian los colores.', height: 400, points: true,
        files: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>TravelNow</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <header><h1>TravelNow</h1><button id="tema" aria-pressed="false">Modo oscuro</button></header>\n  <main><p>Descubre destinos increíbles.</p></main>\n  <script src="app.js"></script>\n</body>\n</html>' }, { name: 'styles.css', code: 'body { font-family: sans-serif; background: #ffffff; color: #14221B; margin: 0; padding: 20px; transition: background .2s; }\nheader { display: flex; justify-content: space-between; align-items: center; }\n\n/* Agrega las reglas para body.oscuro: fondo #14221B y texto #F6F3EC */\n' }, { name: 'app.js', code: 'const boton = document.getElementById("tema");\n\n// 1. Al hacer clic alterna la clase "oscuro" en document.body\n// 2. Guarda "oscuro" o "claro" en localStorage con la clave "tema"\n// 3. Al cargar, lee localStorage y aplica el tema guardado\n// 4. Actualiza aria-pressed del botón\n' }],
        tests: [
          { t: 'Hay estilos para body.oscuro', pts: 20, f: function () { return /body\.oscuro/.test(FILES['styles.css']); } },
          { t: 'Clic activa el modo oscuro (fondo cambia)', pts: 25, f: async function () { var b = q('#tema'), antes = cs(document.body, 'backgroundColor'); b.click(); await new Promise(function (r) { setTimeout(r, 350); }); var ok = document.body.classList.contains('oscuro') && cs(document.body, 'backgroundColor') !== antes; b.click(); return ok; } },
          { t: 'Otro clic vuelve al modo claro', pts: 15, f: function () { var b = q('#tema'); b.click(); b.click(); return !document.body.classList.contains('oscuro'); } },
          { t: 'Guarda la preferencia en localStorage', pts: 25, f: function () { var b = q('#tema'); b.click(); var v = localStorage.getItem('tema'); b.click(); return v === 'oscuro' && localStorage.getItem('tema') === 'claro'; } },
          { t: 'Lee la preferencia al cargar', pts: 10, f: function () { return /localStorage\.getItem/.test(FILES['app.js']); } },
          { t: 'Mantiene aria-pressed sincronizado', pts: 5, f: function () { var b = q('#tema'); b.click(); var ok = b.getAttribute('aria-pressed') === 'true'; b.click(); return ok && b.getAttribute('aria-pressed') === 'false'; } }],
        solution: [{ name: 'app.js', code: 'const boton = document.getElementById("tema");\n\nfunction aplicar(tema) {\n  document.body.classList.toggle("oscuro", tema === "oscuro");\n  boton.setAttribute("aria-pressed", String(tema === "oscuro"));\n}\n\naplicar(localStorage.getItem("tema") || "claro");\n\nboton.addEventListener("click", () => {\n  const nuevo = document.body.classList.contains("oscuro") ? "claro" : "oscuro";\n  aplicar(nuevo);\n  localStorage.setItem("tema", nuevo);\n});' }, { name: 'styles.css', code: 'body { font-family: sans-serif; background: #ffffff; color: #14221B; margin: 0; padding: 20px; transition: background .2s; }\nheader { display: flex; justify-content: space-between; align-items: center; }\nbody.oscuro { background: #14221B; color: #F6F3EC; }' }] },
      { t: 'h', text: 'Entrega: taller de portafolio', min: 30 },
      { t: 'note', kind: 'mision', html: '<p>Reúne tus dos laboratorios (lista de tareas y modo oscuro) en un portafolio con una página de inicio que los enlace. Entrega el código y un documento Word con evidencias.</p>' },
      { t: 'check', title: 'Lista de entrega', items: ['Cada archivo JS comienza con un comentario de cabecera: propósito, autor y fecha', 'Cada función lleva un comentario con sus entradas, su salida y su regla principal', 'Los nombres de variables y funciones están en español claro y en camelCase', 'No hay código muerto ni console.log olvidados', 'Documento Word con capturas de pantalla de cada funcionalidad en acción', 'En el Word: la especificación escrita antes de programar y una reflexión de 5 líneas sobre lo aprendido', 'Historial de Git con al menos 4 commits con mensajes descriptivos'] },
      { t: 'quiz', qs: [
        ['¿Qué devuelve querySelectorAll?', ['Un solo elemento', 'Una lista (NodeList) de elementos', 'Un texto'], 1, 'Se recorre con forEach.'],
        ['¿Por qué se prefiere textContent a innerHTML con datos del usuario?', ['Es más lento', 'Evita inyección de código (XSS)', 'Cambia el estilo'], 1, 'innerHTML interpreta etiquetas.'],
        ['¿Para qué sirve e.preventDefault() en un submit?', ['Detener el envío y recarga por defecto', 'Borrar el formulario', 'Validar el correo'], 0, 'Así controlas el envío con JavaScript.'],
        ['¿Qué ventaja tiene la delegación de eventos?', ['Un solo listener sirve a elementos presentes y futuros', 'Hace el sitio más bonito', 'Evita usar el DOM'], 0, 'Se apoya en que los eventos “burbujean”.']] }
    ]
  });

  /* ===== 4.2a Asincronismo ===== */
  C.add({
    id: '4.2a',
    lead: 'JavaScript solo puede hacer una cosa a la vez, y sin embargo puede pedir datos a un servidor sin congelar la página. El secreto se llama Event Loop.',
    blocks: [
      { t: 'h', text: 'Un solo hilo, muchos trabajos', min: 25 },
      { t: 'ana', title: 'Analogía: el restaurante con un solo mesero', rows: [
        ['Mesero único', 'El hilo de JavaScript: atiende una cosa a la vez.'],
        ['La cocina', 'Las Web APIs del navegador: preparan pedidos largos (red, temporizadores) mientras el mesero sigue atendiendo.'],
        ['El timbre de la cocina', 'Las colas: cuando un pedido está listo, espera su turno para ser servido.'],
        ['El Event Loop', 'La regla del mesero: cuando termine lo que tiene en las manos, revisa si hay algo listo. Los pedidos VIP (microtareas) pasan primero.']] },
      { t: 'note', kind: 'key', html: '<p>Orden de ejecución: 1) todo el código síncrono, 2) <b>todas</b> las microtareas (promesas, <code>await</code>), 3) <b>una</b> macrotarea (<code>setTimeout</code>, eventos) y se repite.</p>' },
      { t: 'custom', build: function (w, x, U) {
        loopSim(w, U, [
          { name: 'setTimeout y Promise', code: 'console.log("A");\nsetTimeout(() => console.log("B"), 0);\nPromise.resolve().then(() => console.log("C"));\nconsole.log("D");', steps: [
            { l: 1, stack: ['console.log("A")'], out: [], note: 'Se apila la primera línea.' },
            { l: 1, stack: [], out: ['A'], note: 'Se imprime A y la pila queda vacía.' },
            { l: 2, stack: ['setTimeout(...)'], out: ['A'], note: 'Se llama a setTimeout.' },
            { l: 2, stack: [], web: ['temporizador 0 ms → B'], out: ['A'], note: 'El navegador (Web API) toma el temporizador. JavaScript sigue adelante.' },
            { l: 3, stack: ['Promise.then(...)'], web: ['temporizador 0 ms → B'], out: ['A'], note: 'Se registra la promesa ya resuelta.' },
            { l: 3, stack: [], web: ['temporizador 0 ms → B'], micro: ['callback C'], out: ['A'], note: 'El callback del then va a la cola de <b>microtareas</b>.' },
            { l: 4, stack: ['console.log("D")'], web: ['temporizador 0 ms → B'], micro: ['callback C'], out: ['A'], note: 'El código síncrono continúa.' },
            { l: 4, stack: [], web: [], micro: ['callback C'], macro: ['callback B'], out: ['A', 'D'], note: 'Se imprime D. El temporizador venció y su callback pasó a la cola de <b>macrotareas</b>.' },
            { l: 3, stack: ['callback C'], micro: [], macro: ['callback B'], out: ['A', 'D'], note: 'Pila vacía: el Event Loop prioriza las <b>microtareas</b>.' },
            { l: 3, stack: [], macro: ['callback B'], out: ['A', 'D', 'C'], note: 'Se imprime C.' },
            { l: 2, stack: ['callback B'], macro: [], out: ['A', 'D', 'C'], note: 'Ahora sí, una macrotarea.' },
            { l: 2, stack: [], out: ['A', 'D', 'C', 'B'], note: 'Resultado final: A, D, C, B. Aunque el temporizador era de 0 ms, la promesa pasó primero.' }] },
          { name: 'async / await', code: 'async function principal() {\n  console.log("1");\n  await Promise.resolve();\n  console.log("3");\n}\nprincipal();\nconsole.log("2");', steps: [
            { l: 6, stack: ['principal()'], out: [], note: 'Se llama a la función asíncrona.' },
            { l: 2, stack: ['principal()', 'console.log("1")'], out: ['1'], note: 'Corre de forma síncrona hasta el primer await.' },
            { l: 3, stack: ['principal()'], out: ['1'], note: 'Aparece await: la función se <b>pausa</b>.' },
            { l: 3, stack: [], micro: ['continuar principal()'], out: ['1'], note: 'La continuación se encola como microtarea y el control vuelve a quien llamó.' },
            { l: 7, stack: ['console.log("2")'], micro: ['continuar principal()'], out: ['1'], note: 'El código que sigue después de la llamada se ejecuta primero.' },
            { l: 7, stack: [], micro: ['continuar principal()'], out: ['1', '2'], note: 'Se imprime 2.' },
            { l: 4, stack: ['continuar principal()', 'console.log("3")'], micro: [], out: ['1', '2'], note: 'La pila quedó vacía: se reanuda la función.' },
            { l: 4, stack: [], out: ['1', '2', '3'], note: 'Resultado: 1, 2, 3. await no bloquea el programa, solo pausa esa función.' }] }]);
      } },
      { t: 'h', text: 'Promesas: un valor que llegará', min: 35 },
      { t: 'p', html: '<p>Una <b>promesa</b> es un objeto que representa el resultado futuro de una operación. Tiene tres estados: <i>pendiente</i> (<code>pending</code>), <i>cumplida</i> (<code>fulfilled</code>) y <i>rechazada</i> (<code>rejected</code>). Una vez que cambia, no vuelve atrás.</p>' },
      { t: 'code', lang: 'js', title: 'promesas.js', code: 'function esperar(ms) {\n  return new Promise((resolve, reject) => {\n    if (ms < 0) reject(new Error("El tiempo no puede ser negativo"));\n    setTimeout(() => resolve("listo tras " + ms + " ms"), ms);\n  });\n}\n\nesperar(500)\n  .then(msg => console.log(msg))        // si se cumple\n  .catch(err => console.error(err.message)) // si se rechaza\n  .finally(() => console.log("terminó")); // siempre' },
      { t: 'custom', build: function (w, x, U) {
        var el = U.el, esc = U.esc, box = el('div', { class: 'play' });
        box.appendChild(el('h4', null, 'Simulador de promesas'));
        var ctl = el('div', { class: 'ctl' }), res = 'cumplir', ms = 1200;
        var l1 = el('label', null, 'Resultado '), s1 = el('select'); ['cumplir', 'rechazar'].forEach(function (o) { s1.appendChild(el('option', { value: o }, o)); }); s1.onchange = function () { res = s1.value; }; l1.appendChild(s1);
        var l2 = el('label', null, 'Retardo '), o2 = el('output', null, ms + ' ms'), r2 = el('input', { type: 'range', min: 200, max: 3000, step: 100 }); r2.value = ms; r2.oninput = function () { ms = +r2.value; o2.textContent = ms + ' ms'; }; l2.appendChild(o2); l2.appendChild(r2);
        ctl.appendChild(l1); ctl.appendChild(l2); box.appendChild(ctl);
        var go = el('button', { class: 'btn pri' }, 'Crear y esperar la promesa'), log = el('div', { class: 'panel', style: 'margin-top:8px;min-height:80px' }), st = el('div', { class: 'pill' });
        box.appendChild(go); box.appendChild(st); box.appendChild(log);
        function add(t) { log.appendChild(el('div', { class: 'mono' }, esc(t))); }
        go.onclick = function () {
          log.innerHTML = ''; st.textContent = 'Estado: pendiente'; add('const p = new Promise(...)  → pendiente'); var t0 = Date.now();
          var p = new Promise(function (ok, no) { setTimeout(function () { if (res === 'cumplir') ok('datos recibidos'); else no(new Error('falló el servidor')); }, ms); });
          add('// el código síncrono sigue ejecutándose sin esperar');
          p.then(function (v) { st.textContent = 'Estado: cumplida'; add('.then → ' + v + ' (' + (Date.now() - t0) + ' ms)'); }).catch(function (e) { st.textContent = 'Estado: rechazada'; add('.catch → ' + e.message + ' (' + (Date.now() - t0) + ' ms)'); }).finally(function () { add('.finally → siempre se ejecuta'); });
        };
        w.appendChild(box);
      } },
      { t: 'h', text: 'async / await: promesas con aspecto síncrono', min: 30 },
      { t: 'code', lang: 'js', title: 'async.js', code: 'async function cargarTodo() {\n  try {\n    const a = await esperar(300);   // pausa aquí, sin bloquear la página\n    const b = await esperar(300);\n    console.log(a, b);              // tardó ~600 ms (en secuencia)\n\n    const [x, y] = await Promise.all([esperar(300), esperar(300)]);\n    console.log(x, y);              // tardó ~300 ms (en paralelo)\n  } catch (err) {\n    console.error("Algo salió mal:", err.message);\n  } finally {\n    console.log("fin");\n  }\n}' },
      { t: 'table', head: ['Herramienta', 'Para qué'], rows: [['<code>Promise.all([…])</code>', 'Esperar que todas terminen; falla si una falla'], ['<code>Promise.allSettled([…])</code>', 'Esperar a todas aunque alguna falle'], ['<code>Promise.race([…])</code>', 'La primera que termine gana (útil para tiempos límite)'], ['<code>try / catch</code>', 'Capturar rechazos dentro de funciones async']] },
      { t: 'note', kind: 'warn', html: '<p>Errores típicos: olvidar <code>await</code> (obtienes una promesa en lugar del valor), usar <code>await</code> en un <code>forEach</code> (no espera) y olvidar el <code>try/catch</code>, que deja el error sin manejar.</p>' },
      { t: 'h', text: 'Laboratorio: promesas y async/await', min: 50 },
      { t: 'lab', id: 'promesas', title: 'Construye funciones asíncronas', intro: 'Implementa las cuatro funciones. Las pruebas esperan las promesas y miden tiempos.', height: 380,
        files: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es"><head><meta charset="UTF-8"><title>Promesas</title></head>\n<body><script src="app.js"></script></body></html>' }, { name: 'app.js', code: '// 1. Devuelve una promesa que se cumple con el valor "ms" después de ms milisegundos\nfunction esperar(ms) {\n}\n\n// 2. Devuelve una promesa: cumple con a / b, o rechaza con new Error("No se puede dividir por cero")\nfunction dividir(a, b) {\n}\n\n// 3. async: devuelve el resultado de dividir(a, b), o el texto "Error: " + mensaje si falla\nasync function dividirSeguro(a, b) {\n}\n\n// 4. async: espera 3 veces esperar(100) EN PARALELO y devuelve [100, 100, 100] (debe tardar ~100 ms)\nasync function enParalelo() {\n}\n' }],
        tests: [
          { t: 'esperar(30) se cumple con 30', f: async function () { return (await esperar(30)) === 30; } },
          { t: 'esperar devuelve una promesa', f: function () { return esperar(1) instanceof Promise; } },
          { t: 'dividir(10, 2) se cumple con 5', f: async function () { return (await dividir(10, 2)) === 5; } },
          { t: 'dividir(1, 0) se rechaza con Error', f: async function () { try { await dividir(1, 0); return false; } catch (e) { return e instanceof Error && /cero/.test(e.message); } } },
          { t: 'dividirSeguro(1, 0) devuelve “Error: No se puede dividir por cero”', f: async function () { return (await dividirSeguro(1, 0)) === 'Error: No se puede dividir por cero'; } },
          { t: 'dividirSeguro(9, 3) devuelve 3', f: async function () { return (await dividirSeguro(9, 3)) === 3; } },
          { t: 'enParalelo devuelve [100,100,100] en menos de 200 ms', f: async function () { var t = performance.now(), r = await enParalelo(); return JSON.stringify(r) === '[100,100,100]' && performance.now() - t < 200; } }],
        solution: [{ name: 'app.js', code: 'function esperar(ms) {\n  return new Promise(resolve => setTimeout(() => resolve(ms), ms));\n}\nfunction dividir(a, b) {\n  return new Promise((resolve, reject) => {\n    if (b === 0) reject(new Error("No se puede dividir por cero"));\n    else resolve(a / b);\n  });\n}\nasync function dividirSeguro(a, b) {\n  try {\n    return await dividir(a, b);\n  } catch (e) {\n    return "Error: " + e.message;\n  }\n}\nasync function enParalelo() {\n  return Promise.all([esperar(100), esperar(100), esperar(100)]);\n}' }] },
      { t: 'quiz', qs: [
        ['¿Qué se ejecuta primero cuando la pila queda vacía?', ['Una macrotarea', 'Todas las microtareas', 'Un setTimeout de 0 ms'], 1, 'Las promesas pasan antes que los temporizadores.'],
        ['¿Qué hace await?', ['Bloquea todo el navegador', 'Pausa solo la función async hasta que la promesa se resuelva', 'Convierte una función en síncrona'], 1, 'El resto del programa sigue vivo.'],
        ['Para lanzar 3 peticiones a la vez y esperar todas usarías…', ['Tres await seguidos', 'Promise.all', 'setTimeout'], 1, 'Los await seguidos las harían en secuencia.'],
        ['¿Qué estado tiene una promesa que lanzó un error?', ['pending', 'fulfilled', 'rejected'], 2, 'Se maneja con catch o try/catch.']] }
    ]
  });

  /* ===== 4.2b Fetch API ===== */
  C.add({
    id: '4.2b',
    lead: 'Con fetch tu página conversa con servidores del mundo entero: pide datos en formato JSON y los convierte en tarjetas, tablas y gráficos.',
    blocks: [
      { t: 'h', text: 'Qué es una API REST', min: 25 },
      { t: 'ana', title: 'Analogía: el menú del restaurante', rows: [
        ['La API', 'El menú: lista lo que puedes pedir y cómo pedirlo.'],
        ['El endpoint', 'Cada plato: <code>/character</code>, <code>/character/1</code>.'],
        ['El verbo HTTP', 'La acción: GET (consultar), POST (crear), PUT/PATCH (actualizar), DELETE (borrar).'],
        ['La respuesta', 'Un plato en formato JSON: texto estructurado que JavaScript convierte en objetos.']] },
      { t: 'table', head: ['Código', 'Significado', 'Qué hacer en la interfaz'], rows: [
        ['200 OK', 'Todo bien', 'Mostrar los datos'],
        ['201 Created', 'Se creó el recurso', 'Confirmar al usuario'],
        ['400 Bad Request', 'La petición está mal formada', 'Revisar lo enviado'],
        ['404 Not Found', 'No existe el recurso', 'Mostrar “sin resultados”'],
        ['500 Server Error', 'Falló el servidor', 'Mostrar error y permitir reintentar']] },
      { t: 'code', lang: 'js', title: 'respuesta.json', code: '{\n  "info": { "count": 826, "pages": 42 },\n  "results": [\n    {\n      "id": 1,\n      "name": "Rick Sanchez",\n      "status": "Alive",\n      "species": "Human",\n      "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"\n    }\n  ]\n}' },
      { t: 'h', text: 'fetch paso a paso', min: 35 },
      { t: 'hot', parts: [['const respuesta = ', null], ['await ', 0], ['fetch(', 1], ['"https://rickandmortyapi.com/api/character/1"', 2], [');', 1], ['\n', null], ['if (!respuesta.ok) ', 3], ['throw new Error("HTTP " + respuesta.status);', 3], ['\n', null], ['const datos = ', null], ['await ', 0], ['respuesta.json();', 4]],
        notes: [['await', 'Espera sin bloquear. Se usa dentro de una función <code>async</code>.'], ['fetch()', 'Lanza la petición (GET por defecto) y devuelve una promesa de <code>Response</code>.'], ['URL del endpoint', 'Puede llevar parámetros: <code>?name=rick&amp;status=alive</code>.'], ['Comprobar response.ok', '<b>fetch solo rechaza ante fallos de red.</b> Un 404 o 500 sí “cumple” la promesa, por eso debes mirar <code>ok</code> y <code>status</code>.'], ['response.json()', 'Lee el cuerpo y lo convierte en objetos. También devuelve una promesa.']] },
      { t: 'code', lang: 'js', title: 'plantilla de petición', code: 'async function obtener(url) {\n  try {\n    const r = await fetch(url);\n    if (!r.ok) throw new Error("HTTP " + r.status);\n    return await r.json();\n  } catch (error) {\n    console.error("No se pudo obtener los datos:", error.message);\n    return null;\n  }\n}\n\n// Enviar datos (POST)\nasync function crear(url, datos) {\n  const r = await fetch(url, {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify(datos)\n  });\n  return r.json();\n}' },
      { t: 'cards', items: [
        { h: 'Tres estados de la interfaz', html: '<p>Toda carga de datos debe contemplar <b>cargando</b>, <b>éxito</b> y <b>error</b>. Una pantalla en blanco sin explicación es un error de diseño.</p>' },
        { h: 'CORS', html: '<p>El navegador solo permite leer respuestas de otro dominio si el servidor lo autoriza. Si ves un error “CORS” en consola, el problema es del servidor, no de tu fetch.</p>' },
        { h: 'Herramientas', html: '<p>Pestaña <b>Red (Network)</b> de F12: ves cada petición, su estado, tiempos y la respuesta cruda.</p>' }] },
      { t: 'h', text: 'Laboratorio: explora la API', min: 55 },
      { t: 'lab', id: 'fetch', mock: true, title: 'Consulta personajes con fetch', intro: 'Esta práctica usa una API simulada con los mismos endpoints que Rick & Morty, así funciona sin internet. Marca “Simular fallo de red” para ver tu manejo de errores.', height: 420,
        files: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es"><head><meta charset="UTF-8"><title>Fetch</title>\n<style>body{font-family:sans-serif;padding:12px}pre{background:#f1f1f1;padding:8px;white-space:pre-wrap}</style></head>\n<body>\n<h2>Consulta de personajes</h2>\n<p id="estado">Esperando…</p>\n<pre id="salida"></pre>\n<script src="app.js"></script>\n</body></html>' }, { name: 'app.js', code: 'const API = "https://rickandmortyapi.com/api/character";\n\n// 1. Devuelve el objeto del personaje con ese id, o null si no existe o falla la red\nasync function obtenerPersonaje(id) {\n}\n\n// 2. Devuelve el ARREGLO de personajes cuyo nombre contenga el texto, o [] si no hay (404) o falla la red\nasync function buscarPorNombre(texto) {\n}\n\n// 3. Muestra "Cargando…" en #estado, llama a buscarPorNombre("smith") y escribe\n//    los nombres (uno por línea) en #salida; si no hay resultados, escribe "Sin resultados" en #estado\nasync function mostrar() {\n}\n\nmostrar();\n' }],
        tests: [
          { t: 'obtenerPersonaje(1) devuelve a Rick Sanchez', pts: 1, f: async function () { var p = await obtenerPersonaje(1); return !!p && p.name === 'Rick Sanchez'; } },
          { t: 'obtenerPersonaje(999) devuelve null (404 controlado)', f: async function () { return (await obtenerPersonaje(999)) === null; } },
          { t: 'buscarPorNombre("smith") devuelve 4 personajes', f: async function () { var r = await buscarPorNombre('smith'); return Array.isArray(r) && r.length === 4; } },
          { t: 'buscarPorNombre("zzz") devuelve []', f: async function () { var r = await buscarPorNombre('zzz'); return Array.isArray(r) && r.length === 0; } },
          { t: 'Comprueba response.ok en el código', f: function () { return /\.ok\b|\.status/.test(FILES['app.js']); } },
          { t: 'Usa try/catch para errores de red', f: function () { return /try\s*\{/.test(FILES['app.js']) && /catch/.test(FILES['app.js']); } },
          { t: 'La página muestra los nombres al cargar', f: function () { return /Summer Smith/.test(txt(q('#salida'))); } }],
        solution: [{ name: 'app.js', code: 'const API = "https://rickandmortyapi.com/api/character";\n\nasync function obtenerPersonaje(id) {\n  try {\n    const r = await fetch(`${API}/${id}`);\n    if (!r.ok) return null;\n    return await r.json();\n  } catch (e) {\n    return null;\n  }\n}\n\nasync function buscarPorNombre(texto) {\n  try {\n    const r = await fetch(`${API}?name=${encodeURIComponent(texto)}`);\n    if (!r.ok) return [];\n    const datos = await r.json();\n    return datos.results;\n  } catch (e) {\n    return [];\n  }\n}\n\nasync function mostrar() {\n  const estado = document.getElementById("estado");\n  const salida = document.getElementById("salida");\n  estado.textContent = "Cargando…";\n  const lista = await buscarPorNombre("smith");\n  if (lista.length === 0) {\n    estado.textContent = "Sin resultados";\n    return;\n  }\n  estado.textContent = lista.length + " personajes";\n  salida.textContent = lista.map(p => p.name).join("\\n");\n}\nmostrar();' }] },
      { t: 'quiz', qs: [
        ['Si el servidor responde 404, ¿fetch rechaza la promesa?', ['Sí, siempre', 'No: debes revisar response.ok', 'Solo en Chrome'], 1, 'Solo rechaza ante fallos de red.'],
        ['¿Qué devuelve response.json()?', ['Un objeto ya listo', 'Una promesa que se resuelve con los datos', 'Un texto'], 1, 'Por eso lleva await.'],
        ['¿Qué verbo HTTP se usa para crear un recurso?', ['GET', 'POST', 'DELETE'], 1, 'GET consulta; POST crea.'],
        ['¿Qué tres estados debe cubrir una interfaz que carga datos?', ['Rápido, lento, caído', 'Cargando, éxito, error', 'Inicio, medio, fin'], 1, 'Siempre informa al usuario.']] }
    ]
  });

  /* ===== 4.t Taller consumo REST ===== */
  var RM_HTML = '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Explorador de personajes</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <header>\n    <h1>Explorador Rick & Morty</h1>\n    <form id="formulario">\n      <input type="search" id="busqueda" placeholder="Busca un personaje" aria-label="Nombre del personaje">\n      <button type="submit" id="buscar">Buscar</button>\n    </form>\n    <p id="mensaje" role="status"></p>\n  </header>\n  <main id="resultados"></main>\n  <script src="app.js"></script>\n</body>\n</html>';
  C.add({
    id: '4.t',
    lead: 'Aplicamos todo el módulo en una aplicación real: un explorador de personajes que busca en una API, muestra tarjetas y maneja los estados de carga, vacío y error.',
    blocks: [
      { t: 'h', text: 'Especificación del proyecto', min: 20 },
      { t: 'table', head: ['Sección', 'Requisito'], rows: [
        ['Objetivo', 'Buscar personajes por nombre y mostrarlos como tarjetas.'],
        ['Entradas', 'Texto del campo #busqueda; envío del formulario.'],
        ['Salidas', 'Tarjetas <code>article.card</code> con imagen, nombre y estado; mensajes en #mensaje.'],
        ['Reglas', 'Al cargar la página se listan todos. El estado (Alive, Dead, unknown) lleva una clase en minúsculas para colorearlo. Mientras llega la respuesta, #mensaje dice “Cargando…”.'],
        ['Errores', '404: “No se encontraron personajes”. Fallo de red: mensaje de “Error de conexión”. Nunca dejar la pantalla en blanco.'],
        ['Contrato de código', 'Debe existir <code>async function cargarPersonajes(nombre = "")</code> y <code>mostrarTarjetas(lista)</code>.']] },
      { t: 'steps', items: [
        { t: 'Conecta el formulario', html: '<p>Escucha <code>submit</code>, evita la recarga con <code>preventDefault()</code> y llama a <code>cargarPersonajes(input.value.trim())</code>.</p>' },
        { t: 'Escribe cargarPersonajes', html: '<p>Muestra “Cargando…”, haz el fetch con <code>?name=</code>, verifica <code>r.ok</code>, convierte a JSON.</p>' },
        { t: 'Escribe mostrarTarjetas', html: '<p>Vacía el contenedor y crea una tarjeta por personaje. Agrega al estado la clase <code>p.status.toLowerCase()</code>.</p>' },
        { t: 'Cubre los errores', html: '<p>404 → mensaje de vacío. Excepción (red) → mensaje de conexión.</p>' },
        { t: 'Dale estilo', html: '<p>Grid responsive con <code>auto-fit</code>, estados con colores y modo móvil.</p>' },
        { t: 'Commit', html: '<p><code>feat: explorador de personajes con fetch y manejo de errores</code></p>' }] },
      { t: 'h', text: 'Taller con calificación automática', min: 120 },
      { t: 'lab', id: 'rm', mock: true, points: true, title: 'Explorador de personajes', intro: 'API simulada con 8 personajes. Prueba también “Simular fallo de red”. Las pruebas ejecutan tus funciones, así que respeta los nombres del contrato.', height: 520,
        files: [{ name: 'index.html', code: RM_HTML }, { name: 'styles.css', code: '* { box-sizing: border-box; }\nbody { font-family: sans-serif; margin: 0; padding: 16px; background: #F6F3EC; color: #14221B; }\n#resultados { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }\n.card { background: #fff; border: 1px solid #9AAEA3; padding: 10px; }\n.card img { width: 100%; height: auto; display: block; }\n/* Colorea .alive, .dead y .unknown */\n' }, { name: 'app.js', code: 'const API = "https://rickandmortyapi.com/api/character";\nconst resultados = document.getElementById("resultados");\nconst mensaje = document.getElementById("mensaje");\nconst input = document.getElementById("busqueda");\nconst formulario = document.getElementById("formulario");\n\nfunction mostrarTarjetas(lista) {\n  // vacía #resultados y crea un article.card por personaje\n}\n\nasync function cargarPersonajes(nombre = "") {\n  // cargando -> fetch -> ok? -> json -> mostrarTarjetas / errores\n}\n\nformulario.addEventListener("submit", (e) => {\n  // evita la recarga y busca\n});\n\ncargarPersonajes();\n' }],
        tests: [
          { t: 'Estructura: #busqueda, #buscar, #mensaje y #resultados', pts: 5, f: function () { return ['busqueda', 'buscar', 'mensaje', 'resultados'].every(function (i) { return !!document.getElementById(i); }); } },
          { t: 'Al cargar se muestran los 8 personajes', pts: 15, f: async function () { await cargarPersonajes(''); return qa('#resultados .card').length === 8; } },
          { t: 'Cada tarjeta tiene imagen, nombre (h3) y estado', pts: 15, f: function () { var c = qa('#resultados .card'); return c.length > 0 && c.every(function (t) { var i = t.querySelector('img'); return i && i.getAttribute('src') && i.getAttribute('alt') && txt(t.querySelector('h3')).length > 2 && t.querySelector('.estado'); }); } },
          { t: 'El estado lleva clase en minúsculas (alive, dead, unknown)', pts: 10, f: function () { var c = qa('#resultados .card'), adj = c.filter(function (t) { return /Adjudicator/.test(txt(t)); })[0]; return c.length > 0 && !!c[0].querySelector('.estado.alive') && !!adj && !!adj.querySelector('.estado.dead'); } },
          { t: 'Muestra “Cargando…” mientras llega la respuesta', pts: 10, f: async function () { var p = cargarPersonajes(''); var ok = /cargando/i.test(txt(q('#mensaje'))); await p; return ok; } },
          { t: 'Buscar “rick” devuelve 2 personajes', pts: 10, f: async function () { await cargarPersonajes('rick'); return qa('#resultados .card').length === 2; } },
          { t: 'El formulario busca al enviarse', pts: 15, f: async function () { q('#busqueda').value = 'summer'; q('#formulario').requestSubmit(); await new Promise(function (r) { setTimeout(r, 1100); }); var ok = qa('#resultados .card').length === 1; q('#busqueda').value = ''; await cargarPersonajes(''); return ok; } },
          { t: '404: sin tarjetas y mensaje informativo', pts: 10, f: async function () { await cargarPersonajes('zzzz'); var ok = qa('#resultados .card').length === 0 && txt(q('#mensaje')).length > 5 && !/cargando/i.test(txt(q('#mensaje'))); await cargarPersonajes(''); return ok; } },
          { t: 'Fallo de red: mensaje de error de conexión', pts: 10, f: async function () { var orig = window.fetch; window.fetch = function () { return Promise.reject(new TypeError('Failed to fetch')); }; try { await cargarPersonajes(''); return /error|conexi|red/i.test(txt(q('#mensaje'))); } finally { window.fetch = orig; await cargarPersonajes(''); } } }],
        solution: [{ name: 'app.js', code: 'const API = "https://rickandmortyapi.com/api/character";\nconst resultados = document.getElementById("resultados");\nconst mensaje = document.getElementById("mensaje");\nconst input = document.getElementById("busqueda");\nconst formulario = document.getElementById("formulario");\n\nfunction mostrarTarjetas(lista) {\n  resultados.innerHTML = "";\n  for (const p of lista) {\n    const card = document.createElement("article");\n    card.className = "card";\n    const img = document.createElement("img");\n    img.src = p.image;\n    img.alt = "Foto de " + p.name;\n    const h3 = document.createElement("h3");\n    h3.textContent = p.name;\n    const estado = document.createElement("p");\n    estado.className = "estado " + p.status.toLowerCase();\n    estado.textContent = p.status + " · " + p.species;\n    card.append(img, h3, estado);\n    resultados.append(card);\n  }\n}\n\nasync function cargarPersonajes(nombre = "") {\n  mensaje.textContent = "Cargando…";\n  resultados.innerHTML = "";\n  try {\n    const r = await fetch(`${API}?name=${encodeURIComponent(nombre)}`);\n    if (!r.ok) throw new Error(r.status === 404 ? "vacio" : "http");\n    const datos = await r.json();\n    mostrarTarjetas(datos.results);\n    mensaje.textContent = datos.info.count + " personajes encontrados";\n  } catch (e) {\n    mensaje.textContent = e.message === "vacio"\n      ? "No se encontraron personajes con ese nombre."\n      : "Error de conexión. Revisa tu red e inténtalo de nuevo.";\n  }\n}\n\nformulario.addEventListener("submit", (e) => {\n  e.preventDefault();\n  cargarPersonajes(input.value.trim());\n});\n\ncargarPersonajes();' }, { name: 'styles.css', code: '.estado.alive { color: #1E8A4C; }\n.estado.dead { color: #B02A2A; }\n.estado.unknown { color: #777; }' }] },
      { t: 'note', kind: 'tip', html: '<p>Cuando funcione con la API simulada, cámbiala por la real: la URL es la misma. Si tu navegador carga datos reales, ya tienes tu primera aplicación conectada a internet. Retos opcionales: paginación con <code>info.next</code>, filtro por estado y búsqueda mientras escribes con <i>debounce</i>.</p>' },
      { t: 'check', title: 'Entrega', items: ['Funciona con búsqueda vacía, con resultado y con error', 'Sin console.log olvidados', 'Comentarios de cabecera y de funciones', 'Probado a 360 px y a 1024 px', 'Commit y push al repositorio del proyecto'] }
    ]
  });
})();
