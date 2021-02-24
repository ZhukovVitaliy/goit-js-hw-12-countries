import countriesCardTpl from '../templates/countries-card.hbs';
import allCountriesList from '../templates/all-countries-list.hbs';

import API from './fetchCountries';
import debounce from 'lodash.debounce';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { info, error } from '@pnotify/core';

const refs = {
  cardBox: document.querySelector('.js-card'),
  searchForm: document.querySelector('.js-search-form'),
};

let searchQuery = '';

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  let searchQuery = '';

  e.preventDefault();
  searchQuery = e.target.value;

  if (!searchQuery) {
    refs.cardBox.innerHTML = '';
    return;
  }

  API.fetchCountries(searchQuery).then(countriesFound).catch(onFetchError);
}

function countriesFound(countries) {
  if (countries.length > 10) {
    refs.cardBox.innerHTML = '';
    error({
      text: 'Too many matches found. Please enter a more specific query!',
      delay: 3000,
    });
  } else if (countries.length <= 10 && countries.length > 1) {
    refs.cardBox.innerHTML = '';
    renderCountriesCard(allCountriesList, countries);
  } else if (countries.length === 1) {
    refs.cardBox.innerHTML = '';
    renderCountriesCard(countriesCardTpl, countries[0]);
  } else {
    refs.cardBox.innerHTML = '';
    info({
      text: 'No match found',
      delay: 3000,
    });
  }
}

function renderCountriesCard(template, countries) {
  const markup = template(countries);
  refs.cardBox.innerHTML = markup;
}

function onFetchError(error) {
  console.log(error);
}
