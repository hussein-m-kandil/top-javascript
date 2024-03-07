import "./index.css";

import createElement from "../../helpers/createElement.js";
import Loading from "../Loading/index.js";
import Carousel from "../Carousel/index.js";
import Card from "../Card/index.js";

/**
 *
 * @returns {HTMLElement}
 */
export default function Menu() {
  const menu = createElement("div", "menu");
  const menuCards = createElement("div", "menu-cards");
  const loading = Loading();
  const overallImgAlt = "AI generated image of food.";
  const overallImgCaptionData = {
    owner: {
      name: "Kalpesh Ajugia",
      url: "https://pixabay.com/users/pixellicious-13377274/",
    },
    site: {
      name: "Pixabay",
      url: "https://pixabay.com/",
    },
  };
  const overallCardTitle = "AI Food No.";
  const overallCardBody =
    "This is an AI generated food. " +
    "So, it is a food that could make you artificially stuffed XD...";
  const imageSources = [];
  let imageIndex = 0;

  menu.appendChild(loading);

  const handleErrorOnLoadImages = (error) => {
    console.error(
      error.name + " occurred while loading images.\n\n" + error.stack
    );
    menu.appendChild(
      createElement(
        "div",
        "load-image-error",
        "Something wrong! Can't load menu images, please try again later."
      )
    );
  };

  const createImageElement = (src) => {
    const image = new Image(200);
    image.src = src;
    image.alt = overallImgAlt;
    return image;
  };

  const createMenuCard = () => {
    const newMenuCard = Card({
      cardTitle: "" + overallCardTitle + (imageIndex + 1),
      cardImageWithCaption: {
        image: createImageElement(imageSources[imageIndex]),
        captionData: overallImgCaptionData,
      },
      cardBody: overallCardBody,
    });
    imageIndex++;
    return newMenuCard;
  };

  const getMenuCardSize = () => {
    // Based on 'grid-auto-rows' property on 'div.menu-cards' in 'index.css'
    const menuCardSize = Number(
      getComputedStyle(menuCards)
        .getPropertyValue("grid-auto-rows")
        .match(/\d+/)
        ?.at(0)
    );
    if (Number.isNaN(menuCardSize)) {
      return 0;
    }
    return menuCardSize;
  };

  const isImageThere = () => imageIndex < imageSources.length;

  const getMenuCardsColumnsCount = () => {
    if (IntersectionObserver) {
      const menuCardSize = getMenuCardSize();
      if (menuCardSize) {
        const columnsCount = Math.trunc(menuCards.offsetWidth / menuCardSize);
        if (columnsCount > 0) {
          return columnsCount;
        }
      }
      console.warn("Can't get the size of a menu card!");
    }
    return imageSources.length;
  };

  const fillOneRowOfMenuCards = () => {
    const menuCardsColumnsCount = getMenuCardsColumnsCount();
    for (let i = 0; i < menuCardsColumnsCount; i++) {
      if (isImageThere()) {
        menuCards.appendChild(createMenuCard());
      } else {
        return;
      }
    }
  };

  const handleIntersection = (entries, observer) => {
    // Use 'settimeout', so it doesn't block the process running on the main thread.
    setTimeout(() => {
      const entry = entries.at(entries.length - 1);
      if (entry.isIntersecting) {
        fillOneRowOfMenuCards();
        observer.unobserve(entry.target);
        if (isImageThere()) {
          observer.observe(menuCards.lastChild);
        } else {
          observer.disconnect();
        }
      }
    }, 0);
  };

  // Load images asynchronously and make carousel of them.
  (async function () {
    const carouselImages = [];
    // Get 12 images named from '1.jpg' to '12.jpg'
    for (let i = 1; i <= 12; i++) {
      try {
        const fileName = (i > 9 ? "" : "0") + i + ".jpg";
        const importedImage = await import("./assets/images/" + fileName);
        imageSources.push(importedImage.default);
        carouselImages[i - 1] = {
          image: createImageElement(importedImage.default),
          captionData: overallImgCaptionData,
        };
      } catch (error) {
        menu.removeChild(loading);
        handleErrorOnLoadImages(error);
        return;
      }
    }
    // Remove the loading component and add Menu content
    menu.removeChild(loading);
    menu.append(Carousel(carouselImages), menuCards);
  })()
    .then(() => {
      fillOneRowOfMenuCards();
      if (IntersectionObserver) {
        const intersectionObserver = new IntersectionObserver(
          handleIntersection
        );
        intersectionObserver.observe(menuCards.lastChild);
      }
    })
    .catch(handleErrorOnLoadImages);

  return menu;
}

export { Menu };
