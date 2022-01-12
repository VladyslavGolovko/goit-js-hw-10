export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,flags,population,languages`,
  ).then(response => {
    return response.json();
  });
}
