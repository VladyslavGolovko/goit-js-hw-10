import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import { getRefs } from './get-refs';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();

  let searchValue = e.target.value;

  fetchCountries(searchValue).then(toSelectionData);
}

function toSelectionData(data) {
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
