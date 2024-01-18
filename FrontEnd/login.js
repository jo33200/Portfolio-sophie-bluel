//------------------------Ajout de l'évènement

document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("loginButton");
    loginButton.addEventListener("click", login);
});



//-----------------------fonctions d'authentifications

// récupération et stockage du token
function saveToken(token) {
    localStorage.setItem("userToken", token);
}

// fonction d'authentification
function login( event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Construire les données à envoyer avec la requête POST
    const data = {
        email: email,
        password: password
    };

    // Effectuer la requête vers l'API
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            return response.json();
        } else{ 
            throw new Error(`Erreur de connexion : ${response.status}`);
        }
    })
    .then(data => {
        // Traiter la réponse de l'API après une connexion réussie
        document.getElementById("loginMessage").textContent = "authentification réussi!";
        console.log(data); // Vous pouvez gérer la réponse ici

        // Récupérer le token de connexion depuis la réponse de l'API
        const userData = data.token;

        // sauvegarder le token
        saveToken(userData);

        // redirection vers la page index.html
        document.location.href = "index.html";

        
    })
    .catch(error => {
        // Traiter les erreurs lors de la connexion
        document.getElementById("loginMessage").textContent = "Erreur d'email ou de mot de passe";
        console.error("Erreur lors de la connexion :", error);
    });
}
