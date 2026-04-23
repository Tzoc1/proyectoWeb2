╔════════════════════════════════════════════════════════════════════════════╗
║           DOCUMENTACIÓN - PROYECTO POKÉDEX MEJORADO                        ║
║                     Semestre 4 - Programación Web                          ║
╚════════════════════════════════════════════════════════════════════════════╝

📁 UBICACIÓN DEL PROYECTO:
/Desarrollo web/Parcial 2/Proyecto/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. INDEX (PÁGINA DE LOGIN)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 Archivo: index.html / index.js

✨ MEJORA REALIZADA:
   - El botón SUBMIT ahora redirige automáticamente a catalogo.html
   - Se guarda el usuario y contraseña en localStorage
   - Se muestra el nombre de usuario en la topbar

🔧 CÓMO FUNCIONA:
   - Cuando el usuario completa el formulario y da submit, se ejecuta la
     función usuario() que:
     1. Guarda credenciales en localStorage
     2. Actualiza la topbar con el nombre de usuario
     3. Redirige a catalogo.html con window.location.href

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. CATÁLOGO (POKEDEX)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 Archivos: catalogo.html / catalogo.js / styles.css

✨ MEJORAS REALIZADAS:

  a) COLORES POR TIPO DE POKÉMON
     - Se agregaron 18 clases CSS (.type-normal, .type-fire, etc.)
     - Cada tipo tiene su color oficial (ej: fuego = naranja, agua = azul)
     - Los colores se aplican automáticamente en los spans de tipo

  b) FILTROS DE TIPO Y GENERACIÓN
     - Select superior para filtrar por tipo (18 opciones)
     - Select para filtrar por generación (Gen I - IX)
     - Funcionan de forma independiente o combinada
     - Interfaz limpia y responsiva

  c) INFORMACIÓN DE GENERACIÓN EN MODAL
     - Se muestra la generación a la que pertenece cada pokémon
     - Formato: "Gen I", "Gen II", etc.
     - Se obtiene de la API de especies de Pokémon

  d) BARRAS DE PROGRESO PARA STATS
     - En el modal, cada stat muestra una barra de progreso visual
     - Los colores varían según el valor (rojo: bajo, verde: alto)
     - El número del stat aparece al lado de la barra
     - Rango de colores:
       * Rojo (< 50)
       * Naranja (50-75)
       * Amarillo (75-100)
       * Verde Claro (100-125)
       * Verde Oscuro (125+)

🔧 CÓMO FUNCIONA:
   - Los pokémons se cargan con scroll infinito (25 a la vez)
   - Al seleccionar filtros, se realiza una consulta a la API de Pokémon
   - Filtro por tipo: busca en https://pokeapi.co/api/v2/type/{tipo}
   - Filtro por generación: busca en https://pokeapi.co/api/v2/generation/{gen}
   - Los filtros se pueden combinar
   - El modal muestra información completa incluyendo evoluciones

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. EQUIPO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 Archivos: equipo.html / equipo.js / styles.css

✨ MEJORAS REALIZADAS:

  a) SLOTS VISIBLES
     - Se muestran 6 slots de equipo en todo momento (incluso vacíos)
     - Cada slot muestra una imagen grande del pokémon
     - Se puede ver el nickname si se asignó uno
     - Los slots vacíos muestran "Slot X - Vacío"
     - Contador visual: "X/6" pokémons en equipo

  b) BÚSQUEDA ESTILO BUSQUEDA.JS
     - Búsqueda en tiempo real al escribir el nombre del pokémon
     - Muestra una card grande del resultado
     - Incluye nombre, número, tipos con colores
     - Botón "Añadir a Equipo" que agrega el pokémon automáticamente
     - Se limpia la búsqueda después de agregar
     - Validaciones: máximo 6 pokémons, no duplicados

🔧 CÓMO FUNCIONA:
   - Los pokémons se guardan en localStorage con la clave 'pokemon_team'
   - Búsqueda: realiza una consulta individual a la API (más rápido)
   - Al agregar pokémon, se actualiza el localStorage
   - Se pueden asignar apodos (máximo 15 caracteres)
   - Los apodos se muestran debajo del nombre real en los slots
   - Funciona offline si los pokémons ya están guardados

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. MOVIMIENTOS (ITEMS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 Archivos: items.html / items.js / styles.css

✨ MEJORAS REALIZADAS:

  a) ESTRUCTURA TIPO CATÁLOGO
     - Grid de movimientos en cards (como catálogo)
     - Scroll infinito para cargar más movimientos
     - Búsqueda en tiempo real de movimientos
     - Cada card muestra: nombre, tipo, potencia, precisión

  b) MODAL COMPACTO
     - Modal más pequeño (no ocupa toda la pantalla)
     - Muestra: potencia, precisión, PP, categoría, descripción
     - Lista de pokémons que aprenden el movimiento (primeros 10)
     - Los pokémons se muestran en mini cards con imagen y nombre

