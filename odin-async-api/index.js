import './index.css';

const API_BASE_URL = 'api.giphy.com/v1/gifs/translate';
const API_KEY = '7owj2JRjYLJ9J1aasGLlFN0sfYtuvMAC';
const query = document.querySelector('#query');
const searchBtn = document.querySelector('#search-btn');
const spinner = document.querySelector('#spinner');
const figure = document.querySelector('#result');
const img = document.querySelector('#result>img');
const caption = document.querySelector('#result>figcaption');
const errorDiv = document.querySelector('#error');

const updateFigure = ({ data }) => {
  if (!data.images || (!data.images.fixed_height && !data.images.original)) {
    throw Error('No matching GIF!');
  }
  const imageData = data.images.fixed_height || data.images.original;
  img.loading = 'eager';
  img.src = imageData.url;
  img.width = imageData.width;
  img.height = imageData.height;
  img.alt = data.alt_text;
  caption.textContent = data.title;
  img.addEventListener('load', () => {
    spinner.style.display = 'none';
    figure.style.display = 'block';
  });
};

const getGif = async () => {
  try {
    const response = await fetch(
      `https://${API_BASE_URL}?api_key=${API_KEY}&s=${query.value}`,
      {
        mode: 'cors',
      },
    );
    if (!response.ok) {
      throw Error("Cannot get GIF from 'Giphy'! Try again later.");
    } else {
      updateFigure(await response.json());
    }
  } catch (error) {
    errorDiv.textContent = error.message;
    figure.style.display = 'none';
    spinner.style.display = 'none';
    errorDiv.style.display = 'block';
  }
};

const findGif = (event) => {
  if (
    query.value !== '' &&
    (event.type === 'click' ||
      (event.type === 'keydown' && event.key === 'Enter'))
  ) {
    spinner.style.display = 'block';
    figure.style.display = 'none';
    errorDiv.style.display = 'none';
    getGif(); // Async replacement for the following code
    // fetch(`https://${API_BASE_URL}?api_key=${API_KEY}&s=${query.value}`, {
    //   mode: 'cors',
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw Error("Cannot get GIF from 'Giphy'! Try again later.");
    //     }
    //     return response.json();
    //   })
    //   .then((dataObject) => {
    //     updateFigure(dataObject);
    //   })
    //   .catch((error) => {
    //     errorDiv.textContent = error.message;
    //     figure.style.display = 'none';
    //     spinner.style.display = 'none';
    //     errorDiv.style.display = 'block';
    //   });
  }
};

query.addEventListener('keydown', findGif);
searchBtn.addEventListener('click', findGif);
