import CurrentWeather from '../components/CurrentWeather';

export default function showWeatherData(
  containerClassName,
  weatherData,
  weatherUnit,
) {
  const locationInput = document.querySelector('input.location');
  if (locationInput) {
    locationInput.value = weatherData.location.name;
  }

  const contentDiv = document.querySelector(`.${containerClassName}`);
  if (contentDiv) {
    [...contentDiv.children].forEach((child) => child.remove());
    contentDiv.append(CurrentWeather(weatherData, weatherUnit));
  }
}

export { showWeatherData };
