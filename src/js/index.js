import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import countryList from '../templates/country-list.hbs';
import countryCard from '../templates/country-card.hbs';
import API from './fetchCountries';
import getRefs from './get-refs';

const refs = getRefs();

const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;

  const searchQuery = form.elements.query.value;

  API(searchQuery)
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
}
