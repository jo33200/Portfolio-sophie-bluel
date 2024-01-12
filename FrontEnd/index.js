const conteneurImages = document.querySelector(".gallery");

// Fonction pour recuperer les images depuis l'API
function recupererImagesDepuisAPI() {
    const urlAPI = "http://localhost:5678/api/works";

    return fetch(urlAPI)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur de récupération des images : ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // une fois donnée récupere, les stocker dans une variable works
            works=data
        // Une fois les images récupérées, les afficher sur l'interface utilisateur
            afficherImagesSurInterface(works);
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des images depuis l'API :", error);
        });
}

// Fonction pour afficher les images sur l'interface utilisateur
function afficherImagesSurInterface(works) {
    // vider le conteneur image par défaut
    conteneurImages.innerHTML =""
// Parcourir les images et créer des balises <img> pour chaque image
    works.forEach(work => {
        const articleElement = document.createElement("article");
        conteneurImages.appendChild(articleElement);
        articleElement.classList=work.category.name
        articleElement.setAttribute("id",work.id)

        // ajout d'image dans l'article
        const img=document.createElement("img");
        img.src=work.imageUrl
        articleElement.appendChild(img)
    });
}

// Appeler la fonction pour récupérer et afficher les images
recupererImagesDepuisAPI();







