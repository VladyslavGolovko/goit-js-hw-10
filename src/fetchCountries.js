const BASE_URL = 'https://restcountries.com/v3.1';

function fetchCountries(name) {
  return fetch(`${BASE_URL}/name/${name}?fields=name,capital,flags,population,languages`).then(
    response => {
      return response.json();
    },
  );
}

export default { fetchCountries };
