/**
 * Vérifie si la réponse est ok et retourne le résultat de la méthode JSON de l'objet "Response"
 *
 * @param response
 * @returns {any | Promise<any>}
 */
function handleResponse(response) {
    if (response.ok) {
        return response.json()
    }
}


/**
 * Parse le panier du local storage
 * Lors de l'appel de la fonction, celle ci parse le panier contenu dans le local storage, permettant de pouvoir travailler avec
 *
 * @param ()
 * @returns {JSON Parse LocalStorage item}
 */
function parseLS() {
    return JSON.parse(localStorage.getItem("panier"))
}