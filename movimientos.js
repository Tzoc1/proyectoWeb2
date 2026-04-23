let offset = 0;
const limit = 20;
let loading = false;
const itemsContainer = document.getElementById('itemsContainer');

// Función para capitalizar
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Cargar movimientos con scroll infinito
async function loadMoves() {
  if (loading) return;
  loading = true;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/move?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    renderMoves(data.results);
    offset += limit;
  } catch (error) {
    console.error('Error cargando movimientos:', error);
  } finally {
    loading = false;
  }
}

// Renderizar movimientos
async function renderMoves(moves) {
  const promises = moves.map(move => fetch(move.url).then(res => res.json()));
  const results = await Promise.all(promises);

  results.forEach(moveData => {
    const card = document.createElement('div');
    card.classList.add('move-card');

    // Nombre
    const name = document.createElement('h3');
    name.textContent = capitalize(moveData.name);
    card.appendChild(name);

    // Tipo
    const typeSpan = document.createElement('span');
    typeSpan.textContent = capitalize(moveData.type.name);
    typeSpan.classList.add('Cspan', `type-${moveData.type.name.toLowerCase()}`);
    card.appendChild(typeSpan);

    // Info rápida
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('move-info');
    infoDiv.innerHTML = `
      <p><strong>Potencia:</strong> ${moveData.power || 'N/A'}</p>
      <p><strong>Precisión:</strong> ${moveData.accuracy || 'N/A'}%</p>
    `;
    card.appendChild(infoDiv);

    // Botón
    const btn = document.createElement('button');
    btn.textContent = 'Ver más';
    btn.addEventListener('click', () => showMoveModal(moveData));
    card.appendChild(btn);

    itemsContainer.appendChild(card);
    itemsContainer.appendChild(sentinel);
  });
}

// Modal más pequeño
async function showMoveModal(moveData) {
  const modal = document.getElementById('modalMove');
  const modalBody = document.getElementById('modalBodyMove');
  modalBody.innerHTML = '';

  // Título
  const title = document.createElement('h2');
  title.textContent = capitalize(moveData.name);
  modalBody.appendChild(title);

  // Tipo
  const typeContainer = document.createElement('div');
  const typeSpan = document.createElement('span');
  typeSpan.textContent = capitalize(moveData.type.name);
  typeSpan.classList.add('Cspan', `type-${moveData.type.name.toLowerCase()}`);
  typeContainer.appendChild(typeSpan);
  modalBody.appendChild(typeContainer);

  // Tabla de info
  const table = document.createElement('table');
  table.classList.add('teibol');
  const tbody = document.createElement('tbody');
  tbody.innerHTML = `
    <tr><td><strong>Potencia:</strong></td><td>${moveData.power || 'N/A'}</td></tr>
    <tr><td><strong>Precisión:</strong></td><td>${moveData.accuracy || 'N/A'}%</td></tr>
    <tr><td><strong>PP:</strong></td><td>${moveData.pp}</td></tr>
    <tr><td><strong>Categoría:</strong></td><td>${capitalize(moveData.damage_class.name)}</td></tr>
    <tr><td><strong>Descripción:</strong></td><td>${moveData.effect_entries.length > 0 ? moveData.effect_entries[0].effect : 'Sin descripción'}</td></tr>
  `;
  table.appendChild(tbody);
  modalBody.appendChild(table);

  // Pokémons (limitado)
  const pokeTitle = document.createElement('h3');
  pokeTitle.textContent = 'Pokémons que lo aprenden:';
  modalBody.appendChild(pokeTitle);

  const pokeList = document.createElement('div');
  pokeList.classList.add('pokemon-list-small');

  const learnedBy = moveData.learned_by_pokemon.slice(0, 10);
  for (const pokemon of learnedBy) {
    try {
      const pokeResponse = await fetch(pokemon.url);
      const pokeData = await pokeResponse.json();

      const pokeDiv = document.createElement('div');
      pokeDiv.classList.add('poke-item-small');

      const img = document.createElement('img');
      img.src = pokeData.sprites.front_default;
      img.alt = pokeData.name;
      pokeDiv.appendChild(img);

      const pName = document.createElement('p');
      pName.textContent = capitalize(pokeData.name);
      pokeDiv.appendChild(pName);

      pokeList.appendChild(pokeDiv);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  modalBody.appendChild(pokeList);

  modal.style.display = 'block';
}

// Búsqueda de movimientos
async function searchMoves(query) {
  itemsContainer.innerHTML = '';

  if (!query) {
    offset = 0;
    loadMoves();
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/move?limit=1000`);
    const data = await response.json();

    const filtered = data.results.filter(m =>
      m.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, limit);

    const promises = filtered.map(move => fetch(move.url).then(res => res.json()));
    const results = await Promise.all(promises);

    results.forEach(moveData => {
      const card = document.createElement('div');
      card.classList.add('move-card');

      const name = document.createElement('h3');
      name.textContent = capitalize(moveData.name);
      card.appendChild(name);

      const typeSpan = document.createElement('span');
      typeSpan.textContent = capitalize(moveData.type.name);
      typeSpan.classList.add('Cspan', `type-${moveData.type.name.toLowerCase()}`);
      card.appendChild(typeSpan);

      const infoDiv = document.createElement('div');
      infoDiv.classList.add('move-info');
      infoDiv.innerHTML = `
        <p><strong>Potencia:</strong> ${moveData.power || 'N/A'}</p>
        <p><strong>Precisión:</strong> ${moveData.accuracy || 'N/A'}%</p>
      `;
      card.appendChild(infoDiv);

      const btn = document.createElement('button');
      btn.textContent = 'Ver más';
      btn.addEventListener('click', () => showMoveModal(moveData));
      card.appendChild(btn);

      itemsContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error en búsqueda:', error);
  }
}

// Infinite scroll
const sentinel = document.createElement('div');
sentinel.id = 'sentinel';
sentinel.classList.add('sentinel');

const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadMoves();
  }
});

// Modal
const modal = document.getElementById('modalMove');
const closeBtn = document.getElementById('closeModalMove');

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Search
document.getElementById('searchMove').addEventListener('input', (e) => {
  searchMoves(e.target.value);
});

// Iniciar
observer.observe(sentinel);
loadMoves();