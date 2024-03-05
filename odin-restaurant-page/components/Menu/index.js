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

  // Load images asynchronously
  const loading = Loading();
  (async function () {
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
    const carouselImages = [];
    const menuCards = createElement("div", "menu-cards");
    // Get 12 images named from '1.jpg' to '12.jpg'
    for (let i = 1; i <= 12; i++) {
      try {
        const fileName = (i > 9 ? "" : "0") + i + ".jpg";
        // Import image file
        const importedImage = await import("./assets/images/" + fileName);
        // Create HTMLImageElement
        const image = new Image(200);
        image.src = importedImage.default;
        image.alt = overallImgAlt;
        // Append a cloned image element and its caption data to carousel images
        carouselImages[i - 1] = {
          image: image.cloneNode(),
          captionData: overallImgCaptionData,
        };
        // Append new card with cloned image node sand its caption data, title and body
        menuCards.appendChild(
          Card({
            cardTitle: overallCardTitle + "" + i,
            cardImageWithCaption: {
              image: image.cloneNode(),
              captionData: overallImgCaptionData,
            },
            cardBody: overallCardBody,
          })
        );
      } catch (error) {
        console.error("Error occur while loading images: " + error.message);
        menu.removeChild(loading);
        menu.appendChild(
          createElement(
            "div",
            "error",
            "Something wrong! Images Cannot be loaded, please try again later."
          )
        );
        break;
      }
    }
    // Remove the loading component and add Menu content
    menu.removeChild(loading);
    menu.appendChild(Carousel(carouselImages));
    menu.appendChild(menuCards);
  })();
  menu.appendChild(loading);

  return menu;
}

export { Menu };
