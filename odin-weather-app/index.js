import './index.css';

import createElement from './helpers/createElement';
import getWeatherData from './helpers/getWeatherData';
import LocationForm from './components/LocationForm';
import Toggler from './components/Toggler';

const WEATHER_UNITS = ['Celsius', 'Fahrenheit'];
let currentWeatherUnit = WEATHER_UNITS[0];

const appTitle = createElement('h1', 'app-title', 'Odin Weather App');

const locationForm = LocationForm((location) =>
  getWeatherData(location)
    .then(console.dir)
    .catch((error) =>
      console.log(`${error.name} after 'getWeatherData': \n\t${error.message}`),
    ),
);

const toggler = Toggler(WEATHER_UNITS, ({ value }) => {
  currentWeatherUnit = value;
  console.log(`The current weather unit is: ${currentWeatherUnit}`);
});

const weatherContent = createElement('div', 'weather-content');

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
