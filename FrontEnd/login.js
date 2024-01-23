/*  définition des éléments du formulaire
 définir Email, mot de passe et bouton d'envoi*/

 const password = document.querySelector("#password")
 const email = document.querySelector("#email")
 const loginButton = document.querySelector("#loginButton")



/*ajouter un écouteur d'événement à l'envoi du formulaire
 quand le formulaire de connection est fourni, on va executer la fonction suivante
 empecher l'envoi par défaut et on lance la verification du formulaire*/

 document.querySelector("form").addEventListener("submit",async (event) => {

    // bloquer le comportement du navigateur par défaut
    event.preventDefault()
    
    // variable pour la regex (verification si c'est un email)
    const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;

    // Réinitialiser l'affichage des messages d'erreur
    document.querySelector(".erreurEmail").style.display = "none";
    document.querySelector(".erreurMotdepasse").style.display = "none";

    // regex de l'email n'est pas bonne
    if (emailRegex.test(email.value)===false){
        // apparition du message d'erreur
        const messageError=document.querySelector(".erreurEmail")
        messageError.style.display="flex"
        return// arret de l'envoi
    } else{
        /*si l'email est valide, on envoi requete POST à l'adresse de l'API avec à l'interieur:
        .en-tête: content type application JSON
        .body de la requete du json qui contient l'email et le mot de passe*/
        fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
            //"autorisation": token
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
        }).then(response=>response.json())//attendre la réponse et convertir la réponse en JSON
        .then(data=>{
        //stocker le token dans le stockage local => rediriger vers l'index.html
        let token=data.token
        if (token){
            localStorage.setItem("Token", token)
            window.location.replace("index.html")
        }else{ //si pas de token message d'erreur de connection
            const erreurPassword=document.querySelector(".erreurMotdepasse")
            erreurPassword.style.display="flex"
        }
    })
    }
 })

 /* Ajouter un deuxième écouteur d'événements au clic sur le bouton de connexion
 Cela gère spécifiquement les erreurs d'email incorrectes sans empêcher la soumission du formulaire */

loginButton.addEventListener("click", () => {
    // Variable pour la regex (vérification si c'est un email)
    const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;

    // Si la regex de l'email n'est pas correcte
    if (emailRegex.test(email.value) === false) {
        // Affichage du message d'erreur
        const messageError = document.querySelector(".erreurEmail");
        messageError.style.display = "flex";
    }
});