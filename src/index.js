import './css/styles.css';
import { debounce } from "debounce";
import Notiflix from 'notiflix';


import { fetchCountries } from './js/fetchCountries'

const input = document.querySelector('#search-box')
const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')


const DEBOUNCE_DELAY = 300;

input.addEventListener('input',debounce(onInput,DEBOUNCE_DELAY))

function onInput() {

  cleanHtml()
    const trimmedValue = input.value.trim();
    if (trimmedValue !== '') {
        fetchCountries(trimmedValue).then(data => {
            console.log(data);
            if (data.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }
            else if (data.length === 0) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
            }
            else if (data.length >= 2 && data.length < 10) {
                renderCountryList(data)
            }
            else if (data.length === 1) {
                renderOneCountry(data)
            }
        });
    }    
    }

function renderCountryList(countries) {
  const markup = countries
      .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20">
         <b>${country.name.official}</p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}


function renderOneCountry(countries) {
    const markup = countries.map(country => {
    return ` <li>
  <img src="${country.flags.svg}" alt="Flag of ${
          country.name.official
        }" width="30" hight="20">
  <p>${country.name.official}</p>
  <p> Capital :${country.capital}</p> 
  <p> Population: ${country.population}</p> 
  <p> Languages:${Object.values(country.languages)}</p> 
</li>`
    }).join('')
    countryInfo.innerHTML = markup;
}

function cleanHtml() {
    countryInfo.innerHTML = ''
    countryList.innerHTML =''
}