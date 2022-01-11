import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { API } from './js/fetchCountries.js';
import { getRefs } from './js/get-refs';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  const countryName = refs.inputEl.value.trim();
  API.fetchCountries(countryName).then(onSelectionData).catch(onFetchError).finally(onPageReset);
}

function onSelectionData(data) {
  if (data.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  if (data.length >= 2 && data.length <= 10) {
    renderSmallCard(data);
    return;
  }
  if (data.length === 1) {
    renderBigCard(data);
    return;
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
  refs.countryList.innerHTML = markUp;
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
  refs.countryList.innerHTML = markUp;
}

function onFetchError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function onPageReset() {
  refs.countryList.innerHTML = '';
}
