const searchbtn = document.querySelector("#btn-search");
const cards = document.getElementById('cards');

let x=2;
fetch(`https://debuggers-games-api.duckdns.org/api/games`)
.then (res => res.json())
.then(data =>{
    console.log(data)
    aff(data.results);
}).catch(error=>{
    console.error('error to fetching data ', error);
})

function aff(games)
{
    games.forEach(game => {
         const cart =document.createElement('div');
        cart.classList.add('cart','bg-gradient-to-r','from-[#ff00ff]/70','to-[#00ffff]/70','h-fit','transition-transform','duration-300','hover:scale-105');  
        cart.innerHTML=`
        <img src="${game.background_image}"flex class="h-70 justify-center items-center w-full">
        <div class="flex flex-col p-4 gap-4">
        <h3 class="[text-shadow:4px_4px_4px_rgba(255,0,255,0.25)] text-[#ff00ff] text-3xl font-bold pl-5">${game.name}</h3> 
        <span class="pl-5 text-[22px]">${game.released}</span>
        <span class="pl-5 text-[22px]">Genres : ${game.genres[0].name}</span>
        <div class="flex justify-center items-center w-full">
        <button class="p-5 flex justify-center items-end bg-gradient-to-r from-[#ff00ff] to-[#00ffff] rounded-2xl w-11/12 m-3.5 text-[25px] font-extrabold hover:from-[#00ffff] hover:to-[#ff00ff] transition-all duration-700 ease-in-out shadow-lg">Add To Favorite</button> 
        </div>
        </div>
        `;
        const favbtn = document.createElement('button');
        favbtn.ad
        cards.appendChild(cart);
    });
}

