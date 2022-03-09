/**********************************Récupération et affichage du produit sélectionné*************************************/

//Récuperation de l'url comprenant l'id du produit à afficher
let urlString = window.location.href
let url = new URL(urlString)
let id = url.searchParams.get('id')
let apiProduct;


// On vérifie si l'ID compris dans l'URL est valide
if (id === null || id === "") {
    throw 'URL Invalide'
}


// On récupère au près de l'api les informations du produit dont l'id correspond à l'id qu'on a trouvé dans l'url
fetch(`http://localhost:3000/api/products/${id}`)
    //Si réponse OK
    .then(handleResponse)
    //Affichage des caractèristiques et choix du produit
    .then(function (product) {
        apiProduct = product;
        console.log(apiProduct)
        const itemImg = document.querySelector('article div.item__img')
        itemImg.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
        console.log(`On rajoute l'image et son texte alternatif: ` + product.imageUrl)
        let itemTitle = document.getElementById('title')
        itemTitle.innerHTML = `<h1 id="title">${product.name}</h1>`
        console.log('On rajoute le Nom: ' + product.name)
        const itemPrice = document.getElementById('price')
        itemPrice.innerHTML = `<span id="price">${product.price}</span>`
        console.log('On rajoute le prix: ' + product.price)
        const itemDesc = document.getElementById('description')
        itemDesc.innerHTML = `<p id="description">${product.description}</p>`
        console.log('On rajoute la description: ' + product.description);
        const itemSelect = document.getElementById('colors')
        for (let i = 0; i < product.colors.length; i++) {
            itemSelect.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`
        }
        console.log('On rajoute les couleurs: ' + product.colors);
    })

    .catch(function (err) {

    })

/***************************************************Local storage*******************************************************/

//On écoute le click de l'utilisateur sur le bouton 'ajouter au panier'
const buttonAddItem = document.getElementById('addToCart')
buttonAddItem.addEventListener('click', function () {

    //On execute un callback qui vient récuperer les données choisies par l'utilisateur
    let itemColors = document.getElementById('colors')
    let selectedColor = itemColors.value;
    console.log('Couleur choisie: ' + selectedColor)
    let itemQty = document.getElementById('quantity')
    let qty = parseInt(itemQty.value)
    console.log('Quantité choisie: ' + qty)

    //On vérifie que la quantité ou la couleur choisie soit valide
    if (selectedColor === null || selectedColor === "" || qty === 0 || qty > 100) {
        return
    }
    console.log('Quantité invalide (0-100)')
    //ON STOCK LES DONNEES DANS LE LOCAL STORAGE

    let panierArray;

    // Si le local storage est vide, on ajoute le tableau(panier), sinon on parse celui déjà présent pour travailler avec
    if (!localStorage.panier) {
        panierArray = [];
        localStorage.panier = JSON.stringify(panierArray);
    } else {
        panierArray = JSON.parse(localStorage.panier);
    }


    //On liste les valeurs d'entrée
    let selectedId = id;
    let selectedQty = qty;

    console.log("ID Produit : " + selectedId);
    console.log("QT Produit : " + selectedQty);
    console.log("Couleur Produit : " + selectedColor);

    //On recherche la ligne dans le panier
    let lignePanier = panierArray.findIndex(function (item) {
        return item.id == selectedId && item.color == selectedColor;
    });

    console.log("Ligne panier trouvée : " + lignePanier);

    if (lignePanier !== -1) {
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

    //On initialise le nouveau résultat dans le local storage
    localStorage.panier = JSON.stringify(panierArray);
    console.log('Panier stocké en string dans le local storage: ' + localStorage.panier)
})





