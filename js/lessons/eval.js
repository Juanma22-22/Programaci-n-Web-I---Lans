/* Evaluaciones: quices por módulo, Primer examen y Examen final */
(function () {
  var C = Course;
  var ESC = '<p>Escala <b>0.0 a 5.0</b>. Aprueba con <b>3.0</b>. Los quices de esta página se corrigen solos y sirven de práctica; la nota oficial la registra el docente.</p>';

  C.add({
    id: 'z1',
    lead: 'Quiz corto de cierre del Módulo 1: arquitectura web y HTML5. Diez minutos, sin apuntes.',
    blocks: [
      { t: 'note', kind: 'key', html: ESC },
      { t: 'h', text: 'Quiz 1 · Arquitectura y HTML5', min: 10 },
      { t: 'quiz', qs: [
        ['¿Qué ocurre justo después de que el navegador resuelve el DNS de una URL?', ['Muestra la página', 'Abre una conexión con el servidor y envía una petición HTTP', 'Descarga el CSS'], 1, 'Resolver el DNS solo entrega la IP; luego viene la petición.'],
        ['¿Por qué HTML no es un lenguaje de programación?', ['Porque es muy simple', 'Porque describe estructura y no tiene lógica (variables, condicionales, bucles)', 'Porque no se ve en el navegador'], 1, 'Es un lenguaje de marcado.'],
        ['¿Cuál es el primer elemento de un documento HTML5 válido?', ['<html>', '<!DOCTYPE html>', '<head>'], 1, 'Activa el modo estándar.'],
        ['¿Dónde se coloca el <title>?', ['En el body', 'En el head', 'Antes del DOCTYPE'], 1, 'Es metadato del documento.'],
        ['¿Cuál es correcto para una imagen accesible?', ['<img src="a.png">', '<img src="a.png" alt="Equipo en el laboratorio">', '<img alt src="a.png" />'], 1, 'El alt describe la imagen.'],
        ['¿Qué lista usas para los pasos de una receta?', ['<ul>', '<ol>', '<dl>'], 1, 'El orden importa: ol.'],
        ['¿Qué atributo abre un enlace en una pestaña nueva?', ['target="blank"', 'target="_blank"', 'new="true"'], 1, 'Lleva guion bajo.'],
        ['¿Cuál anidación es correcta?', ['<p><strong>texto</p></strong>', '<p><strong>texto</strong></p>', '<strong><p>texto</strong></p>'], 1, 'Se cierra primero lo último que se abrió.']
      ] }
    ]
  });

  C.add({
    id: 'z2',
    lead: 'Quiz corto de cierre del Módulo 2: selectores, caja y Flexbox.',
    blocks: [
      { t: 'note', kind: 'key', html: ESC },
      { t: 'h', text: 'Quiz 2 · CSS3 y maquetación', min: 10 },
      { t: 'quiz', qs: [
        ['¿Qué selector pesa más?', ['.tarjeta', '#tarjeta', 'article'], 1, 'ID > clase > etiqueta.'],
        ['¿Cuál enlaza una hoja de estilos externa?', ['<style src="a.css">', '<link rel="stylesheet" href="a.css">', '<css href="a.css">'], 1, 'Va en el head.'],
        ['Con box-sizing: border-box y width: 200px, el padding de 20px…', ['Agrega 40px al ancho total', 'Queda dentro de los 200px', 'Se ignora'], 1, 'La caja total mide 200px.'],
        ['¿Qué hace display:flex en el contenedor?', ['Oculta los hijos', 'Pone los hijos en una fila flexible', 'Los centra en vertical siempre'], 1, 'Eje principal en fila por defecto.'],
        ['¿Qué alinea justify-content?', ['El eje principal', 'El eje transversal', 'El texto'], 0, 'align-items trabaja el transversal.'],
        ['¿Cómo permites que los hijos pasen a otra línea?', ['flex-wrap: wrap', 'overflow: wrap', 'display: wrap'], 0, 'Por defecto es nowrap.'],
        ['Una regla que sobrescribe con !important…', ['Es buena práctica', 'Rompe la cascada y conviene evitarla', 'No funciona'], 1, 'Mejor subir la especificidad con criterio.'],
        ['¿Cuál es el orden de la caja desde adentro?', ['content, padding, border, margin', 'content, margin, border, padding', 'padding, content, margin, border'], 0, 'Contenido, relleno, borde, margen.']
      ] }
    ]
  });

  C.add({
    id: 'e1',
    lead: 'Primer examen teórico-práctico: HTML5 estructural (todo lo visto antes del contenedor div). Esta página reúne las reglas; el enunciado oficial lo entrega el docente.',
    blocks: [
      { t: 'note', kind: 'mision', html: '<p>Evaluación individual de <b>45 minutos</b>: parte escrita (20 min) y parte en computador (25 min). Calificación <b>0.0 a 5.0</b>.</p>' },
      { t: 'h', text: 'Estructura y puntaje', min: 10 },
      { t: 'table', head: ['Parte', 'Contenido', 'Puntos'], rows: [
        ['1 · Teórica (a mano)', 'Cliente-servidor y HTML como lenguaje de marcado (0.6) · ul/ol y atributo alt (0.6) · detección de 4 errores en un fragmento (0.8)', '2.0'],
        ['2 · Práctica (VS Code)', 'Ficha informativa: estructura base (0.5) · jerarquía y texto (0.8) · listas (0.7) · imagen y enlace (1.0)', '3.0']] },
      { t: 'h', text: 'Qué debes dominar', min: 10 },
      { t: 'check', title: 'Lista de repaso', items: ['Narrar el recorrido de una petición: URL, DNS, HTTP, respuesta, renderizado', 'Explicar qué es un lenguaje de marcado y su función en el navegador', 'DOCTYPE, html lang, head (charset, viewport, title) y body', 'Un solo h1, h2 para secciones, p, strong y em con intención', 'ul frente a ol, y listas bien anidadas', 'img con alt, y a con href y target="_blank"', 'Reconocer etiquetas sin cerrar, comillas faltantes y anidación cruzada'] },
      { t: 'h', text: 'Entrega', min: 5 },
      { t: 'steps', items: [
        { h: 'Nombra el archivo', html: '<p><code>parcial1_apellido_nombre.html</code></p>' },
        { h: 'Valida', html: '<p>Previsualiza con Live Server y revisa la jerarquía de títulos.</p>' },
        { h: 'Envía', html: '<p>Por el medio y en la ventana de tiempo que indique el docente (correo institucional).</p>' }] },
      { t: 'note', kind: 'warn', html: '<p>Se califica lo que está en el archivo entregado. Si el archivo no abre, la parte práctica no se puede evaluar.</p>' }
    ]
  });

  C.add({
    id: 'z4',
    lead: 'Quiz corto de cierre del Módulo 4: JavaScript, DOM y asincronismo.',
    blocks: [
      { t: 'note', kind: 'key', html: ESC },
      { t: 'h', text: 'Quiz 3 · JavaScript y APIs', min: 12 },
      { t: 'quiz', qs: [
        ['¿Qué diferencia a let de var?', ['let tiene ámbito de bloque', 'let es global', 'No hay diferencia'], 0, 'var es de función.'],
        ['¿Qué imprime? for (var i=0;i<3;i++) setTimeout(()=>console.log(i)); ', ['0 1 2', '3 3 3', '2 2 2'], 1, 'var comparte una única i que vale 3 al terminar.'],
        ['¿Qué devuelve document.querySelector si no halla nada?', ['undefined', 'null', 'Una lista vacía'], 1, 'Devuelve null.'],
        ['¿Qué método añade un manejador de eventos recomendado?', ['onclick en el HTML', 'addEventListener', 'attachClick'], 1, 'Separa estructura y comportamiento.'],
        ['¿Qué ocurre primero?', ['setTimeout(fn,0)', 'Promise.resolve().then(fn)', 'Ambos a la vez'], 1, 'Las microtareas preceden a las macrotareas.'],
        ['await solo puede usarse…', ['Dentro de una función async (o módulo)', 'En cualquier función', 'Solo con setTimeout'], 0, 'Pausa la función async.'],
        ['fetch responde 500. ¿Qué hay que hacer?', ['Nada, la promesa se rechaza', 'Revisar response.ok y manejar el error', 'Reintentar siempre'], 1, 'fetch solo rechaza ante fallos de red.'],
        ['Para pintar texto que viene de una API sin riesgo de XSS usa…', ['innerHTML', 'textContent', 'outerHTML'], 1, 'textContent no interpreta etiquetas.']
      ] }
    ]
  });

  C.add({
    id: 'e2',
    lead: 'Examen final integrador (Módulos 1 a 5). Teórico-práctico, individual, con consumo de un endpoint y persistencia local.',
    blocks: [
      { t: 'note', kind: 'mision', html: '<p>Duración sugerida: <b>90 minutos</b>. Calificación <b>0.0 a 5.0</b>. Se presenta en la semana 12, junto a la sustentación del proyecto.</p>' },
      { t: 'h', text: 'Estructura y puntaje', min: 10 },
      { t: 'table', head: ['Parte', 'Contenido', 'Puntos'], rows: [
        ['1 · Teórica', 'Selección múltiple y análisis de código: Event Loop, scope, fetch, tipos, Git (se corrige con el quiz de autoevaluación de abajo como modelo)', '1.5'],
        ['2 · Práctica', 'Aplicación de una sola página: consumir un endpoint, mostrar estados de carga/vacío/error, filtrar y guardar favoritos en localStorage', '2.5'],
        ['3 · Calidad', 'Tipos TypeScript mínimos, código legible, commits con sentido y despliegue o ejecución sin errores', '1.0']] },
      { t: 'h', text: 'Criterios de la parte práctica', min: 10 },
      { t: 'table', head: ['Criterio', 'Cumple pleno (5)', 'Parcial (3)', 'No cumple (0-1)'], rows: [
        ['Consumo de la API', 'Usa async/await, valida response.ok, mapea los datos', 'Funciona sin validar errores', 'No muestra datos'],
        ['Estados de la interfaz', 'Carga, vacío y error visibles', 'Solo algunos', 'Ninguno'],
        ['Persistencia', 'Favoritos sobreviven a recargar', 'Guarda pero no restaura', 'No persiste'],
        ['Responsive y HTML semántico', 'Probado a 360 y 1280 px', 'Solo escritorio', 'Se desborda']] },
      { t: 'h', text: 'Autoevaluación (modelo de la parte teórica)', min: 15 },
      { t: 'quiz', qs: [
        ['¿Cuál es el orden de ejecución? console.log(1); setTimeout(()=>console.log(2)); Promise.resolve().then(()=>console.log(3)); console.log(4);', ['1 2 3 4', '1 4 3 2', '1 3 4 2'], 1, 'Sincrónico, luego microtareas, luego macrotareas.'],
        ['Una función interna que recuerda variables de la externa es…', ['Un callback', 'Un closure', 'Un módulo'], 1, 'Closure.'],
        ['¿Cómo guardas un arreglo en localStorage?', ['setItem(k, arr)', 'setItem(k, JSON.stringify(arr))', 'push(k, arr)'], 1, 'Solo guarda texto.'],
        ['En TypeScript, ¿qué detecta el compilador?', ['Errores de tipos antes de ejecutar', 'Errores de red', 'Errores de CSS'], 0, 'Los tipos se verifican al compilar.'],
        ['¿Qué comando guarda cambios con un mensaje en el historial?', ['git push', 'git commit -m', 'git clone'], 1, 'commit crea la instantánea.'],
        ['¿Qué es un pull request?', ['Descargar el repositorio', 'Solicitud de integrar una rama tras revisión', 'Un tipo de rama'], 1, 'Es el mecanismo de revisión.'],
        ['Una pipeline de CI falla en pruebas. ¿Qué haces?', ['Despliegas igual', 'Corriges y vuelves a subir', 'Desactivas la CI'], 1, 'La CI protege producción.'],
        ['¿Cuál es una buena práctica con código generado por IA?', ['Pegarlo sin leer', 'Entenderlo, auditarlo y probarlo', 'Eliminar las pruebas'], 1, 'El responsable eres tú.']
      ] }
    ]
  });
})();
