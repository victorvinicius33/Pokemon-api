const pokemon = document.querySelector('#poke');
const nome = document.querySelector('.nome');
const img = document.querySelector('.img');
const habilidades = document.querySelectorAll('.habilidades h2');
const hide = document.querySelector('.hide');

function reset() {
    for (let i = 0; i < habilidades.length; i++) {
        habilidades[i].textContent = '';
    }
    nome.textContent ='';
    img.src = '';
    img.alt = '';
    hide.style.display = 'none';
}

pokemon.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        event.preventDefault();

        const pokemonSearched = pokemon.value.trim().toLowerCase();

        const promiseResposta = fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonSearched);

        promiseResposta.then((resposta) => {
            if (!resposta.ok || pokemon.value === '') {
                console.log('ERRO');
                pokemon.classList.add('erro');
                reset();
                return;
            }

            pokemon.value = '';

            pokemon.classList.remove('erro');

            const promiseBody = resposta.json();

            promiseBody.then((body) => {
                hide.style.display = 'block';

                for (let i = 0; i < body.abilities.length; i++) {
                    habilidades[i].textContent = body.abilities[i].ability.name;
                }

                nome.textContent = body.name;
                img.src = body.sprites.front_default;
                img.alt = body.name;
            });
        });
    }
});
