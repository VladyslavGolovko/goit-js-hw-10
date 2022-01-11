function fetchCountries(e) {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';

  return fetch(`${BASE_URL}${e.target.value}?fields=name,capital,population,flags,languages`).then(
    response => response.json(),
  );
}
