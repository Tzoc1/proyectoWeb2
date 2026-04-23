const tablaDinamica = document.getElementById('Pokedex');

//Codigo Scroll infinito
let offset = 0;
const limit = 25;
const flimit = 50;
let loading = false;
let currentFilter = { type: '', generation: '' };
let allPokemons = [];
//Variables necesarioas

//Funcion para capitalizar tipos
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Función para obtener color de stat basado en valor
function getStatColor(value) {
  if (value < 50) return '#FF6B6B'; // Rojo
  if (value < 75) return '#FFA500'; // Naranja
  if (value < 100) return '#FFD700'; // Amarillo
  if (value < 125) return '#90EE90'; // Verde claro
  return '#32CD32'; // Verde
}

// Función para obtener pokémons filtrados
async function filterPokemons() {
  const typeFilter = document.getElementById('typeFilter').value;
  const generationFilter = document.getElementById('generationFilter').value;

  currentFilter = { type: typeFilter, generation: generationFilter };
  offset = 0;
  allPokemons = [];
  tablaDinamica.innerHTML = '';

  if (typeFilter) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${typeFilter}`);
      const data = await response.json();

      allPokemons = data.pokemon.map(p => ({ name: p.pokemon.name, url: p.pokemon.url }));

      if (generationFilter) {
        allPokemons = await filterByGeneration(allPokemons, generationFilter);
      }

      renderFilteredTable(allPokemons.slice(0, flimit));
    } catch (error) {
      console.error('Error filtrando por tipo:', error);
    }
  } else if (generationFilter) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/generation/${generationFilter}`);
      const data = await response.json();
      allPokemons = data.pokemon_species;
      renderFilteredTable(allPokemons.slice(0, flimit));
    } catch (error) {
      console.error('Error filtrando por generación:', error);
    }
  } else {
    loadData();
  }
}

// Función auxiliar para filtrar por generación
async function filterByGeneration(pokemons, generation) {
  const response = await fetch(`https://pokeapi.co/api/v2/generation/${generation}`);
  const data = await response.json();
  const genPokeIds = data.pokemon_species.map(p => p.name.toLowerCase());
  return pokemons.filter(p => genPokeIds.includes(p.name.toLowerCase()));
}

async function loadData() {
    if (loading) return;
    loading = true;
    
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        if (!response.ok) throw new Error('Conexión no establecida');
        const data = await response.json();

        renderTable(data.results);
        offset += limit;

    } catch (error) {
        console.error('Hubo un problema:', error);
    } finally {
        loading = false;
    }
}

async function renderTable(data) {
    showSkeletons(data.length);

    const promises = data.map(pokemon => fetch(pokemon.url).then(res => res.json()));
    const results = await Promise.all(promises);

    // Eliminar solo los skeletons, no todo el contenido
    document.querySelectorAll('.skeleton-card').forEach(el => el.remove());

    results.forEach(pokeData => {
        const card = document.createElement('div');
        card.classList.add('card');

        //NOMBRE ===============
        const trName = document.createElement('h2');
        trName.textContent = `${pokeData.name} N.${pokeData.id}`;
        card.appendChild(trName);

        // IMAGEN ==================
        const img = document.createElement('img');
        img.src = pokeData.sprites.front_default;
        img.alt = pokeData.name;
        img.classList.add('Cimg');
        card.appendChild(img);

        //TIPOS ===========
        const tiposContainer = document.createElement('div');
        const divTipos = document.createElement('h3');
        divTipos.textContent = 'Tipos:';
        tiposContainer.appendChild(divTipos);

        pokeData.types.forEach(t => {
            const span = document.createElement('span');
            span.textContent = capitalize(t.type.name);
            span.classList.add('Cspan', `type-${t.type.name.toLowerCase()}`);
            tiposContainer.appendChild(span);
        });
        card.appendChild(tiposContainer);

        //BOTONES =================
        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.display = 'flex';
        buttonsContainer.style.gap = '10px';
        buttonsContainer.style.marginTop = '10px';

        const buttonMore = document.createElement('button');
        buttonMore.textContent = 'Ver más';
        buttonMore.addEventListener('click', () => {
            modalInfo(pokeData);
        });
        buttonsContainer.appendChild(buttonMore);

        const buttonAdd = document.createElement('button');
        buttonAdd.textContent = '+';
        buttonAdd.style.flex = '1';
        buttonAdd.addEventListener('click', () => {
            addToTeam(pokeData);
        });
        buttonsContainer.appendChild(buttonAdd);

        card.appendChild(buttonsContainer);

        tablaDinamica.appendChild(card);
    });

    // Asegúrate de que el sentinel quede al final
    tablaDinamica.appendChild(sentinel);
}



