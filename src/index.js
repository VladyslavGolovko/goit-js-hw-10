import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import countryListTemp from './country-list.hbs';
import countryCardTemp from './country-card.hbs';
import API from './fetchCountries';
import getRefs from './get-refs';

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
    renderCountriesList(countries);
    return;
  }
  if (countries.length === 1) {
    renderCountryCard(countries);
    return;
  }
}

function renderCountryCard(country) {
  const markup = countryCardTemp(country);
  refs.countryInfo.innerHTML = markup;
}

function renderCountriesList(countries) {
  const list = countryListTemp(countries);
  refs.countryList.innerHTML = list;
}

function onFetchError(error) {
  error.Notiflix.Notify('Oops, there is no country with that name');
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
