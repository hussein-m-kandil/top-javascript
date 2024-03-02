import "./index.css";

import createElement from "../../helpers/createElement.js";
import createCreditsDiv from "../../helpers/createCreditsDiv.js";
import imageSrc1 from "./assets/images/ai-generated-8571703_1280.jpg";
import imageSrc2 from "./assets/images/ai-generated-8591924_1280.jpg";

// TODO: Document the needed props
export default function Carousel() {
  const RIGHT_SLIDE_IN = "right-slide-in";
  const RIGHT_SLIDE_OUT = "right-slide-out";
  const carousel = createElement("div", "carousel");
  const figure = createElement("figure", "carousel-figure");
  const leftArrow = createElement("div", "carousel-left-arrow");
  const rightArrow = createElement("div", "carousel-right-arrow");
  // TODO: use dynamic 'import()' here
  const images = [
    {
      src: imageSrc1,
      caption: {
        owner: {
          name: "Kalpesh Ajugia",
          url: "https://pixabay.com/users/pixellicious-13377274/",
        },
        site: {
          name: "Pixabay",
          url: "https://pixabay.com/",
        },
      },
    },
    {
      src: imageSrc2,
      caption: {
        owner: {
          name: "Kalpesh Ajugia",
          url: "https://pixabay.com/users/pixellicious-13377274/",
        },
        site: {
          name: "Pixabay",
          url: "https://pixabay.com/",
        },
      },
    },
  ];
  let currentImageIndex = 0,
    slideOutTimeout = 0;

  const makeNewImage = (src) => {
    const image = new Image(200);
    image.src = src;
    image.className = "carousel-image";
    image.alt = "AI generated image of food.";
    return image;
  };

  const makeNewCaption = (imgCaptionData) => {
    const figcaption = createElement("figcaption", "carousel-figcaption");
    figcaption.appendChild(
      createCreditsDiv(
        imgCaptionData.owner.name ? "Image by " : null,
        imgCaptionData.owner.name,
        imgCaptionData.owner.url,
        imgCaptionData.site.name ? " from " : null,
        imgCaptionData.site.name,
        imgCaptionData.site.url
      )
    );
    return figcaption;
  };

  const decrementImageIndex = () => {
    if (currentImageIndex - 1 < 0) {
      currentImageIndex = images.length - 1;
    } else {
      currentImageIndex--;
    }
  };

  const incrementImageIndex = () => {
    if (currentImageIndex + 1 > images.length - 1) {
      currentImageIndex = 0;
    } else {
      currentImageIndex++;
    }
  };

  const updateImageFigure = () => {
    const imgSrc = images[currentImageIndex].src;
    const imgCaptionData = images[currentImageIndex].caption;
    [...figure.children].forEach((child) => figure.removeChild(child));
    figure.appendChild(makeNewImage(imgSrc));
    if (imgCaptionData) {
      figure.appendChild(makeNewCaption(imgCaptionData));
    }
    figure.style.animationName = RIGHT_SLIDE_IN;
  };

  const showNewImage = () => {
    // Assert that is already in the carousel
    if (figure.parentElement === carousel) {
      carousel.removeChild(figure);
    }
    updateImageFigure();
    carousel.appendChild(figure);
  };

  carousel.addEventListener("animationend", (event) => {
    if (event.animationName === RIGHT_SLIDE_OUT) {
      incrementImageIndex();
      showNewImage();
    } else if (event.animationName === RIGHT_SLIDE_IN) {
      if (slideOutTimeout) {
        clearTimeout(slideOutTimeout);
      }
      slideOutTimeout = setTimeout(() => {
        figure.style.animationName = RIGHT_SLIDE_OUT;
      }, 5000);
    }
  });

  leftArrow.addEventListener("click", () => {
    decrementImageIndex();
    showNewImage();
  });

  rightArrow.addEventListener("click", () => {
    incrementImageIndex();
    showNewImage();
  });

  carousel.append(leftArrow, rightArrow);
  showNewImage();

  return carousel;
}

export { Carousel };
