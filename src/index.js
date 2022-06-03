import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

// refs
const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  div: document.querySelector('.country-info'),
};

// variables
const DEBOUNCE_DELAY = 300;

// markup
const onInput = e => {
  const value = refs.input.value.trim().toLowerCase();
  refs.div.innerHTML = '';
  refs.list.innerHTML = '';

  fetchCountries(value)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length >= 2 && data.length <= 10) {
        // clearCard;
        // clearCardsList;
        createCountries(data);
      } else {
        // clearCardsList;
        createCountry(data);
      }
    })
    .catch(err => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

// markup functions
function createCountries(countries) {
  const markup = countries
    .map(country => {
      return `<li class="country-list__item"><img class="country-list__img" cla src="${country.flags.svg}" alt="${country.name}" width=20 height=20> <p>${country.name.common} </p></li>`;
    })
    .join('');
  return (refs.list.innerHTML = markup);
}

function createCountry(country) {
  const markup = country
    .map(country => {
      return `<div class="container" aria-label="country card"><img class="country-info__flag" src="${
        country.flags.svg
      }" alt="${country.name}" width=20 height=20>
      <h2>${country.name.common}</h2></div>
  <p><strong>Capital:</strong> ${country.capital}</p>
  <p><strong>Population:</strong> ${country.population}</p>
  <p><strong>Languages:</strong> ${Object.values(country.languages)}</p>`;
    })
    .join('');
  return (refs.div.innerHTML = markup);
}
