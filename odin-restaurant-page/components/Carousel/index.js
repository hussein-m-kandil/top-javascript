import "./index.css";

import createElement from "../../helpers/createElement.js";
import createCreditsDiv from "../../helpers/createCreditsDiv.js";
import imageSrc1 from "./assets/images/ai-generated-8571703_1280.jpg";
import imageSrc2 from "./assets/images/ai-generated-8591924_1280.jpg";

export default function Carousel() {
  const RIGHT_SLIDE_IN = "right-slide-in";
  const RIGHT_SLIDE_OUT = "right-slide-out";
  const carousel = createElement("div", "carousel");

  const imgSrcArr = [imageSrc1, imageSrc2]; // TODO: use dynamic 'import()' here
  let imgSrcIndex = 0;

  const makeImage = (src) => {
    const image = new Image(200);
    image.src = src;
    image.className = "carousel-image";
    return image;
  };

  const getImageSrc = () => {
    const src = imgSrcArr[imgSrcIndex];
    imgSrcIndex = imgSrcIndex + 1 >= imgSrcArr.length ? 0 : ++imgSrcIndex;
    return src;
  };

  const appendNewImageFigure = (newImage) => {
    const figure = createElement("figure", "carousel-figure");
    figure.appendChild(newImage);
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
    figure.classList.add("right-slide-in");
    carousel.appendChild(figure);
  };

  carousel.addEventListener("animationend", (event) => {
    // TODO: Try to use animation directly without classes.
    if (event.animationName === RIGHT_SLIDE_OUT) {
      event.target.remove();
      appendNewImageFigure(makeImage(getImageSrc()));
    } else if (event.animationName === RIGHT_SLIDE_IN) {
      setTimeout(() => {
        event.target?.classList.replace(RIGHT_SLIDE_IN, RIGHT_SLIDE_OUT);
      }, 3000);
    }
  });

  appendNewImageFigure(makeImage(getImageSrc()));

  return carousel;
}

export { Carousel };
