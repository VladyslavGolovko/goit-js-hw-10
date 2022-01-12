import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchCountries } from './js/fetchCountries';
import { getRefs } from './js/get-refs';
import renderCountriesTpl from '../src/templates/countries-list';
import renderCountryTpl from '../src/templates/country-card';

import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.input.addEventListener('input', debounce(onInputEnterValue, DEBOUNCE_DELAY));

function onInputEnterValue(e) {
  const searchQuery = e.target.value.trim();

  if (!searchQuery) {
    return cleaningRenderCountries();
  }

  fetchCountries(searchQuery)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        return cleaningRenderCountries();
      }

      if (countries.length >= 2 && countries.length <= 10) {
        refs.countryInfo.innerHTML = '';
        cleaningRenderCountries();
        return renderCountries(countries);
      }
      if (countries.length === 1) {
        refs.countryList.innerHTML = '';
        cleaningRenderCountries();
        return renderCountry(countries);
      }
    })
    .catch(error => {
      console.log(error);
      errorHandler();
      cleaningRenderCountries();
    });
}

function renderCountries(countrys) {
  const markup = renderCountriesTpl(countrys);
  refs.countryList.insertAdjacentHTML('beforeend', markup);
}

function renderCountry(countrys) {
  const markup = renderCountryTpl(countrys);
  refs.countryInfo.insertAdjacentHTML('beforeend', markup);
}

function errorHandler() {
  Notify.failure('Oops, there is no country with that name.');
}

function cleaningRenderCountries() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
