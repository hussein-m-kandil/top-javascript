import CurrentWeather from '../components/CurrentWeather';

export default function showWeatherData(
  containerClassName,
  weatherData,
  weatherUnit,
) {
  const contentDiv = document.querySelector(`.${containerClassName}`);
  if (contentDiv) {
    [...contentDiv.children].forEach((child) => child.remove());
    contentDiv.append(CurrentWeather(weatherData, weatherUnit));
  }
}

export { showWeatherData };
