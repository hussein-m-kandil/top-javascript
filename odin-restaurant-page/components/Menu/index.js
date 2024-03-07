import "./index.css";

import createElement from "../../helpers/createElement.js";
import Loading from "../Loading/index.js";
import Carousel from "../Carousel/index.js";
import Card from "../Card/index.js";

/**
 * Menu page.
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
  let cardImageIndex = 0;

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

  const createCarousel = () => {
    const carouselImages = [];
    // Get 12 images named from '1.jpg' to '12.jpg'
    for (let i = 0; i < imageSources.length; i++) {
      carouselImages[i] = {
        image: createImageElement(imageSources[i]),
        captionData: overallImgCaptionData,
      };
      return Carousel(carouselImages);
    }
  };

  const createMenuCard = () => {
    const newMenuCard = Card({
      cardTitle: "" + overallCardTitle + (cardImageIndex + 1),
      cardImageWithCaption: {
        image: createImageElement(imageSources[cardImageIndex]),
        captionData: overallImgCaptionData,
      },
      cardBody: overallCardBody,
    });
    cardImageIndex++;
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

  const isImageThere = () => cardImageIndex < imageSources.length;

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

  // Load image sources asynchronously.
  (async function () {
    // Get 12 images named from '1.jpg' to '12.jpg'
    for (let i = 1; i <= 12; i++) {
      try {
        const fileName = (i > 9 ? "" : "0") + i + ".jpg";
        const importedImage = await import("./assets/images/" + fileName);
        imageSources.push(importedImage.default);
      } catch (error) {
        menu.removeChild(loading);
        handleErrorOnLoadImages(error);
        return;
      }
    }
  })()
    .then(() => {
      // Empty the Menu and add its content
      [...menu.children].forEach((node) => menu.removeChild(node));
      menu.appendChild(createCarousel());
      menu.appendChild(menuCards);
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
