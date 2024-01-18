/*  définition des éléments du formulaire
 définir Email, mot de passe et bouton d'envoi*/

 /*ajouter un écouteur d'événement à l'envoi du formulaire
 quand le formulaire de connection est fourni, on va executer la fonction suivante
 empecher l'envoi par défaut et on lance la verification du formulaire*/


 /*verification de l'identifiant si c'est un email
 --si l'email ne correspond pas, affichage message d'erreur et arret de l'envoi
 --si l'email est valide, on envoi requete POST à l'adresse de l'API avec à l'interieur:
 .en-tête: content type application JSON
 .body de la requete du json qui contient l'email et le mot de passe
 --attendre la réponse et convertir la réponse en JSON
 --stocker le token dans le stockage local => rediriger vers l'index.html
 --si pas de token message d'erreur de connection*/



 const password = document.querySelector("#password")
 const email = document.querySelector("#email")
 const loginButton = document.querySelector("#loginButton")

 loginButton.addEventListener("submit",async (event) => {
    event.preventDefault()
    const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    if (emailRegex.test(email.value)===false){
        const messageError=document.querySelector(".erreurEmail")
        messageError.style.display="flex"
        return
    } else{
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
    }).then(response=>response.json())
    .then(data=>{
        let token=data.token
        if (token){
            localStorage.setItem("Token", token)
            window.location.replace("index.html")
        }else{
            const erreurPassword=document.querySelector(".erreurMotdepasse")
            erreurPassword.style.display="flex"
        }
    })
    }
 })