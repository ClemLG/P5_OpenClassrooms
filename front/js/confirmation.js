/***************************************Récupération et suppression du numéro de commande********************************************************/

function getCommandNum() {
    //Récupération de l'element comprenant le numéro de commande
    const idNode = document.getElementById("orderId");

    //Récupération de l'orderId compris dans l'url
    let urlString = window.location.href
    let url = new URL(urlString)
    let idOrder = url.searchParams.get('orderId')
    console.log("Order ID compris dans l'url: " + idOrder)

    //Affichage du numéro de commande
    idNode.innerText = idOrder;
    console.log('Le numéro de commande est: ' + idOrder)

    // On vérifie si l'order id compris dans l'URL est valide
    if (idOrder === null || idOrder === "") {
        throw 'URL Invalide'
    }

    //Suppresion du numéro de commande après actualisation
    localStorage.clear();
}

getCommandNum();