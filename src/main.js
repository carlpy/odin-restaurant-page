import "./sass/main.scss";
import "./img/hero-header.jpg";
import myLocation from "./img/loc.jpg";

const navBarBtns = document.querySelectorAll("[data-menu]");

const homeSect = document.querySelector(".home");
const menuSect = document.querySelector(".menu");

const locationSect = document.querySelector(".locations");
const locationImg = document.querySelector('.locations__img img'); locationImg.src = myLocation;


homeSect.classList.add("active-sect");
document.querySelector('[data-menu="home"]').classList.add('active')

const API_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=American';

navBarBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => changeState(e));
});

function changeState(btn) {
  document.querySelectorAll('section').forEach(sec => sec.classList.remove('active-sect'));
  document.querySelectorAll('[data-menu]').forEach(sec => sec.classList.remove('active'));

  if (btn.target.dataset.menu == "home") {  homeSect.classList.add("active-sect"); }
  if (btn.target.dataset.menu == "menu") {  menuSect.classList.add("active-sect"); }
  if (btn.target.dataset.menu == "locations") { locationSect.classList.add("active-sect"); }
  btn.target.classList.add('active');
}

async function getTheMeals(api) {
  const res = await fetch(api);
  const data = (await res.json()).meals;

  for(let i = 0; i < data.length; i++) {
    menuSect.appendChild(createMenuElement(data[i]))
  }
}

function createMenuElement({idMeal, strMeal, strMealThumb}) {
  const div = document.createElement('div');
  div.classList.add('menu__meal');
  div.dataset.id = idMeal;

  const div2 = document.createElement('div');
  div2.classList.add('menu__meal__container');

  const img = document.createElement('img');
  img.src = strMealThumb;
  div2.appendChild(img)

  const p = document.createElement('p');
  p.textContent = strMeal;

  div.appendChild(div2);
  div.appendChild(p);

  return div;
}

getTheMeals(API_URL)