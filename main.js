// main.js
import * as bootstrap from "bootstrap";
import "./style.css";
import { data } from "./data";
import { nav } from "./nav";
import Fuse from "fuse.js";
import { footer } from "./footer";

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
  threshold: 0.1,
  minMatchCharLength: 1,
  useExtendedSearch: true,
});

const listePersonnes = (filteredData = data) => {
  let html = "";
  for (let i = 0; i < filteredData.length; i++) {
    const personne = filteredData[i];
    let personneCard = `
    <a class="max-w-xs mx-auto bg-white shadow-md rounded-md overflow-hidden my-4 block hover:shadow-lg transition duration-300 cursor-pointer" href="/personne/?id=${personne.id}">
    <img src="${personne.avatar}" class="w-full h-48 object-cover" alt="avatar de ${personne.prenom} ${personne.nom}">
    <div class="p-4">
      <h5 class="text-xl font-bold text-gray-800 mb-2">${personne.prenom} ${personne.nom}</h5>
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
  ${footer}
  `;

function handleSearch() {
  const searchText = searchInput.value;

  if (searchText === "") {
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
