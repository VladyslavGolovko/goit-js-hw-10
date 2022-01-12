import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import getRefs from './get-refs';
import { fetchCountries } from './fetchCountries';

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
      if (data.length > 2 && data.length < 10) {
        renderSmallCard(data);
      }
      if (data.length === 1) {
        renderBigCard(data);
      }
    });
  }
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

function renderBigCard(data) {
  const markUp = data
    .map(
      country => `<li>
          <p>${country.name.official}</p>
          <p>Capital: ${country.capital}</p>
          <p>Population: ${country.population}</p>
          <p>Language: ${Object.values(country.languages.join(', '))}</p>
          <img src="${country.flags.svg}" width="500" height="300"/>
        </li>`,
    )
    .join('');
  refs.listEl.innerHTML = markUp;
}
