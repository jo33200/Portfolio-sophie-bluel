// -------------------------------------------------------- GLOBAL VARIABLES
//Variables display admin
const bannerEdit = document.querySelector(".bannerEdit") 
const titlePortfolio = document.getElementById("portfolio");
const filtersRemove = document.querySelector("#filters");
const projectTitle = document.querySelector(".titreProjet")
const conteneurImages = document.querySelector(".gallery");

const divTitreProjet = document.createElement("div");
    divTitreProjet.classList.add("titreLoginProjet")
const modifyButton = document.createElement("button");
    modifyButton.classList.add("modify");
const editIcone = document.createElement("i");
    editIcone.classList.add("far","fa-pen-to-square");
const textModify = document.createElement("p");
    textModify.textContent = "modifier";

titlePortfolio.appendChild(divTitreProjet);
titlePortfolio.insertBefore(divTitreProjet, titlePortfolio.firstChild);
divTitreProjet.appendChild(projectTitle);
divTitreProjet.appendChild(modifyButton);
modifyButton.appendChild(editIcone);
modifyButton.appendChild(textModify);

//Variables modal
const modal=document.querySelector(".modal");
const modalHome=document.querySelector(".modalHome")
const btnCloseModal=document.querySelector(".fa-xmark");
const previousButton = document.querySelector(".fa-arrow-left")
const formModal = document.createElement("form");
const btnOuvrirAjout=document.querySelector(".ajoutImage")
const modalContent = document.querySelector(".modalContent")
const windowModalAjout = document.querySelector(".windowAjoutImg")
const windowModal = document.querySelector(".windowModal")
const titleModalGallery = document.querySelector(".titleModalGallery")


const titleModalAjout = document.createElement("h4")
    titleModalAjout.textContent="Ajout photo";
const imageSpace = document.createElement("div");
    imageSpace.classList.add("imageSpace");

windowModalAjout.appendChild(titleModalAjout);

function displayAdmin() {  
    // faire disparaitre les filtres
    document.querySelector("#filters").style.display = "none";
    // faire apparaitre les éléments créé dans index.html
    bannerEdit.style.display="flex";
    modifyButton.style.display="flex";
    
}

// ----------------------------------------------------ADDEVENTLISTENER

modifyButton.addEventListener("click", () => {
    modal.style.display="block";
    windowModal.style.display="flex";
    modalHome.style.display="flex";
    windowModalAjout.style.display="none";
    
});
btnOuvrirAjout.addEventListener("click", ()=> {
    modal.style.display="block";
    windowModal.style.display="flex";
    modalHome.style.display="none";
    windowModalAjout.style.display="flex";
    preparFormAjout();
});

btnCloseModal.addEventListener("click", ()=> {
    modal.style.display="none";
    formSpace.innerHTML="";
});

formModal.addEventListener("submit", function (event){
    event.preventDefault()
    ajouterImage()
});
previousButton.addEventListener("click", () =>{
    imageSpace.innerHTML='';
    formSpace.innerHTML="";
    modal.style.display="block";
    windowModal.style.display="flex";
    modalHome.style.display="flex";
    windowModalAjout.style.display="none";
});
modal.addEventListener('click', (event) => {
    // Vérifiez si l'élément cliqué n'est pas à l'intérieur de la fenêtre modale
    if (!windowModal.contains(event.target) && event.target !== modifyButton) {
        // Si c'est le cas, fermez la modal
        modal.style.display = 'none';
    }
});

//---------------------------------------------------------FUNCTIONS MODAL
function preparFormAjout(){
    const formAjoutImage= document.createElement("form")
    formAjoutImage.id="formAjoutImage"
    formAjoutImage.innerHTML=`
    <div class="spaceImage">
    <i class="fa-regular", "fa-image"></i>
    <input id="fileImage" type="file" required >
    <span>jpg, png : 4mo max</span></div>
    <input id="titreImage" type="text" placeholder="titre de l'image" required >
    <select id="categorySelect">
    <option value=""> choisir catégorie </option>
    <option value="Objet">Objet</option>
    <option value="Appartement">Appartement </option>
    <option value="Hôtel et restaurant">Hôtel et restaurant </option>
    </select>
    <div class="separLine"></div>
    <button type="submit"> Valider </button>`
    
    windowModalAjout.appendChild(formAjoutImage);
    const fileImage = formAjoutImage.querySelector('#fileImage');
    const spaceImage = formAjoutImage.querySelector(".spaceImage");
    fileImage.addEventListener('change', (event) => {
        const file = event.target.files[0];
        // Vérifiez si un fichier a été sélectionné
        if (file) {
            const reader = new FileReader();
            // Gérez l'événement de chargement de fichier
            reader.onload = (e) => {
                const imagePreview = document.createElement('img');
                imagePreview.src = e.target.result;    
                // Supprimez le contenu existant de la zone imageSpace
                spaceImage.innerHTML = '';
                // Ajoutez l'image prévisualisée à la zone imageSpace
                spaceImage.appendChild(imagePreview);
            };
            // Lisez le contenu du fichier en tant qu'URL de données
            reader.readAsDataURL(file);
        }
    });
    formAjoutImage.addEventListener("submit", function (event){
        event.preventDefault()
        ajoutImage()
    })
}

function ajoutImage() {
    const formData = new FormData();
        formData.append('image', document.querySelector("#fileImage")) // récupère l'image' sélectionné
        formData.append('title',titreImage.value); // récupère le titre de l'image
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
                return recupererImagesDepuisAPI();
                }
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout de l'image :", error);
            });
}
recupererImagesDepuisAPI();
// -------------------------------------------------------- USER DISPLAY

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

// --------------------------------------------------------------- FILTERS

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

// condition de vérification du login
const storedToken = localStorage.getItem("Token");
const TokenExpiration = localStorage.getItem("TokenExpiration");
if (storedToken && TokenExpiration && Date.now() < TokenExpiration){
    displayAdmin()
}



//------------------------------------------------------ Modal gallery

//faire apparaitre la modal avec l'évènement clic sur bouton modifier
//variables génarales
    
    
    

//----------------------------------------------------------- Modal d'ajout d'image

// faire apparaitre une modal pour rajouter une image
// Créez de nouveaux éléments
    

//faire disparaitre la modal
    
   // Ajoutez un écouteur d'événements au clic sur document
    
    
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

// API-------------------------------------Ajout d'image dans la gallery



// API-------------------------------------Suppression d'image dans la gallery

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

// Appeler la fonction pour récupérer et afficher les images
recupererImagesDepuisAPI();