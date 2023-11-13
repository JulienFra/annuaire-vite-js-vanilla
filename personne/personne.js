
import '../style.css';
import { data } from '../data';
import { nav } from '../nav';

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
      <div class="card col col-sm-10 col-md-8 col-xl-6 mx-auto">
        <img src="${personne.avatar}" class="card-img-top" alt="avatar de ${personne.prenom} ${personne.nom}">
        <div class="card-body">
          <h5 class="card-title">${personne.prenom} ${personne.nom}</h5>
          <h5 class="card-title">${personne.date_de_naissance}</h5>
          <h5 class="card-title">${personne.numero_de_telephone}</h5>
          <h5 class="card-title">${personne.adresse_email}</h5>
          <h5 class="card-title">${personne.description}</h5>
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
