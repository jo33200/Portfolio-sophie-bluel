//-----------------------------------------USER--------------------------------------------------



// -------------------------------------------------------- Variables globales

const conteneurImages = document.querySelector(".gallery");
const modalContent = document.querySelector(".projectImg");



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
            afficherImagesDansModal(works);
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



//-------------------------------------ADMIN---------------------------------------------------



//---------------------------------------------------------Display admin


//-----------------------Variable générales

// récupérer le token dans le stockage local
let token = localStorage.getItem("Token")

//faire disparaitre les filters
const filtersRemove = document.querySelector("#filters");

// Récupérez le conteneur des nouveaux éléments
const titlePortfolio = document.getElementById("portfolio");
const bannerEdit = document.querySelector(".bannerEdit")

// ajouts au DOM
const projectTitle = document.querySelector(".titreProjet")



// condition de vérification du login
const storedToken = localStorage.getItem("Token");
const TokenExpiration = localStorage.getItem("TokenExpiration");

if (storedToken && TokenExpiration && Date.now() < TokenExpiration){
    displayAdmin()
}



function displayAdmin() {
    
    // faire disparaitre les filtres
    document.querySelector("#filters").style.display = "none";

    // faire apparaitre les éléments créé dans index.html
    bannerEdit.style.display="flex";
    
    // Créez de nouveaux éléments
    const divTitreProjet = document.createElement("div");
    divTitreProjet.classList.add("titreLoginProjet")

    const modifyButton = document.createElement("button");
    modifyButton.classList.add("modify");

    const editIcone = document.createElement("i");
    editIcone.classList.add("far","fa-pen-to-square");

    const textModify = document.createElement("p");
    textModify.textContent = "modifier";

    // Ajoutez le nouveau paragraphe au conteneur

    titlePortfolio.appendChild(divTitreProjet);
    titlePortfolio.insertBefore(divTitreProjet, titlePortfolio.firstChild);
    
    divTitreProjet.appendChild(projectTitle);
    divTitreProjet.appendChild(modifyButton);
    
    modifyButton.appendChild(editIcone);
    modifyButton.appendChild(textModify);
    
}

//------------------------------------------------------ Modal

//faire apparaitre la modal avec l'évènement clic sur bouton modifier
//variables génarales

const modifyButton = document.querySelector(".modify")
const modalElement = document.querySelector(".modal")
const deleteButton = document.querySelector(".fa-xmark")
const previousButton = document.querySelector(".fa-arrow-left")
const ajoutButton = document.querySelector(".ajoutImage")
const galleryModal= document.querySelector(".projectImg")
const titleModalGallery = document.querySelector(".titleModalGallery")
const titleModalAjout = document.querySelector(".titleModalAjout")
const windowModalAjout = document.querySelector(".windowAjoutImg")

modifyButton.addEventListener("click", () => {
    modalElement.style.display="block";
    previousButton.style.opacity="0";
    titleModalGallery.style.display="flex";
    galleryModal.style.display="grid";
} )

// faire apparaitre la modal d'ajout d'image

function openWindowModalAjout(){
    // faire disparaitre les élément de la première modal
        titleModalGallery.style.display="none";
        galleryModal.style.display="none";

    // faire apparaitre les éléments créé dans index.html
        titleModalAjout.style.display="flex";
        previousButton.style.opacity="1";

    // Créez de nouveaux éléments
    const imageSpace = document.createElement("div");
    imageSpace.classList.add("imageSpace");

    const imageWithout = document.createElement("img");
    imageWithout.classList.add("imageWithout");
    
    // Ajoutez le nouveau paragraphe au conteneur
    windowModalAjout.appendChild(imageSpace);

}

ajoutButton.addEventListener("click", () =>{
    openWindowModalAjout()
    
})


//faire disparaitre la modal

deleteButton.addEventListener("click",() =>{
    modalElement.style.display = "none";
    titleModalAjout.style.display ="none";
} )

// revenir à la modal précédente

previousButton.addEventListener("click", () =>{
    titleModalGallery.style.display ="flex";
    titleModalAjout.style.display ="none";
    galleryModal.style.display ="grid";
    previousButton.style.opacity="0";
})

//afficher les img dans la modal
function afficherImagesDansModal(works){
    console.log("Fonction afficherImagesDansModal appelée avec :", works);
    //effacer le contenu de la div
    modalContent.innerHTML="";

    // Parcourir les images et créer des balises <img> pour chaque image
    works.forEach(work => {
        const articleImage = document.createElement("article");
        modalContent.appendChild(articleImage);
        articleImage.classList=work.category.name
        articleImage.setAttribute("id",work.id)

        // Ajout d'une div noire dans le coin en haut à droite
        const deleteDiv = document.createElement("div");
        deleteDiv.classList.add("deleteDiv");
        articleImage.appendChild(deleteDiv);

        // ajout de l'icone de suppression
        const deleteIcone = document.createElement("i");
        deleteIcone.classList.add("fas", "fa-trash-can");
        deleteDiv.appendChild(deleteIcone);

        // ajout d'image dans l'article
        const img=document.createElement("img");
        img.src=work.imageUrl
        articleImage.appendChild(img)

    });


}

// Appeler la fonction pour récupérer et afficher les images
recupererImagesDepuisAPI();

