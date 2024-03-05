import "./index.css";

import createElement from "../../helpers/createElement.js";
import Loading from "../Loading/index.js";
import Carousel from "../Carousel/index.js";

/**
 *
 * @param {Object<string, any>} props
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
    const imagesWithCaptions = [];
    // Get 12 images named from '1.jpg' to '12.jpg'
    for (let i = 1; i <= 12; i++) {
      try {
        const fileName = (i > 9 ? "" : "0") + i + ".jpg";
        const importedImage = await import("./assets/images/" + fileName);
        const image = new Image(200);
        image.src = importedImage.default;
        image.alt = overallImgAlt;
        image.className = "carousel-image";
        imagesWithCaptions[i - 1] = {
          image,
          captionData: overallImgCaptionData,
        };
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
    menu.removeChild(loading);
    menu.appendChild(Carousel(imagesWithCaptions));
  })();
  menu.appendChild(loading);

  return menu;
}

export { Menu };
