// --------------------------------- GLOBAL VARIABLES -----------------------

// récupérer le token dans le stockage local
let token = localStorage.getItem("Token")

//Variables filters
const buttonTous = document.querySelector(".btn-tous");
const buttonObjets = document.querySelector(".btn-objets");
const buttonAppart = document.querySelector(".btn-appart");
const buttonHotel = document.querySelector(".btn-hotel");

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
const btnOuvrirAjout=document.querySelector(".ajoutImage")
const modalContent = document.querySelector(".modalContent")
const windowModalAjout = document.querySelector(".windowAjoutImg")
const windowModal = document.querySelector(".windowModal")
let works = []; // Pour stocker les data récuperees de l'API
const titleModalGallery = document.querySelector(".titleModalGallery")
const titleModalAjout = document.createElement("h4")
    titleModalAjout.textContent="Ajout photo";
    windowModalAjout.appendChild(titleModalAjout);

// ---------------------------------- USER DISPLAY ---------------------------

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

function afficherImagesSurInterface(works) {
    conteneurImages.innerHTML = "";
    works.forEach(work => {
        const articleElement = document.createElement("article");
        articleElement.innerHTML = `
            <img src="${work.imageUrl}" alt="${work.title}">
            <h3>${work.title}</h3>`;
        conteneurImages.appendChild(articleElement);
    });
}

// ----------------------------------------------------------------- FILTERS
buttonTous.addEventListener("click", () => {
    // Afficher toutes les images sur l'interface utilisateur
    afficherImagesSurInterface(works);
});
buttonObjets.addEventListener("click", () => {
    // Filtrer les œuvres qui ont la catégorie "Objets"
    const filteredObjets = works.filter(work => work.category.name === "Objets");
    // Afficher les images filtrées sur l'interface utilisateur
    afficherImagesSurInterface(filteredObjets);
});
buttonAppart.addEventListener("click", () => {
    // Filtrer les œuvres qui ont la catégorie "Appart"
    const filteredAppart = works.filter(work => work.category.name === "Appartements");
    // Afficher les images filtrées sur l'interface utilisateur
    afficherImagesSurInterface(filteredAppart);
});
buttonHotel.addEventListener("click", () => {
    // Filtrer les œuvres qui ont la catégorie "Hotel"
    const filteredHotel = works.filter(work => work.category.name === "Hotels & restaurants");
    // Afficher les images filtrées sur l'interface utilisateur
    afficherImagesSurInterface(filteredHotel);
});
//Animation button filters
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
    function filterImages(category) {}
});

// ---------------------------------------------------------ADDEVENTLISTENER

document.addEventListener("DOMContentLoaded", () => {
    recupererImagesDepuisAPI();
    setupEventListeners();
});
function setupEventListeners() {
    btnOuvrirAjout.addEventListener("click", ouvrirModalAjout);
    btnCloseModal.addEventListener("click", () => modal.style.display = "none");
}
modifyButton.addEventListener("click", () => {
    setModalHome();
});
function setModalHome(){
    modal.style.display="block";
    windowModal.style.display="flex";
    modalHome.style.display="flex";
    windowModalAjout.style.display="none";
    previousButton.style.opacity="0";
}
function ouvrirModalAjout() {
    modal.style.display = "block";
    modalHome.style.display="none";
    windowModalAjout.style.display="flex";
    windowModal.style.display = "flex";
    titleModalAjout.style.display="flex";
    previousButton.style.opacity="1";
    preparerFormAjout();   
}
btnCloseModal.addEventListener("click", ()=> {
    modal.style.display="none";
    resetForm()
});
previousButton.addEventListener("click", () =>{
    modal.style.display="block";
    windowModal.style.display="flex";
    modalHome.style.display="flex";
    windowModalAjout.style.display="none";
    previousButton.style.opacity="0";
    resetForm()
});
modal.addEventListener('click', (event) => {
    // Vérifiez si l'élément cliqué n'est pas à l'intérieur de la fenêtre modale
    if (!windowModal.contains(event.target) && event.target !== modifyButton) {
        // Si c'est le cas, fermez la modal
        modal.style.display = 'none';
    }
});

//----------------------------------- DISPLAY ADMIN -------------------------

// fonction pour faire apparaitre les options de l'admin
function displayAdmin() {  
    // faire disparaitre les filtres
    document.querySelector("#filters").style.display = "none";
    // faire apparaitre les éléments créé dans index.html
    bannerEdit.style.display="flex";
    modifyButton.style.display="flex";

    const log = document.getElementById("log");
    log.innerText="logout";
    log.setAttribute("href", "index.html");
    log.addEventListener("click", logoutHandler);
}
// fonction pour gérer la déconnexion
function logoutHandler(event) {
    localStorage.removeItem("Token");
    alert("Vous êtes déconnecté.");
    const log = document.getElementById("log");
    log.removeEventListener("click", logoutHandler);
    log.innerText = "login"; 
}     
// condition de vérification du login
const storedToken = localStorage.getItem("Token");
const TokenExpiration = localStorage.getItem("TokenExpiration");
if (storedToken && TokenExpiration && Date.now() < TokenExpiration){
    displayAdmin()
}

