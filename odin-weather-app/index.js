import './index.css';

import createElement from './helpers/createElement';
import getWeatherData from './helpers/getWeatherData';
import showWeatherData from './helpers/showWeatherData';
import LocationForm from './components/LocationForm';
import Toggler from './components/Toggler';

const WEATHER_CONTENT_CLASS = 'weather-content';
const WEATHER_UNITS = ['Celsius', 'Fahrenheit'];
let currentWeatherUnit = WEATHER_UNITS[0];
let currentWeatherData = null;

const appTitle = createElement('h1', 'app-title', 'Odin Weather App');

const locationForm = LocationForm((location) =>
  getWeatherData(location)
    .then((weatherData) => {
      console.dir(weatherData);
      currentWeatherData = weatherData;
      showWeatherData(
        WEATHER_CONTENT_CLASS,
        currentWeatherData,
        currentWeatherUnit,
      );
    })
    .catch((error) =>
      console.log(`${error.name} after 'getWeatherData': \n\t${error.message}`),
    ),
);

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

const footer = createElement('footer', 'link-back');
footer.append(
  document.createTextNode('Powered by '),
  createElement(
    'a',
    'weather-api',
    ' WeatherAPI.com',
    ['href', 'https://www.weatherapi.com/'],
    ['title', 'Weather API'],
  ),
);

document.body.append(appTitle, locationForm, toggler, weatherContent, footer);