🔧 CÓMO FUNCIONA:
   - Se obtienen movimientos de https://pokeapi.co/api/v2/move
   - Scroll infinito carga 20 movimientos por petición
   - Búsqueda filtra entre todos los movimientos disponibles
   - Para cada movimiento encontrado, se consulta el API para detalles
   - Se obtienen los pokémons que aprenden el movimiento
   - Las imágenes de pokémons se cargan bajo demanda en el modal

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. TOPBAR (NAVEGACIÓN)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 Archivos: topbar.js (actualizado en items.html)

✨ MEJORA REALIZADA:
   - Se agregó enlace a "Movimientos" en la topbar de items.html
   - El enlace navega a items.html desde cualquier página
   - La topbar es consistente en todas las páginas (roja, con logo)
   - Muestra el nombre del usuario logueado

🔧 CÓMO FUNCIONA:
   - Cada página HTML incluye el bloque topbar con los enlaces
   - El script topbar.js actualiza el nombre de usuario automáticamente
   - Los temas (light/dark) se aplican a toda la navegación

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. ESTILOS CSS (DARK MODE & LIGHT MODE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 Archivo: styles.css

✨ CARACTERÍSTICAS:
   - Variables CSS para light mode y dark mode
   - Cambio automático de colores con clase .darkmode
   - Todos los módulos responden a los cambios de tema
   - Colores consistentes en toda la aplicación

🔧 CÓMO FUNCIONA:
   - Botón de tema en topbar (sol/luna)
   - Click del botón agrega/quita la clase .darkmode a <html>
   - CSS usa variables para cambiar colores automáticamente
   - Incluye nuevos estilos para:
     * Barras de progreso de stats
     * Cards de búsqueda en equipo
     * Grid de movimientos
     * Filtros de catálogo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 RESUMEN DE ARCHIVOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HTML:
  ✓ index.html          - Página de login
  ✓ catalogo.html       - Pokedex con filtros
  ✓ equipo.html         - Gestor de equipo (6 pokémons)
  ✓ items.html          - Buscador de movimientos
  ✓ busqueda.html       - Búsqueda individual de pokémons
  (También hay referencias a estas páginas)

JavaScript:
  ✓ index.js            - Login y redirección
  ✓ catalogo.js         - Catálogo con scroll infinito y filtros
  ✓ equipo.js           - Gestión de equipo con localStorage
  ✓ items.js            - Catálogo de movimientos
  ✓ busqueda.js         - Búsqueda individual
  ✓ darkmode.js         - Cambio de tema
  ✓ topbar.js           - Actualización de usuario

CSS:
  ✓ styles.css          - Estilos unificados (light/dark mode)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔌 API UTILIZADA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PokéAPI (https://pokeapi.co/api/v2/)
  - /pokemon?limit=X&offset=Y      - Listar pokémons (scroll)
  - /pokemon/{id|name}             - Detalles de pokémon
  - /type/{type}                   - Pokémons por tipo
  - /generation/{gen}              - Pokémons por generación
  - /pokemon-species/{id|name}     - Información de especie
  - /evolution-chain/{id}          - Cadena de evoluciones
  - /move?limit=X&offset=Y         - Listar movimientos (scroll)
  - /move/{id|name}                - Detalles de movimiento

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 CARACTERÍSTICAS TÉCNICAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Scroll Infinito (Intersection Observer API)
✓ Búsqueda en Tiempo Real (Event Listeners)
✓ LocalStorage para persistencia de datos
✓ Async/Await para manejo de promesas
✓ Promise.all() para cargas paralelas
✓ CSS Grid y Flexbox para layouts responsivos
✓ Variables CSS para tema oscuro/claro
✓ Transiciones y animaciones suaves

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 CÓMO USAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Abrir index.html en un navegador
2. Completar cualquier usuario/contraseña (se valida automáticamente)
3. Hacer click en "Submit" para ir a Catálogo
4. Navegar entre:
   - Pokedex: Ver pokémons con filtros por tipo y generación
   - Equipo: Crear tu equipo de 6 pokémons con apodos
   - Búsqueda: Buscar pokémons individuales
   - Movimientos: Ver detalles de movimientos y qué pokémons los aprenden
5. Cambiar tema con el botón de sol/luna en la topbar

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 NOTAS IMPORTANTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Los datos del equipo se guardan en localStorage (persisten entre sesiones)
- La búsqueda es en tiempo real sin necesidad de apretar botones
- Los filtros del catálogo funcionan con llamadas a API en tiempo real
- El scroll infinito evita cargar todos los pokémons a la vez
- El modal de stats con barras de progreso facilita comparar pokémons
- Los colores de tipo se aplican automáticamente sin necesidad de mantenimiento

═══════════════════════════════════════════════════════════════════════════════
Fin de la documentación - Proyecto completamente funcional ✓
═══════════════════════════════════════════════════════════════════════════════
