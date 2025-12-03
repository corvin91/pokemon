let flags = async () => {
    try {
        let req = await fetch('https://pokemon-api-rhb7.onrender.com/pokemons')
        let res = await req.json()

        allPokemons = res; 

        renderCard(res)
        setupSearch(res)
        setupFilter(res)
      
    } catch (e) {
        console.error('Xatolik:', e);
    } finally {
        console.log('Ma’lumot keldi');
    }
}

flags();


function renderCard(pokemons) {
    let wrapper = document.querySelector('.card');
    wrapper.innerHTML = '';

    pokemons.forEach(e => {
        let card = document.createElement('div');
       card.classList = "w-60 bg-yellow-400 rounded-2xl p-4 shadow-xl text-center space-y-3";


        card.innerHTML = `
            <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold text-gray-900">${e.name}</h2>
                <span class="px-2 py-1 text-xs font-bold bg-red-500 text-white rounded-md">
                    ${e.num}
                </span>
            </div>

            <img src="${e.img}" alt="${e.name}" class="w-28 h-28 object-contain mx-auto">

            <div class="bg-white text-gray-800 font-semibold px-4 py-2 rounded-xl inline-block shadow">
                ${Array.isArray(e.type) ? e.type.join(', ') : e.type}
            </div>

            <p class="text-gray-800 font-semibold">
                Candy count: <span class="font-normal">${e.candy ?? "N/A"}</span>
            </p>

            <p class="text-gray-800 font-semibold">
                Weight: <span class="font-normal">${e.weight}</span>
            </p>

            <p class="text-red-600 font-bold text-sm">
                ${Array.isArray(e.weaknesses) ? e.weaknesses.join(', ') : e.weaknesses}
            </p>

            <div class="bg-cyan-500 text-black px-3 py-1 rounded-md w-max mx-auto font-semibold text-sm">
                ${e.spawn_chance ?? "undefined"}
            </div>
        `;
        
        wrapper.append(card);
    });
   
    
}
let darkBtn = document.querySelector(".dark-btn");

darkBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        darkBtn.textContent = "Light Mode";
    } 
    else {
        darkBtn.textContent = "Dark Mode";
    }
});



function setupSearch(pokemons) {
    let input = document.querySelector('.inputcha');

    input.addEventListener('input', () => {
        let value = input.value.toLowerCase();
        let filtered = pokemons.filter(e => e.name.toLowerCase().includes(value));
        renderCard(filtered);
    });
}


function setupFilter(pokemons) {
    let select = document.querySelector('.region-select');

    select.addEventListener('change', (e) => {
        let value = e.target.value;
        if (value === "all") {
            renderCard(pokemons);
            return;
        }

        let filtered = pokemons.filter(item => 
            Array.isArray(item.type) && item.type.includes(value)
            || item.candy === value
        );

        renderCard(filtered);
    });
}
function sortAZ() {
    allPokemons.sort((a, b) => a.name.localeCompare(b.name));
    renderCard(allPokemons);
}

function sortZA() {
    allPokemons.sort((a, b) => b.name.localeCompare(a.name));
    renderCard(allPokemons);
}





