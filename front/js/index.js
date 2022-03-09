/**********************************Récupération et affichage des produits de l'API*************************************/


/**
 * Récupère les produits de l'api, vérifie si la réponse est ok et les affichent sur la page ou obtient une erreur
 *
 * @param
 * @returns {}
 */

// Déclaration
function fetchProductsAndInject() {
    fetch("http://localhost:3000/api/products")
        // Si réponse OK
        .then(handleResponse)
        // on
        .then(function (products) {
            // Pour chaque produit de l'API, on affiche son image et texte alternatif, son nom, sa description
            for (let i = 0; i < products.length; i++) {
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
        .catch(function (err) {

        })
}

// Execution
fetchProductsAndInject()