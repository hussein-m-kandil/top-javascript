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
    const imageSources = [];
    // Get 12 images named from '1.jpg' to '12.jpg'
    for (let i = 1; i <= 12; i++) {
      const fileName = (i > 9 ? "" : "0") + i + ".jpg";
      const imageObj = await import("./assets/images/" + fileName);
      imageSources[i - 1] = imageObj.default;
    }
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
    const images = [];
    for (let i = 0; i < imageSources.length; i++) {
      const image = new Image(200);
      image.src = imageSources[i];
      image.alt = overallImgAlt;
      image.className = "carousel-image";
      images[i] = {
        image,
        captionData: overallImgCaptionData,
      };
    }
    menu.removeChild(loading);
    menu.appendChild(Carousel(images));
  })();

  menu.appendChild(loading);
  return menu;
}

export { Menu };
