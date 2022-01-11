const BASE_URL = 'https://restcountries.com/v3.1/name/';

function fetchCountries(countryName) {
  return fetch(`${BASE_URL}${countryName}?fields=name,capital,population,flags,languages`).then(
    response => {
      return response.json(),
    });
}

export { fetchCountries };
