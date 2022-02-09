// Déclaration

/**
 * Récuperation des données produits auprès de l'API et injection des élements dans la page d'accueil
 */
function fetchProductsAndInject(){
    fetch("http://localhost:3000/api/products")
        .then(handleResponse)
        //Réception de la réponse en JSON. Maintenant nous devons récuperer l'élement qui va comporter les produits et ensuite les afficher à l'intérieur
        .then(function (products) {
            console.log(products)
            for(let i = 0; i < products.length; i++){
                const product = products[i]
                const itemsEl = document.querySelector("section#items")
                   itemsEl.innerHTML = itemsEl.innerHTML + `
                    <a href="./product.html?id=${product._id}">
                        <article>
                            <img src="${product.imageUrl}" alt="${product.altTxt}">
                            <h3 class="productName">${product.name}</h3>
                            <p class="productDescription">${product.description}</p>
                        </article>
                    </a>`
            }
        })
        .catch(function(err) {

        })
}


// Execution
fetchProductsAndInject()