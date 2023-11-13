// news.js
import '../style.css';
import { nav } from '../nav';
import { footer } from "../footer";

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomDate = () => {
  const year = getRandomInt(2022, 2023);
  const month = getRandomInt(1, 12);
  const day = getRandomInt(1, 28);
  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
};

const generateRandomNews = () => {
  const numNews = 5; // Nombre d'articles de news à générer
  const news = [];

  for (let i = 0; i < numNews; i++) {
    const title = `Titre de l'article ${i + 1}`;
    const date = generateRandomDate();
    const content = `Contenu de l'article ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;

    news.push({
      title,
      date,
      content,
    });
  }

  return news;
};

const newsList = () => {
  const newsData = generateRandomNews();

  let html = '';
  for (let i = 0; i < newsData.length; i++) {
    const article = newsData[i];
    let articleCard = `
      <div class="max-w-xl mx-auto bg-white shadow-md rounded-md overflow-hidden my-4 block hover:bg-gray-100 transition duration-300 cursor-pointer news-article" data-index="${i}">
        <div class="p-4">
          <h2 class="text-xl font-bold text-gray-800">${article.title}</h2>
          <p class="text-gray-600 text-sm">${article.date}</p>
          <p class="mt-2 text-gray-700">${article.content}</p>
        </div>
      </div>
    `;
    html += articleCard;
  }

  return html;
};

document.body.addEventListener('click', (event) => {
    const target = event.target;
    if (target.id === 'popup' || target.classList.contains('popup-close')) {
      closePopup();
    }
  });
  
  const showArticle = (index) => {
    const article = generateRandomNews()[index];
    const articleDetails = `
      <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center" id="popup">
        <div class="max-w-2xl w-full bg-white shadow-md rounded-md overflow-hidden my-4 p-4">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">${article.title}</h2>
          <p class="text-gray-600 text-sm mb-4">${article.date}</p>
          <p class="text-gray-700">${article.content}</p>
          <button class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 popup-close">Fermer</button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', articleDetails);
  };
  
  const closePopup = () => {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.remove();
    }
  };
  

document.querySelector('#app').innerHTML = `
  <main>
    ${nav}
    <div class="container mx-auto my-4" id="newsContainer">
      ${newsList()}
    </div>
  </main>
  ${footer}
`;

document.querySelector('#newsContainer').addEventListener('click', (event) => {
  const target = event.target;
  const index = target.closest('.news-article')?.dataset.index;
  if (index !== undefined) {
    showArticle(index);
  }
});
