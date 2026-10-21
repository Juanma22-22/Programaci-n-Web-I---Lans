/* Programa del curso, proyecto integrador y evaluación */
(function () {
  var C = Course;

  /* ===== PIAA ===== */
  C.add({
    id: 'pia',
    lead: 'Resumen navegable del Plan Institucional de Actividad Académica (PIAA), versión 1, Departamento de Sistemas e Informática.',
    blocks: [
      { t: 'h', text: 'Identificación' },
      { t: 'table', head: ['Campo', 'Dato'], rows: [
        ['Facultad', 'Inteligencia Artificial e Ingenierías'], ['Departamento', 'Sistemas e Informática'], ['Programa', 'Tecnología en Sistemas Informáticos'],
        ['Actividad académica', 'Programación para Entornos Web 1 · código <b>334G8F</b>'], ['Tipo', 'Teórico-práctica (24 h teóricas + 24 h prácticas)'],
        ['Horas', '48 presenciales · 144 no presenciales (relación 1/3)'], ['Créditos y duración', '4 créditos · 12 semanas'],
        ['Requisitos', 'Programación II (331G8F) y Bases de Datos I (318G8F)'], ['Nota aprobatoria', '3.0 · no habilitable'],
        ['Inasistencia', 'Se reprueba con 12 horas entre justificadas y no justificadas (25 %)'], ['Cupo máximo', '20 estudiantes']] },
      { t: 'h', text: 'Objetivo general' },
      { t: 'note', kind: 'key', html: '<p>Formar al estudiante en los fundamentos del desarrollo de aplicaciones web, con tecnologías y herramientas orientadas a interfaces dinámicas e interactivas, integrando el desarrollo del lado del cliente, para que pueda diseñar y desarrollar aplicaciones web básicas que interactúen con un <i>endpoint</i> y cumplan estándares actuales para diferentes dispositivos.</p>' },
      { t: 'h', text: 'Objetivos específicos' },
      { t: 'cards', items: [
        { h: 'Construcción de interfaces', html: '<p>HTML5, CSS3 y JavaScript con principios de diseño y estructura.</p>' },
        { h: 'Responsive y formularios', html: '<p>Maquetación adaptable y formularios con validación que aseguren la integridad de los datos.</p>' },
        { h: 'Arquitectura cliente-servidor', html: '<p>Comprenderla y usar TypeScript para construir funcionalidades complejas.</p>' },
        { h: 'Control de versiones', html: '<p>Manejo de versiones de un proyecto con Git.</p>' }] },
      { t: 'h', text: 'Resultados de aprendizaje del curso' },
      { t: 'table', head: ['RA', 'Enunciado resumido', 'Dónde se trabaja'], rows: [
        ['RA1', 'Maneja HTML5, CSS3, JavaScript para interfaces dinámicas con estándares actuales y diseño responsive.', 'Módulos 1 a 4'],
        ['RA2', 'Implementa soluciones con frameworks, librerías e IA asistida (GitHub Copilot) para optimizar la creación de interfaces.', 'Módulos 3, 4 y 5 · Taller 5.1'],
        ['RA3', 'Gestiona repositorios en Git/GitHub y despliega con CI/CD en infraestructuras serverless (AWS, Vercel).', 'Módulo 0, Módulo 5 · Proyecto'],
        ['RA4', 'Trabajo en equipo y comunicación efectiva en un proyecto real colaborativo.', 'Proyecto integrador y sustentación']] },
      { t: 'note', kind: 'warn', title: 'Observación para el docente', html: '<p>El RA1 menciona el “ecosistema .NET” y el RA2 la “lógica de negocio en el servidor”, pero la justificación del PIAA y la temática del curso se centran en el <b>cliente (frontend)</b>, dejando el backend para <i>Programación para Entornos Web 2</i>. Este sitio sigue el contenido temático; si se quiere incluir .NET en esta asignatura habría que añadir un módulo de servidor. Conviene alinear el texto del RA en la próxima versión del PIAA.</p>' },
      { t: 'h', text: 'Contenido temático y su ubicación en el sitio' },
      { t: 'table', head: ['Eje del PIAA', 'Contenidos', 'Módulo'], rows: [
        ['Introducción al desarrollo web', 'Arquitectura web, HTTP/HTTPS, cliente-servidor, HTML5 semántico y SEO, asistentes de código', '1'],
        ['Ingeniería de interfaces y frameworks', 'Cascada, Flexbox, Grid, Mobile-First, Tailwind, generación de componentes con IA', '2 y 3'],
        ['Interactividad algorítmica y asincronismo', 'JavaScript ES6+, contextos, Event Loop, Promises, async/await, REST, TypeScript, Specs before code', '4 y 5.1'],
        ['Versiones, despliegue y proyecto', 'Git/GitHub, IndexedDB y LocalStorage, CI/CD (Vercel, AWS), auditoría asistida por IA', '0, 5 y proyecto']] },
      { t: 'h', text: 'Metodología y evaluación' },
      { t: 'cards', items: [
        { h: 'Metodología', html: '<p>Explicación magistral con ejemplos, prácticas guiadas y autónomas, talleres interactivos, material multimedia y un proyecto real aplicado clase a clase.</p>' },
        { h: 'Evaluación', html: '<p>Exámenes parciales, quices, talleres y proyecto del curso (análisis, abstracción, comunicación y trabajo en equipo). Los porcentajes los define el docente al inicio.</p>' }] },
      { t: 'h', text: 'Bibliografía' },
      { t: 'p', html: '<ul><li>Cruse, D., &amp; Boudreau, D. (2025). <i>Inclusive design for accessibility</i>. Packt.</li><li>Flanagan, D. (2020). <i>JavaScript: The definitive guide</i> (7.ª ed.). O’Reilly.</li><li>Haverbeke, M. (2024). <i>Eloquent JavaScript</i> (4.ª ed.). No Starch Press.</li><li>Huyen, C. (2024). <i>AI engineering</i>. O’Reilly.</li><li>Gu, A. et al. (2025). <i>AI for software engineering</i>. MIT CSAIL, UC Berkeley, Stanford.</li><li>Rubio-Manzano, C. et al. (2025). <i>Teaching programming in the age of generative AI</i>. arXiv.</li><li>Uluçınar, F. C. et al. (2025). <i>Impact of AI tools on learning computer programming</i>. Education Sciences.</li></ul>' }
    ]
  });

  /* ===== Proyecto: guía ===== */
  C.add({
    id: 'p1',
    lead: 'Un proyecto real, en equipo, que reúne todo lo aprendido: una aplicación web responsive que consume un endpoint, con control de versiones y despliegue público.',
    blocks: [
      { t: 'h', text: 'Visión del proyecto', min: 20 },
      { t: 'note', kind: 'mision', html: '<p>En equipos de 2 o 3 estudiantes diseñan, construyen y publican una aplicación web de tema libre (aprobado por el docente) que consuma datos de una API REST pública, persista preferencias en el navegador, esté tipada con TypeScript y se despliegue con integración continua.</p>' },
      { t: 'cards', items: [
        { h: 'Catálogo de películas', html: '<p>API de TMDB u OMDb: búsqueda, ficha y lista de favoritos persistente.</p>' },
        { h: 'Clima y viajes', html: '<p>Open-Meteo: pronóstico por ciudad, historial de búsquedas, modo oscuro.</p>' },
        { h: 'Pokédex o Rick & Morty', html: '<p>Filtros, paginación, favoritos y comparador de personajes.</p>' },
        { h: 'Finanzas personales', html: '<p>Tasas de cambio de una API pública, conversor y gráfico del historial local.</p>' },
        { h: 'Tu propia idea', html: '<p>Un problema de tu entorno universitario o barrio. Debe usar un endpoint verificable.</p>' }] },
      { t: 'h', text: 'Requisitos técnicos', min: 25 },
      { t: 'check', title: 'Mínimo exigible', items: ['HTML5 semántico, accesible (alt, labels, jerarquía de títulos, contraste)', 'CSS3 con Flexbox o Grid, diseño Mobile-First probado a 360, 768 y 1280 px', 'Formulario con validación nativa y personalizada', 'JavaScript modular (ES modules), sin variables globales innecesarias', 'Consumo de un endpoint con fetch, con estados de carga, vacío y error', 'Persistencia con localStorage o IndexedDB', 'Código fuente en TypeScript con modo estricto', 'Repositorio en GitHub con ramas, commits descriptivos y pull requests', 'Pipeline de CI (GitHub Actions) y despliegue público (Vercel o AWS)', 'README con descripción, capturas, instrucciones y declaración de uso de IA'] },
      { t: 'h', text: 'Estructura recomendada del repositorio', min: 15 },
      { t: 'code', lang: 'bash', title: 'estructura', code: 'mi-proyecto/\n├── .github/workflows/ci.yml\n├── src/\n│   ├── index.html\n│   ├── styles/\n│   │   └── main.css\n│   ├── ts/\n│   │   ├── api.ts          # fetch y tipos de la API\n│   │   ├── storage.ts      # localStorage / IndexedDB\n│   │   ├── ui.ts           # manipulación del DOM\n│   │   └── main.ts         # punto de entrada\n│   └── assets/\n├── dist/                    # salida compilada (no se versiona)\n├── .gitignore\n├── package.json\n├── tsconfig.json\n└── README.md' },
      { t: 'code', lang: 'text', title: 'README.md (plantilla)', code: '# Nombre del proyecto\n\n## ¿Qué problema resuelve?\nDos líneas.\n\n## Demo\nEnlace público + 2 capturas.\n\n## Tecnologías\nHTML5, CSS3, TypeScript, API X, Vercel.\n\n## Cómo ejecutarlo\nnpm install\nnpm run build\n\n## Equipo y roles\n- Persona A: interfaz\n- Persona B: datos y API\n\n## Uso de inteligencia artificial\nQué herramienta, para qué tareas, qué se auditó y qué se corrigió.\n\n## Decisiones y aprendizajes' },
      { t: 'h', text: 'Trabajo en equipo con Git', min: 30 },
      { t: 'p', html: '<p>Cada integrante trabaja en una rama por funcionalidad y la integra mediante <i>pull request</i> con revisión de un compañero. La rama <code>main</code> siempre debe estar desplegable. Practica el flujo:</p>' },
      { t: 'gitsim', title: 'Flujo de rama por funcionalidad', files: ['index.html', 'api.ts'] },
      { t: 'h', text: 'Hitos y calendario', min: 20 },
      { t: 'table', head: ['Hito', 'Semana', 'Entregable', 'Peso sugerido'], rows: [
        ['H1 · Propuesta y estructura', '8', 'Idea aprobada, especificación, repositorio y HTML semántico de las pantallas', '10 %'],
        ['H2 · Interfaz responsive', '9', 'Maquetación completa con CSS/Tailwind, formulario validado', '20 %'],
        ['H3 · Datos e interactividad', '10', 'Consumo del endpoint con estados, búsqueda y eventos', '25 %'],
        ['H4 · Calidad y despliegue', '11', 'TypeScript, persistencia, CI/CD y URL pública, auditoría de IA', '25 %'],
        ['H5 · Sustentación', '12', 'Demostración de 10 minutos y preguntas individuales', '20 %']] },
      { t: 'note', kind: 'tip', html: '<p>La sustentación incluye preguntas individuales: cada integrante debe poder explicar cualquier parte del código. Si usaste IA, tienes que entender y poder defender cada línea.</p>' }
    ]
  });

  /* ===== Rúbrica ===== */
  var HIT = [
    ['H1 · Propuesta y estructura', 10, ['Especificación (objetivo, entradas, salidas, reglas)', 'HTML semántico y accesible', 'Repositorio y commits', 'Viabilidad del endpoint']],
    ['H2 · Interfaz responsive', 20, ['Diseño visual y consistencia', 'Responsive (360 / 768 / 1280)', 'Formulario con validación', 'Organización del CSS']],
    ['H3 · Datos e interactividad', 25, ['Consumo de la API', 'Estados de carga, vacío y error', 'Manipulación del DOM y eventos', 'Calidad del JavaScript']],
    ['H4 · Calidad y despliegue', 25, ['TypeScript estricto', 'Persistencia local', 'CI/CD y URL pública', 'Auditoría de IA documentada']],
    ['H5 · Sustentación', 20, ['Demostración clara', 'Dominio técnico individual', 'Trabajo en equipo (historial de Git)', 'Comunicación oral y escrita']]
  ];
  C.add({
    id: 'p2',
    lead: 'Cada hito se califica con cuatro criterios en una escala de 0 a 5. Usa la calculadora para anticipar tu nota o para que el equipo se autoevalúe antes de entregar.',
    blocks: [
      { t: 'h', text: 'Niveles de desempeño', min: 10 },
      { t: 'table', head: ['Nota', 'Nivel', 'Descripción'], rows: [['5.0', 'Sobresaliente', 'Cumple y supera lo pedido; el equipo puede explicar y justificar cada decisión'], ['4.0', 'Alto', 'Cumple todo lo pedido con detalles menores por mejorar'], ['3.0', 'Aceptable', 'Cumple lo esencial; faltan casos borde o calidad'], ['2.0', 'Bajo', 'Cumple parcialmente; errores que afectan el uso'], ['0 – 1', 'Insuficiente', 'No entrega o no funciona']] },
      { t: 'h', text: 'Calculadora de nota del proyecto', min: 20 },
      { t: 'custom', build: function (w, x, U) {
        var el = U.el, esc = U.esc, box = el('div', { class: 'play' }), key = 'rubrica', st = U.store.get(key, null) || { w: HIT.map(function (h) { return h[1]; }), s: HIT.map(function () { return [3, 3, 3, 3]; }) };
        box.appendChild(el('h4', null, 'Rúbrica por hitos'));
        box.appendChild(el('p', { class: 'hint' }, 'Los pesos son una propuesta; según el PIAA los define cada docente al inicio del curso. Puedes ajustarlos, deben sumar 100.'));
        var wrap = el('div'), tot = el('div', { class: 'note key' });
        function save() { U.store.set(key, st); }
        function draw() {
          wrap.innerHTML = ''; var sum = 0, grade = 0;
          HIT.forEach(function (h, i) {
            var avg = st.s[i].reduce(function (a, b) { return a + b; }, 0) / 4; sum += st.w[i]; grade += avg * st.w[i] / 100;
            var d = el('details', { class: 'panel', style: 'margin:6px 0' }); if (i === 0) d.open = true;
            d.appendChild(el('summary', null, '<b>' + esc(h[0]) + '</b> · peso ' + st.w[i] + ' % · nota <b>' + avg.toFixed(2) + '</b>'));
            var wl = el('label', { class: 'hint', style: 'display:block;margin:6px 0' }, 'Peso (%) '), wi = el('input', { type: 'number', min: 0, max: 100, value: st.w[i], style: 'width:70px', 'aria-label': 'Peso del hito' });
            wi.onchange = function () { st.w[i] = Math.max(0, Math.min(100, +wi.value || 0)); save(); draw(); }; wl.appendChild(wi); d.appendChild(wl);
            h[2].forEach(function (c, j) {
              var l = el('label', { style: 'display:flex;gap:10px;align-items:center;margin:4px 0;flex-wrap:wrap' }, '<span style="flex:1 1 220px">' + esc(c) + '</span>'), o = el('output', null, st.s[i][j].toFixed(1)), r = el('input', { type: 'range', min: 0, max: 5, step: 0.5, 'aria-label': c });
              r.value = st.s[i][j]; r.oninput = function () { st.s[i][j] = +r.value; o.textContent = (+r.value).toFixed(1); save(); recalc(); }; l.appendChild(r); l.appendChild(o); d.appendChild(l);
            });
            wrap.appendChild(d);
          });
          recalc();
        }
        function recalc() {
          var sum = 0, grade = 0; HIT.forEach(function (h, i) { sum += st.w[i]; grade += st.s[i].reduce(function (a, b) { return a + b; }, 0) / 4 * st.w[i] / 100; });
          tot.innerHTML = '<b class="nt">Nota estimada del proyecto</b><span style="font:700 32px Newsreader,serif">' + grade.toFixed(2) + '</span> / 5.0 ' + (sum !== 100 ? '<span class="pill bad">Los pesos suman ' + sum + ' %, deben sumar 100</span>' : (grade >= 3 ? '<span class="pill ok">Aprobado</span>' : '<span class="pill bad">Por debajo de 3.0</span>'));
          U.$$('details summary', wrap).forEach(function (s, i) { var avg = st.s[i].reduce(function (a, b) { return a + b; }, 0) / 4; s.innerHTML = '<b>' + esc(HIT[i][0]) + '</b> · peso ' + st.w[i] + ' % · nota <b>' + avg.toFixed(2) + '</b>'; });
        }
        var rs = el('button', { class: 'btn' }, 'Restablecer'); rs.onclick = function () { st = { w: HIT.map(function (h) { return h[1]; }), s: HIT.map(function () { return [3, 3, 3, 3]; }) }; save(); draw(); };
        box.appendChild(wrap); box.appendChild(tot); box.appendChild(rs); w.appendChild(box); draw();
      } },
      { t: 'h', text: 'Qué se espera en cada hito', min: 20 },
      { t: 'table', head: ['Hito', 'Evidencia que revisa el docente'], rows: [
        ['H1', 'Documento de especificación, enlace al repositorio, primer commit y pantallas en HTML sin estilos'],
        ['H2', 'Despliegue de la maqueta, prueba en tres anchos, formulario validado, CSS organizado y sin repeticiones'],
        ['H3', 'Aplicación que busca y muestra datos reales; se simula un fallo de red para comprobar el manejo de errores'],
        ['H4', 'Repositorio con CI en verde, TypeScript sin errores ni any, datos que persisten tras recargar, URL pública y registro de la auditoría de IA'],
        ['H5', 'Demostración en vivo, preguntas individuales y revisión del historial de Git para verificar la contribución de cada integrante']] },
      { t: 'note', kind: 'key', html: '<p><b>Contribución individual:</b> la nota del equipo puede ajustarse por persona según el historial de commits, pull requests revisados y las respuestas en la sustentación. El objetivo es premiar el trabajo real, no la presencia.</p>' }
    ]
  });

  /* ===== Quiz y parciales ===== */
  var POOL = [
    ['Arquitectura', '¿Qué parte del modelo cliente-servidor dibuja la interfaz?', ['El servidor', 'El navegador', 'La base de datos'], 1, 'El navegador interpreta HTML, CSS y JS.'],
    ['Arquitectura', '¿Qué código HTTP indica que el recurso no existe?', ['200', '404', '500'], 1, '404 Not Found.'],
    ['HTML', '¿Qué etiqueta es autocontenida?', ['<p>', '<img>', '<div>'], 1, 'img no encierra contenido.'],
    ['HTML', '¿Cuántos <h1> debe tener una página?', ['Uno', 'Tres', 'Ninguno'], 0, 'El tema central.'],
    ['HTML', '¿Para qué sirve <meta charset="UTF-8">?', ['Para acelerar la carga', 'Para mostrar bien tildes y ñ', 'Para enlazar CSS'], 1, 'Define el mapa de caracteres.'],
    ['HTML', '¿Qué diferencia a un div de un span?', ['El div es de bloque y el span en línea', 'Ninguna', 'El span es de bloque'], 0, 'Bloque frente a en línea.'],
    ['CSS', '¿Qué selector tiene mayor especificidad?', ['.caja', '#caja', 'div'], 1, 'El ID pesa más.'],
    ['CSS', 'Con box-sizing: border-box, width: 300px significa…', ['Solo el contenido mide 300', 'La caja completa mide 300', 'Se ignora el padding'], 1, 'Incluye padding y borde.'],
    ['CSS', '¿Qué propiedad alinea elementos en el eje principal de Flexbox?', ['align-items', 'justify-content', 'gap'], 1, 'justify-content.'],
    ['CSS', 'Margen inferior 30px y superior 20px entre dos bloques dan…', ['50px', '30px', '20px'], 1, 'Colapsan al mayor.'],
    ['Responsive', '¿Qué hace la etiqueta viewport?', ['Ajusta el ancho al dispositivo', 'Cambia la fuente', 'Carga imágenes'], 0, 'Base del diseño móvil.'],
    ['Responsive', 'En Mobile-First las media queries usan…', ['min-width', 'max-width', 'height'], 0, 'Se agregan mejoras al crecer.'],
    ['Responsive', 'En Tailwind, md:flex significa…', ['flex siempre', 'flex desde 768 px', 'flex hasta 768 px'], 1, 'Prefijos mobile-first.'],
    ['JavaScript', '¿Qué es un closure?', ['Una función con acceso a las variables de su entorno de creación', 'Un bucle', 'Una clase'], 0, 'Recuerda su ámbito.'],
    ['JavaScript', '¿Qué devuelve querySelectorAll?', ['Un elemento', 'Una NodeList', 'Un texto'], 1, 'Una lista de nodos.'],
    ['JavaScript', '¿Por qué evitar innerHTML con datos externos?', ['Es lento', 'Permite inyección de código (XSS)', 'No existe'], 1, 'Usa textContent.'],
    ['Asincronismo', '¿Qué se ejecuta primero con la pila vacía?', ['Una macrotarea', 'Las microtareas', 'Un setTimeout 0'], 1, 'Las promesas van antes.'],
    ['Asincronismo', '¿Qué hace await?', ['Bloquea el navegador', 'Pausa solo la función async', 'Cancela la promesa'], 1, 'No bloquea el programa.'],
    ['Asincronismo', 'Si el servidor responde 404, fetch…', ['Rechaza siempre', 'Cumple la promesa y response.ok es false', 'Lanza un alert'], 1, 'Comprueba response.ok.'],
    ['TypeScript', '¿Qué se ejecuta en el navegador?', ['TypeScript', 'El JavaScript compilado', 'Los tipos'], 1, 'Los tipos se borran al compilar.'],
    ['TypeScript', '¿Qué describe una interface?', ['La forma de un objeto', 'Un estilo', 'Una ruta'], 0, 'Propiedades y tipos.'],
    ['Persistencia', '¿Qué tipo de dato guarda localStorage?', ['Solo texto', 'Objetos', 'Archivos'], 0, 'Por eso JSON.stringify.'],
    ['Despliegue', '¿Qué hace la CI si fallan las pruebas?', ['Despliega igual', 'Detiene el flujo', 'Borra el repositorio'], 1, 'Protege producción.'],
    ['Git', '¿Qué hace git commit?', ['Sube a GitHub', 'Guarda una instantánea con mensaje', 'Fusiona ramas'], 1, 'Subir es push.'],
    ['IA', 'Antes de usar código generado por IA debes…', ['Pegarlo sin leer', 'Entenderlo y auditarlo', 'Quitarle los comentarios'], 1, 'Tú eres el responsable.']
  ];
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  C.add({
    id: 'q',
    lead: 'Evalúate antes de presentar. El simulacro elige preguntas al azar de todo el curso; los parciales y quices oficiales los define el docente.',
    blocks: [
      { t: 'h', text: 'Simulacro de examen', min: 25 },
      { t: 'custom', build: function (w, x, U) {
        var el = U.el, box = el('div', { class: 'play' }), n = 10, wrap = el('div'), mods = {};
        POOL.forEach(function (p) { mods[p[0]] = true; });
        box.appendChild(el('h4', null, 'Genera un cuestionario'));
        var seg = el('div', { class: 'ctl' }), sel = el('select', { 'aria-label': 'Número de preguntas' }); [5, 10, 15, 25].forEach(function (k) { sel.appendChild(el('option', { value: k }, k + ' preguntas')); }); sel.value = 10; sel.onchange = function () { n = +sel.value; };
        var tp = el('select', { 'aria-label': 'Tema' }); tp.appendChild(el('option', { value: '' }, 'Todos los temas')); Object.keys(mods).forEach(function (m) { tp.appendChild(el('option', { value: m }, m)); });
        var go = el('button', { class: 'btn pri' }, 'Generar'); seg.appendChild(sel); seg.appendChild(tp); seg.appendChild(go); box.appendChild(seg);
        function make() {
          var pool = POOL.filter(function (p) { return !tp.value || p[0] === tp.value; }), pick = shuffle(pool).slice(0, n);
          wrap.innerHTML = ''; wrap.appendChild(C.blocks.quiz({ qs: pick.map(function (p) { return [p[1], p[2], p[3], '(' + p[0] + ') ' + p[4]]; }) }, { lid: 'q', n: 'sim' }));
        }
        go.onclick = make; box.appendChild(wrap); w.appendChild(box); make();
      } },
      { t: 'h', text: 'Propuesta de evaluación del curso', min: 15 },
      { t: 'table', head: ['Componente', 'Porcentaje sugerido', 'Cuándo'], rows: [
        ['Primer examen · HTML5 estructural', '10 %', 'Semana 7'],
        ['Examen final integrador', '15 %', 'Semana 12'],
        ['Quices (1, 2 y 3) y participación', '10 %', 'Semanas 4, 6 y 9'],
        ['Talleres (1.1, integrador M2, 3.1, 4.1, 5.1)', '25 %', 'Una nota por taller'],
        ['Proyecto integrador (hitos y sustentación)', '35 %', 'Semanas 8 a 12']] },
      { t: 'note', kind: 'tip', html: '<p>Según el PIAA, los porcentajes definitivos se acuerdan al inicio del curso. La tabla es una propuesta equilibrada: la mayor parte de la nota premia el hacer (talleres y proyecto) y no un único examen.</p>' },
      { t: 'h', text: 'Guía de estudio por examen', min: 15 },
      { t: 'cards', items: [
        { h: 'Primer examen (semana 7)', html: '<ul><li>Cliente-servidor y HTTP</li><li>Estructura documental, texto, listas, imágenes y enlaces</li><li>Detección de errores de sintaxis</li><li>Prueba práctica: ficha informativa en HTML5</li></ul>' },
        { h: 'Examen final (semana 12)', html: '<ul><li>Selectores, box model, Flexbox y Mobile-First</li><li>Validación de formularios</li><li>Scope, closures, DOM y eventos</li><li>Event Loop, promesas, async/await, fetch</li><li>Prueba práctica: consumir un endpoint y mostrar estados</li></ul>' }] }
    ]
  });
})();