//--------------------------------------------------------------------- MODAL
function afficherImagesDansModal(works){
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
function preparerFormAjout() {
    if (!document.querySelector("#formAjoutImage")) {
        const formAjoutImage = document.createElement("form");
        formAjoutImage.id = "formAjoutImage";
        formAjoutImage.innerHTML = `
        <div class="spaceImage">
        <i class="fa-regular fa-image"></i>
        <label for="fileImage" class="btnAjoutPhoto">+ Ajouter photo<input id="fileImage" type="file" required ></label>
        <span id="formatImage" >jpg, png : 4mo max</span></div>
        <div id="titleImage"><label>Titre</label>
        <input id="titreImage" type="text" required ></div>
        <div id="categoryImage"><label>Catégorie</label>
        <select id="categorySelect">
        <option value="">  </option>
        <option value="1">Objet</option>
        <option value="2">Appartement </option>
        <option value="3">Hôtel et restaurant </option>
        </select></div>
        <div class="separLine"></div>
        <button id="btnValidationAjoutImage" type="submit"> Valider </button>`;
        windowModalAjout.appendChild(formAjoutImage);
        formAjoutImage.addEventListener("submit", (event) => {
            event.preventDefault();
            ajoutImage();
        });
        addFileInputEventListener();
    }
}
function resetForm() {
    document.getElementById("formAjoutImage").reset();
    const spaceImage = document.querySelector(".spaceImage");
    const labelWithout = spaceImage.querySelector(".btnAjoutPhoto");
    const iconWithout = spaceImage.querySelector(".fa-regular.fa-image");
    const formatWithout = document.getElementById("formatImage");
    formatWithout.style.display = "block";
    iconWithout.style.display = "block";
    labelWithout.style.display = "flex";
    const imagePreview = spaceImage.querySelector(".imagePreview");
    if (imagePreview) {
        imagePreview.remove();
    }
}
function addFileInputEventListener() {
    const fileImage = document.querySelector('#fileImage');
    const spaceImage = document.querySelector(".spaceImage");
    fileImage.addEventListener('change', (event) => {
        const file = event.target.files[0];
        // Vérifiez si un fichier a été sélectionné
        if (file) {
            const reader = new FileReader();
            // Gérez l'événement de chargement de fichier
            reader.onload = (e) => {
                const imagePreview = document.createElement('img');
                    imagePreview.classList.add("imagePreview");
                imagePreview.src = e.target.result;
                //remplacer les élément en les display="none" 
                const labelWithout = spaceImage.querySelector(".btnAjoutPhoto");
                const iconWithout = spaceImage.querySelector(".fa-regular", "fa-image");
                const formatWithout = document.getElementById("formatImage");
                formatWithout.style.display="none";
                iconWithout.style.display="none";
                labelWithout.style.display="none";
                // Ajoutez l'image prévisualisée à la zone imageSpace
                spaceImage.appendChild(imagePreview);
            };
            // Lisez le contenu du fichier en tant qu'URL de données
            reader.readAsDataURL(file);
        }
    });
}
//-----------------------------------------------------------------AJOUT IMAGE
async function ajoutImage() {
    const formAjoutImage = document.querySelector("#formAjoutImage");
    const fileInput = formAjoutImage.querySelector("#fileImage");
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        console.error("Aucun fichier sélectionné.");
        return;
    }
    if(fileInput.files[0]==="" ||document.getElementById("titreImage").value==="" ||document.getElementById("categorySelect").value===""  ){
        console.log("formData valide")
    }else if(fileInput.files[0].size>4*1024*1024){
        console.log("taille image trop grande")
        }else{
    let formData = new FormData();
    formData.append('image', fileInput.files[0]);
    formData.append('title', document.getElementById("titreImage").value);
    formData.append('category', document.getElementById("categorySelect").value);
    const token = localStorage.getItem("Token");
    const urlAPI = "http://localhost:5678/api/works";
    const options = {
        method: "POST",
         headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData,
    };
    try{
    const res= await fetch(urlAPI, options)
            if (res.ok) { 
                res.json();
                recupererImagesDepuisAPI()
                ajouterImageSurInterface(works);
                ajouterImageDansModal(works)
                modal.style.display="none";
                setModalHome();
                afficherAlerte("l'image est ajouté avec succès!");
                resetForm();
            }else{
                console.log("erreur ajout", res.status)
            } 
    } catch(error){
        console.log("erreur lors de l'envoi", error)
    }
    }
}
function ajouterImageSurInterface(work) {
    // Créer un nouvel élément article pour la nouvelle image
    const articleElement = document.createElement("article");
    articleElement.innerHTML = `
        <img src="${work.imageUrl}" alt="${work.title}">
        <h3>${work.title}</h3>`;
    conteneurImages.appendChild(articleElement);
}
function ajouterImageDansModal(work) {
    // Créer un nouvel élément article pour la nouvelle image
    const articleElement = document.createElement("article");
    articleElement.innerHTML = `
        <img src="${work.imageUrl}" alt="${work.title}">
        <h3>${work.title}</h3>`;
    modalContent.appendChild(articleElement);
}
function afficherAlerte(message) {
    const modal = document.getElementById("customAlert");
    const messageBox = document.getElementById("customAlertMessage");
    messageBox.textContent = message;
    modal.style.display = "flex";
    // Masquer la boîte de dialogue après 3 secondes (3000 millisecondes)
  setTimeout(function() {
    modal.style.display = "none";
  }, 3000)
}
//----------------------------------------------------------SUPPRESSION IMAGE
function supprimerImage(imageId) {
    // Afficher la boîte de dialogue de confirmation
    afficherConfirmationSuppression(imageId);
}
function afficherConfirmationSuppression(imageId) {
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette image ?");
    if (confirmation) {
        supprimerImageConfirmed(imageId);
    } else {
        return;
    }
}
function supprimerImageConfirmed(imageId) {
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
            // Supprimer l'image de l'interface utilisateur sans recharger la page
            const deletedImage = document.getElementById(imageId);
            deletedImage.remove();
            setModalHome();
            recupererImagesDepuisAPI()
            afficherAlerte("L'image a été supprimée avec succès!");
        })
        .catch(error => {
            console.error("Erreur lors de la suppression de l'image :", error);
        });
}