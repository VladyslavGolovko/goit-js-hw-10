function fetchCountries(e) {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';

  fetch(`${BASE_URL}${e.target.value}?fields=name,capital,population,flags,languages`).then(
    response => {
      if (!response.ok) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
      return response.json();
    },
  );
}
