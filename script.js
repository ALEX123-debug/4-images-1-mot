const images = document.querySelectorAll(".image");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");
const word = document.getElementById("word");
//Mot et images correspondantes
const words = ["cacahuete", "cafe", "cerise", "raisin"];
const imagePaths = [
    "../images/cacahuete.jpg",
    "../images/cafe.jpg",
    "../images/cerise.jpg",
    "../images/raisin.jpg",
];
let correctImageIndex = 0; //Index de l'image correcte
let attempts = 0; //Nombre de tentatives
//Initialisation des images
function initializeGame(){
    attempts = 0;
    correctImageIndex = Math.floor(Math.random()*words.length);
    word.textContent = words[correctImageIndex];

    images.forEach((img,index) => {
        img.src = imagePaths[(index + correctImageIndex) % words.length];
        img.alt = words[(index + correctImageIndex) % words.length];
        img.classList.add("hidden"); //Masquer les images au départ
    });

    message.textContent = "";
    message.classList.remove("correct", "incorrect"); //Réinitialiser
}
initializeGame();
//Vérification du clic sur une image
images.forEach((img, index) => {
    img.addEventListener("click", () => {
        //Vérifie si l'image est encore masquée
        if (!img.classList.contains("hidden")) return;

        if (index === correctImageIndex) {
            revealImages();
            message.textContent = "Correct! les images sont dévoilées.";
            message.classList.remove("incorrect");
            message.classList.add("correct");
        } else {
            attempts++;
            if (attempts >= 3) {
                revealImages();
                message.textContent = 
                    "Vous avez échoué trois fois. les images sont dévoilées.";
                message.classList.remove("correct");
                message.classList.add("incorrect");    
            } else {
                message.textContent = `Incorrect, essayez encore! (${
                    3 - attempts
                } tentatives restantes)`;
                message.classList.remove("correct");
                message.classList.add("incorrect");
            }
        }
    });
});
//Fonction pour dévoiler les images
function revealImages() {
    images.forEach((img) => {
        img.classList.remove("hidden");
    });
}
// Réinitialisation du jeu
resetButton.addEventListener("click", () => {
    initializeGame();
    message.textContent = "";
    message.classList.remove("correct", "incorrect");
});