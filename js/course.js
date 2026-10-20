/* Estructura del curso y estado de avance. Para marcar "estamos aquí" cambia `cur` y agrega ids a `done`. */
window.Course = {
  title: 'Programación para Entornos Web 1',
  code: '334G8F',
  cur: '1.2b',
  /* Última lección habilitada para los estudiantes. Las siguientes muestran "se habilita cuando lleguemos a este tema". Cambia este id para abrir más contenido (o pon null para abrir todo). */
  openUntil: '3.t',
  done: ['0.1', '0.2a', '0.2b', '0.2c', '0.2t', '1.1a', '1.1b', '1.2a'],
  modules: [
    { id: 'pia', name: 'Programa del curso', topics: [
      { name: '', lessons: [['pia', 'Programa institucional (PIAA)', 'doc']] }] },
    { id: 'm0', name: 'Módulo 0 · Nivelación e integración de fundamentos', topics: [
      { name: 'Tema 0.1 · Preparación del entorno de trabajo', lessons: [['0.1', 'Guía de instalación: NetBeans, VS Code, MySQL Workbench y Git', 'tema']] },
      { name: 'Tema 0.2 · Repaso integrado (Prog I, Prog II, BD I)', lessons: [
        ['0.2a', 'Prog I: lógica algorítmica y control de flujo en Java Maven', 'tema'],
        ['0.2b', 'Prog II: programación orientada a objetos y herencia', 'tema'],
        ['0.2c', 'BD I: modelo relacional, SQL DDL/DML e INNER JOIN', 'tema'],
        ['0.2t', 'Taller de nivelación: de la BD a la lógica', 'taller']] }] },
    { id: 'm1', name: 'Módulo 1 · Introducción al desarrollo web y HTML5', topics: [
      { name: 'Tema 1.1 · Arquitectura web y fundamentos de HTML5', lessons: [
        ['1.1a', 'Modelo cliente-servidor y anatomía de las etiquetas', 'tema'],
        ['1.1b', 'Estructura básica documental (DOCTYPE, head, body)', 'tema']] },
      { name: 'Tema 1.2 · Etiquetas esenciales y semántica', lessons: [
        ['1.2a', 'Estructura de texto, enlaces, listas e imágenes', 'tema'],
        ['1.2b', 'El contenedor genérico <div> y agrupamiento de contenido', 'tema'],
        ['1.2t', 'Taller 1.1: primera estructura web semántica', 'taller']] }] },
    { id: 'm2', name: 'Módulo 2 · Ingeniería de interfaces, CSS3 y maquetación', topics: [
      { name: 'Tema 2.1 · Fundamentos de CSS3 y selectores', lessons: [
        ['2.1a', 'Sintaxis CSS, enlazado externo y reglas de estilo', 'tema'],
        ['2.1b', 'Clases (.) vs. ID (#): diferencias y usos', 'tema']] },
      { name: 'Tema 2.2 · Diagramación y layout moderno', lessons: [
        ['2.2a', 'El modelo de caja (Box Model)', 'tema'],
        ['2.2b', 'Maquetación flexible con CSS Flexbox', 'tema']] },
      { name: 'Integrador', lessons: [['2.t', 'Taller integrador: del registro SQL a la tarjeta web', 'taller']] }] },
    { id: 'm3', name: 'Módulo 3 · Responsive design y frameworks de utilidad', topics: [
      { name: 'Tema 3.1 · Adaptabilidad y Mobile-First', lessons: [
        ['3.1a', 'Metatag viewport y principios Mobile-First', 'tema'],
        ['3.1b', 'Componentes e integración de Tailwind CSS', 'tema'],
        ['3.t', 'Taller 3.1: formulario de registro con validaciones', 'taller']] }] },
    { id: 'm4', name: 'Módulo 4 · JavaScript y asincronismo', topics: [
      { name: 'Tema 4.1 · Fundamentos de JavaScript (ES6+)', lessons: [
        ['4.1a', 'Contextos de ejecución, scope y funciones', 'tema'],
        ['4.1b', 'Lógica estructural y manipulación del DOM', 'tema']] },
      { name: 'Tema 4.2 · Asincronismo y consumo de APIs REST', lessons: [
        ['4.2a', 'Concurrencia, Event Loop, promesas y async/await', 'tema'],
        ['4.2b', 'Consumo de endpoints con Fetch API', 'tema'],
        ['4.t', 'Taller 4.1: consumo dinámico de datos REST', 'taller']] }] },
    { id: 'm5', name: 'Módulo 5 · TypeScript, persistencia local y despliegue', topics: [
      { name: 'Tema 5.1 · Tipado estático y seguridad', lessons: [['5.1', 'Transición hacia TypeScript: tipos, interfaces y contratos', 'tema']] },
      { name: 'Tema 5.2 · Persistencia y servidores serverless', lessons: [
        ['5.2a', 'Almacenamiento local: LocalStorage e IndexedDB', 'tema'],
        ['5.2b', 'Flujos CI/CD y despliegue en Vercel / AWS', 'tema'],
        ['5.t', 'Taller 5.1: auditoría de código asistida por IA y despliegue', 'taller']] }] },
    { id: 'cierre', name: 'Cierre del curso', topics: [
      { name: 'Proyecto integrador', lessons: [
        ['p1', 'Guía general y requerimientos del proyecto', 'proy'],
        ['p2', 'Rúbrica y criterios de evaluación por hitos', 'proy']] },
      { name: 'Evaluación', lessons: [['q', 'Quiz y evaluaciones de parciales', 'eval']] }] }
  ],
  /* Propuesta de distribución: 12 semanas de 4 horas presenciales (PIAA: 48 h presenciales). */
  weeks: [
    ['Semana 1', 'Módulo 0 · entorno y Git', ['0.1']],
    ['Semana 2', 'Módulo 0 · repaso y taller de nivelación', ['0.2a', '0.2b', '0.2c', '0.2t']],
    ['Semana 3', 'HTML5 · cliente-servidor y estructura', ['1.1a', '1.1b']],
    ['Semana 4', 'HTML5 · etiquetas, div y Taller 1.1', ['1.2a', '1.2b', '1.2t']],
    ['Semana 5', 'CSS3 · sintaxis y selectores', ['2.1a', '2.1b']],
    ['Semana 6', 'CSS3 · box model, Flexbox y taller', ['2.2a', '2.2b', '2.t']],
    ['Semana 7', 'Responsive y Tailwind, taller de formularios', ['3.1a', '3.1b', '3.t']],
    ['Semana 8', 'JavaScript · scope y DOM', ['4.1a', '4.1b']],
    ['Semana 9', 'JavaScript · asincronismo y APIs REST', ['4.2a', '4.2b', '4.t']],
    ['Semana 10', 'TypeScript y persistencia local', ['5.1', '5.2a']],
    ['Semana 11', 'CI/CD, despliegue y auditoría con IA', ['5.2b', '5.t']],
    ['Semana 12', 'Proyecto integrador y evaluación', ['p1', 'p2', 'q']]
  ],
  lessons: {},
  add: function (l) { this.lessons[l.id] = l; },
  order: function () { var o = []; this.modules.forEach(function (m) { m.topics.forEach(function (t) { t.lessons.forEach(function (l) { o.push(l[0]); }); }); }); return o; },
  meta: function (id) { var r; this.modules.forEach(function (m) { m.topics.forEach(function (t) { t.lessons.forEach(function (l) { if (l[0] === id) r = { id: l[0], title: l[1], kind: l[2], mod: m.name, topic: t.name }; }); }); }); return r; }
};
