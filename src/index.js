import './css/styles.css';
import countryListTemp from './templates/country-list.hbs';
import API from './js/fetchCountries.js';
import getRefs from './js/get-refs.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();

  let searchQuery = e.target.value.trim();

  API.fetchCountries(searchQuery)
    .then(onSelectionCountries)
    .catch(onFetchError)
    .finally(onPageReset);
}

function onSelectionCountries(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  if (countries.length <= 10 && countries.length >= 2) {
    const markUp = countries.map(countryListTemp).join('');
    refs.countryListTemp.innerHTML = markUp.trim();
  }
  if (countries.length === 1) {
    const markUp = data
      .map(
        country => `<li>
          <p>${country.name.official}</p>
          <p>${country.capital}</p>
          <p>${country.population}</p>
          <p>${Object.keys(country.languages)}</p>
          <img src="${country.flags.svg}" width="500" height="300"/>
        </li>`,
      )
      .join('');
    refs.listEl.innerHTML = markUp.trim();
  }
}

function countryCardMarkup() {}

function onFetchError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function onPageReset() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

/*function onSearch(e) {
  const searchQuery = e.target.value;
  fetchCountries(searchQuery)
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      }
      if (countries.length <= 10 && countries.length >= 2) {
        renderCountriesList(countries);
        return;
      }
      if (countries.length === 1) {
        renderCountryCard(countries);
        return;
      }
    })
    .catch(onFetchError)
    .finally(onPageReset);
}

function renderCountryCard(country) {
  const markup = countryCard(country);
  refs.countryInfo.innerHTML = markup;
}

function renderCountriesList(countries) {
  const list = countryList(countries);
  refs.countryList.innerHTML = list;
}

function onFetchError() {
  error.Notiflix.Notify.failure('Oops, there is no country with that name');
}

function onPageReset() {
  refs.countryList.innerHTML = '';
}*/
