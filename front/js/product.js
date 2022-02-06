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
        itemPrice.innerHTML = ` <p>Prix : <span id="price">${product.price}</span>€</p>`
        const itemDesc = document.getElementById('description')
        itemDesc.innerHTML = `<p id="description">${product.description}</p>`
    })