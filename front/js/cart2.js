//On récupère le tableau stocké dans le local storage et on le parse pour pouvoir l'utiliser
let productsInLS = parseLS()
console.log(productsInLS)

//On récupère la section HTML sur laquelle on va injecter notre panier
const injectCartSection = document.getElementById('cart__items')

//On vérifie si le panier n'est pas vide
if(!productsInLS){
    injectCartSection.innerHTML = `<p>Le panier est vide</p>`
} else {
    //On parcours le tableau du panier et on affiche chaque produit
    for(let i= 0; i < productsInLS.length; i++) {
        console.log('Clé du tableau n°: ' + i)
        itemIteration = productsInLS[i]
        injectCartSection.innerHTML += `
        <article class="cart__item" data-id=${itemIteration.id} data-color=${itemIteration.color}>
                <div class="cart__item__img">
                  <img src=${itemIteration.image} alt="${itemIteration.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${itemIteration.name}</h2>
                    <p>${itemIteration.color}</p>
                    <p>${itemIteration.price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${itemIteration.quantity}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${itemIteration.quantity}>
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
        `
    }
}

//On calcule la valeur totale du panier
//On commence par calculer la quantité totale de produits dans le panier
let totalQtyItemsElement = document.getElementById('totalQuantity')
let totalPriceItemsElement = document.getElementById('totalPrice')
let totalQty = 0
let totalPrice = 0

function sumCartCalculate(){
    let productsInLS = parseLS()
    for(let i=0; i < productsInLS.length; i++) {
        //Pour chaque item du panier je veux récuperer sa quantité et stocker le total
        totalQty = totalQty + productsInLS[i].quantity
        console.log('Je rajoute la quantité: ' + productsInLS[i].quantity);
        //Pour chaque item du panier je veux récuperer son prix et le stocker dans le total
        totalPrice = totalPrice + productsInLS[i].quantity * productsInLS[i].price
        console.log('Je rajoute le prix: ' + productsInLS[i].quantity * productsInLS[i].price);
    }

    console.log('Quantité de produits dans le panier: ' + totalQty);
    console.log('Prix total: ' + totalPrice);

    totalQtyItemsElement.innerHTML = totalQty
    totalPriceItemsElement.innerHTML = totalPrice
}

sumCartCalculate()

//MODIFICATION

function modifCartElements() {
    //Recuperation de l'element sur lequel on ecoute l'evenement
    let modifQty = document.querySelectorAll('.itemQuantity')

//On boucle sur les tous les elements comportant l'input
    for(let q=0; q < modifQty.length; q++){
        //On ecoute les modifications sur l'input, quand la valeur de celui ci change(event)
        modifQty[q].addEventListener('change', function (e) {
            // On stoppe l'évenement par défaut pour chaque input
            e.preventDefault()

            //On recupère l'id, la couleur du produit et la valeur de l'input dont la quantité vient dêtre changé et on vient les stocker dans 3 variable distinctes.
            let itemModifId = modifQty[q].closest('.cart__item').dataset.id
            console.log("L'ID de l'element en cours de modification est: " + itemModifId)
            let itemModifColor = modifQty[q].closest('.cart__item').dataset.color
            console.log("La couleur de l'élément en cours de modification est: " + itemModifColor )
            let itemModifInputValue = modifQty[q].value
            console.log("La valeur de l'input en cours de modification est: " + itemModifInputValue)
            //On modifie le dom avec le innerhtml du panier(total(): €) pour le refleter la nouvelle quantité
            let itemModifQty = modifQty[q].previousElementSibling.innerHTML = "Qté : " + modifQty[q].value
            console.log("La nouvelle quantité: " + itemModifQty)
            //On recupère dans le localstorage le produit dont l'id et la couleur correspondent avec celui qui vient d'être modifié
            let itemModifQtyLS = productsInLS[q].quantity
            console.log('Quantité initiale du local storage: ' + itemModifQtyLS)
            //On modifie dans le localstorage la quantité du produit pour refleter la nouvelle quantité

                localStorage.setItem("panier", JSON.stringify(productsInLS))
            //On recalcule la somme du panier en utilisant la fonction sumCartCalculate
        })
}
}

modifCartElements()




