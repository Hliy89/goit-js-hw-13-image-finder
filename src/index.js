import './styles.css';
import cardList from './templates/card-list.hbs';
const basicLightbox = require('basiclightbox');
import 'basicLightbox/dist/basicLightbox.min.css';
import fetchCard from './js/apiService.js';

const gallery = document.querySelector('.gallery');
const buttonLoad = document.querySelector('.load-more-button');
const searchForm = document.getElementById('id-search-form');
const myInput = document.getElementById('input');
const listWarn = document.querySelector(".list-warn");

let currentPage = 1;

searchForm.addEventListener("submit", async function (e) {
    e.preventDefault()
    const searchField = this.querySelector("[name=query]");
    const search = searchField.value;
    const result = await fetchCard(search);
    
    const cards = cardList(result.hits);
    if (result.hits.length === 0) {
        myInput.value = "";
        listWarn.innerHTML = `<p>Введите корректный запрос!</p>`;
    } else {
        listWarn.innerHTML = "";
    }
    if (myInput.value !== "") {
        gallery.innerHTML = cards;
        buttonLoad.classList.remove('visibility');
    } else {
        gallery.innerHTML = "";
        buttonLoad.classList.add('visibility');
    }
    myInput.value = "";
    currentPage = 1;
});

buttonLoad.addEventListener("click", async function () {
    const searchField = searchForm.querySelector("[name=query]");
    const search = searchField.value;
    currentPage += 1;
    const result = await fetchCard(search, currentPage);
    const cards = cardList(result.hits);
    gallery.insertAdjacentHTML("beforeend", cards);
    onScrollPage();
})

gallery.addEventListener("click", onLargeImg);

function onLargeImg(e) {
    if (e.target !== e.currentTarget) {
        const url = e.target.dataset.source;
        if (url) {
            const instance = basicLightbox.create(`
            <img src="${url}" width="800" height="600">
            `)
            instance.show()
        }
    }
};

function onScrollPage() {
    const lastCard = document.querySelector(".photo-card:last-child");
    if (lastCard) {
        window.scrollTo({
        top: 9999999999,
        behavior: 'smooth'
        });
    }
};


// KEY ---  20957526-09ced1a4e1530381aa17126c6

// https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=photo&page=1&per_page=12&key=20957526-09ced1a4e1530381aa17126c6