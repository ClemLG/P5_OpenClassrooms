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
function sumCartCalculate(){
let totalQtyItemsElement = document.getElementById('totalQuantity')
let totalPriceItemsElement = document.getElementById('totalPrice')
let totalQty = 0
let totalPrice = 0


    let productsInLS = parseLS()
    for(let i=0; i < productsInLS.length; i++) {
        //Pour chaque item du panier je veux récuperer sa quantité et stocker le total
        totalQty = parseInt(productsInLS[i].quantity) + parseInt(totalQty)
        console.log('Je rajoute la quantité: ' + totalQty);
        //Pour chaque item du panier je veux récuperer son prix et le stocker dans le total
        totalPrice = parseInt(totalPrice) + parseInt(productsInLS[i].quantity) * parseInt(productsInLS[i].price)
        console.log('Je rajoute le prix: ' + parseInt(productsInLS[i].quantity) * parseInt(productsInLS[i].price));
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
            //On modifie dans le localstorage la quantité du produit pour refleter la nouvelle quantité
            for(let l=0; l < productsInLS.length; l++){
                if(itemModifId === productsInLS[l].id && itemModifColor === productsInLS[l].color){
                    productsInLS[l].quantity = itemModifInputValue
                    localStorage.setItem("panier", JSON.stringify(productsInLS))
                    //On recalcule la somme du panier en utilisant la fonction sumCartCalculate
                    sumCartCalculate()
                }
            }
        })
}
}

modifCartElements()

//SUPPRESSION

function deleteCartElements() {
    let deleteElement = document.querySelectorAll('.deleteItem')

    for(let d=0; d < deleteElement.length; d++){
        deleteElement[d].addEventListener('click', function (event) {
            event.preventDefault()
            let itemDeleteId = deleteElement[d].closest('.cart__item').dataset.id
            console.log("L'ID de l'element en cours de suppression est: " + itemDeleteId)
            let itemDeleteColor = deleteElement[d].closest('.cart__item').dataset.color
            console.log("La couleur de l'élément en cours de suppression est: " + itemDeleteColor)
            deleteElement[d].closest('.cart__item').remove()
            let newLS = productsInLS.filter(product => product.id !== itemDeleteId && product.color !== itemDeleteColor)
            localStorage.setItem("panier", JSON.stringify(newLS))
            sumCartCalculate()
        })
    }
}

deleteCartElements()

/******************************Analyse & Envoi du formulaire******************************/

function getForm() {
    //Récupèration de l'élement HTML du formulaire
    let form = document.querySelector('.cart__order__form')
    console.log('le formulaire: ' + form)
    console.log('input du Prénom: ' + form.firstName)

    //ÉCOUTE DES INPUTS

    //First Name
    form.firstName.addEventListener('change', function() {
    validFirstName(this)
    })

    //Last Name
    form.lastName.addEventListener('change', function() {
    validLastName(this)
    })

    //City
    form.city.addEventListener('change', function() {
    validCity(this)
    })

    //Address
    form.address.addEventListener('change', function() {
        validAddress(this)
    })

    //Email
    form.email.addEventListener('change', function() {
        validEmail(this)
    })

    //VALIDATION DES INPUTS

    //Validation First Name
    function validFirstName(inputFirstName) {
        //Regex pour la validation First Name
        let firstNameRegExp = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ ,.\'-]+$/i
        let testFirstName = firstNameRegExp.test(inputFirstName.value)
        console.log('Résultat test regex firstName: ' + testFirstName)
        if(!testFirstName){
            let firstNameError = document.querySelector('.cart__order__form__question #firstNameErrorMsg')
            firstNameError.innerHTML = "Le prénom ne doit pas comporter de chiffres ou de caractères spéciaux"
            return false
        } else {
            let firstNameError = document.querySelector('.cart__order__form__question #firstNameErrorMsg')
            firstNameError.innerHTML = ""
            return true
        }
    }

    //Validation Last Name
    function validLastName(inputLastName) {
        //Regex pour la validation Last Name
        let lastNameRegExp = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ ,.\'-]+$/i
        let testLastName = lastNameRegExp.test(inputLastName.value)
        console.log('Résultat test regex lastName: ' + testLastName)
        if(!testLastName){
            let lastNameError = document.querySelector('.cart__order__form__question #lastNameErrorMsg')
            lastNameError.innerHTML = "Le nom ne doit pas comporter de chiffres ou de caractères spéciaux"
            return false
        } else {
            let lastNameError = document.querySelector('.cart__order__form__question #lastNameErrorMsg')
            lastNameError.innerHTML = ""
            return true
        }
    }

    //Validation City
    function validCity(inputCity) {
        //Regex pour la validation City
        let cityRegExp = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ ,.\'-]+$/i
        let testCity= cityRegExp.test(inputCity.value)
        console.log('Résultat test regex City: ' + testCity)
        if(!testCity){
            let cityError = document.querySelector('.cart__order__form__question #cityErrorMsg')
            cityError.innerHTML = "La ville ne doit pas comporter de chiffres ou de caractères spéciaux"
            return false
        } else {
            let cityError = document.querySelector('.cart__order__form__question #cityErrorMsg')
            cityError.innerHTML = ""
            return true
        }
    }

    //Validation Adresse
    function validAddress(inputAddress) {
        //Regex pour la validation Address
        let addressRegExp = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s,.'-]*$/
        let testAddress = addressRegExp.test(inputAddress.value)
        console.log('Résultat test regex Adresse: ' + testAddress)
        if(!testAddress){
            let addressError = document.querySelector('.cart__order__form__question #addressErrorMsg')
            addressError.innerHTML = "Adresse incorrecte"
            return false
        } else {
            let addressError = document.querySelector('.cart__order__form__question #addressErrorMsg')
            addressError.innerHTML = ""
            return true
        }
    }

    //Validation Email
    function validEmail(inputEmail) {
        //Regex pour la validation Email
        let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$','g')
        let testEmail = emailRegExp.test(inputEmail.value)
        console.log('Résultat test Email: ' + testEmail)
        if(!testEmail){
            let emailError = document.querySelector('.cart__order__form__question #emailErrorMsg')
            emailError.innerHTML = "Email Incorrect"
            return false
        } else {
            let emailError = document.querySelector('.cart__order__form__question #emailErrorMsg')
            emailError.innerHTML = ""
            return true
        }
    }

    //ANALYSE DU FORMULAIRE ET ENVOI DES DONNEES

    //Ecoute du bouton submit
    let submitButton = document.querySelector('#order')
    submitButton.addEventListener('click', function(e) {
        //La soumission du formulaire n'étant pour l'instant pas sécurisée, nous cassons l'action du submit pour pouvoir avant vérifier si tous les champs renvoient true
        e.preventDefault()
        if(validFirstName(form.firstName) && validLastName(form.lastName) && validCity(form.city) && validAddress(form.address) && (validEmail(form.email))){
            //Si tous les champs renvoient true, alors on constitue un objet contact et un tableau de produit qu'on envoi à l'api
            console.log('Envoi formulaire valide')
            const contact = {
                firstName:
            }
        } else {
            //On ne fait rien
            console.log('Envoi formulaire non Valide')
        }
    })
}

getForm()



