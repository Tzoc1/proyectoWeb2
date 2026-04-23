let team = [];
const maxTeam = 6;
const STORAGE_KEY = 'pokemon_team';

// Función para capitalizar texto
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Cargar equipo del localStorage
function loadTeam() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    team = JSON.parse(saved);
    renderTeam();
  } else {
    renderEmptyTeam();
  }
}

// Renderizar slots vacíos al inicio
function renderEmptyTeam() {
  const teamContainer = document.getElementById('teamContainer');
  teamContainer.innerHTML = '';
  for (let i = 0; i < maxTeam; i++) {
    const emptySlot = document.createElement('div');
    emptySlot.classList.add('team-slot', 'empty-slot');
    emptySlot.innerHTML = `<p>Slot ${i + 1}<br>Vacío</p>`;
    teamContainer.appendChild(emptySlot);
  }
  document.getElementById('teamCount').textContent = `0/${maxTeam}`;
}

// Guardar equipo en localStorage
function saveTeam() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(team));
}

// Renderizar el equipo actual
function renderTeam() {
  const teamContainer = document.getElementById('teamContainer');
  teamContainer.innerHTML = '';

  team.forEach((pokemon, index) => {
    const slotDiv = document.createElement('div');
    slotDiv.classList.add('team-slot');

    const img = document.createElement('img');
    img.src = pokemon.sprites.front_default || 'https://via.placeholder.com/120';
    img.alt = pokemon.name;
    slotDiv.appendChild(img);

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('pokemon-name');
    if (pokemon.nickname) {
      nameDiv.innerHTML = `<strong>${pokemon.nickname}</strong><br><small>${capitalize(pokemon.name)}</small>`;
    } else {
      nameDiv.textContent = capitalize(pokemon.name);
    }
    slotDiv.appendChild(nameDiv);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-group');

    const nicknameBtn = document.createElement('button');
    nicknameBtn.textContent = 'Apodo';
    nicknameBtn.addEventListener('click', () => setNickname(index));
    buttonContainer.appendChild(nicknameBtn);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Quitar';
    removeBtn.classList.add('remove-btn');
    removeBtn.addEventListener('click', () => removePokemon(index));
    buttonContainer.appendChild(removeBtn);

    slotDiv.appendChild(buttonContainer);
    teamContainer.appendChild(slotDiv);
  });

  // Slots vacíos
  for (let i = team.length; i < maxTeam; i++) {
    const emptySlot = document.createElement('div');
    emptySlot.classList.add('team-slot', 'empty-slot');
    emptySlot.innerHTML = `<p>Slot ${i + 1}<br>Vacío</p>`;
    teamContainer.appendChild(emptySlot);
  }

  document.getElementById('teamCount').textContent = `${team.length}/${maxTeam}`;
}

// Agregar pokémon al equipo
function addToTeam(pokemon) {
  if (team.length >= maxTeam) {
    alert('Equipo completo (máximo 6 pokémon)');
    return;
  }

  const exists = team.some(p => p.id === pokemon.id);
  if (exists) {
    alert('Este pokémon ya está en tu equipo');
    return;
  }

  team.push(pokemon);
  saveTeam();
  renderTeam();
  document.getElementById('searchInput').value = '';
  document.getElementById('searchResults').innerHTML = '';
  alert(`${capitalize(pokemon.name)} añadido al equipo`);
}

// Quitar pokémon del equipo
function removePokemon(index) {
  team.splice(index, 1);
  saveTeam();
  renderTeam();
}

// Establecer apodo
function setNickname(index) {
  const nickname = prompt('Ingresa un apodo (máx 15 caracteres):');
  if (nickname) {
    if (nickname.length > 15) {
      alert('El apodo es muy largo');
      return;
    }
    team[index].nickname = nickname;
    saveTeam();
    renderTeam();
  }
}

// Búsqueda de pokémons
async function searchPokemons(query) {
  const resultsContainer = document.getElementById('searchResults');

  if (!query) {
    resultsContainer.innerHTML = '';
    return;
  }

  try {
    resultsContainer.innerHTML = '<p>Buscando...</p>';

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);

    if (!response.ok) {
      resultsContainer.innerHTML = '<p>Pokémon no encontrado</p>';
      return;
    }

    const pokeData = await response.json();
    resultsContainer.innerHTML = '';

    const resultDiv = document.createElement('div');
    resultDiv.classList.add('search-result-card');

    const img = document.createElement('img');
    img.src = pokeData.sprites.front_default;
    img.alt = pokeData.name;
    resultDiv.appendChild(img);

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('result-name');
    nameDiv.innerHTML = `<h3>${capitalize(pokeData.name)}</h3><p>N.${pokeData.id}</p>`;
    resultDiv.appendChild(nameDiv);

    const tiposDiv = document.createElement('div');
    tiposDiv.classList.add('result-types');
    pokeData.types.forEach(t => {
      const span = document.createElement('span');
      span.textContent = capitalize(t.type.name);
      span.classList.add('Cspan', `type-${t.type.name.toLowerCase()}`);
      tiposDiv.appendChild(span);
    });
    resultDiv.appendChild(tiposDiv);

    const btnAdd = document.createElement('button');
    btnAdd.textContent = 'Añadir a Equipo';
    btnAdd.addEventListener('click', () => addToTeam(pokeData));
    resultDiv.appendChild(btnAdd);

    resultsContainer.appendChild(resultDiv);
  } catch (error) {
    console.error('Error en la búsqueda:', error);
    resultsContainer.innerHTML = '<p>Error en la búsqueda</p>';
  }
}

// Event listeners
document.getElementById('searchInput').addEventListener('input', (e) => {
  searchPokemons(e.target.value);
});

// Cargar equipo al iniciar
loadTeam();