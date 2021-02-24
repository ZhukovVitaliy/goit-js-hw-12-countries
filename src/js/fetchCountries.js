const BASE_URL = 'https://restcountries.eu/rest/v2/name';

function fetchCountries(countryID) {
  return fetch(`${BASE_URL}/${countryID}`).then(response => response.json());
}

export default { fetchCountries };
