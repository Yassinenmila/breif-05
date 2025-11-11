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
        cart.classList.add('cart');
        cart.innerHTML=`
        <h3>${game.name}</h3>
        `;
        cards.appendChild(cart);
    });
}
     

// fetch('https://debuggers-games-api.duckdns.org/api/games')
// .then(res=>{
//     if(!res.ok)
//     {
//        console.log("error to fetching data");
//     }
//     return res.json();
// }).then(data=>{
//     const dataL = data;
//     console.log(dataL);
// })

