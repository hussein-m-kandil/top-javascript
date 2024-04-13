const BASE_URL = 'https://api.weatherapi.com/v1';
const FORECAST_API = '/forecast.json';
const SECO_SECO = '646f26dea5ab4974bc3120515240604';

async function fetchWeatherData(location) {
  try {
    const response = await fetch(
      `${BASE_URL}${FORECAST_API}?key=${SECO_SECO}&q=${location}`,
      {
        mode: 'cors',
      },
    );
    if (response.ok) {
      return await response.json();
    }
    throw Error('Fetched response in not ok!');
  } catch (error) {
    console.log(`${error.name} in 'getWeatherData': \n\t${error.message}`);
  }
  return null;
}

export default function getWeatherData(location) {
  return new Promise((resolve, reject) => {
    fetchWeatherData(location).then((weatherData) => {
      if (weatherData) {
        resolve(weatherData);
      } else {
        reject(Error('There is no weather data!'));
      }
    });
  });
}

export { getWeatherData };
