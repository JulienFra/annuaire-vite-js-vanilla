
import '../style.css';
import { data } from '../data';
import { nav } from '../nav';
import { footer } from "../footer";

const detailsPersonne = () => {
  // récupération des paramètres GET de l'url
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const personneId = urlParams.get('id') ?? 1;
  console.log(personneId);

  // on cherche la personne qui possède l'id trouvé dans l'url
  const personne = data.find((personne) => {
    return personne.id === Number.parseInt(personneId);
  });
  console.log(personne);

  return `
  <div class="max-w-2xl mx-auto bg-white shadow-md rounded-md overflow-hidden my-4">
    <img src="${personne.avatar}" class="w-full object-cover" alt="avatar de ${personne.prenom} ${personne.nom}">
    <div class="px-2 py-4"> <!-- Ajustement des classes de marges -->
      <h2 class="text-2xl font-bold text-gray-800 mb-2">${personne.prenom} ${personne.nom}</h2>
      <h5 class="text-lg text-gray-700 mb-2">${personne.date_de_naissance}</h5>
      <h5 class="text-lg text-gray-700 mb-2">${personne.numero_de_telephone}</h5>
      <h5 class="text-lg text-gray-700 mb-2">${personne.adresse_email}</h5>
      <p class="text-gray-700">${personne.description}</p>
    </div>
  </div>
`;
};

document.querySelector('#app').innerHTML = `
  <main>
    ${nav}

    <div class="container-fluid my-4">
      ${detailsPersonne()}
    </div>
  </main>
  ${footer}
`;
