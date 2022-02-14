let urlString = window.location.href
let url = new URL(urlString)
let id = url.searchParams.get('id')

// On vérifie si l'ID compris dans l'URL est valide
if(id === null || id === "") {
    throw 'URL Invalide'
}

// On veut récupérer au près de l'api les informations du produit dont l'id correspond à l'id qu'on a trouvé dans l'url

fetch(`http://localhost:3000/api/products/${id}`)
    .then(handleResponse)
    .then(function(product) {
        console.log(product)
        const itemImg = document.querySelector('article div.item__img')
        itemImg.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
        const itemTitle = document.getElementById('title')
        itemTitle.innerHTML = `<h1 id="title">${product.name}</h1>`
        const itemPrice = document.getElementById('price')
        itemPrice.innerHTML = `<span id="price">${product.price}</span>`
        const itemDesc = document.getElementById('description')
        itemDesc.innerHTML = `<p id="description">${product.description}</p>`
        console.log(product.colors[0]);
        const itemSelect = document.getElementById('colors')
        for(let i = 0; i < product.colors.length; i++){
            console.log('On rajoute les couleurs: ' + product.colors);
            itemSelect.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`
        }
    })

    .catch(function(err) {

    })
/*-------------------------------------LOCAL STORAGE---------------------------------------------*/

//On écoute le click de l'utilisateur sur le bouton 'ajouter au panier'
//On execute un callback qui vient recuperer les données choisit par l'utilisateur
//On stock les données dans le local storage 


const buttonAddItem = document.getElementById('addToCart')
buttonAddItem.addEventListener('click', function() {
    //RECUPERATION 
    let itemColors = document.getElementById('colors')
    let selectedColor = itemColors.value
    let itemQty = document.getElementById('quantity')
    let qty = parseInt(itemQty.value)

    //VERIFICATION
    if (selectedColor === null || selectedColor === "" || qty === 0) {
        return
    }

// SI DANS LE LOCAL STORAGE IL N Y A PAS LA MAP, ON LA CREEE 
// SINON ON VIENT LA RECUPERER ET ON TRAVAILLE AVEC

let mapProductLS 

if(!localStorage.productMap) {
    mapProductLS = new Map();
    localStorage.productMap = JSON.stringify(Array.from(mapProductLS.entries()));
} else {
    mapProductLS = new Map(JSON.parse(localStorage.productMap))
}

//ON DECLARE LES CLES QUI VONT CONSTITUER LA MAP
const key = id + selectedColor
const keyValueQty = mapProductLS.get(key)
console.log(keyValueQty);

//VERIFICATION
//SI LA CLE EST VIDE ON AJOUTE LA QUANTITE INITIALE SAISIE PAR L UTILISATEUR SINON ON AJOUTE SUR LA QUANTITE EXISTANTE
if(!keyValueQty) {
mapProductLS.set(key, qty)
} else {
const newQtyAdded = parseInt(keyValueQty) + qty
//ON REMPLACE LA VALEUR EXISTANTE PAR LA NOUVELLE SUR LA MEME CLE
mapProductLS.set(key, newQtyAdded)
}

//ON INITIALISE LE NOUVEAU RESULTAT DANS LE LOCAL STORAGE
localStorage.productMap = JSON.stringify(Array.from(mapProductLS.entries()));

})





