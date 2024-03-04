import "./index.css";

import createElement from "../../helpers/createElement.js";
import Carousel from "../Carousel/index.js";
import imageSrc01 from "./assets/images/ai-generated-8571703_1280.jpg";
import imageSrc02 from "./assets/images/ai-generated-8591924_1280.jpg";
import imageSrc03 from "./assets/images/ai-generated-8022803_1280.jpg";
import imageSrc04 from "./assets/images/ai-generated-8022804_1280.png";
import imageSrc05 from "./assets/images/ai-generated-8176698_1280.png";
import imageSrc06 from "./assets/images/ai-generated-8270741_1280.jpg";
import imageSrc07 from "./assets/images/ai-generated-8489077_1280.jpg";
import imageSrc08 from "./assets/images/ai-generated-8571703_1280.jpg";
import imageSrc09 from "./assets/images/ai-generated-8582529_1280.jpg";
import imageSrc10 from "./assets/images/ai-generated-8591924_1280.jpg";
import imageSrc11 from "./assets/images/chicken-8063711_1280.png";
import imageSrc12 from "./assets/images/cold-8255451_1280.jpg";
import imageSrc13 from "./assets/images/noodles-8174666_1280.png";
import imageSrc14 from "./assets/images/steak-8063731_1280.png";

/**
 *
 * @param {Object<string, any>} props
 * @returns {HTMLElement}
 */
export default function Menu() {
  const menu = createElement("div", "menu");

  const imageSources = [
    imageSrc01,
    imageSrc02,
    imageSrc03,
    imageSrc04,
    imageSrc05,
    imageSrc06,
    imageSrc07,
    imageSrc08,
    imageSrc09,
    imageSrc10,
    imageSrc11,
    imageSrc12,
    imageSrc13,
    imageSrc14,
  ];
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
  menu.appendChild(Carousel({ images }));

  return menu;
}

export { Menu };
