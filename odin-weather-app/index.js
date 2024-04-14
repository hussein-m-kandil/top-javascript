import './index.css';

import createElement from './helpers/createElement';
import getWeatherData from './helpers/getWeatherData';
import showWeatherData from './helpers/showWeatherData';
import showLoadingIndicator from './helpers/showLoadingIndicator';
import LocationForm from './components/LocationForm';
import Toggler from './components/Toggler';

const WEATHER_CONTENT_CLASS = 'weather-content';
const WEATHER_UNITS = ['Celsius', 'Fahrenheit'];
let currentWeatherUnit = WEATHER_UNITS[0];
let currentWeatherData = null;

const appTitle = createElement('h1', 'app-title', 'Odin Weather App');

const locationForm = LocationForm((location) => {
  showLoadingIndicator(WEATHER_CONTENT_CLASS);
  getWeatherData(location)
    .then((weatherData) => {
      currentWeatherData = weatherData;
      showWeatherData(
        WEATHER_CONTENT_CLASS,
        currentWeatherData,
        currentWeatherUnit,
      );
    })
    .catch(() => {
      const contentDiv = document.querySelector(`.${WEATHER_CONTENT_CLASS}`);
      if (contentDiv) {
        [...contentDiv.children].forEach((child) => child.remove());
        contentDiv.append(
          createElement(
            'div',
            'weather-info-error',
            "No weather data! check the location's name and try again.",
          ),
        );
      }
    });
});

const toggler = Toggler(WEATHER_UNITS, ({ value }) => {
  currentWeatherUnit = value;
  if (currentWeatherData) {
    showWeatherData(
      WEATHER_CONTENT_CLASS,
      currentWeatherData,
      currentWeatherUnit,
    );
  }
});

const weatherContent = createElement('div', WEATHER_CONTENT_CLASS);
weatherContent.append(
  createElement('div', 'initial-message', 'Weather data will be shown here...'),
);

const footer = createElement('footer', 'link-back');
const backgroundCredits = createElement('div', 'bg-credits');
const weatherAPICredits = createElement('div', 'weather-api-credits');
backgroundCredits.append(
  document.createTextNode('Background image by '),
  createElement('a', 'bg-image-owner', ' 12019', [
    'href',
    'https://pixabay.com/users/12019-12019/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1985027',
  ]),
  document.createTextNode(' from '),
  createElement('a', 'bg-image-site', ' Pixabay', [
    'href',
    'https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1985027',
  ]),
);
weatherAPICredits.append(
  document.createTextNode('Powered by '),
  createElement(
    'a',
    'weather-api',
    ' WeatherAPI.com',
    ['href', 'https://www.weatherapi.com/'],
    ['title', 'Weather API'],
  ),
);
footer.append(backgroundCredits, weatherAPICredits);

document.body.append(appTitle, locationForm, toggler, weatherContent, footer);
