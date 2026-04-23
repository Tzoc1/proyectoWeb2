async function fetchpokemon(pokemon) {
    try {
        const [resPokemon, resSpecies] = await Promise.all([
            fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon),
            fetch("https://pokeapi.co/api/v2/pokemon-species/" + pokemon)
        ]);

        if (!resPokemon.ok || !resSpecies.ok) throw new Error('Pokémon no encontrado');

        const data        = await resPokemon.json();
        const dataSpecies = await resSpecies.json();

        cambiarpokemon(data, dataSpecies);
    } catch (error) {
        console.error('Hubo un problema:', error);
        alert('Pokémon no encontrado. Intenta con otro nombre o ID.');
    }
}

function buscarpokemon() {
    const busq = document.getElementById('buscar').value.trim().toLowerCase();
    if (busq) fetchpokemon(busq);
}

function cambiarpokemon(pokemon, species) {
    const nom   = document.getElementById("nom_poke");
    const img   = document.getElementById("img_poke");
    const id    = document.getElementById("id_poke");
    const type1 = document.getElementById("type_p");
    const type2 = document.getElementById("type_s");
    const gen   = document.getElementById("generacion");
    const stats = document.getElementById("stats");
    const altura = document.getElementById("altura");
    const peso = document.getElementById("peso");

    nom.textContent = pokemon.name;
    img.src         = pokemon.sprites.front_default;
    img.alt         = pokemon.name;
    id.textContent  = '#' + pokemon.id;
    type1.textContent = pokemon.types[0]?.type.name ?? '';
    type2.textContent = pokemon.types[1]?.type.name ?? '';
    gen.textContent   = species.generation?.name ?? 'Desconocida';

    const s = pokemon.stats;
    stats.innerHTML = `
        HP: ${s[0]?.base_stat ?? '?'} <br>
        Attack: ${s[1]?.base_stat ?? '?'} <br>
        Defense: ${s[2]?.base_stat ?? '?'} <br>
        Special Attack: ${s[3]?.base_stat ?? '?'} <br>
        Special Defense: ${s[4]?.base_stat ?? '?'} <br>
        Speed: ${s[5]?.base_stat ?? '?'}
    `;

    altura.textContent = `Altura: ${(pokemon.height / 10).toFixed(1)} m`;
    peso.textContent = `Peso: ${(pokemon.weight / 10).toFixed(1)} kg`;
}