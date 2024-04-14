import './index.css';

import createElement from '../../helpers/createElement';
import { format, isAfter } from 'date-fns';

function createCard(title, content, className) {
  const card = createElement('div', `card ${className}`);
  card.append(
    createElement('div', 'title', title),
    createElement('div', 'content', content),
  );
  return card;
}

export default function WeatherInfo(weatherData, weatherUnit) {
  const currentWeather = weatherData.current;
  const todayWeather = weatherData.forecast.forecastday[0].day;
  const todayHoursWeather = weatherData.forecast.forecastday[0].hour;
  const unit = weatherUnit.toLowerCase();
  let cTemp, feel, hTemp, lTemp;

  if (unit === 'celsius') {
    feel = currentWeather.feelslike_c;
    cTemp = currentWeather.temp_c;
    hTemp = todayWeather.maxtemp_c;
    lTemp = todayWeather.mintemp_c;
  } else {
    cTemp = currentWeather.temp_f;
    feel = currentWeather.feelslike_f;
    hTemp = todayWeather.maxtemp_f;
    lTemp = todayWeather.mintemp_f;
  }

  const weatherInfo = createElement('div', 'current-weather');

  // Current weather
  const hero = createElement('div', 'weather-hero');
  const extras = createElement('div', 'weather-extras');
  hero.append(
    createElement('div', 'current-temp', `${cTemp}°`),
    createElement('div', 'condition', `${currentWeather.condition.text}`),
    createElement('span', 'feels-like', ` Feels like ${feel}°`),
  );
  extras.append(
    createCard('High', `${hTemp}°`, 'high-temp'),
    createCard('Low', `${lTemp}°`, 'low-temp'),
    createCard('Humidity', `${currentWeather.humidity}%`, 'humidity'),
  );

  // Today hours weather
  const hoursWeather = createElement('div', 'hours-weather');
  for (let i = 0; i < todayHoursWeather.length; i++) {
    const hourInfo = todayHoursWeather[i];
    if (isAfter(hourInfo.time, new Date())) {
      hoursWeather.append(
        createCard(
          format(hourInfo.time, 'hh:mm a'),
          unit === 'celsius' ? `${hourInfo.temp_c}°` : `${hourInfo.temp_f}°`,
          'hour-temp',
        ),
      );
    }
  }

  weatherInfo.append(hero, extras, hoursWeather);

  return weatherInfo;
}

export { WeatherInfo };
