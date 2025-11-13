const searchbtn = document.querySelector("#btn-search");
const cards = document.getElementById('cards');
const loadmore= document.querySelector('#loadmore');
const favorit= document.querySelector('#btn-fav');
let gamess = [];
let favorite=[];
let x = 1;
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
        cart.classList.add('cart', 'bg-gradient-to-r', 'from-[#ff00ff]/70', 'to-[#00ffff]/70', 'h-fit', 'transition-transform', 'duration-300', 'hover:scale-105','rounded-2xl');
        cart.innerHTML = `
        <img src="${game.background_image}" class="h-70 justify-center items-center w-full  rounded-t-2xl ">
        <div class="flex flex-col p-4 gap-4">
        <h3 class="[text-shadow:4px_4px_4px_rgba(255,0,255,0.25)] text-[#ff00ff] text-3xl font-bold pl-5">${game.name}</h3> 
        <span class="pl-5 text-[22px]">${game.released}</span>
        <span class="pl-5 text-[22px]">Genres : ${game.genres[0].name}</span>
        <div class="flex justify-center items-center w-full">
        <button id="btn-fav" class="p-5 flex justify-center items-end bg-gradient-to-r from-[#ff00ff] to-[#00ffff] rounded-2xl w-11/12 m-3.5 text-[25px] font-extrabold hover:from-[#00ffff] hover:to-[#ff00ff] transition-all duration-700 ease-in-out shadow-lg">Add To Favorite</button> 
        </div>
        </div>
        `;
        const favbtn = document.createElement('button');
        favbtn.ad
        cards.appendChild(cart);
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
    if(value ===""){
        fetch(`https://debuggers-games-api.duckdns.org/api/games?page=1`)
        .then(res=>res.json())
        .then(data=>{
            gamess=data.results;
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
loadmore.addEventListener("click",()=>{
    x++;
    fetch(`https://debuggers-games-api.duckdns.org/api/games?page=${x}`)
    .then(res=>res.json())
    .then(data=>{
        gamess = [...gamess, ...data.results];
        aff(gamess);
    }).catch(err => console.error(err))
})