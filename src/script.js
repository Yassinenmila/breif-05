const searchbtn = document.querySelector("#btn-search");
const cards = document.getElementById('cards');
cards.classList.add('flex', 'justify-center', 'items-center');
const loadmore = document.querySelector('#loadmore');
const hero = document.querySelector('#hero');
const listfav = document.querySelector("#list-fav");
let gamess = [];
let x = 1;
window.onload = function () {
    if (window.matchMedia("(min-width:768px)").matches) {
        hero.src = 'images/herot.png';
    }
}
fetch(`https://debuggers-games-api.duckdns.org/api/games?page=${x}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        gamess = data.results;
        aff(data.results);
    }).catch(error => {
        console.error('error to fetching data ', error);
    })

function aff(games) {
    cards.innerHTML = "";
    games.forEach(game => {
        const cart = document.createElement('div');
        cart.classList.add('cart', 'bg-gradient-to-r', 'from-[#ff00ff]/70', 'to-[#00ffff]/70', 'h-fit', 'transition-transform', 'duration-300', 'hover:scale-105', 'rounded-2xl');
        cart.innerHTML = `
        <img src="${game.background_image}" class="h-70 justify-center items-center w-full  rounded-t-2xl ">
        <div class="flex flex-col p-4 gap-4">
        <h3 class="[text-shadow:4px_4px_4px_rgba(255,0,255,0.25)] text-[#ff00ff] text-3xl font-bold pl-5">${game.name}</h3> 
        <span class="pl-5 text-[22px]">${game.released}</span>
        <span class="pl-5 text-[22px]">Genres : ${game.genres[0].name}</span>
        <div class="flex justify-center items-center w-full">
        <button class="btn-fav p-5 flex justify-center items-end bg-gradient-to-r from-[#ff00ff] to-[#00ffff] rounded-2xl w-11/12 m-3.5 text-[25px] font-extrabold hover:from-[#00ffff] hover:to-[#ff00ff] transition-all duration-700 ease-in-out shadow-lg">Add To Favorite</button> 
        </div>
        </div>
        `;
        cards.appendChild(cart);
        const favorit = cart.querySelector('.btn-fav');
        favorit.addEventListener("click", () => {
            let favorite = JSON.parse(localStorage.getItem("favorite")) || [];
            const compart = favorite.some(f => f.id === game.id)
            if (compart) {
                alert(`${game.name} exist deja`);
            }
            else {
                favorite.push(game);
                localStorage.setItem("favorite", JSON.stringify(favorite));
            }
        })
        cart.addEventListener("click", (e) => {
            if (!e.target.classList.contains('btn-fav')) {
                infogame(game);
            }
        })
    });
    if (games.length === 0) {
        cards.innerHTML = `<p class="text-center text-white text-2xl mt-10">Aucun jeu trouvé</p>`;
    }

}
const search = document.querySelector('#search');
search.addEventListener("input", () => {
    const value = search.value.trim().toLowerCase();
    const filter = gamess.filter(game =>
        game.name.toLowerCase().includes(value)
    )
    if (value === "") {
        fetch(`https://debuggers-games-api.duckdns.org/api/games?page=1`)
            .then(res => res.json())
            .then(data => {
                gamess = data.results;
                aff(gamess);
            });
        return;
    }
    fetch(`https://debuggers-games-api.duckdns.org/api/games?search=${value}&page=1`)
        .then(res => res.json())
        .then(data => {
            gamess = data.results;
            aff(gamess);
        });

})
loadmore.addEventListener("click", () => {
    x++;
    fetch(`https://debuggers-games-api.duckdns.org/api/games?page=${x}`)
        .then(res => res.json())
        .then(data => {
            gamess = [...gamess, ...data.results];
            aff(gamess);
        }).catch(err => console.error(err))
})
listfav.addEventListener("click", () => {
    const todo = localStorage.getItem("favorite");
    if (todo) {
        const favorite = JSON.parse(todo)
        cards.innerHTML = ``;
        favorite.forEach(game => {
            const carte = document.createElement('div');
            carte.classList.add('cart', 'bg-gradient-to-r', 'from-[#ff00ff]/70', 'to-[#00ffff]/70', 'h-fit', 'transition-transform', 'duration-300', 'hover:scale-105', 'rounded-2xl');
            carte.innerHTML = `
            <img src="${game.background_image}" class="h-70 w-full rounded-t-2xl">
                <div class="p-4 flex flex-col gap-2">
                    <h3 class="text-[#ff00ff] text-2xl font-bold">${game.name}</h3>
                    <span class="text-[20px]">${game.released}</span>
                    <span class="text-[20px]">Genres : ${game.genres[0]?.name || "Inconnu"}</span>
                </div>
            `;
            cards.appendChild(carte);
        })
    } else {
        cards.innerHTML = `<h1 class="grid col-start-1 col-end-5 justify-center items-center text-5xl">aucun jeux enregistrer !!!</h1>`;
    }
})

function infogame(game) {
    const popup = document.createElement('div');
    popup.classList.add('fixed','inset-0', 'bg-black', 'bg-opacity-70', 'flex', 'justify-center', 'items-center', 'z-50000','overflow-y-auto');
    popup.innerHTML = `
            <div class="bg-white p-6 rounded-xl w-11/12 md:w-1/2 text-center relative my-10 max-h-[90vh] overflow-y-auto">
            <h2 class="text-2xl font-bold mb-4">${game.name}</h2>
            <img src="${game.background_image}" class="w-full rounded-xl mb-4">
            <p><strong>Sorti le :</strong> ${game.released}</p>
            <p><strong>Genres : </strong>${game.genres.map(g => g.name).join(', ')}</p>
            <div>
            
            </div>
            <h1><strong>About : </strong></h1>
            <p class="p-9">${game.description}</p>
            <button id="closePopup" class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Fermer</button>
        </div>
 `;
    document.body.appendChild(popup);
    popup.querySelector('#closePopup').addEventListener('click', () => {
        popup.remove();
    });

}