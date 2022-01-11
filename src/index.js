import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import { getRefs } from './get-refs';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

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
      }
      if (data.length >= 2 && data.length <= 10) {
        renderSmallCard(data);
        return;
      }
      if (data.length === 1) {
        renderBigCard(data);
        return;
      }
    });
  }
}

function renderBigCard(data) {
  const markUp = data
    .map(
      country => `<li>
          <img src="${country.flags.svg}" width="40" height="40"/>
          <h2>${country.name.official}</h2>
          <p>Capital: ${country.capital}</p>
          <p>Population: ${country.population}</p>
          <p>Languages: ${Object.values(country.languages)}</p>
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
