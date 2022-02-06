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

