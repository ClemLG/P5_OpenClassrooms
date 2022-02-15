
/**
 * Vérifie si la réponse est ok et retourne le résultat de la méthode JSON de l'objet "Response"
 *
 * @param response
 * @returns {any | Promise<any>}
 */
function handleResponse(response){
    if(response.ok){
        return response.json()
    }
}

/**
 * Déclare le panier dans une variable / Vérifie si il y a un panier dans le local storage
 * Si vide, on ajoute ce panier ce sous forme de tableau et on le converti en JSON / Sinon on parse celui déjà présent pour pouvoir le modifier et on le retourne par la suite
 *
 * @param ()
 * @returns {panierArray}
 */
function initializeCartArray() {
    let panierArray;

    if(!localStorage.panier) {
        panierArray = [];
        localStorage.panier = JSON.stringify(panierArray);
    } else {
        panierArray = JSON.parse(localStorage.panier);
    }
    return panierArray
}

