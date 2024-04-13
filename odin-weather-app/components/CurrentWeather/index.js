import './index.css';

import createElement from '../../helpers/createElement';

function createCard(title, content, className) {
  const card = createElement('div', `card ${className}`);
  card.append(
    createElement('div', 'title', title),
    createElement('div', 'content', content),
  );
  return card;
}

export default function CurrentWeather(weatherData, weatherUnit) {
  let cTemp, feel, hTemp, lTemp;

  if (weatherUnit.toLowerCase() === 'celsius') {
    feel = weatherData.current.feelslike_c;
    cTemp = weatherData.current.temp_c;
    hTemp = weatherData.forecast.forecastday[0].day.maxtemp_c;
    lTemp = weatherData.forecast.forecastday[0].day.mintemp_c;
  } else {
    cTemp = weatherData.current.temp_f;
    feel = weatherData.current.feelslike_f;
    hTemp = weatherData.forecast.forecastday[0].day.maxtemp_f;
    lTemp = weatherData.forecast.forecastday[0].day.mintemp_f;
  }

  const currentWeather = createElement('div', 'current-weather');
  const hero = createElement('div', 'weather-hero');
  const extras = createElement('div', 'weather-extras');

  hero.append(
    createElement('div', 'current-temp', `${cTemp}°`),
    createElement('div', 'condition', `${weatherData.current.condition.text}`),
    createElement('span', 'feels-like', ` Feels like ${feel}°`),
  );
  extras.append(
    createCard('High', `${hTemp}°`, 'high-temp'),
    createCard('Low', `${lTemp}°`, 'low-temp'),
    createCard('Humidity', `${weatherData.current.humidity}%`, 'humidity'),
  );
  currentWeather.append(hero, extras);

  return currentWeather;
}

export { CurrentWeather };
