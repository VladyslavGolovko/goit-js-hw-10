import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1';

export function fetchCountries(countryName) {
  return fetch(
    `${BASE_URL}/name${countryName}?fields=name,capital,population,flags,languages`,
  ).then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    }
    return response.json();
  });
}