async function renderFilteredTable(data) {
    const promises = data.map(pokemon =>
        fetch(pokemon.url || `https://pokeapi.co/api/v2/pokemon?limit=${flimit}/${pokemon.name}`).then(res => res.json())   
    );
    console.log('here');
    const results = await Promise.all(promises);

    results.forEach(pokeData => {
        const card = document.createElement('div');
        card.classList.add('card');

        const trName = document.createElement('h2');
        trName.textContent = `${pokeData.name} N.${pokeData.id}`;
        card.appendChild(trName);

        const img = document.createElement('img');
        img.src = pokeData.sprites.front_default;
        img.alt = pokeData.name;
        img.classList.add('Cimg');
        card.appendChild(img);

        const tiposContainer = document.createElement('div');
        const divTipos = document.createElement('h3');
        divTipos.textContent = 'Tipos:';
        tiposContainer.appendChild(divTipos);

        pokeData.types.forEach(t => {
            const span = document.createElement('span');
            span.textContent = capitalize(t.type.name);
            span.classList.add('Cspan', `type-${t.type.name.toLowerCase()}`);
            tiposContainer.appendChild(span);
        });
        card.appendChild(tiposContainer);

        //BOTONES =================
        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.display = 'flex';
        buttonsContainer.style.gap = '10px';
        buttonsContainer.style.marginTop = '10px';

        const buttonMore = document.createElement('button');
        buttonMore.textContent = 'Ver más';
        buttonMore.addEventListener('click', () => {
            modalInfo(pokeData);
        });
        buttonsContainer.appendChild(buttonMore);

        const buttonAdd = document.createElement('button');
        buttonAdd.textContent = '+';
        buttonAdd.style.flex = '1';
        buttonAdd.addEventListener('click', () => {
            addToTeam(pokeData);
        });
        buttonsContainer.appendChild(buttonAdd);

        card.appendChild(buttonsContainer);

        tablaDinamica.appendChild(card);
    });
}

