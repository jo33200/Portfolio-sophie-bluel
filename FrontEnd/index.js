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



//------------------------------------------------------ Modal gallery

//faire apparaitre la modal avec l'évènement clic sur bouton modifier

//variables génarales
    const modifyButton = document.querySelector(".modify")
    const modalElement = document.querySelector(".modal")
    const windowModal = document.querySelector(".windowModal")
    const deleteButton = document.querySelector(".fa-xmark")
    const previousButton = document.querySelector(".fa-arrow-left")
    const ajoutButton = document.querySelector(".ajoutImage")
    const galleryModal= document.querySelector(".projectImg")
    const titleModalGallery = document.querySelector(".titleModalGallery")
    const titleModalAjout = document.querySelector(".titleModalAjout")
    const windowModalAjout = document.querySelector(".windowAjoutImg")
    const validationImageButton = document.querySelector(".validationImageButton")


    // créer un bouton "modifier"
    modifyButton.addEventListener("click", () => {
        modalElement.style.display="block";
        previousButton.style.opacity="0";
        titleModalGallery.style.display="flex";
        galleryModal.style.display="grid";
        ajoutButton.style.display="flex";
        windowModalAjout.style.display ="none";
        validationImageButton.style.display="none";
    } )

//----------------------------------------------------------- Modal d'ajout d'image

// faire apparaitre une modal pour rajouter une image

// Créez de nouveaux éléments
    const imageSpace = document.createElement("div");
    imageSpace.classList.add("imageSpace");
    const imageWithout = document.createElement("i");
    imageWithout.classList.add("fa-regular", "fa-image");
    const openExplorerWindows = document.createElement("button");
    openExplorerWindows.classList.add("openExplorerWindows");
    openExplorerWindows.textContent="+ Ajouter photo";
    const textFormatImage = document.createElement("p");
    textFormatImage.textContent="jpg, png : 4mo max";
    textFormatImage.classList.add("textFormatImage")

// Création du formulaire
    const formModal = document.createElement("form");
// Création du label pour le titre
    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Titre : ";
// Création de l'input pour le titre
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "titre";
// Ajout du label et de l'input au formulaire
    formModal.appendChild(titleLabel);
    formModal.appendChild(titleInput);
// Création du label pour la catégorie
    const categoryLabel = document.createElement("label");
    categoryLabel.textContent = "Catégorie : ";
// Création du menu déroulant pour la catégorie
    const categorySelect = document.createElement("select");
    categorySelect.name = "categorie";
// Ajout d'options au menu déroulant
    const options = ["","Objets", "Appartements", "Hotels & restaurants"];
    for (let i = 0; i < options.length; i++) {
        const option = document.createElement("option");
        option.value = options[i];
        option.text = options[i];
        categorySelect.appendChild(option);
}
// Ajout du label et du menu déroulant au formulaire
    formModal.appendChild(categoryLabel);
    formModal.appendChild(categorySelect);


// Ajoutez le nouveau paragraphe au conteneur
    windowModalAjout.appendChild(imageSpace);
    windowModalAjout.appendChild(formModal);
    imageSpace.appendChild(imageWithout);
    imageSpace.appendChild(openExplorerWindows);
    imageSpace.appendChild(textFormatImage);
    
    

// Fonction d'ajout de la modal d'ajout avec les éléments qui changent
    function openWindowModalAjout(){
        // faire disparaitre les élément de la première modal
            titleModalGallery.style.display="none";
            galleryModal.style.display="none";
            ajoutButton.style.display="none";

        // faire apparaitre les éléments créé dans index.html
            titleModalAjout.style.display="flex";
            previousButton.style.opacity="1";
            windowModalAjout.style.display="flex";

            validationImageButton.style.display="flex";

    }

    ajoutButton.addEventListener("click", () =>{
        validationImageButton.style.display="none";
        openWindowModalAjout()
        
    })


//faire disparaitre la modal

    deleteButton.addEventListener("click",() =>{
        modalElement.style.display = "none";
        titleModalAjout.style.display ="none";
    } )

   // Ajoutez un écouteur d'événements au clic sur document
