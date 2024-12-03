// Fonction pour charger les données des cartes depuis le fichier JSON
async function loadCards() {
  const response = await fetch("cards.json"); // Charge le fichier JSON
  const cards = await response.json(); // Convertit la réponse en JSON
  allCards = cards; // Stocke les cartes dans une variable globale pour les filtres et le tri
  displayCards(allCards); // Affiche toutes les cartes au chargement
}

// Fonction pour afficher les cartes
function displayCards(cardsToDisplay) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ""; // Réinitialise le conteneur avant de l'actualiser

  cardsToDisplay.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    cardElement.innerHTML = `
        <section class="card">
            <img src="${card.image}" alt="${card.nom}">
            <div class="card-content">
                <div class="header">
                    <h3>${card.nom}</h3>
                    <p>${card.rarete}</p>
                </div>
                <br>
                <span class="info">${card.id}</span>
            </div>
        </section>
        `;

    cardContainer.appendChild(cardElement);
  });
}

// Déclare une variable globale pour stocker les cartes
let allCards = [];

// Gestion de la recherche
const searchInput = document.querySelector(".filters input");
searchInput.addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase(); // Récupère la valeur saisie, en minuscules
  const filteredCards = allCards.filter(
    (card) =>
      card.nom.toLowerCase().includes(query) ||
      card.id.toLowerCase().includes(query) ||
      (card.rarete && card.rarete.toLowerCase().includes(query)) // Vérifie également la rareté
  ); // Filtre les cartes par nom, ID ou rareté
  displayCards(filteredCards); // Actualise l'affichage des cartes
});

// Gestion du tri
const sortSelect = document.querySelector(".filters select");
sortSelect.addEventListener("change", (event) => {
  const value = event.target.value; // Récupère la valeur du menu déroulant
  let sortedCards = [...allCards]; // Copie le tableau des cartes

  if (value === "numero") {
    sortedCards.sort((a, b) => a.id.localeCompare(b.id)); // Trie par ID croissant
  } else if (value === "rarity") {
    // Définir un ordre pour la rareté
    const rarityOrder = { EX: 3, R: 2 };

    sortedCards.sort((a, b) => {
      const rarityA = rarityOrder[a.rarete] || 0; // Priorité de `a`
      const rarityB = rarityOrder[b.rarete] || 0; // Priorité de `b`
      return rarityB - rarityA; // Trie décroissant (EX > R)
    });
  } else if (value === "alphabetical") {
    sortedCards.sort((a, b) => a.nom.localeCompare(b.nom)); // Trie par nom alphabétique
  }

  displayCards(sortedCards); // Actualise l'affichage des cartes
});

// Charge les cartes au chargement de la page
loadCards();