async function modalInfo(Data) {
    const pokeData = Data;

    const modal = document.getElementById('Cmodal');
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = '';

    // NOMBRE Y ID MODAL =================
    const mName = document.createElement('h2');
    mName.textContent = `${pokeData.name} N.${pokeData.id}`;
    modalBody.appendChild(mName);

    // IMG MODAL ========================
    const mImg = document.createElement('img');
    mImg.src = pokeData.sprites.front_default;
    mImg.alt = pokeData.name;
    mImg.classList.add('Cimg');
    modalBody.appendChild(mImg);

    // TIPOS MODAL =======================
    const containerTypes = document.createElement('div');
    const h3Types = document.createElement('h3');
    h3Types.textContent = 'Tipos:';
    containerTypes.appendChild(h3Types);

    pokeData.types.forEach(t => {
        const span = document.createElement('span');
        span.textContent = capitalize(t.type.name);
        span.classList.add('Cspan', `type-${t.type.name.toLowerCase()}`);
        containerTypes.appendChild(span);
    });
    modalBody.appendChild(containerTypes);

    // HABILIDADES MODAL =======================
    const containerAbilities = document.createElement('div');
    const h3Abilities = document.createElement('h3');
    h3Abilities.textContent = 'Habilidades:';
    containerAbilities.appendChild(h3Abilities);

    pokeData.abilities.forEach(h => {
        const span = document.createElement('span');
        span.textContent = capitalize(h.ability.name);
        span.classList.add('Cspan');
        containerAbilities.appendChild(span);
    });
    modalBody.appendChild(containerAbilities);    

    // STATS MODAL =============================
    const containerStats = document.createElement('div');
    const h3Stats = document.createElement('h3');
    const tableStatsG = document.createElement('table');
    const tableStatsE = document.createElement('table');
    const tbodyStats = document.createElement('tbody');
    const thStats = document.createElement('thead');
    const tbStats = document.createElement('tbody')
    
    h3Stats.textContent = 'Stats:';
    containerStats.appendChild(h3Stats);

    thStats.innerHTML = `<th>Especificas:</th>  <th></th>`;
    
    tbStats.innerHTML = `
    <th>    Generales:  </th><th></th>
    <tr>    <td>Altura (in):</td><td>${pokeData.height}</td>    </tr>
    <tr>    <td>Peso (lbs):</td><td>${pokeData.weight}</td>     </tr> `;

    tableStatsG.appendChild(tbStats);

    pokeData.stats.forEach(s => {
        const trStats = document.createElement('tr');
        const statValue = s.base_stat;
        const percentage = Math.min((statValue / 150) * 100, 100);
        const statColor = getStatColor(statValue);

        trStats.innerHTML = `
        <td>${capitalize(s.stat.name)}:</td>
        <td>
            <div class="stat-bar-container">
                <div class="stat-bar" style="width: ${percentage}%; background-color: ${statColor};"></div>
            </div>
            <span class="stat-value">${statValue}</span>
        </td>
        `
        tbodyStats.appendChild(trStats);
    });

    tableStatsE.appendChild(thStats);
    tableStatsE.appendChild(tbodyStats);

    tableStatsG.className = 'teibol';
    tableStatsE.className = 'teibol';

    containerStats.appendChild(tableStatsG)
    containerStats.appendChild(tableStatsE)

    modalBody.appendChild(containerStats);

    // IMAGENES MODAL ===================
    const containerSprites = document.createElement('div')
    const h3Sprites = document.createElement('h3');
    const tableSprites = document.createElement('table');
    const tbodySprites = document.createElement('tbody');

    h3Sprites.textContent = 'Sprites: ';
    containerSprites.appendChild(h3Sprites);
    
    tbodySprites.innerHTML = `
    <tr>    <td><h4>Front Default:</h4></td>    <td><h4>Back Default:</h4></td> </tr>
    <tr>    <td><img src='${pokeData.sprites.front_default}' alt='Front Default'></td>
    <td><img src='${pokeData.sprites.back_default}' alt='Back Default'></td>    </tr>

    <tr>    <td><h4>Front Shiny:</h4></td>  <td><h4>Back Shiny:</h4></td>   </tr>
    <tr>    <td><img src='${pokeData.sprites.front_shiny}' alt='Front Default'></td>    
    <td><img src='${pokeData.sprites.back_shiny}' alt='Back Default'></td>  </tr> `

    tableSprites.appendChild(tbodySprites);
    tableSprites.className = 'teibol';
    containerSprites.appendChild(tableSprites);
    modalBody.appendChild(containerSprites);


    // EVOLUCIONES MODAL
    const response = await fetch(`${pokeData.species.url}`);
    const specData = await response.json();

    // GENERACIÓN MODAL =======================
    const containerGen = document.createElement('div');
    const h3Gen = document.createElement('h3');
    h3Gen.textContent = 'Generación: ';
    const spanGen = document.createElement('span');
    spanGen.textContent = `Gen ${specData.generation.name.split('-')[1].toUpperCase()}`;
    spanGen.classList.add('Cspan');
    containerGen.appendChild(h3Gen);
    containerGen.appendChild(spanGen);
    modalBody.appendChild(containerGen);

    const res = await fetch(`${specData.evolution_chain.url}`)
    const evoData = await res.json();

    const containerEvo = document.createElement('div');
    const h3Evo = document.createElement('h3');
    const tableEvo = document.createElement('table');
    const tbodyEvo = document.createElement('tbody');

    h3Evo.textContent = 'Evoluciones: ';
    containerEvo.appendChild(h3Evo);

    // Pokémon base
    const trBase = document.createElement('tr');
    trBase.innerHTML = `<td>Base: </td><td>${capitalize(evoData.chain.species.name)}</td>`;
    tbodyEvo.appendChild(trBase);

    // Primer nivel de evoluciones
    evoData.chain.evolves_to.forEach(e1 => {
        const tr1 = document.createElement('tr');
        tr1.innerHTML = `<td>Evolucion 1:</td><td>${capitalize(e1.species.name)}</td>`;
        tbodyEvo.appendChild(tr1);

        // Segundo nivel de evoluciones
        e1.evolves_to.forEach(e2 => {
            const tr2 = document.createElement('tr');
            tr2.innerHTML = `<td>Evolucion 2:</td><td>${capitalize(e2.species.name)}</td>`;
            tbodyEvo.appendChild(tr2);

            // Tercer nivel (por si acaso)
            e2.evolves_to.forEach(e3 => {
                const tr3 = document.createElement('tr');
                tr3.innerHTML = `<td>Evolucion 3:</td><td>${capitalize(e3.species.name)}</td>`;
                tbodyEvo.appendChild(tr3);
            });
        });
    });

    tableEvo.appendChild(tbodyEvo);
    tableEvo.classList.add('teibol');
    containerEvo.appendChild(tableEvo);
    modalBody.appendChild(containerEvo);


    // MOVIMIENTOS MODAL =================
    const containerMoves = document.createElement('div');
    const h3Moves = document.createElement('h3');
    h3Moves.textContent = 'Movimientos:';
    containerMoves.appendChild(h3Moves);

    pokeData.moves.forEach(m => {
        const span = document.createElement('span');
        span.textContent = capitalize(m.move.name);
        span.classList.add('Cspan');
        containerMoves.appendChild(span);
    });
    modalBody.appendChild(containerMoves);

    // Mostrar modal
    modal.style.display = 'block';

} 
// AGREGAR AL EQUIPO ==========================
const STORAGE_KEY = 'pokemon_team';
const maxTeam = 6;

