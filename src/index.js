import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries.js';
import { getRefs } from './js/get-refs';

const DEBOUNCE_DELAY = 300;

refs = getRefs();

refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const countryName = refs.inputEl.value;

  if (!countryName.trim()) {
    refs.listEl.innerHTML = '';
    return;
  } else {
    fetchCountries(countryName.trim()).then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      } else if (data.length > 2 && data.length < 10) {
        renderSmallCard(data);
      } else if (data.length === 1) {
        renderBigCard(data);
      }
    });
  }
}

function renderBigCard(data) {
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
  refs.listEl.innerHTML = markUp;
}

function renderSmallCard(data) {
  const markUp = data
    .map(
      country => `<li>
        <p>${country.name.official}</p>
        <img src="${country.flags.svg}" width="150" height="100"/>
      </li>`,
    )
    .join('');
  refs.listEl.innerHTML = markUp;
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
