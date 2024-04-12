import './index.css';

import createElement from '../../helpers/createElement';

export default function CurrentWeather(weatherData, weatherUnit) {
  let unit, cTemp, feel, hTemp, lTemp;
  const cond = weatherData.current.condition.text;
  const humid = weatherData.current.humidity;

  if (weatherUnit.toLowerCase() === 'celsius') {
    unit = 'C';
    feel = weatherData.current.feelslike_c;
    cTemp = weatherData.current.temp_c;
    hTemp = weatherData.forecast.forecastday[0].day.maxtemp_c;
    lTemp = weatherData.forecast.forecastday[0].day.mintemp_c;
  } else {
    unit = 'F';
    cTemp = weatherData.current.temp_f;
    feel = weatherData.current.feelslike_f;
    hTemp = weatherData.forecast.forecastday[0].day.maxtemp_f;
    lTemp = weatherData.forecast.forecastday[0].day.mintemp_f;
  }

  const currentWeather = createElement('div', 'current-weather');
  const condition = createElement('div', 'condition', `${cond}`);
  const currentTemp = createElement('div', 'current-temp', `${cTemp} ${unit}`);
  const humidity = createElement('div', 'humidity', `Humidity ${humid}%`);
  const minMaxTemp = createElement('div', 'min-max-temp');

  currentTemp.append(
    createElement('span', 'feels-like', ` Feels like ${feel} ${unit}`),
  );
  minMaxTemp.append(
    createElement('span', 'high-temp', `H ${hTemp} ${unit}`),
    createElement('span', 'min-max-v-div', ' | '),
    createElement('span', 'low-temp', `L ${lTemp} ${unit}`),
  );
  currentWeather.append(condition, currentTemp, humidity, minMaxTemp);

  return currentWeather;
}

export { CurrentWeather };
