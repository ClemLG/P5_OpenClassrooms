// Déclaration

/**
 * Récuperation des données produits auprès de l'API et injection des élements dans la page d'accueil
 */
function fetchProductsAndInject() {
    fetch("http://localhost:3000/api/products")
        .then(handleResponse)
        .then(function(products) {
            // Récupération
            const itemsEl = document.querySelector('section#items')

            // Logique
            for(let i = 0; i < products.length; i++) {
                const product = products[i]
                itemsEl.innerHTML = itemsEl.innerHTML + `
<a href="">
   <article>
       <img src="${product.imageUrl}" alt="${product.altTxt}">
       <h3 class="productName">${product.name}</h3>
       <p class="productDescription">${product.description}</p>
   </article>
</a>`
            }
        })
        .catch((err) => {

        })
}


// Execution
fetchProductsAndInject()
