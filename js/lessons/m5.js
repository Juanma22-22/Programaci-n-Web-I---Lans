/* Módulo 5 · TypeScript, persistencia local y despliegue */
(function () {
  var C = Course;

  /* ---------- mini verificador de tipos para la clase de TypeScript ---------- */
  function splitTop(s) { var out = [], d = 0, q = '', cur = ''; for (var i = 0; i < s.length; i++) { var c = s[i]; if (q) { cur += c; if (c === q) q = ''; continue; } if (c === '"' || c === "'" || c === '`') { q = c; cur += c; continue; } if (c === '[' || c === '(' || c === '{') d++; if (c === ']' || c === ')' || c === '}') d--; if (c === ',' && d === 0) { out.push(cur.trim()); cur = ''; } else cur += c; } if (cur.trim()) out.push(cur.trim()); return out; }
  function litType(s) {
    s = s.trim();
    if (/^(["'`]).*\1$/.test(s)) return { k: 'string', v: s };
    if (/^-?\d+(\.\d+)?$/.test(s)) return { k: 'number' };
    if (/^(true|false)$/.test(s)) return { k: 'boolean' };
    if (s === 'null') return { k: 'null' }; if (s === 'undefined') return { k: 'undefined' };
    if (/^\[.*\]$/.test(s)) return { k: 'array', items: splitTop(s.slice(1, -1)).map(litType) };
    return null;
  }
  function name(t) { return t ? (t.k === 'array' ? 'array' : t.k) : '?'; }
  function accepts(T, t) {
    if (!t) return true; T = T.trim();
    if (T.indexOf('|') > -1 && !/^\(/.test(T)) return splitTop(T.replace(/\|/g, ',')).some(function (p) { return accepts(p, t); });
    if (T === 'any' || T === 'unknown') return true;
    if (/\[\]$/.test(T)) return t.k === 'array' && t.items.every(function (i) { return accepts(T.slice(0, -2), i); });
    if (/^(["']).*\1$/.test(T)) return t.k === 'string' && t.v.slice(1, -1) === T.slice(1, -1);
    return t.k === T;
  }
  function checkTS(src) {
    var errs = [], fns = {}, vars = {}, lines = src.split('\n');
    lines.forEach(function (ln, i) {
      var m = ln.match(/^\s*function\s+(\w+)\s*\(([^)]*)\)/);
      if (m) fns[m[1]] = splitTop(m[2]).map(function (p) { var q = p.split(':'); return { n: q[0].trim(), t: q[1] ? q[1].trim() : 'any' }; });
    });
    lines.forEach(function (ln, i) {
      var n = i + 1, m;
      if ((m = ln.match(/^\s*(?:const|let)\s+(\w+)\s*:\s*([^=]+?)\s*=\s*(.+?);?\s*$/))) {
        vars[m[1]] = m[2]; var t = litType(m[3]);
        if (m[3].trim()[0] === '[' && t && t.k === 'array' && /\[\]$/.test(m[2].trim())) { t.items.forEach(function (it, k) { if (!accepts(m[2].trim().slice(0, -2), it)) errs.push([n, "El tipo '" + name(it) + "' no se puede asignar al tipo '" + m[2].trim().slice(0, -2) + "' (elemento " + (k + 1) + " del arreglo)."]); }); }
        else if (!accepts(m[2], t)) errs.push([n, "El tipo '" + name(t) + "' no se puede asignar al tipo '" + m[2].trim() + "'."]);
      } else if ((m = ln.match(/^\s*(\w+)\s*=\s*(.+?);?\s*$/)) && vars[m[1]] && !/^\s*(function|return)/.test(ln)) {
        var t2 = litType(m[2]); if (!accepts(vars[m[1]], t2)) errs.push([n, "El tipo '" + name(t2) + "' no se puede asignar al tipo '" + vars[m[1]].trim() + "'."]);
      }
      if (/^\s*function\b/.test(ln)) return;
      var re = /\b(\w+)\(([^()]*)\)/g, c;
      while ((c = re.exec(ln))) { var f = fns[c[1]]; if (!f) continue; var args = splitTop(c[2]);
        if (args.length !== f.length) { errs.push([n, 'Se esperaban ' + f.length + ' argumentos, pero se recibieron ' + args.length + '.']); continue; }
        args.forEach(function (a, k) { var t3 = litType(a); if (!accepts(f[k].t, t3)) errs.push([n, "El argumento de tipo '" + name(t3) + "' no es asignable al parámetro '" + f[k].n + "' de tipo '" + f[k].t + "'."]); }); }
    });
    return errs;
  }

  /* ===== 5.1 TypeScript ===== */
  C.add({
    id: '5.1',
    lead: 'JavaScript te deja equivocarte en silencio; TypeScript te avisa mientras escribes. Añadimos tipos al código que ya sabes escribir y descubrimos por qué los equipos grandes no vuelven atrás.',
    blocks: [
      { t: 'h', text: 'Por qué TypeScript', min: 25 },
      { t: 'ana', title: 'Analogía: el corrector ortográfico del código', rows: [
        ['JavaScript', 'Escribes y envías. Si hay un error, lo encuentra el usuario.'],
        ['TypeScript', 'El editor subraya el error en rojo antes de ejecutar: “esperaba un número y le pasaste un texto”.'],
        ['El resultado', 'TypeScript se <b>compila</b> a JavaScript normal. El navegador nunca ve los tipos.']] },
      { t: 'code', lang: 'js', title: 'Un error clásico de JavaScript', code: 'function total(precio, cantidad) {\n  return precio * cantidad;\n}\nconsole.log(total("8000", 3));  // 24000: funciona por casualidad\nconsole.log(total("ocho", 3));  // NaN: nadie te avisó\nconsole.log(total(8000));       // NaN: faltó un argumento' },
      { t: 'cards', items: [
        { h: 'Menos errores en producción', html: '<p>La mayoría de errores tontos se detectan al escribir.</p>' },
        { h: 'Autocompletado inteligente', html: '<p>El editor sabe qué propiedades tiene cada objeto y las sugiere.</p>' },
        { h: 'Documentación viva', html: '<p>Las firmas de las funciones explican qué reciben y qué devuelven.</p>' },
        { h: 'Refactorizar sin miedo', html: '<p>Cambias un nombre y el compilador te muestra todo lo que se rompe.</p>' }] },
      { t: 'h', text: 'Tipos básicos y anotaciones', min: 30 },
      { t: 'table', head: ['Tipo', 'Ejemplo', 'Notas'], rows: [
        ['<code>string</code>', '<code>let nombre: string = "Ana";</code>', 'Texto'],
        ['<code>number</code>', '<code>let edad: number = 20;</code>', 'Enteros y decimales'],
        ['<code>boolean</code>', '<code>let activo: boolean = true;</code>', ''],
        ['Arreglo', '<code>let notas: number[] = [4, 5];</code>', 'También <code>Array&lt;number&gt;</code>'],
        ['Unión', '<code>let id: string | number;</code>', 'Uno u otro'],
        ['Literal', '<code>type Estado = "activo" | "inactivo";</code>', 'Solo esos valores'],
        ['<code>unknown</code>', 'Datos sin verificar (JSON de una API)', 'Obliga a comprobar antes de usar'],
        ['<code>any</code>', '—', '<b>Apaga el verificador.</b> Evítalo']] },
      { t: 'h', text: 'Practica con el verificador', min: 25 },
      { t: 'custom', build: function (w, x, U) {
        var el = U.el, esc = U.esc, box = el('div', { class: 'play' });
        box.appendChild(el('h4', null, 'Verificador de tipos (versión didáctica)'));
        box.appendChild(el('p', { class: 'hint' }, 'Edita el código TypeScript. Detecta asignaciones de literales y llamadas a funciones con parámetros tipados, como lo haría el compilador.'));
        var ta = el('textarea', { spellcheck: 'false', 'aria-label': 'Código TypeScript', style: 'width:100%;height:210px;background:var(--cd);color:var(--cf);border:0;padding:10px;font:13px JetBrains Mono,monospace;border-radius:4px' }), out = el('div', { style: 'margin-top:8px' });
        ta.value = 'let nombre: string = "Ana";\nlet edad: number = "veinte";\nconst activo: boolean = true;\nconst notas: number[] = [4.5, "3.0", 5];\n\nfunction sumar(a: number, b: number): number {\n  return a + b;\n}\nsumar(2, "3");\nsumar(1);\nedad = 21;';
        function run() { var e = checkTS(ta.value); out.innerHTML = e.length ? e.map(function (r) { return '<div class="pill bad" style="display:block;margin:3px 0">Línea ' + r[0] + ': ' + esc(r[1]) + '</div>'; }).join('') : '<span class="pill ok">Sin errores de tipo</span>'; }
        ta.oninput = run; box.appendChild(ta); box.appendChild(out); w.appendChild(box); run();
      } },
      { t: 'h', text: 'Interfaces: el contrato de un objeto', min: 35 },
      { t: 'p', html: '<p>Una <b>interfaz</b> describe la forma de un objeto: qué propiedades tiene y de qué tipo. Es especialmente útil para los datos que llegan de una API, y conecta directamente con lo visto en la clase de Fetch.</p>' },
      { t: 'code', lang: 'js', title: 'personaje.ts', code: 'interface Personaje {\n  id: number;\n  name: string;\n  status: "Alive" | "Dead" | "unknown";\n  species: string;\n  image: string;\n  type?: string;            // propiedad opcional\n}\n\ninterface Respuesta {\n  info: { count: number; pages: number };\n  results: Personaje[];\n}\n\nasync function obtener(nombre: string): Promise<Personaje[]> {\n  const r = await fetch(`https://rickandmortyapi.com/api/character?name=${nombre}`);\n  if (!r.ok) return [];\n  const datos = (await r.json()) as Respuesta;\n  return datos.results;\n}\n\nfunction describir(p: Personaje): string {\n  return `${p.name} (${p.status})`;\n}\n\ndescribir({ id: 1, name: "Rick", status: "Alive" });   // Error: faltan species e image\ndescribir({ id: 1, name: "Rick", status: "Vivo", species: "H", image: "" }); // Error: "Vivo" no es válido' },
      { t: 'note', kind: 'key', html: '<p><b>Genéricos en una línea:</b> <code>Promise&lt;Personaje[]&gt;</code> significa “una promesa que, al cumplirse, entrega un arreglo de Personaje”. Los símbolos <code>&lt; &gt;</code> son un parámetro de tipo. También verás <code>Array&lt;T&gt;</code> y <code>Partial&lt;T&gt;</code>.</p>' },
      { t: 'h', text: 'Compilar y configurar', min: 25 },
      { t: 'steps', items: [
        { t: 'Inicializa el proyecto', html: '<p>Con Node.js instalado, desde la carpeta del proyecto:</p>', code: 'npm init -y\nnpm install --save-dev typescript\nnpx tsc --init', lang: 'bash', ct: 'Terminal' },
        { t: 'Activa el modo estricto', html: '<p>En <code>tsconfig.json</code> deja <code>"strict": true</code>. Activa todas las comprobaciones: es la razón de usar TypeScript.</p>', code: '{\n  "compilerOptions": {\n    "target": "ES2020",\n    "module": "ES2020",\n    "outDir": "dist",\n    "strict": true\n  },\n  "include": ["src"]\n}', lang: 'js', ct: 'tsconfig.json' },
        { t: 'Compila', html: '<p>Cada archivo <code>.ts</code> de <code>src</code> genera un <code>.js</code> en <code>dist</code>. El HTML carga el JavaScript compilado.</p>', code: 'npx tsc          # compila una vez\nnpx tsc --watch  # recompila al guardar', lang: 'bash', ct: 'Terminal' }] },
      { t: 'note', kind: 'tip', html: '<p>Sin instalar nada puedes probar TypeScript en el <i>Playground</i> oficial (typescriptlang.org/play). Pega tu código y mira los errores y el JavaScript resultante.</p>' },
      { t: 'h', text: 'Laboratorio: tipa el inventario', min: 55 },
      { t: 'lab', id: 'ts', title: 'Convierte JavaScript en TypeScript estricto', intro: 'Edita app.ts. Las pruebas analizan tu código en busca de los tipos requeridos (la vista previa no ejecuta TypeScript).', height: 440, points: true,
        files: [{ name: 'app.ts', code: '// Convierte este código en TypeScript estricto.\n// Requisitos:\n//  1. type Estado = "disponible" | "agotado"\n//  2. interface Producto { nombre, precio, stock, estado: Estado, descripcion?: string }\n//  3. Tipa los parámetros y el retorno de cada función\n//  4. Prohibido usar any\n\nfunction crearProducto(nombre, precio, stock) {\n  return { nombre: nombre, precio: precio, stock: stock, estado: stock > 0 ? "disponible" : "agotado" };\n}\n\nfunction aplicarDescuento(producto, porcentaje) {\n  return producto.precio * (1 - porcentaje / 100);\n}\n\nfunction buscar(productos, texto) {\n  return productos.filter(p => p.nombre.toLowerCase().includes(texto.toLowerCase()));\n}\n' }, { name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es"><head><meta charset="UTF-8"><title>TypeScript</title></head>\n<body style="font-family:sans-serif;padding:16px"><h3>Inventario tipado</h3><p>Esta vista no ejecuta TypeScript. Tu código se evalúa con las pruebas de abajo.</p></body></html>' }],
        tests: [
          { t: 'type Estado con los literales "disponible" y "agotado"', pts: 15, f: function () { var s = FILES['app.ts']; return /type\s+Estado\s*=\s*(["'])disponible\1\s*\|\s*(["'])agotado\2|type\s+Estado\s*=\s*(["'])agotado\3\s*\|\s*(["'])disponible\4/.test(s); } },
          { t: 'interface Producto con nombre, precio, stock y estado tipados', pts: 20, f: function () { var m = FILES['app.ts'].match(/interface\s+Producto\s*\{([^}]*)\}/); return !!m && /nombre\s*:\s*string/.test(m[1]) && /precio\s*:\s*number/.test(m[1]) && /stock\s*:\s*number/.test(m[1]) && /estado\s*:\s*Estado/.test(m[1]); } },
          { t: 'Propiedad opcional descripcion?: string', pts: 10, f: function () { return /descripcion\s*\?\s*:\s*string/.test(FILES['app.ts']); } },
          { t: 'crearProducto(nombre: string, precio: number, stock: number): Producto', pts: 15, f: function () { return /function\s+crearProducto\s*\(\s*nombre\s*:\s*string\s*,\s*precio\s*:\s*number\s*,\s*stock\s*:\s*number\s*\)\s*:\s*Producto/.test(FILES['app.ts']); } },
          { t: 'aplicarDescuento recibe Producto y number y devuelve number', pts: 15, f: function () { return /function\s+aplicarDescuento\s*\(\s*\w+\s*:\s*Producto\s*,\s*\w+\s*:\s*number\s*\)\s*:\s*number/.test(FILES['app.ts']); } },
          { t: 'buscar(productos: Producto[], texto: string): Producto[]', pts: 15, f: function () { return /function\s+buscar\s*\(\s*\w+\s*:\s*Producto\[\]\s*,\s*\w+\s*:\s*string\s*\)\s*:\s*Producto\[\]/.test(FILES['app.ts']); } },
          { t: 'No se usa any en ninguna parte', pts: 10, f: function () { var s = FILES['app.ts'].replace(/\/\/.*$/gm, ''); return s.length > 100 && !/:\s*any\b|<any>|\bas\s+any\b/.test(s); } }],
        solution: [{ name: 'app.ts', code: 'type Estado = "disponible" | "agotado";\n\ninterface Producto {\n  nombre: string;\n  precio: number;\n  stock: number;\n  estado: Estado;\n  descripcion?: string;\n}\n\nfunction crearProducto(nombre: string, precio: number, stock: number): Producto {\n  return { nombre, precio, stock, estado: stock > 0 ? "disponible" : "agotado" };\n}\n\nfunction aplicarDescuento(producto: Producto, porcentaje: number): number {\n  return producto.precio * (1 - porcentaje / 100);\n}\n\nfunction buscar(productos: Producto[], texto: string): Producto[] {\n  return productos.filter(p => p.nombre.toLowerCase().includes(texto.toLowerCase()));\n}', lang: 'js' }] },
      { t: 'quiz', qs: [
        ['¿Qué ejecuta realmente el navegador?', ['TypeScript', 'JavaScript compilado', 'Un intérprete de tipos'], 1, 'Los tipos desaparecen al compilar.'],
        ['¿Qué describe una interface?', ['La forma de un objeto', 'Un bucle', 'Un archivo CSS'], 0, 'Propiedades y sus tipos.'],
        ['Por qué conviene evitar any?', ['Es más lento', 'Desactiva la verificación de tipos', 'No existe'], 1, 'Pierdes toda la protección.'],
        ['¿Qué significa la propiedad nombre?: string?', ['Es opcional', 'Es obligatoria', 'Es privada'], 0, 'El ? la hace opcional.']] }
    ]
  });

  /* ===== 5.2a Almacenamiento local ===== */
  C.add({
    id: '5.2a',
    lead: 'Si recargas la página, las variables de JavaScript desaparecen. Para que la aplicación recuerde carritos, preferencias y borradores necesitamos guardarlos en el navegador.',
    blocks: [
      { t: 'h', text: 'El mapa de la persistencia en el navegador', min: 20 },
      { t: 'table', head: ['Mecanismo', 'Capacidad', 'Dura', 'Tipo de datos', 'Úsalo para'], rows: [
        ['Variable JS', 'Memoria', 'Hasta recargar', 'Cualquiera', 'Estado temporal'],
        ['<code>sessionStorage</code>', '~5 MB', 'Hasta cerrar la pestaña', 'Solo texto', 'Un asistente de varios pasos'],
        ['<code>localStorage</code>', '~5 MB', 'Hasta que se borre', 'Solo texto', 'Tema, idioma, carrito sencillo'],
        ['<code>IndexedDB</code>', 'Cientos de MB', 'Hasta que se borre', 'Objetos, archivos, blobs', 'Datos grandes, uso sin conexión'],
        ['Cookies', '~4 KB', 'Configurable', 'Texto', 'Sesión con el servidor']] },
      { t: 'ana', title: 'Analogía: la mochila, el casillero y el almacén', rows: [
        ['localStorage', 'El casillero del colegio: pequeño, sencillo, tus cosas siguen ahí mañana.'],
        ['sessionStorage', 'La mochila del día: se vacía cuando terminas la jornada.'],
        ['IndexedDB', 'Un almacén con estantes, etiquetas y un sistema de búsqueda.']] },
      { t: 'h', text: 'localStorage: la API', min: 30 },
      { t: 'code', lang: 'js', title: 'storage.js', code: 'localStorage.setItem("tema", "oscuro");          // guardar\nconst tema = localStorage.getItem("tema");       // leer ("oscuro" o null)\nlocalStorage.removeItem("tema");                 // borrar una clave\nlocalStorage.clear();                            // borrar todo\n\n// Solo guarda TEXTO: los objetos se convierten con JSON\nconst carrito = [{ id: 1, nombre: "Cuaderno", cantidad: 2 }];\nlocalStorage.setItem("carrito", JSON.stringify(carrito));\nconst leido = JSON.parse(localStorage.getItem("carrito")) ?? [];' },
      { t: 'custom', build: function (w, x, U) {
        var el = U.el, esc = U.esc, box = el('div', { class: 'play' }), data = { tema: 'claro' }, last = el('div', { class: 'hint' });
        box.appendChild(el('h4', null, 'Panel “Application” simulado'));
        box.appendChild(el('p', { class: 'hint' }, 'Así se ve lo que guardas en la pestaña Application → Local Storage de F12. Prueba guardar un objeto con y sin JSON.stringify.'));
        var k = el('input', { type: 'text', value: 'usuario', 'aria-label': 'Clave', style: 'width:42%;padding:6px;margin-right:6px' }), v = el('input', { type: 'text', value: 'Ana', 'aria-label': 'Valor', style: 'width:42%;padding:6px' });
        var lb = el('label', { class: 'hint', style: 'display:block;margin:6px 0' }, '<input type="checkbox" checked> Guardar el objeto {"nombre":"Ana","edad":20} en lugar del texto'), cb = lb.firstChild;
        var seg = el('div', { class: 'seg' }), tbl = el('div');
        function val() { if (cb.checked) { var o = { nombre: 'Ana', edad: 20 }; return { js: o, raw: o }; } return { js: v.value, raw: v.value }; }
        var acts = [['setItem', function () { var o = val().js; data[k.value] = (typeof o === 'object') ? (js ? JSON.stringify(o) : String(o)) : String(o); last.innerHTML = 'localStorage.setItem("' + esc(k.value) + '", …)'; }], ['getItem', function () { last.innerHTML = 'getItem("' + esc(k.value) + '") → <code>' + (k.value in data ? esc(JSON.stringify(data[k.value])) : 'null') + '</code>'; }], ['removeItem', function () { delete data[k.value]; last.textContent = 'removeItem("' + k.value + '")'; }], ['clear', function () { data = {}; last.textContent = 'clear()'; }]];
        var js = true, lb2 = el('label', { class: 'hint', style: 'display:block;margin:6px 0' }, '<input type="checkbox" checked> Usar JSON.stringify al guardar objetos'); lb2.firstChild.onchange = function () { js = this.checked; };
        acts.forEach(function (a) { var b = el('button', null, a[0] + '()'); b.onclick = function () { a[1](); draw(); }; seg.appendChild(b); });
        function draw() { var ks = Object.keys(data); tbl.innerHTML = '<div class="tbl"><table><thead><tr><th>Key</th><th>Value</th></tr></thead><tbody>' + (ks.length ? ks.map(function (n) { return '<tr><td><code>' + esc(n) + '</code></td><td><code>' + esc(data[n]) + '</code></td></tr>'; }).join('') : '<tr><td colspan="2"><i>vacío</i></td></tr>') + '</tbody></table></div>' + (Object.keys(data).some(function (n) { return data[n] === '[object Object]'; }) ? '<p class="pill bad">Se guardó “[object Object]”: ¡se perdió el objeto! Falta JSON.stringify.</p>' : ''); }
        box.appendChild(k); box.appendChild(v); box.appendChild(lb); box.appendChild(lb2); box.appendChild(seg); box.appendChild(last); box.appendChild(tbl); w.appendChild(box); draw();
      } },
      { t: 'note', kind: 'warn', html: '<p><b>Nunca guardes contraseñas, tokens ni datos sensibles en localStorage.</b> Cualquier script de la página (incluido uno malicioso inyectado) puede leerlo. Además es síncrono: guardar objetos enormes congela la interfaz.</p>' },
      { t: 'h', text: 'IndexedDB: una base de datos en el navegador', min: 30 },
      { t: 'p', html: '<p>IndexedDB guarda <b>objetos</b> (no solo texto), permite índices y trabaja de forma <b>asíncrona</b>. Su API original usa eventos, así que se suele envolver en promesas. El patrón es: abrir la base → (la primera vez) crear el almacén → abrir una transacción → leer o escribir.</p>' },
      { t: 'code', lang: 'js', title: 'idb.js', code: 'function abrirBD() {\n  return new Promise((resolve, reject) => {\n    const req = indexedDB.open("tienda", 1);\n    req.onupgradeneeded = () => {          // solo la primera vez o al subir de versión\n      req.result.createObjectStore("productos", { keyPath: "id", autoIncrement: true });\n    };\n    req.onsuccess = () => resolve(req.result);\n    req.onerror = () => reject(req.error);\n  });\n}\n\nasync function guardar(producto) {\n  const db = await abrirBD();\n  return new Promise((resolve, reject) => {\n    const tx = db.transaction("productos", "readwrite");\n    tx.objectStore("productos").add(producto);\n    tx.oncomplete = () => resolve();\n    tx.onerror = () => reject(tx.error);\n  });\n}\n\nasync function listar() {\n  const db = await abrirBD();\n  return new Promise((resolve, reject) => {\n    const req = db.transaction("productos").objectStore("productos").getAll();\n    req.onsuccess = () => resolve(req.result);\n    req.onerror = () => reject(req.error);\n  });\n}' },
      { t: 'trace', title: 'El ciclo de vida de IndexedDB', code: 'abrir("tienda", 1)\n  si la base no existe -> onupgradeneeded: crear almacén\n  onsuccess -> tenemos db\ntransaction("productos", "readwrite")\nstore.add({ nombre: "Cuaderno" })\ntransaction.oncomplete -> guardado', steps: [
        { l: 1, vars: { db: '(abriendo)' }, note: 'indexedDB.open devuelve una petición; la respuesta llega por eventos.' },
        { l: 2, vars: { version: 1, almacenes: 'ninguno' }, note: 'Primera vez: se dispara <code>onupgradeneeded</code>. Aquí (y solo aquí) se crean almacenes e índices.' },
        { l: 2, vars: { version: 1, almacenes: 'productos' }, note: 'Se creó el almacén “productos” con clave autoincremental.' },
        { l: 3, vars: { db: 'abierta' }, note: '<code>onsuccess</code>: la conexión está lista.' },
        { l: 4, vars: { tx: 'readwrite' }, note: 'Todo lectura/escritura ocurre dentro de una transacción: o se guarda todo o nada.' },
        { l: 5, vars: { tx: 'readwrite', 'id generado': 1 }, note: 'El objeto se guarda y recibe un <code>id</code>.' },
        { l: 6, vars: { tx: 'completada' }, out: 'Guardado', note: 'La transacción terminó con éxito.' }] },
      { t: 'note', kind: 'tip', html: '<p>En proyectos reales se usa la librería <b>idb</b> (envoltorio de promesas) o <b>Dexie</b>. Entender el modelo base te permite usarlas con criterio. Inspecciona tus datos en <code>F12 → Application → IndexedDB</code>.</p>' },
      { t: 'h', text: 'Laboratorio: carrito que no se pierde', min: 50 },
      { t: 'lab', id: 'carrito', title: 'Carrito persistente con localStorage', intro: 'Implementa las cuatro funciones. La vista previa guarda en una copia del almacenamiento (mira la consola).', height: 400,
        files: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es"><head><meta charset="UTF-8"><title>Carrito</title></head>\n<body>\n<h2>Carrito</h2>\n<ul id="lista"></ul>\n<p id="total"></p>\n<button id="demo">Agregar Cuaderno</button>\n<script src="app.js"></script>\n</body></html>' }, { name: 'app.js', code: 'const CLAVE = "carrito";\n\n// 1. Guarda el arreglo en localStorage como JSON\nfunction guardarCarrito(carrito) {\n}\n\n// 2. Devuelve el arreglo guardado; si no existe o el JSON está dañado, devuelve []\nfunction leerCarrito() {\n}\n\n// 3. Agrega { nombre, precio }; si el nombre ya existe suma 1 a "cantidad" (empieza en 1). Persiste y devuelve el carrito\nfunction agregarAlCarrito(item) {\n}\n\n// 4. Suma precio * cantidad\nfunction totalCarrito() {\n}\n\nfunction pintar() {\n  const lista = document.getElementById("lista");\n  lista.innerHTML = "";\n  leerCarrito().forEach(i => {\n    const li = document.createElement("li");\n    li.textContent = `${i.nombre} x${i.cantidad} - $${i.precio * i.cantidad}`;\n    lista.append(li);\n  });\n  document.getElementById("total").textContent = "Total: $" + totalCarrito();\n}\ndocument.getElementById("demo").addEventListener("click", () => { agregarAlCarrito({ nombre: "Cuaderno", precio: 8000 }); pintar(); });\npintar();\n' }],
        tests: [
          { t: 'guardarCarrito guarda JSON en la clave "carrito"', f: function () { localStorage.removeItem('carrito'); guardarCarrito([{ nombre: 'A', precio: 1, cantidad: 1 }]); var raw = localStorage.getItem('carrito'); return typeof raw === 'string' && JSON.parse(raw)[0].nombre === 'A'; } },
          { t: 'leerCarrito devuelve [] si no hay nada', f: function () { localStorage.removeItem('carrito'); var r = leerCarrito(); return Array.isArray(r) && r.length === 0; } },
          { t: 'leerCarrito sobrevive a JSON dañado', f: function () { localStorage.setItem('carrito', '{no es json'); var r = leerCarrito(); localStorage.removeItem('carrito'); return Array.isArray(r) && r.length === 0; } },
          { t: 'agregarAlCarrito agrega con cantidad 1', f: function () { localStorage.removeItem('carrito'); var c = agregarAlCarrito({ nombre: 'Lapicero', precio: 2000 }); return c.length === 1 && c[0].cantidad === 1 && leerCarrito().length === 1; } },
          { t: 'Agregar el mismo producto suma la cantidad', f: function () { localStorage.removeItem('carrito'); agregarAlCarrito({ nombre: 'X', precio: 10 }); agregarAlCarrito({ nombre: 'X', precio: 10 }); var c = leerCarrito(); return c.length === 1 && c[0].cantidad === 2; } },
          { t: 'totalCarrito suma precio × cantidad', f: function () { localStorage.removeItem('carrito'); agregarAlCarrito({ nombre: 'A', precio: 100 }); agregarAlCarrito({ nombre: 'A', precio: 100 }); agregarAlCarrito({ nombre: 'B', precio: 50 }); var t = totalCarrito(); localStorage.removeItem('carrito'); return t === 250; } }],
        solution: [{ name: 'app.js', code: 'const CLAVE = "carrito";\nfunction guardarCarrito(carrito) {\n  localStorage.setItem(CLAVE, JSON.stringify(carrito));\n}\nfunction leerCarrito() {\n  try {\n    const datos = JSON.parse(localStorage.getItem(CLAVE));\n    return Array.isArray(datos) ? datos : [];\n  } catch (e) {\n    return [];\n  }\n}\nfunction agregarAlCarrito(item) {\n  const carrito = leerCarrito();\n  const existente = carrito.find(i => i.nombre === item.nombre);\n  if (existente) existente.cantidad += 1;\n  else carrito.push({ ...item, cantidad: 1 });\n  guardarCarrito(carrito);\n  return carrito;\n}\nfunction totalCarrito() {\n  return leerCarrito().reduce((t, i) => t + i.precio * i.cantidad, 0);\n}' }] },
      { t: 'quiz', qs: [
        ['¿Qué tipo de dato guarda localStorage?', ['Cualquier objeto', 'Solo texto', 'Solo números'], 1, 'Por eso usamos JSON.stringify y JSON.parse.'],
        ['¿Cuál se borra al cerrar la pestaña?', ['localStorage', 'sessionStorage', 'IndexedDB'], 1, 'Es la “mochila del día”.'],
        ['¿Dónde conviene guardar un token de sesión sensible?', ['localStorage', 'En ningún almacenamiento accesible a scripts; se usa cookie HttpOnly', 'Una variable global'], 1, 'Un script malicioso puede leer localStorage.'],
        ['¿Cuándo se ejecuta onupgradeneeded?', ['En cada lectura', 'Al crear o subir de versión la base', 'Al cerrar el navegador'], 1, 'Es el momento de crear almacenes.']] }
    ]
  });

  /* ===== 5.2b CI/CD y despliegue ===== */
  C.add({
    id: '5.2b',
    lead: 'Un proyecto que solo funciona en tu computador no existe para el mundo. Aprendemos a automatizar las pruebas y a publicar el sitio cada vez que haces push.',
    blocks: [
      { t: 'h', text: 'Qué es CI/CD', min: 20 },
      { t: 'ana', title: 'Analogía: la línea de ensamblaje', rows: [
        ['Integración continua (CI)', 'Cada cambio pasa por una estación que instala, prueba y compila. Si algo falla, la línea se detiene.'],
        ['Entrega / despliegue continuo (CD)', 'Si todo pasó, el producto sale automáticamente al almacén (producción).'],
        ['Beneficio', 'Dejas de subir archivos a mano: publicar es un <code>git push</code>.']] },
      { t: 'custom', build: function (w, x, U) {
        var el = U.el, box = el('div', { class: 'play' });
        box.appendChild(el('h4', null, 'Simulador de pipeline'));
        var ctl = el('div', { class: 'ctl' }), fail = false, br = 'main';
        var l1 = el('label', { class: 'tg' }, '<input type="checkbox"> Una prueba falla'); l1.firstChild.onchange = function () { fail = this.checked; };
        var l2 = el('label', null, 'Rama '), s = el('select'); ['main', 'feat-carrito'].forEach(function (o) { s.appendChild(el('option', { value: o }, o)); }); s.onchange = function () { br = s.value; }; l2.appendChild(s);
        ctl.appendChild(l1); ctl.appendChild(l2); box.appendChild(ctl);
        var st = ['Commit y push', 'Instalar dependencias', 'Ejecutar pruebas', 'Compilar', 'Desplegar'], row = el('div', { style: 'display:flex;gap:8px;flex-wrap:wrap;margin:10px 0' }), msg = el('div', { class: 'note tip' }, '<b class="nt">Resultado</b>Pulsa ejecutar.'), go = el('button', { class: 'btn pri' }, 'Hacer git push'), tm = [];
        var cells = st.map(function (t, i) { var c = el('div', { class: 'panel', style: 'flex:1 1 130px;text-align:center;transition:.2s' }, '<b>' + (i + 1) + '</b><br>' + t); row.appendChild(c); return c; });
        function paint(i, ok) { cells[i].style.background = ok === 1 ? 'rgba(30,138,76,.25)' : ok === 0 ? 'rgba(176,42,42,.25)' : ok === 2 ? 'rgba(183,134,42,.25)' : ''; }
        go.onclick = function () {
          tm.forEach(clearTimeout); tm = []; cells.forEach(function (c, i) { paint(i, null); }); msg.innerHTML = '<b class="nt">Ejecutando…</b>';
          st.forEach(function (t, i) { tm.push(setTimeout(function () {
            if (i === 2 && fail) { paint(i, 0); msg.innerHTML = '<b class="nt">Pipeline detenido</b>Las pruebas fallaron. Nada se compila ni se publica: el error no llegó a los usuarios.'; tm.slice(i + 1).forEach(clearTimeout); return; }
            if (i === 4 && br !== 'main') { paint(i, 2); msg.innerHTML = '<b class="nt">Vista previa</b>La rama “' + br + '” no va a producción: se publica en una URL temporal de revisión (preview).'; return; }
            paint(i, 1); if (i === 4) msg.innerHTML = '<b class="nt">¡Publicado!</b>La versión nueva ya está en producción.';
          }, 600 * (i + 1))); });
        };
        box.appendChild(row); box.appendChild(go); box.appendChild(msg); w.appendChild(box);
        U.cleanup(function () { tm.forEach(clearTimeout); });
      } },
      { t: 'h', text: 'GitHub Actions: el pipeline como código', min: 35 },
      { t: 'hot', parts: [['name: CI', 0], ['\n', null], ['on:', 1], ['\n  push:\n    branches: [main]\n  pull_request:', 1], ['\n', null], ['jobs:', 2], ['\n  build:\n    ', null], ['runs-on: ubuntu-latest', 3], ['\n    steps:\n      ', null], ['- uses: actions/checkout@v4', 4], ['\n      ', null], ['- uses: actions/setup-node@v4\n        with:\n          node-version: 20', 5], ['\n      ', null], ['- run: npm ci', 6], ['\n      ', null], ['- run: npm test', 6], ['\n      ', null], ['- run: npm run build', 6]],
        notes: [['Nombre', 'Cómo aparecerá el flujo en la pestaña Actions de GitHub.'], ['Disparadores', 'Cuándo se ejecuta: en cada push a <code>main</code> y en cada pull request.'], ['Trabajos (jobs)', 'Grupos de pasos que corren en una máquina. Pueden depender unos de otros.'], ['Máquina', 'GitHub te presta una máquina virtual limpia en cada ejecución.'], ['Descargar el código', 'Primer paso casi universal: trae tu repositorio a la máquina.'], ['Instalar Node.js', 'Configura la versión del entorno.'], ['Comandos', '<code>npm ci</code> instala exactamente lo del lockfile; luego se prueba y compila. Si un paso falla, el flujo se detiene y el commit se marca en rojo.']] },
      { t: 'note', kind: 'tip', html: '<p>El archivo se guarda en la ruta <code>.github/workflows/ci.yml</code> del repositorio. GitHub lo detecta solo; el resultado de cada ejecución aparece en la pestaña <b>Actions</b> y como ✓ o ✗ junto a cada commit.</p>' },
      { t: 'h', text: 'Despliegue en Vercel', min: 30 },
      { t: 'steps', items: [
        { t: 'Sube el proyecto a GitHub', html: '<p>Con la terminal de Git: crea el repositorio, <code>git remote add origin …</code> y <code>git push -u origin main</code>.</p>' },
        { t: 'Importa el repositorio en Vercel', html: '<p>Inicia sesión con GitHub, pulsa <b>Add New → Project</b> y elige el repositorio.</p>' },
        { t: 'Configura el proyecto', html: '<p>Un sitio estático sin compilación usa “Other” y la raíz como directorio de salida. Con Vite o TypeScript, el comando es <code>npm run build</code> y la salida <code>dist</code>.</p>' },
        { t: 'Variables de entorno', html: '<p>Claves de API van en <b>Settings → Environment Variables</b>, nunca dentro del código ni del repositorio.</p>' },
        { t: 'Publica y comparte', html: '<p>Cada push a <code>main</code> actualiza producción; cada pull request recibe una URL de vista previa para revisar antes de aceptar.</p>' }] },
      { t: 'h', text: 'Vercel frente a AWS', min: 15 },
      { t: 'table', head: ['Aspecto', 'Vercel', 'AWS (S3 + CloudFront)'], rows: [
        ['Dificultad inicial', 'Muy baja: conectar el repositorio', 'Media: bucket, permisos, distribución, certificados'],
        ['Ideal para', 'Sitios front-end, prototipos, portafolios', 'Control total, integración con otros servicios de AWS'],
        ['Despliegue automático', 'Incluido', 'Se configura con GitHub Actions u otra herramienta'],
        ['Costo', 'Plan gratuito generoso para proyectos personales', 'Se paga por uso; capa gratuita limitada en el tiempo'],
        ['Dominio y HTTPS', 'Automático', 'Se configura (Route 53 y ACM)']] },
      { t: 'note', kind: 'warn', html: '<p>Antes de publicar: revisa que no haya <b>claves o contraseñas en el código</b>, que <code>.env</code> esté en <code>.gitignore</code> y que el sitio funcione con la consola limpia. Un secreto subido a GitHub debe considerarse comprometido aunque lo borres después.</p>' },
      { t: 'h', text: 'Laboratorio: escribe tu pipeline', min: 40 },
      { t: 'lab', id: 'ci', title: 'Flujo de integración y despliegue', intro: 'Completa ci.yml. Las pruebas comprueban la estructura y el orden de los pasos.', height: 440, points: true,
        files: [{ name: 'ci.yml', code: '# Escribe un flujo de GitHub Actions que:\n#  - se llame "CI"\n#  - se ejecute en push a main y en pull_request\n#  - use ubuntu-latest\n#  - descargue el código (checkout@v4) y configure Node 20 (setup-node@v4)\n#  - ejecute en este orden: npm ci, npm test, npm run build\n#  - despliegue a producción SOLO en main con: npx vercel --prod --token ${{ secrets.VERCEL_TOKEN }}\n\n' }, { name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es"><head><meta charset="UTF-8"><title>CI</title></head><body style="font-family:sans-serif;padding:16px"><p>Edita ci.yml: las pruebas analizan el texto.</p></body></html>' }],
        tests: [
          { t: 'Tiene name: CI', pts: 10, f: function () { return /^name:\s*CI\s*$/m.test(FILES['ci.yml']); } },
          { t: 'Se dispara con push a main', pts: 10, f: function () { return /on:[\s\S]*push:[\s\S]*main/.test(FILES['ci.yml']); } },
          { t: 'También en pull_request', pts: 10, f: function () { return /pull_request/.test(FILES['ci.yml']); } },
          { t: 'runs-on: ubuntu-latest', pts: 10, f: function () { return /runs-on:\s*ubuntu-latest/.test(FILES['ci.yml']); } },
          { t: 'actions/checkout@v4 y actions/setup-node@v4 con node-version 20', pts: 15, f: function () { var s = FILES['ci.yml']; return /actions\/checkout@v4/.test(s) && /actions\/setup-node@v4/.test(s) && /node-version:\s*["']?20/.test(s); } },
          { t: 'Orden correcto: npm ci → npm test → npm run build', pts: 20, f: function () { var s = FILES['ci.yml'], a = s.search(/run:\s*npm ci/), b = s.search(/run:\s*npm test/), c = s.search(/run:\s*npm run build/); return a > -1 && b > a && c > b; } },
          { t: 'El despliegue solo ocurre en main (condición if)', pts: 15, f: function () { var s = FILES['ci.yml']; return /vercel/.test(s) && /if:\s*.*(refs\/heads\/main|github\.ref\s*==)/.test(s); } },
          { t: 'El token viene de secrets, no escrito en el archivo', pts: 10, f: function () { var s = FILES['ci.yml']; return /secrets\.\w+/.test(s) && !/--token\s+[A-Za-z0-9]{12,}/.test(s); } }],
        solution: [{ name: 'ci.yml', code: 'name: CI\non:\n  push:\n    branches: [main]\n  pull_request:\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm ci\n      - run: npm test\n      - run: npm run build\n      - name: Desplegar en producción\n        if: github.ref == \'refs/heads/main\'\n        run: npx vercel --prod --token ${{ secrets.VERCEL_TOKEN }}', lang: 'yaml' }] },
      { t: 'quiz', qs: [
        ['¿Qué hace la integración continua cuando una prueba falla?', ['Despliega igualmente', 'Detiene el flujo y marca el commit en rojo', 'Borra el commit'], 1, 'Protege a producción.'],
        ['¿Dónde se guardan las claves de API en un despliegue?', ['En el código', 'En variables de entorno o secrets', 'En un comentario'], 1, 'Nunca en el repositorio.'],
        ['¿Qué ofrece Vercel por cada pull request?', ['Una URL de vista previa', 'Un servidor dedicado', 'Una base de datos'], 0, 'Se revisa antes de fusionar.'],
        ['¿Por qué npm ci en lugar de npm install en CI?', ['Es más reproducible: usa el lockfile exacto', 'Es más bonito', 'Instala menos'], 0, 'Misma versión en tu máquina y en la del servidor.']] }
    ]
  });

  /* ===== 5.t Auditoría con IA y despliegue ===== */
  var AUDIT = [
    'var API_KEY = "sk-live-93af82d1c7";',
    'async function buscar(q) {',
    '  const r = await fetch("https://api.libros.dev/v1?q=" + q + "&key=" + API_KEY);',
    '  const datos = r.json();',
    '  const cont = document.getElementById("res");',
    '  cont.innerHTML = "";',
    '  datos.items.forEach(function (it) {',
    '    cont.innerHTML += "<h3>" + it.titulo + "</h3><img src=\'" + it.portada + "\'>";',
    '  });',
    '}',
    'document.getElementById("btn").onclick = function () {',
    '  buscar(document.getElementById("q").value);',
    '};',
    'if (document.getElementById("res").children.length == 0) {',
    '  console.log("sin resultados");',
    '}'];
  var ISSUES = { 1: ['Secreto expuesto', 'La clave de API está escrita en el código y se publicaría con el sitio. Debe vivir en una variable de entorno del servidor, no en el navegador. Además usa <code>var</code> en lugar de <code>const</code>.'], 3: ['Parámetro sin codificar', '<code>q</code> se concatena sin <code>encodeURIComponent</code>: caracteres como & o # rompen la consulta. La clave también viaja en la URL.'], 4: ['Falta await y comprobar ok', '<code>r.json()</code> devuelve una promesa: sin <code>await</code>, <code>datos.items</code> es undefined. Tampoco se revisa <code>r.ok</code> antes de leer.'], 8: ['Inyección (XSS) y accesibilidad', 'Se inserta texto externo con <code>innerHTML</code>: un título malicioso ejecutaría código. La <code>&lt;img&gt;</code> no tiene <code>alt</code>. Además <code>+=</code> reescribe el DOM en cada vuelta.'], 12: ['Sin validación ni manejo de errores', 'Se busca aunque el campo esté vacío y no hay <code>try/catch</code>: si la red falla, el usuario no recibe ningún aviso.'], 14: ['Comparación laxa y sin feedback', '<code>==</code> en lugar de <code>===</code>, y el aviso de “sin resultados” solo va a la consola, no al usuario.'] };
  C.add({
    id: '5.t',
    lead: 'La IA escribe código en segundos, pero eso no lo vuelve correcto. En este taller aprendes a auditar lo que genera, a corregirlo con criterio y a publicar el resultado.',
    blocks: [
      { t: 'h', text: 'Pedir bien y verificar mejor', min: 25 },
      { t: 'ana', title: 'Analogía: el aprendiz brillante pero apresurado', rows: [
        ['La IA', 'Un aprendiz muy rápido que nunca dice “no sé” y a veces inventa.'],
        ['Tu rol', 'El ingeniero responsable: especificas, revisas y eres quien firma el código.'],
        ['La regla', 'Nada que no entiendas llega a producción.']] },
      { t: 'p', html: '<p>La especificación escrita en el Módulo 4 es tu mejor herramienta: cuanto más precisa, mejor el resultado y más fácil de verificar. Un buen prompt contiene:</p>' },
      { t: 'table', head: ['Parte del prompt', 'Ejemplo'], rows: [
        ['Contexto', 'Proyecto web con HTML, CSS y JavaScript vanilla, sin librerías.'],
        ['Tarea', 'Una función asíncrona que busque libros por título en la API X.'],
        ['Reglas', 'Usar const/let, comprobar response.ok, manejar errores, no usar innerHTML con datos externos.'],
        ['Casos borde', 'Búsqueda vacía, sin resultados, fallo de red.'],
        ['Formato', 'Solo el código, comentado, en un archivo app.js.']] },
      { t: 'h', text: 'Lista de auditoría de código', min: 20 },
      { t: 'cards', items: [
        { h: 'Seguridad', html: '<p>¿Hay secretos en el código? ¿Se inserta texto externo con <code>innerHTML</code>? ¿Se validan las entradas?</p>' },
        { h: 'Corrección', html: '<p>¿Hace lo que dice la especificación? ¿Maneja <code>await</code>, <code>response.ok</code> y los casos borde?</p>' },
        { h: 'Accesibilidad', html: '<p>¿Imágenes con <code>alt</code>? ¿Botones con etiqueta? ¿Mensajes de estado visibles?</p>' },
        { h: 'Mantenibilidad', html: '<p>¿Nombres claros? ¿<code>const/let</code>? ¿Funciones cortas? ¿Código muerto o inventado?</p>' }] },
      { t: 'h', text: 'Actividad 1: caza los defectos', min: 30 },
      { t: 'custom', build: function (w, x, U) {
        var el = U.el, esc = U.esc, box = el('div', { class: 'play' }), mark = {};
        box.appendChild(el('h4', null, 'Revisión de código generado por IA'));
        box.appendChild(el('p', { class: 'hint' }, 'Esta función “buscador de libros” la escribió una IA. Toca las líneas que tengan problemas (hay 6) y pulsa “Revisar”.'));
        var code = el('div', { class: 'mono-box' }), out = el('div', { style: 'margin-top:8px' });
        function draw(rev) {
          code.innerHTML = '';
          AUDIT.forEach(function (t, i) {
            var n = i + 1, row = el('div', { style: 'display:flex;gap:8px;cursor:pointer;padding:1px 4px;white-space:pre-wrap;word-break:break-word', role: 'button', tabindex: '0', 'aria-pressed': String(!!mark[n]) }, '<span style="color:var(--kc);flex:none;width:2ch;text-align:right">' + n + '</span><span>' + esc(t) + '</span>');
            var bad = !!ISSUES[n];
            if (rev) { row.style.background = bad ? (mark[n] ? 'rgba(30,138,76,.28)' : 'rgba(176,42,42,.25)') : (mark[n] ? 'rgba(183,134,42,.3)' : ''); }
            else if (mark[n]) row.style.background = 'rgba(59,130,246,.3)';
            var t2 = function () { mark[n] = !mark[n]; draw(false); out.innerHTML = ''; };
            row.onclick = t2; row.onkeydown = function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t2(); } };
            code.appendChild(row);
          });
        }
        var bt = el('button', { class: 'btn pri' }, 'Revisar mi auditoría'), rs = el('button', { class: 'btn' }, 'Reiniciar');
        bt.onclick = function () {
          draw(true); var found = 0, miss = [], fp = 0;
          Object.keys(ISSUES).forEach(function (k) { if (mark[k]) found++; else miss.push(k); }); Object.keys(mark).forEach(function (k) { if (mark[k] && !ISSUES[k]) fp++; });
          out.innerHTML = '<div class="note key"><b class="nt">Resultado</b>Defectos encontrados: <b>' + found + ' de 6</b> · falsas alarmas: <b>' + fp + '</b></div>' + Object.keys(ISSUES).map(function (k) { return '<div class="panel" style="margin:4px 0"><b>Línea ' + k + ' · ' + ISSUES[k][0] + '</b> ' + (mark[k] ? '<span class="pill ok">detectado</span>' : '<span class="pill bad">no detectado</span>') + '<br>' + ISSUES[k][1] + '</div>'; }).join('');
        };
        rs.onclick = function () { mark = {}; draw(false); out.innerHTML = ''; };
        box.appendChild(code); box.appendChild(bt); box.appendChild(rs); box.appendChild(out); w.appendChild(box); draw(false);
      } },
      { t: 'h', text: 'Actividad 2: corrige el código de la IA', min: 70 },
      { t: 'lab', id: 'audit', points: true, title: 'Auditoría y corrección', height: 480,
        intro: 'Arregla app.js sin cambiar los id del HTML. La vista previa simula la API de libros, incluyendo un título malicioso: observa si tu versión lo neutraliza.',
        prelude: 'window.fetch=function(u){return new Promise(function(res){setTimeout(function(){res({ok:true,status:200,json:function(){return Promise.resolve({items:[{titulo:"Cien años <img src=x onerror=console.log(\'XSS ejecutado\')>",portada:"portada.jpg"}]})}})},120)})};',
        files: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es">\n<head><meta charset="UTF-8"><title>Buscador de libros</title></head>\n<body style="font-family:sans-serif;padding:12px">\n  <h2>Buscador de libros</h2>\n  <form onsubmit="return false"><input id="q" aria-label="Título"> <button id="btn" type="button">Buscar</button></form>\n  <p id="msg" role="status"></p>\n  <div id="res"></div>\n  <script src="app.js"></script>\n</body>\n</html>' }, { name: 'app.js', code: AUDIT.join('\n') + '\n' }],
        tests: [
          { t: 'Sin claves escritas en el código', pts: 15, f: function () { return !/sk-live|API_KEY\s*=\s*["']/.test(FILES['app.js']); } },
          { t: 'Sin var: solo const / let', pts: 5, f: function () { return !/\bvar\b/.test(FILES['app.js']); } },
          { t: 'Codifica el parámetro con encodeURIComponent', pts: 10, f: function () { return /encodeURIComponent\(/.test(FILES['app.js']); } },
          { t: 'Usa await al leer el JSON', pts: 10, f: function () { return /await\s+\w+\.json\(\)/.test(FILES['app.js']); } },
          { t: 'Comprueba response.ok', pts: 10, f: function () { return /\.ok\b/.test(FILES['app.js']); } },
          { t: 'Los títulos se insertan como texto (sin ejecutar HTML)', pts: 20, f: async function () { q('#q').value = 'cien'; q('#btn').click(); await new Promise(function (r) { setTimeout(r, 700); }); var h = q('#res h3'); return !!h && /<img/.test(h.textContent) && !q('#res h3 img') && logs.every(function (l) { return !/XSS/.test(l); }); } },
          { t: 'Las imágenes tienen alt', pts: 10, f: function () { var im = qa('#res img'); return im.length > 0 && im.every(function (i) { return (i.getAttribute('alt') || '').length > 2; }); } },
          { t: 'Una búsqueda vacía muestra un aviso en #msg', pts: 10, f: async function () { q('#q').value = '   '; q('#msg').textContent = ''; q('#btn').click(); await new Promise(function (r) { setTimeout(r, 100); }); return txt(q('#msg')).length > 3; } },
          { t: 'Usa try/catch y ===', pts: 10, f: function () { var s = FILES['app.js']; return /try\s*\{/.test(s) && /catch/.test(s) && !/[^=!<>]==[^=]/.test(s); } }],
        solution: [{ name: 'app.js', code: 'const BASE = "https://api.libros.dev/v1";   // la clave real viviría en el servidor\nconst res = document.getElementById("res");\nconst msg = document.getElementById("msg");\n\nasync function buscar(q) {\n  const texto = q.trim();\n  if (!texto) {\n    msg.textContent = "Escribe un título para buscar.";\n    return;\n  }\n  msg.textContent = "Cargando…";\n  try {\n    const r = await fetch(`${BASE}?q=${encodeURIComponent(texto)}`);\n    if (!r.ok) throw new Error("HTTP " + r.status);\n    const datos = await r.json();\n    res.innerHTML = "";\n    for (const it of datos.items) {\n      const h3 = document.createElement("h3");\n      h3.textContent = it.titulo;\n      const img = document.createElement("img");\n      img.src = it.portada;\n      img.alt = "Portada de " + it.titulo;\n      res.append(h3, img);\n    }\n    msg.textContent = datos.items.length === 0 ? "Sin resultados." : "";\n  } catch (e) {\n    msg.textContent = "No se pudo completar la búsqueda. Inténtalo de nuevo.";\n  }\n}\n\ndocument.getElementById("btn").addEventListener("click", () => {\n  buscar(document.getElementById("q").value);\n});' }] },
      { t: 'h', text: 'Actividad 3: documenta y despliega', min: 45 },
      { t: 'steps', items: [
        { t: 'Documenta la auditoría', html: '<p>En el README del proyecto agrega una sección “Auditoría de IA”: qué le pediste, qué defectos encontraste y cómo los corregiste. Es evidencia de criterio, no de copia.</p>' },
        { t: 'Prepara el repositorio', html: '<p>Verifica <code>.gitignore</code> (incluye <code>.env</code> y <code>node_modules</code>), borra archivos sobrantes y haz el commit: <code>fix: corrige defectos del código generado por IA</code>.' + '</p>' },
        { t: 'Agrega el pipeline', html: '<p>Crea <code>.github/workflows/ci.yml</code> con el flujo que escribiste en el laboratorio anterior.</p>' },
        { t: 'Despliega en Vercel', html: '<p>Importa el repositorio, configura las variables de entorno y obtén tu URL pública.</p>' },
        { t: 'Verifica en producción', html: '<p>Abre la URL desde el celular. Revisa la consola, la pestaña Red y que no haya errores ni secretos visibles.</p>' }] },
      { t: 'check', title: 'Entrega del taller 5.1', items: ['Prompt y especificación usada con la IA (en el README)', 'Lista de al menos 5 defectos encontrados y su corrección', 'Código final sin secretos, con manejo de errores y accesible', 'Pipeline de CI funcionando (insignia verde en GitHub)', 'URL pública desplegada y funcionando en el celular', 'Reflexión (5-8 líneas): ¿qué te enseñó revisar el código de la IA?'] },
      { t: 'table', head: ['Criterio', 'Peso', 'Excelente'], rows: [['Calidad de la especificación', '20 %', 'Contexto, reglas, casos borde y formato claros'], ['Auditoría', '30 %', 'Defectos de seguridad, corrección y accesibilidad detectados y explicados'], ['Código corregido', '25 %', 'Cumple la lista de auditoría y las pruebas'], ['Despliegue y CI', '15 %', 'URL pública y pipeline en verde'], ['Reflexión', '10 %', 'Crítica y personal, con ejemplos concretos']] }
    ]
  });
})();
