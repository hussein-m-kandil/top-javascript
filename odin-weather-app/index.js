import './index.css';

import createElement from './helpers/createElement';
import LocationForm from './components/LocationForm';
import Toggler from './components/Toggler';

const WEATHER_UNITS = ['Celsius', 'Fahrenheit'];

let currentWeatherUnit = WEATHER_UNITS[0];

document.body.append(
  createElement('h1', 'app-title', 'Odin Weather App'),
  LocationForm((location) => console.log(`The location is: ${location}`)),
  Toggler(WEATHER_UNITS, ({ value }) => {
    currentWeatherUnit = value;
    console.log(`The current weather unit is: ${currentWeatherUnit}`);
  }),
  createElement('div', 'weather-content'),
);