modalElement.addEventListener('click', (event) => {
    // Vérifiez si l'élément cliqué n'est pas à l'intérieur de la fenêtre modale
    if (!windowModal.contains(event.target) && event.target !== modifyButton) {
        // Si c'est le cas, fermez la modal
        modalElement.style.display = 'none';
        titleModalAjout.style.display = 'none';
    }
});


// revenir à la modal précédente

    previousButton.addEventListener("click", () =>{
        imageSpace.innerHTML='';
        titleModalGallery.style.display ="flex";
        titleModalAjout.style.display ="none";
        galleryModal.style.display ="grid";
        previousButton.style.opacity="0";
        windowModalAjout.style.display="none";
        ajoutButton.style.display="flex";
        validationImageButton.style.display="none";

        imageSpace.appendChild(imageWithout);
        imageSpace.appendChild(openExplorerWindows);
        imageSpace.appendChild(textFormatImage);
        
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

        // Ajout de l'événement de suppression
        deleteDiv.addEventListener("click", () => {
            // Récupérer l'ID de l'image à supprimer
            const imageId = work.id;

            // Appeler la fonction pour supprimer l'image
            supprimerImage(imageId);

        });


    });
}

// Appeler la fonction pour récupérer et afficher les images
recupererImagesDepuisAPI();




// faire une fonction pour prévisualiser une image sélectionné dans l'explorateur windows

// Sélectionnez l'élément d'entrée de type fichier
const inputFileChooser = document.createElement('input');
inputFileChooser.type = 'file';

// Gérez l'événement de changement de fichier
inputFileChooser.addEventListener('change', (event) => {
    const file = event.target.files[0];

    // Vérifiez si un fichier a été sélectionné
    if (file) {
        const reader = new FileReader();

        // Gérez l'événement de chargement de fichier
        reader.onload = (e) => {
            const imagePreview = document.createElement('img');
            imagePreview.src = e.target.result;

            // Supprimez le contenu existant de la zone imageSpace
            imageSpace.innerHTML = '';

            // Ajoutez l'image prévisualisée à la zone imageSpace
            imageSpace.appendChild(imagePreview);
        };

        // Lisez le contenu du fichier en tant qu'URL de données
        reader.readAsDataURL(file);
    }
});

// Ouvrir l'explorateur windows au click
    openExplorerWindows.addEventListener('click', () => {
        inputFileChooser.click();
    });

// API-------------------------------------Ajout d'image dans la gallery

    validationImageButton.addEventListener("click", ()=>{
        // Récupérez les informations sur l'image, le nom et la categorie
        const formData = new FormData();
        formData.append('image', inputFileChooser.files[0]) // récupère l'image' sélectionné
        formData.append('title', titleInput.value); // récupère le titre de l'image
        formData.append('category', categorySelect.value); // récupère la catégorie de l'image
        
        //récupération du token
        const token = localStorage.getItem("Token"); 

        // URL de l'API 
        const urlAPI = "http://localhost:5678/api/works";

        // Options de la requête POST
        const options ={
            method:'POST',
            body: formData,
            headers:{
                'Authorization': `Bearer ${token}` // Ajouter jeton d'authentification
            }
        };

        // Envoyez la requête POST à l'API
        fetch(urlAPI, options)
            .then(async(response)=>{
                if(!response.ok){
                   alert("l'image à bien été ajouté")
                    
                // Si la requête est réussie, mettez à jour la galerie en récupérant à nouveau les images depuis l'API
                
                await recupererImagesDepuisAPI();
                
                }
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout de l'image :", error);
            });

    });

    // Fonction pour supprimer une image
function supprimerImage(imageId) {
    // Récupérer le token
    const token = localStorage.getItem("Token");

    // URL de l'API pour supprimer une image spécifique
    const urlAPI = `http://localhost:5678/api/works/${imageId}`;

    // Options de la requête DELETE
    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}` // Ajouter le token d'authentification
        }
    };

    // Envoyer la requête DELETE à l'API
    fetch(urlAPI, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur lors de la suppression de l'image : ${response.status}`);
            }
            // Recharger les images après la suppression
            return recupererImagesDepuisAPI();
        })
        .catch(error => {
            console.error("Erreur lors de la suppression de l'image :", error);
        });
}