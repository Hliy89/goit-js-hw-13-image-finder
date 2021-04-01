import './styles.css';
import cardList from './templates/card-list.hbs';
const basicLightbox = require('basiclightbox');
import 'basicLightbox/dist/basicLightbox.min.css';

const gallery = document.querySelector('.gallery');
const buttonLoad = document.querySelector('.load-more-button');
const searchForm = document.getElementById('id-search-form');
const myInput = document.getElementById('input');

let currentPage = 1;

searchForm.addEventListener("submit", async function (e) {
    e.preventDefault()
    const searchField = this.querySelector("[name=query]");
    const search = searchField.value;
    const result = await fetchCard(search);
    const cards = cardList(result.hits);
    gallery.innerHTML = cards;
    buttonLoad.classList.remove('visibility');
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

async function fetchCard(search = "tags", page = 1) {
    try {
        const response = await fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${search}&page=${page}&per_page=12&key=20957526-09ced1a4e1530381aa17126c6`);
        if(!response.ok){
            throw new Error("Список фото временно недоступен")
        }
        const result = await response.json();
        return result;
    }
    catch (error) {
        return error;
    }
}

function onScrollPage() {
    const lastCard = document.querySelector(".photo-card:last-child");
    if (lastCard) {
        window.scrollTo({
        top: 99999999999,
        behavior: 'smooth'
    });
    }
};

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


// KEY ---  20957526-09ced1a4e1530381aa17126c6

// https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=photo&page=1&per_page=12&key=20957526-09ced1a4e1530381aa17126c6