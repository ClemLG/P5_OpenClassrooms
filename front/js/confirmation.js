/***************************************Récupération et suppression du numéro de commande********************************************************/

function getCommandNum(){
    //Récupération de l'element comprenant le numéro de commande
    const idNode = document.getElementById("orderId");
    //Affichage du numéro de commande
    idNode.innerText = localStorage.getItem("orderId");
    console.log('Le numéro de commande est: ' + localStorage.getItem("orderId"))
    //Suppresion du numéro de commande après actualisation
    localStorage.clear();
}

getCommandNum();