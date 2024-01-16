// -------------------------------------------------------- Variables globales

const conteneurImages = document.querySelector(".gallery");



// -------------------------------------------------------- Affichage utilisateur


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

        // ajout du title de l'image
        const title=document.createElement("h3")
        title.textContent=work.title
        articleElement.appendChild(title)
    });
}

// Appeler la fonction pour récupérer et afficher les images
recupererImagesDepuisAPI();


// --------------------------------------------------------------- Filters


const buttonTous = document.querySelector(".btn-tous");
buttonTous.addEventListener("click", () => {
    // Afficher toutes les images sur l'interface utilisateur
    afficherImagesSurInterface(works);
});

const buttonObjets = document.querySelector(".btn-objets");
buttonObjets.addEventListener("click", () => {
    // Filtrer les œuvres qui ont la catégorie "Objets"
    const filteredObjets = works.filter(work => work.category.name === "Objets");
    // Afficher les images filtrées sur l'interface utilisateur
    afficherImagesSurInterface(filteredObjets);
});

const buttonAppart = document.querySelector(".btn-appart");
buttonAppart.addEventListener("click", () => {
    // Filtrer les œuvres qui ont la catégorie "Appart"
    const filteredAppart = works.filter(work => work.category.name === "Appartements");
    // Afficher les images filtrées sur l'interface utilisateur
    afficherImagesSurInterface(filteredAppart);
});

const buttonHotel = document.querySelector(".btn-hotel");
buttonHotel.addEventListener("click", () => {
    // Filtrer les œuvres qui ont la catégorie "Hotel"
    const filteredHotel = works.filter(work => work.category.name === "Hotels & restaurants");
    // Afficher les images filtrées sur l'interface utilisateur
    afficherImagesSurInterface(filteredHotel);
});


// Animation button filters

document.addEventListener("DOMContentLoaded", function () {
    const filterItems = document.querySelectorAll(".filter-item");

    filterItems.forEach(item => {
        item.addEventListener("click", function () {
            // Retirer la classe "active" de tous les éléments
            filterItems.forEach(item => item.classList.remove("active"));

            // Ajouter la classe "active" à l'élément cliqué
            this.classList.add("active");

            // Appeler la fonction pour appliquer le filtre correspondant
            const category = this.getAttribute("data-category");
            filterImages(category);
        });
    });

    // Fonction pour appliquer le filtre correspondant
    function filterImages(category) {
        // Ajoutez ici le code pour filtrer les images en fonction de la catégorie
        // Utilisez la variable "works" ou la méthode appropriée selon votre implémentation
        console.log("Filtrer les images par catégorie :", category);
    }
});