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
  const scrollEventOptions = {
    capture: false,
    passive: true,
  };
  let imageIndex = 0;

  menu.appendChild(loading);

  const handleLoadImageError = (error) => {
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
    // Based on custom property on ':root' in 'index.css'
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
    const menuCardSize = getMenuCardSize();
    if (menuCardSize) {
      return Math.floor(menuCards.offsetWidth / menuCardSize);
    }
    console.warn("Can't get menu card's min width!");
    return imageSources.length;
  };

  const fillOneRowOfMenuCards = () => {
    const menuCardsColumnsCount = getMenuCardsColumnsCount();
    for (let i = 0; i < menuCardsColumnsCount; i++) {
      if (isImageThere()) {
        menuCards.appendChild(createMenuCard());
      }
    }
  };

  const isPageScrolledToBottom = () => {
    return (
      menuCards.lastChild.getBoundingClientRect().bottom >=
      document.documentElement.clientHeight - getMenuCardSize() / 4
    );
  };

  const handleScrollEvent = () => {
    console.log("Scroll called.");
    if (isPageScrolledToBottom()) {
      fillOneRowOfMenuCards();
    }
    if (!isImageThere()) {
      document.removeEventListener(
        "scroll",
        handleScrollEvent,
        scrollEventOptions
      );
      console.log("Scroll event handler removed.");
    }
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
        handleLoadImageError(error);
        return;
      }
    }
    // Remove the loading component and add Menu content
    menu.removeChild(loading);
    menu.append(Carousel(carouselImages), menuCards);
  })()
    .then(() => {
      fillOneRowOfMenuCards();
      if (isPageScrolledToBottom) fillOneRowOfMenuCards();
      // Fill one row of menu cards again, on scroll end.
      document.addEventListener(
        "scroll",
        handleScrollEvent,
        scrollEventOptions
      ); // TODO: Throttle the handling of scroll event using 'setInterval' function.
    })
    .catch(handleLoadImageError);

  return menu;
}

export { Menu };