function addToTeam(pokemon) {
  let team = [];
  const saved = localStorage.getItem(STORAGE_KEY);
  
  if (saved) {
    team = JSON.parse(saved);
  }

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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(team));
  alert(`${capitalize(pokemon.name)} añadido al equipo`);
}

// CERRAR MODAL ==================================
const modal = document.getElementById('Cmodal');
const closeBtn = document.getElementById('closeModal');

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
// ==========================================

//SKELETON LOADER ===============
function showSkeletons(count = 5) {
  for (let i = 0; i < count; i++) {
    const skeletonCard = document.createElement('div');
    skeletonCard.classList.add('skeleton-card');

    const skeletonImg = document.createElement('div');
    skeletonImg.classList.add('skeleton', 'skeleton-img');
    skeletonCard.appendChild(skeletonImg);

    const skeletonText = document.createElement('div');
    skeletonText.classList.add('skeleton', 'skeleton-text');
    skeletonCard.appendChild(skeletonText);

    tablaDinamica.appendChild(skeletonCard);
  }
}



// INFINITE SCROLL =============================================================

const sentinel = document.createElement('div');
sentinel.id = 'sentinel';
sentinel.classList.add('Csentinel');

const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        loadData(); // carga más cuando el sentinel aparece en pantalla
    }
});
observer.observe(sentinel);

// Event listeners para filtros
document.getElementById('typeFilter').addEventListener('change', filterPokemons);
document.getElementById('generationFilter').addEventListener('change', filterPokemons);

loadData();