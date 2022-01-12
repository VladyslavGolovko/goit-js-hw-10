import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import getRefs from './get-refs';
import API from './fetchCountries';
import countryListTpl from './country-list.hbs';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  const countryName = refs.searchInput.value;
  API.fetchCountries(countryName).then(toSelectionData).catch(onFetchError);
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
  refs.countryList.innerHTML = markUp;
}

function onFetchError() {
  onPageReset();
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function onPageReset() {
  refs.countryList.innerHTML = '';
}
