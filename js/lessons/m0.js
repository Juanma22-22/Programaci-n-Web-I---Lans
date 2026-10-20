/* Módulo 0 · Nivelación e integración de fundamentos */
(function () {
  var C = Course;

  /* ===== 0.1 Guía de instalación ===== */
  C.add({
    id: '0.1',
    lead: 'Un desarrollador es tan productivo como su taller. Hoy dejamos listo el entorno completo: Java con Maven, el editor para la web, la base de datos y el control de versiones.',
    blocks: [
      { t: 'h', text: 'El mapa de herramientas', min: 20 },
      { t: 'table', head: ['Herramienta', 'Para qué la usamos', 'Dónde aparece en el curso'], rows: [
        ['<b>NetBeans + Maven</b>', 'Proyectos Java con gestión de dependencias', 'Módulo 0 (repaso de Prog I y II)'],
        ['<b>Visual Studio Code</b>', 'Editor principal para HTML, CSS, JS y TypeScript', 'Módulos 1 a 5 y proyecto final'],
        ['<b>MySQL Workbench</b>', 'Crear y consultar la base de datos', 'Módulo 0 y taller integrador del Módulo 2'],
        ['<b>Git + GitHub</b>', 'Historial, ramas y publicación del proyecto', 'Todo el curso; despliegue en el Módulo 5']] },
      { t: 'ana', title: 'Analogía: el taller del carpintero', rows: [
        ['El banco de trabajo', 'VS Code: donde pasas la mayor parte del tiempo.'],
        ['El almacén de piezas', 'Maven: descarga e instala las librerías que tu proyecto necesita, en la versión correcta.'],
        ['El inventario', 'MySQL: guarda los datos de forma ordenada y consultable.'],
        ['El cuaderno de bitácora', 'Git: registra cada cambio, quién lo hizo y por qué, y permite volver atrás.']] },

      { t: 'h', text: 'Java, Maven y NetBeans', min: 30 },
      { t: 'steps', items: [
        { t: 'Instala el JDK 17 o superior', html: '<p>Descarga un JDK (Temurin/OpenJDK) para tu sistema operativo y acepta las opciones por defecto. El JDK incluye el compilador; el JRE solo ejecuta.</p>' },
        { t: 'Verifica en la terminal', html: '<p>Abre la terminal (Windows: <code>cmd</code> o PowerShell) y comprueba las versiones.</p>', code: 'java -version\njavac -version', lang: 'bash', ct: 'Terminal' },
        { t: 'Instala Apache NetBeans', html: '<p>Descárgalo del sitio oficial. Trae Maven integrado, pero conviene conocerlo por separado.</p>' },
        { t: 'Crea un proyecto Maven', html: '<p><b>File → New Project → Java with Maven → Java Application.</b> Usa como Group Id <code>co.edu.ucaldas</code> y como Artifact Id <code>hola-web</code>.</p>' },
        { t: 'Ejecuta el “Hola mundo”', html: '<p>Clic derecho sobre el proyecto → <b>Run</b>. Si ves el mensaje en la consola, el entorno Java funciona.</p>', code: 'package co.edu.ucaldas;\n\npublic class App {\n    public static void main(String[] args) {\n        System.out.println("Hola, Programación Web 1");\n    }\n}', lang: 'java', ct: 'App.java' }] },
      { t: 'note', kind: 'key', html: '<p>El archivo <code>pom.xml</code> es el “inventario” de Maven: declara el proyecto y sus dependencias. Cuando necesites una librería (por ejemplo, el conector de MySQL) la agregas ahí y Maven la descarga sola.</p>' },

      { t: 'h', text: 'Visual Studio Code', min: 25 },
      { t: 'steps', items: [
        { t: 'Instala VS Code', html: '<p>Descarga la versión estable del sitio oficial. En Windows marca “Agregar al PATH” y “Abrir con Code”.</p>' },
        { t: 'Instala las extensiones del curso', html: '<p>Abre el panel de extensiones (<code>Ctrl+Shift+X</code>) e instala: <b>Live Server</b> (recarga la página al guardar), <b>Prettier</b> (formato automático), <b>ESLint</b> (errores de JavaScript) y <b>Tailwind CSS IntelliSense</b> (Módulo 3).</p>' },
        { t: 'Activa guardar y formatear', html: '<p><code>Ctrl+,</code> → busca <i>Format On Save</i> y márcalo. Tu código quedará con sangría uniforme sin esfuerzo.</p>' },
        { t: 'Prueba Live Server', html: '<p>Crea una carpeta <code>prueba</code>, un <code>index.html</code> con <code>!</code> + <code>Tab</code>, y clic derecho → <b>Open with Live Server</b>.</p>' }] },
      { t: 'table', head: ['Atajo', 'Acción'], rows: [['<code>Ctrl+S</code>', 'Guardar (y formatear)'], ['<code>Alt+Shift+↓</code>', 'Duplicar la línea'], ['<code>Ctrl+/</code>', 'Comentar o descomentar'], ['<code>Ctrl+D</code>', 'Seleccionar la siguiente coincidencia'], ['<code>Ctrl+`</code>', 'Abrir la terminal integrada'], ['<code>F12</code> (en el navegador)', 'Herramientas de desarrollo']] },

      { t: 'h', text: 'MySQL Server y Workbench', min: 25 },
      { t: 'steps', items: [
        { t: 'Instala MySQL Community Server y Workbench', html: '<p>Con el instalador oficial elige “Developer Default”. Anota la contraseña del usuario <code>root</code>: no se puede recuperar fácilmente.</p>' },
        { t: 'Abre una conexión', html: '<p>En Workbench pulsa el <b>+</b> junto a “MySQL Connections”, host <code>127.0.0.1</code>, puerto <code>3306</code>, usuario <code>root</code>. Prueba con <i>Test Connection</i>.</p>' },
        { t: 'Ejecuta tu primera consulta', html: '<p>Abre una pestaña SQL y ejecuta el script (rayo amarillo).</p>', code: 'CREATE DATABASE IF NOT EXISTS tienda;\nUSE tienda;\n\nCREATE TABLE producto (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  nombre VARCHAR(80) NOT NULL,\n  precio DECIMAL(10,2) NOT NULL\n);\n\nINSERT INTO producto (nombre, precio) VALUES ("Cuaderno", 8000), ("Lapicero", 2000);\nSELECT * FROM producto;', lang: 'sql', ct: 'tienda.sql' }] },

      { t: 'h', text: 'Git y GitHub: tu bitácora', min: 40 },
      { t: 'steps', items: [
        { t: 'Instala Git y preséntate', html: '<p>Descárgalo, instálalo y configura tu identidad una sola vez.</p>', code: 'git --version\ngit config --global user.name "Tu Nombre"\ngit config --global user.email "tucorreo@ucaldas.edu.co"', lang: 'bash', ct: 'Terminal' },
        { t: 'Crea una cuenta en GitHub', html: '<p>Es la “nube” donde guardaremos el proyecto final y que luego publicaremos con Vercel.</p>' }] },
      { t: 'ana', title: 'Analogía: el videojuego con puntos de guardado', rows: [
        ['<code>git add</code>', 'Eliges qué cambios entran en la próxima foto.'],
        ['<code>git commit</code>', 'Tomas la foto con una descripción: un punto de guardado.'],
        ['<code>git branch</code>', 'Abres una línea de tiempo paralela para experimentar sin riesgo.'],
        ['<code>git merge</code>', 'Fusionas la línea experimental con la principal si todo salió bien.'],
        ['<code>git push</code>', 'Subes tus puntos de guardado a la nube.']] },
      { t: 'gitsim', title: 'Practica Git sin miedo a romper nada', files: ['index.html', 'styles.css'] },
      { t: 'note', kind: 'tip', html: '<p>Mensajes de commit útiles: <code>feat: agrega menú de navegación</code>, <code>fix: corrige el alt de la imagen</code>, <code>docs: actualiza el README</code>. Dicen <i>qué</i> y <i>por qué</i>, no “cambios” ni “arreglé cosas”.</p>' },

      { t: 'h', text: 'Lista de verificación del entorno', min: 20 },
      { t: 'check', title: 'Antes de salir de clase', items: ['java -version responde con JDK 17 o superior', 'Creé y ejecuté un proyecto Maven en NetBeans', 'VS Code instalado con Live Server y Prettier', 'Abrí un index.html con Live Server', 'Me conecto a MySQL desde Workbench y ejecuté un SELECT', 'git --version responde y configuré mi nombre y correo', 'Tengo cuenta de GitHub', 'Completé las 6 misiones de la terminal de Git'] },
      { t: 'quiz', qs: [
        ['¿Qué gestiona Maven?', ['Las versiones del código', 'Las dependencias y el ciclo de construcción', 'La base de datos'], 1, 'Está descrito en el pom.xml.'],
        ['¿Para qué sirve Live Server?', ['Para subir el sitio a internet', 'Para recargar el navegador cada vez que guardas', 'Para compilar Java'], 1, 'Acelera el ciclo editar-guardar-ver.'],
        ['¿Qué hace git commit?', ['Sube los cambios a GitHub', 'Guarda una foto del estado preparado, con mensaje', 'Crea una rama'], 1, 'Subir es git push.'],
        ['¿Qué prepara los cambios para el commit?', ['git add', 'git push', 'git merge'], 0, 'Es la zona de staging.']] }
    ]
  });

  /* ===== 0.2a Programación I ===== */
  C.add({
    id: '0.2a',
    lead: 'Antes de manipular páginas hay que pensar como programador: variables, decisiones y ciclos. Es la misma lógica de Programación I; solo cambia la sintaxis.',
    blocks: [
      { t: 'h', text: 'Los tres bloques de la lógica', min: 25 },
      { t: 'cards', items: [
        { h: 'Secuencia', html: '<p>Las instrucciones se ejecutan una tras otra, de arriba abajo.</p>' },
        { h: 'Selección', html: '<p><code>if / else if / else</code> y <code>switch</code>: el programa elige un camino.</p>' },
        { h: 'Iteración', html: '<p><code>for</code>, <code>while</code> y <code>for-each</code>: repetir hasta que se cumpla una condición.</p>' }] },
      { t: 'p', html: '<p>Java y JavaScript comparten casi toda esta sintaxis. Observa cómo se calcula el promedio de un estudiante y la nota máxima; luego ejecútalo paso a paso.</p>' },
      { t: 'code', lang: 'java', title: 'Notas.java', code: 'public class Notas {\n    public static void main(String[] args) {\n        double[] notas = {3.5, 4.2, 2.8, 4.8};\n        double suma = 0;\n        double mayor = notas[0];\n        for (double n : notas) {\n            suma += n;\n            if (n > mayor) {\n                mayor = n;\n            }\n        }\n        double promedio = suma / notas.length;\n        System.out.println("Promedio: " + promedio);\n        System.out.println("Mayor: " + mayor);\n    }\n}' },
      { t: 'trace', title: 'Ejecución paso a paso (versión simplificada con 3 notas)', code: 'notas = [3.0, 4.0, 5.0]\nsuma = 0\npara cada n en notas:\n    suma = suma + n\npromedio = suma / 3\nimprimir promedio', steps: [
        { l: 1, vars: { notas: '[3.0, 4.0, 5.0]' }, note: 'Se crea el arreglo con tres valores.' },
        { l: 2, vars: { notas: '[3.0, 4.0, 5.0]', suma: 0 }, note: 'El acumulador empieza en cero.' },
        { l: 3, vars: { notas: '[3.0, 4.0, 5.0]', suma: 0, n: 3.0 }, note: 'Primera vuelta del ciclo: n vale 3.0.' },
        { l: 4, vars: { suma: 3, n: 3.0 }, note: 'suma = 0 + 3.0.' },
        { l: 3, vars: { suma: 3, n: 4.0 }, note: 'Segunda vuelta: n vale 4.0.' },
        { l: 4, vars: { suma: 7, n: 4.0 }, note: 'suma = 3 + 4.0.' },
        { l: 3, vars: { suma: 7, n: 5.0 }, note: 'Tercera vuelta: n vale 5.0.' },
        { l: 4, vars: { suma: 12, n: 5.0 }, note: 'suma = 7 + 5.0. El ciclo termina.' },
        { l: 5, vars: { suma: 12, promedio: 4 }, note: '12 / 3 = 4.' },
        { l: 6, vars: { suma: 12, promedio: 4 }, out: '4', note: 'Se imprime el resultado.' }] },
      { t: 'h', text: 'Del pseudocódigo a JavaScript', min: 25 },
      { t: 'table', head: ['Concepto', 'Java', 'JavaScript'], rows: [
        ['Variable', '<code>int edad = 20;</code>', '<code>let edad = 20;</code>'],
        ['Constante', '<code>final double IVA = 0.19;</code>', '<code>const IVA = 0.19;</code>'],
        ['Cadena', '<code>String s = "Hola";</code>', '<code>const s = "Hola";</code>'],
        ['Arreglo', '<code>int[] a = {1,2,3};</code>', '<code>const a = [1,2,3];</code>'],
        ['Imprimir', '<code>System.out.println(x);</code>', '<code>console.log(x);</code>'],
        ['Igualdad estricta', '<code>a == b</code> (primitivos)', '<code>a === b</code>'],
        ['Función', '<code>static int sumar(int a, int b)</code>', '<code>function sumar(a, b) { … }</code>']] },
      { t: 'note', kind: 'warn', html: '<p>JavaScript no tiene tipos declarados: una variable puede cambiar de número a texto. Por eso usaremos siempre <code>===</code> y, en el Módulo 5, TypeScript.</p>' },
      { t: 'h', text: 'Práctica: tabla de verdad de la lógica', min: 40 },
      { t: 'lab', id: 'logica', title: 'Funciones de lógica en JavaScript', intro: 'Implementa las tres funciones. Las pruebas las llaman con varios datos. Abre la consola de la derecha para ver tus console.log.', height: 340, files: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es"><head><meta charset="UTF-8"><title>Lógica</title></head>\n<body>\n<p>Abre la consola para ver los resultados.</p>\n<script src="app.js"></script>\n</body></html>' }, { name: 'app.js', code: '// 1. Devuelve "Aprobado" si la nota es >= 3.0, si no "Reprobado"\nfunction estado(nota) {\n  // tu código\n}\n\n// 2. Devuelve el promedio de un arreglo de números\nfunction promedio(notas) {\n  // tu código\n}\n\n// 3. Devuelve cuántos números pares hay en el arreglo\nfunction contarPares(arr) {\n  // tu código\n}\n\nconsole.log(estado(3.5), promedio([3, 4, 5]), contarPares([1, 2, 4]));' }],
        tests: [
          { t: 'estado(3.5) devuelve "Aprobado"', f: function () { return estado(3.5) === 'Aprobado'; } },
          { t: 'estado(2.9) devuelve "Reprobado"', f: function () { return estado(2.9) === 'Reprobado'; } },
          { t: 'estado(3.0) es el límite: Aprobado', f: function () { return estado(3.0) === 'Aprobado'; } },
          { t: 'promedio([3,4,5]) es 4', f: function () { return promedio([3, 4, 5]) === 4; } },
          { t: 'promedio([2,3]) es 2.5', f: function () { return promedio([2, 3]) === 2.5; } },
          { t: 'contarPares([1,2,4,6,7]) es 3', f: function () { return contarPares([1, 2, 4, 6, 7]) === 3; } },
          { t: 'contarPares([]) es 0', f: function () { return contarPares([]) === 0; } }],
        solution: [{ name: 'app.js', code: 'function estado(nota) {\n  return nota >= 3.0 ? "Aprobado" : "Reprobado";\n}\nfunction promedio(notas) {\n  let suma = 0;\n  for (const n of notas) suma += n;\n  return suma / notas.length;\n}\nfunction contarPares(arr) {\n  let c = 0;\n  for (const n of arr) if (n % 2 === 0) c++;\n  return c;\n}' }] },
      { t: 'quiz', qs: [
        ['¿Qué estructura repite un bloque mientras se cumple una condición?', ['if', 'while', 'switch'], 1, 'while evalúa la condición antes de cada vuelta.'],
        ['¿Cuál es la forma correcta de comparar en JavaScript sin conversiones sorpresa?', ['==', '===', '='], 1, '= asigna; === compara valor y tipo.'],
        ['En un acumulador, ¿con qué valor se inicia una suma?', ['Con 1', 'Con 0', 'Con el último dato'], 1, 'El elemento neutro de la suma es 0.']] }
    ]
  });

  /* ===== 0.2b Programación II ===== */
  C.add({
    id: '0.2b',
    lead: 'La programación orientada a objetos modela el mundo real con clases. Es la base para entender luego el DOM: cada etiqueta HTML es, literalmente, un objeto.',
    blocks: [
      { t: 'h', text: 'Clases, objetos y encapsulamiento', min: 30 },
      { t: 'ana', title: 'Analogía: el molde de galletas', rows: [
        ['Clase', 'El molde: define la forma (atributos) y lo que sabe hacer (métodos).'],
        ['Objeto', 'Cada galleta hecha con el molde; todas tienen forma igual y sabor distinto.'],
        ['Atributo', 'Una característica: nombre, precio, stock.'],
        ['Método', 'Una acción: aplicarDescuento(), mostrarFicha().'],
        ['Encapsulamiento', 'Los atributos son <code>private</code> y se acceden con getters y setters que validan.']] },
      { t: 'code', lang: 'java', title: 'Producto.java', code: 'public class Producto {\n    private String nombre;\n    private double precio;\n\n    public Producto(String nombre, double precio) {\n        this.nombre = nombre;\n        setPrecio(precio);\n    }\n\n    public double getPrecio() { return precio; }\n\n    public void setPrecio(double precio) {\n        if (precio < 0) {\n            throw new IllegalArgumentException("El precio no puede ser negativo");\n        }\n        this.precio = precio;\n    }\n\n    public double conIva() { return precio * 1.19; }\n}' },
      { t: 'h', text: 'Herencia y polimorfismo', min: 30 },
      { t: 'custom', build: function (w, x, U) {
        var el = U.el, box = el('div', { class: 'play' });
        box.appendChild(el('h4', null, 'Diagrama de clases interactivo'));
        var D = {
          Producto: ['Clase base', 'Atributos: nombre, precio. Método: <code>conIva()</code>.', null],
          Libro: ['Hereda de Producto', 'Agrega <code>autor</code> y <code>isbn</code>. Reutiliza todo lo de Producto.', 'Producto'],
          Electrodomestico: ['Hereda de Producto', 'Agrega <code>garantiaMeses</code> y <b>sobrescribe</b> <code>conIva()</code> para sumar el costo de garantía.', 'Producto']
        };
        var g = el('div', { class: 'cols' }), left = el('div'), info = el('div', { class: 'panel' }, '<span class="hint">Toca una clase para ver su detalle.</span>');
        Object.keys(D).forEach(function (k) {
          var b = el('button', { class: 'btn', style: 'display:block;margin:6px 0;margin-left:' + (D[k][2] ? 32 : 0) + 'px' }, (D[k][2] ? '↳ ' : '') + k);
          b.onclick = function () { info.innerHTML = '<h4>' + k + '</h4><span class="pill">' + D[k][0] + '</span><p>' + D[k][1] + '</p>'; }; left.appendChild(b);
        });
        g.appendChild(left); g.appendChild(info); box.appendChild(g); w.appendChild(box);
      } },
      { t: 'cards', items: [
        { h: 'Herencia', html: '<p><code>class Libro extends Producto</code>: la subclase obtiene atributos y métodos y puede agregar los suyos.</p>' },
        { h: 'Sobrescritura', html: '<p>Una subclase redefine un método heredado con <code>@Override</code> para especializarlo.</p>' },
        { h: 'Polimorfismo', html: '<p>Una variable de tipo <code>Producto</code> puede apuntar a un <code>Libro</code> y al llamar <code>conIva()</code> se ejecuta la versión correcta.</p>' }] },
      { t: 'note', kind: 'key', html: '<p><b>Puente con la web:</b> en el DOM, un <code>&lt;button&gt;</code> y un <code>&lt;input&gt;</code> heredan de <code>HTMLElement</code>, que a su vez hereda de <code>Element</code> y de <code>Node</code>. Todos comparten métodos como <code>addEventListener()</code> y atributos como <code>id</code> o <code>className</code>. Es herencia y polimorfismo funcionando en el navegador.</p>' },
      { t: 'h', text: 'Práctica: clases en JavaScript', min: 40 },
      { t: 'lab', id: 'poo', title: 'Producto y Libro con ES6', intro: 'Completa la clase base y la subclase.', height: 340, files: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es"><head><meta charset="UTF-8"><title>POO</title></head>\n<body><script src="app.js"></script></body></html>' }, { name: 'app.js', code: 'class Producto {\n  constructor(nombre, precio) {\n    // asigna nombre y precio\n  }\n  conIva() {\n    // devuelve precio * 1.19\n  }\n}\n\nclass Libro extends Producto {\n  constructor(nombre, precio, autor) {\n    // llama a super y guarda el autor\n  }\n  ficha() {\n    // devuelve "Nombre de Autor"\n  }\n}\n\nconst l = new Libro("Don Quijote", 10000, "Cervantes");\nconsole.log(l.ficha(), l.conIva());' }],
        tests: [
          { t: 'Producto guarda nombre y precio', f: function () { var p = new Producto('A', 100); return p.nombre === 'A' && p.precio === 100; } },
          { t: 'conIva() multiplica por 1.19', f: function () { return Math.abs(new Producto('A', 100).conIva() - 119) < 0.001; } },
          { t: 'Libro hereda de Producto', f: function () { return new Libro('A', 1, 'B') instanceof Producto; } },
          { t: 'Libro guarda el autor', f: function () { return new Libro('A', 1, 'B').autor === 'B'; } },
          { t: 'ficha() devuelve “Nombre de Autor”', f: function () { return new Libro('Rayuela', 1, 'Cortázar').ficha() === 'Rayuela de Cortázar'; } },
          { t: 'Libro usa conIva heredado', f: function () { return Math.abs(new Libro('A', 200, 'B').conIva() - 238) < 0.001; } }],
        solution: [{ name: 'app.js', code: 'class Producto {\n  constructor(nombre, precio) {\n    this.nombre = nombre;\n    this.precio = precio;\n  }\n  conIva() { return this.precio * 1.19; }\n}\nclass Libro extends Producto {\n  constructor(nombre, precio, autor) {\n    super(nombre, precio);\n    this.autor = autor;\n  }\n  ficha() { return this.nombre + " de " + this.autor; }\n}' }] },
      { t: 'quiz', qs: [
        ['¿Qué palabra clave indica que una clase hereda de otra?', ['implements', 'extends', 'inherits'], 1, 'En Java y JavaScript es extends.'],
        ['¿Para qué sirve el encapsulamiento?', ['Para ocultar y validar el acceso a los atributos', 'Para acelerar el programa', 'Para evitar usar métodos'], 0, 'Los setters pueden rechazar datos inválidos.'],
        ['¿Cómo se llama redefinir un método heredado?', ['Sobrecarga', 'Sobrescritura', 'Composición'], 1, 'Override.']] }
    ]
  });

  /* ===== 0.2c Bases de Datos I ===== */
  C.add({
    id: '0.2c',
    lead: 'Casi toda aplicación web muestra datos que viven en una base de datos. Repasamos el modelo relacional y SQL, porque en el Módulo 2 convertiremos un registro SQL en una tarjeta web.',
    blocks: [
      { t: 'h', text: 'Modelo relacional en cinco ideas', min: 25 },
      { t: 'cards', items: [
        { h: 'Tabla', html: '<p>Una entidad del mundo real: cliente, producto, pedido.</p>' },
        { h: 'Fila (registro)', html: '<p>Una instancia: el cliente “Ana Gómez”.</p>' },
        { h: 'Columna (atributo)', html: '<p>Una propiedad con tipo: nombre VARCHAR, precio DECIMAL.</p>' },
        { h: 'Llave primaria', html: '<p>Identifica cada fila de forma única. Nunca se repite ni es nula.</p>' },
        { h: 'Llave foránea', html: '<p>Una columna que apunta a la llave primaria de otra tabla y crea la relación.</p>' }] },
      { t: 'h', text: 'DDL y DML', min: 25 },
      { t: 'code', lang: 'sql', title: 'esquema.sql', code: 'CREATE TABLE categoria (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  nombre VARCHAR(50) NOT NULL\n);\n\nCREATE TABLE producto (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  nombre VARCHAR(80) NOT NULL,\n  precio DECIMAL(10,2) NOT NULL,\n  categoria_id INT,\n  FOREIGN KEY (categoria_id) REFERENCES categoria(id)\n);\n\nINSERT INTO categoria (nombre) VALUES ("Papelería"), ("Tecnología");\nINSERT INTO producto (nombre, precio, categoria_id)\nVALUES ("Cuaderno", 8000, 1), ("Lapicero", 2000, 1), ("Memoria USB", 35000, 2), ("Cable", 12000, NULL);' },
      { t: 'table', head: ['Familia', 'Sentencias', 'Para qué'], rows: [['DDL', 'CREATE, ALTER, DROP', 'Definir la estructura'], ['DML', 'INSERT, UPDATE, DELETE', 'Modificar datos'], ['DQL', 'SELECT', 'Consultar datos']] },
      { t: 'h', text: 'INNER JOIN: combinar tablas', min: 35 },
      { t: 'custom', build: function (w, x, U) {
        var el = U.el, esc = U.esc, box = el('div', { class: 'play' });
        box.appendChild(el('h4', null, 'Visualizador de JOIN'));
        var cat = [[1, 'Papelería'], [2, 'Tecnología']], pr = [[1, 'Cuaderno', 8000, 1], [2, 'Lapicero', 2000, 1], [3, 'Memoria USB', 35000, 2], [4, 'Cable', 12000, null]];
        var seg = el('div', { class: 'seg' }), mode = 'INNER', out = el('div'), sql = el('div');
        ['INNER', 'LEFT'].forEach(function (m) { var b = el('button', { class: m === mode ? 'on' : '' }, m + ' JOIN'); b.onclick = function () { mode = m; U.$$('button', seg).forEach(function (q) { q.classList.toggle('on', q === b); }); draw(); }; seg.appendChild(b); });
        box.appendChild(seg); box.appendChild(sql); box.appendChild(out);
        function draw() {
          var rows = pr.map(function (p) { var c = cat.filter(function (c) { return c[0] === p[3]; })[0]; return [p[1], p[2], c ? c[1] : null]; }).filter(function (r) { return mode === 'LEFT' || r[2] !== null; });
          sql.innerHTML = '';
          sql.appendChild(U.hl ? el('pre', { class: 'code' }, U.hl('SELECT p.nombre, p.precio, c.nombre AS categoria\nFROM producto p\n' + mode + ' JOIN categoria c ON p.categoria_id = c.id;', 'sql')) : el('pre'));
          out.innerHTML = '<div class="tbl"><table><thead><tr><th>nombre</th><th>precio</th><th>categoria</th></tr></thead><tbody>' + rows.map(function (r) { return '<tr' + (r[2] === null ? ' style="background:rgba(183,134,42,.18)"' : '') + '><td>' + esc(r[0]) + '</td><td>' + r[1] + '</td><td>' + (r[2] === null ? '<i>NULL</i>' : esc(r[2])) + '</td></tr>'; }).join('') + '</tbody></table></div><p class="hint">' + (mode === 'INNER' ? 'INNER JOIN solo conserva las filas con pareja en ambas tablas: “Cable” desaparece porque no tiene categoría.' : 'LEFT JOIN conserva todos los productos y rellena con NULL cuando no hay pareja.') + '</p>';
        }
        draw(); w.appendChild(box);
      } },
      { t: 'note', kind: 'key', html: '<p>El resultado de un <code>SELECT</code> es una lista de filas con columnas. En el servidor se convierte en JSON, y en el navegador en un arreglo de objetos que recorreremos con JavaScript para crear tarjetas. Esa es toda la historia de una aplicación web de datos.</p>' },
      { t: 'quiz', qs: [
        ['¿Qué columna enlaza dos tablas?', ['La llave primaria', 'La llave foránea', 'Cualquier VARCHAR'], 1, 'Apunta a la llave primaria de la otra tabla.'],
        ['¿Qué filas devuelve un INNER JOIN?', ['Todas las de la izquierda', 'Solo las que tienen pareja en ambas tablas', 'Todas las de ambas'], 1, 'Por eso “Cable” desaparece.'],
        ['¿Cuál sentencia crea una tabla?', ['INSERT', 'CREATE TABLE', 'SELECT'], 1, 'Es DDL.']] }
    ]
  });

  /* ===== 0.2t Taller de nivelación ===== */
  C.add({
    id: '0.2t',
    lead: 'Cerramos la nivelación integrando las tres materias: tomamos filas como las que devolvería una consulta SQL y las procesamos con lógica y objetos.',
    blocks: [
      { t: 'h', text: 'Enunciado', min: 15 },
      { t: 'note', kind: 'mision', html: '<p>Una tienda tiene el resultado de un JOIN en forma de arreglo de objetos. Escribe funciones que respondan las preguntas del gerente: total del inventario, productos por categoría y producto más caro. Cada pregunta usa lógica (Prog I), objetos (Prog II) y datos (BD I).</p>' },
      { t: 'h', text: 'Laboratorio con calificación', min: 70 },
      { t: 'lab', id: 'nivelacion', title: 'De la base de datos a la lógica', intro: 'El arreglo filas simula el resultado del INNER JOIN. Implementa las cuatro funciones.', height: 380, points: true, files: [{ name: 'index.html', code: '<!DOCTYPE html>\n<html lang="es"><head><meta charset="UTF-8"><title>Taller de nivelación</title></head>\n<body><h1>Inventario</h1><ul id="lista"></ul><script src="app.js"></script></body></html>' }, { name: 'app.js', code: 'const filas = [\n  { nombre: "Cuaderno", precio: 8000, stock: 10, categoria: "Papelería" },\n  { nombre: "Lapicero", precio: 2000, stock: 50, categoria: "Papelería" },\n  { nombre: "Memoria USB", precio: 35000, stock: 5, categoria: "Tecnología" }\n];\n\n// 1. Suma de precio * stock de todas las filas\nfunction valorInventario(filas) {\n}\n\n// 2. Devuelve un objeto { categoria: cantidadDeProductos }\nfunction contarPorCategoria(filas) {\n}\n\n// 3. Devuelve el objeto fila con mayor precio\nfunction masCaro(filas) {\n}\n\n// 4. Pinta un <li> "Nombre - $precio" por cada fila dentro de #lista\nfunction pintar(filas) {\n}\n\npintar(filas);' }],
        tests: [
          { t: 'valorInventario suma precio × stock', pts: 25, f: function () { return valorInventario([{ precio: 10, stock: 2 }, { precio: 5, stock: 3 }]) === 35; } },
          { t: 'valorInventario con los datos reales (-> 355000)', pts: 5, f: function () { return valorInventario(filas) === 355000; } },
          { t: 'contarPorCategoria agrupa correctamente', pts: 25, f: function () { var r = contarPorCategoria([{ categoria: 'A' }, { categoria: 'A' }, { categoria: 'B' }]); return r.A === 2 && r.B === 1; } },
          { t: 'masCaro devuelve la fila completa', pts: 20, f: function () { var r = masCaro([{ nombre: 'x', precio: 5 }, { nombre: 'y', precio: 9 }]); return r && r.nombre === 'y'; } },
          { t: 'pintar crea un <li> por fila', pts: 20, f: function () { return qa('#lista li').length === filas.length; } },
          { t: 'El texto incluye el nombre del producto', pts: 5, f: function () { return /Cuaderno/.test(txt(q('#lista'))); } }],
        solution: [{ name: 'app.js', code: 'const filas = [\n  { nombre: "Cuaderno", precio: 8000, stock: 10, categoria: "Papelería" },\n  { nombre: "Lapicero", precio: 2000, stock: 50, categoria: "Papelería" },\n  { nombre: "Memoria USB", precio: 35000, stock: 5, categoria: "Tecnología" }\n];\n\nfunction valorInventario(filas) {\n  return filas.reduce((t, f) => t + f.precio * f.stock, 0);\n}\nfunction contarPorCategoria(filas) {\n  const r = {};\n  for (const f of filas) r[f.categoria] = (r[f.categoria] || 0) + 1;\n  return r;\n}\nfunction masCaro(filas) {\n  let m = filas[0];\n  for (const f of filas) if (f.precio > m.precio) m = f;\n  return m;\n}\nfunction pintar(filas) {\n  const ul = document.getElementById("lista");\n  for (const f of filas) {\n    const li = document.createElement("li");\n    li.textContent = f.nombre + " - $" + f.precio;\n    ul.appendChild(li);\n  }\n}\n\npintar(filas);' }] },
      { t: 'check', title: 'Cierre del módulo', items: ['Las cuatro funciones pasan las pruebas', 'Entiendo qué es una llave foránea y qué hace un JOIN', 'Sé crear una clase con herencia', 'Mi entorno (VS Code, Git, MySQL) funciona'] }
    ]
  });
})();
