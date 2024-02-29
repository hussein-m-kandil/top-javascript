import "./index.css";

import createElement from "../../helpers/createElement.js";
import createCreditsDiv from "../../helpers/createCreditsDiv.js";
import imageSrc1 from "./assets/images/ai-generated-8571703_1280.jpg";
import imageSrc2 from "./assets/images/ai-generated-8591924_1280.jpg";

export default function Carousel() {
  const carousel = createElement("div", "carousel");

  const imageSources = [imageSrc1, imageSrc2];

  function makeImage(src) {
    const image = new Image(200);
    image.src = src;
    image.className = "carousel-image";
    return image;
  }

  const figure = createElement("figure", "carousel-figure");
  figure.appendChild(makeImage(imageSources[0]));
  const figcaption = createElement("figcaption", "carousel-figcaption");
  figcaption.appendChild(
    createCreditsDiv(
      "Image by ",
      "Kalpesh Ajugia",
      "https://pixabay.com/users/pixellicious-13377274/",
      " from ",
      "Pixabay",
      "https://pixabay.com/"
    )
  );
  figure.appendChild(figcaption);
  carousel.appendChild(figure);

  return carousel;
}

export { Carousel };
