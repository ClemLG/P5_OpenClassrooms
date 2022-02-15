let urlString = window.location.href
let url = new URL(urlString)
let id = url.searchParams.get('id')
let apiProduct;


// On vérifie si l'ID compris dans l'URL est valide
if(id === null || id === "") {
    throw 'URL Invalide'
}


// On veut récupérer au près de l'api les informations du produit dont l'id correspond à l'id qu'on a trouvé dans l'url
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(handleResponse)
        .then(function(product) {
            apiProduct = product;
            console.log(apiProduct)
            const itemImg = document.querySelector('article div.item__img')
            itemImg.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
            console.log(`On rajoute l'image et son texte alternatif: ` + product.imageUrl)
            let itemTitle = document.getElementById('title')
            itemTitle.innerHTML = `<h1 id="title">${product.name}</h1>`
            console.log('On rajoute le nom: ' + product.name)
            const itemPrice = document.getElementById('price')
            itemPrice.innerHTML = `<span id="price">${product.price}</span>`
            console.log('On rajoute le prix: ' + product.price)
            const itemDesc = document.getElementById('description')
            itemDesc.innerHTML = `<p id="description">${product.description}</p>`
            console.log('On rajoute la description: ' + product.description);
            const itemSelect = document.getElementById('colors')
            for(let i = 0; i < product.colors.length; i++){
                itemSelect.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`
            }
            console.log('On rajoute les couleurs: ' + product.colors);
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
    let selectedColor = itemColors.value;
    console.log('Couleur choisie: ' + selectedColor)
    let itemQty = document.getElementById('quantity')
    let qty = parseInt(itemQty.value)
    console.log('Quantité choisie: ' + qty)

    //VERIFICATION
    if (selectedColor === null || selectedColor === "" || qty === 0) {
        return
    }

    // SI DANS LE LOCAL STORAGE IL N Y A PAS LE TABLEAU, ON LE CRÉE
    // SINON ON VIENT LE RECUPERER ET ON TRAVAILLE AVEC

    let panierArray = initializeCartArray()

    //ON LISTE LES VALEURS D'ENTREE
    let selectedId = id;
    let selectedQty = qty;

    console.log("ID Produit : " + selectedId);
    console.log("QT Produit : " + selectedQty);
    console.log("Couleur Produit : " + selectedColor);

    let lignePanier = panierArray.findIndex(function (item) {
        return item.id == selectedId && item.color == selectedColor;
    });

    console.log("Ligne panier trouvée : " + lignePanier);

    if(lignePanier !== -1) {
        // Ligne panier déjà existante, on incrémente la valeur
        console.log("Ancienne quantité : " + panierArray[lignePanier].quantity);
        panierArray[lignePanier].quantity += selectedQty;
        console.log("Nouvelle quantité : " + panierArray[lignePanier].quantity);
    } else {
        // Ligne panier inexistante, alors on l'ajoute
        panierArray.push({
            id: selectedId,
            quantity: selectedQty,
            color: selectedColor,
            image: apiProduct.imageUrl,
            altText: apiProduct.altTxt,
            name: apiProduct.name,
            price: apiProduct.price
        });
    }

    //ON INITIALISE LE NOUVEAU RESULTAT DANS LE LOCAL STORAGE
    localStorage.panier = JSON.stringify(panierArray);
    console.log('Panier stocké en string dans le local storage: ' + localStorage.panier)
})





