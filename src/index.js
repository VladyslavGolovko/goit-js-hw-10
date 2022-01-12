import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import { getRefs } from './get-refs';
import countryListTpl from './country-list.hbs';

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
}

function renderSmallCard(data) {
  const markUp = countryListTpl(data);
  refs.listEl.innerHTML = markUp;
}
