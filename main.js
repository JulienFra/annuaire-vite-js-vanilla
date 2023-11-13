import * as bootstrap from "bootstrap";
import "./style.css";
import { data } from "./data";
import { nav } from "./nav";
import Fuse from "fuse.js";

function compareNoms(a, b) {
  const nomA = (a.prenom + " " + a.nom).toUpperCase();
  const nomB = (b.prenom + " " + b.nom).toUpperCase();

  if (nomA < nomB) {
    return -1;
  }
  if (nomA > nomB) {
    return 1;
  }
  return 0;
}

const fuseExact = new Fuse(data, {
  keys: ["prenom", "nom"],
  threshold: 0.2,
  minMatchCharLength: 3,
  useExtendedSearch: true,
});

const fuseStartsWith = new Fuse(data, {
  keys: ["prenom", "nom"],
  threshold: 0.1, // Seuil plus bas pour les correspondances de début
  minMatchCharLength: 1, // Match dès la première lettre
  useExtendedSearch: true,
});

const listePersonnes = (filteredData = data) => {
  let html = "";
  for (let i = 0; i < filteredData.length; i++) {
    const personne = filteredData[i];
    let personneCard = `
      <a class="card col-5 col-md-3" href="/personne/?id=${personne.id}">
        <img src="${personne.avatar}" class="card-img-top" alt="avatar de ${personne.prenom} ${personne.nom}">
        <div class="card-body">
          <h5 class="card-title">${personne.prenom} ${personne.nom}</h5>
        </div>
      </a>
    `;
    html += personneCard;
  }
  return html;
};

document.querySelector("#app").innerHTML = `
  <main>
    ${nav}
    <div class="container-fluid my-4">
      <div class="d-flex gap-3 flex-wrap justify-content-center">
        <input type="text" id="searchInput" placeholder="Rechercher...">
      </div>
    </div>
    <div class="container-fluid my-4">
      <div class="d-flex gap-3 flex-wrap justify-content-center" id="personList">
        ${listePersonnes()}
      </div>
    </div>
  </main>

  <footer class="bg-dark text-light py-4">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <p>&copy; 2023 iScourP. Tous droits réservés.</p>
        </div>
        <div class="col-md-6">
          <p class="text-end">Contactez-nous : info@example.com</p>
        </div>
      </div>
    </div>
  </footer>
`;

function handleSearch() {
  const searchText = searchInput.value;

  if (searchText === "") {
    // Si la barre de recherche est vide, affichez tous les éléments
    document.querySelector("#personList").innerHTML = listePersonnes();
  } else {
    const resultExact = fuseExact.search(searchText);
    const resultStartsWith = fuseStartsWith.search(searchText);
    const combinedResults = [...resultExact, ...resultStartsWith];
    const uniqueResults = Array.from(
      new Set(combinedResults.map((item) => item.item.id))
    );
    const filteredData = uniqueResults.map((id) =>
      data.find((item) => item.id === id)
    );
    document.querySelector("#personList").innerHTML =
      listePersonnes(filteredData);
  }
}

searchInput.addEventListener("input", handleSearch);
