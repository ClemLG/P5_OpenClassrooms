//On récupère le tableau stocké dans le local storage et on le parse pour pouvoir l'utiliser
let productsInLS = JSON.parse(localStorage.getItem("panier"))
console.log(productsInLS)

//On récupère la section HTML sur laquelle on va injecter notre panier
const injectCartSection = document.getElementById('cart__items')

//On vérifie si le panier n'est pas vide
if(!productsInLS){
    injectCartSection.innerHTML = `<p>Le panier est vide</p>`
} else {
    //On parcours le tableau du panier et on affiche chaque produit
    for(let i= 0; i < productsInLS.length; i++) {
        console.log('Clés du tableau: ' + i)
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
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
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
