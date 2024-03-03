import "./index.css";

import createElement from "../../helpers/createElement.js";
import imageSrc1 from "./assets/images/ai-generated-8571703_1280.jpg";
import imageSrc2 from "./assets/images/ai-generated-8591924_1280.jpg";

// TODO: Document the needed props
export default function Carousel() {
  const SLIDE_INTERVAL = 5000;
  const ANIMATION_DURATION = 750;
  const LEFT_SLIDE_IN_STYLE = " animation-name: left-slide-in; ";
  const LEFT_SLIDE_OUT_STYLE = " animation-name: left-slide-out; ";
  const RIGHT_SLIDE_IN_STYLE = " animation-name: right-slide-in; ";
  const RIGHT_SLIDE_OUT_STYLE = " animation-name: right-slide-out; ";
  const ANIMATION_STYLES =
    " animation-duration: " +
    ANIMATION_DURATION +
    "ms; " +
    " animation-iteration-count: 1; " +
    " animation-fill-mode: forwards; " +
    " animation-timing-function: ease-in-out; ";
  const carousel = createElement("div", "carousel");
  const figure = createElement("figure", "carousel-figure");
  const leftArrow = createElement("div", "carousel-left-arrow");
  const rightArrow = createElement("div", "carousel-right-arrow");
  const controllers = createElement("div", "carousel-controllers");
  const playBtn = createElement("div", "carousel-play-btn", "▶");
  const imgCircles = createElement("div", "carousel-img-circles");
  const animationBtn = createElement("div", "carousel-animation-btn", "▶▶");
  controllers.append(playBtn, imgCircles, animationBtn);
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
    slideInterval = 0,
    animate = true,
    backward = false;

  const makeNewImage = (src) => {
    const image = new Image(200);
    image.src = src;
    image.className = "carousel-image";
    image.alt = "AI generated image of food.";
    return image;
  };

  const makeNewCaption = (imgCaptionData) => {
    const figcaption = createElement("figcaption", "carousel-figcaption");
    if (imgCaptionData.owner.name && imgCaptionData.owner.url) {
      figcaption.appendChild(document.createTextNode("Image by "));
      figcaption.appendChild(
        createElement("a", "credits-owner", imgCaptionData.owner.name, [
          "href",
          imgCaptionData.owner.url,
        ])
      );
    } else if (imgCaptionData.owner.name) {
      figcaption.appendChild(
        document.createTextNode("Image by " + imgCaptionData.owner.name)
      );
    }
    if (imgCaptionData.site.name && imgCaptionData.site.url) {
      figcaption.appendChild(document.createTextNode(" from "));
      figcaption.appendChild(
        createElement("a", "credits-site", imgCaptionData.site.name, [
          "href",
          imgCaptionData.site.url,
        ])
      );
    } else if (imgCaptionData.site.name) {
      figcaption.appendChild(
        document.createTextNode(" from " + imgCaptionData.site.name)
      );
    }
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

  const updateImageCircles = () => {
    [...imgCircles.children].forEach((circle, i) => {
      if (
        currentImageIndex === i &&
        !circle.classList.contains("carousel-img-circle-active")
      ) {
        circle.classList.add("carousel-img-circle-active");
      } else if (
        currentImageIndex !== i &&
        circle.classList.contains("carousel-img-circle-active")
      ) {
        circle.classList.remove("carousel-img-circle-active");
      }
    });
  };

  const updateImageFigure = () => {
    const imgSrc = images[currentImageIndex].src;
    const imgCaptionData = images[currentImageIndex].caption;
    [...figure.children].forEach((child) => figure.removeChild(child));
    figure.appendChild(makeNewImage(imgSrc));
    if (imgCaptionData) {
      figure.appendChild(makeNewCaption(imgCaptionData));
    }
    if (animate) {
      if (backward) {
        figure.setAttribute("style", LEFT_SLIDE_IN_STYLE + ANIMATION_STYLES);
      } else {
        figure.setAttribute("style", RIGHT_SLIDE_IN_STYLE + ANIMATION_STYLES);
      }
    } else {
      figure.removeAttribute("style");
    }
  };

  const showNewImage = () => {
    if (backward) {
      decrementImageIndex();
    } else {
      incrementImageIndex();
    }
    updateImageFigure();
    updateImageCircles();
    backward = false;
  };

  const slide = () => {
    if (animate) {
      if (backward) {
        figure.setAttribute("style", LEFT_SLIDE_OUT_STYLE + ANIMATION_STYLES);
      } else {
        figure.setAttribute("style", RIGHT_SLIDE_OUT_STYLE + ANIMATION_STYLES);
      }
      setTimeout(showNewImage, ANIMATION_DURATION);
    } else {
      figure.removeAttribute("style");
      showNewImage();
    }
  };

  const slideManually = () => {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = 0;
    }
    slide();
    slideInterval = setInterval(slide, SLIDE_INTERVAL);
  };

  leftArrow.addEventListener(
    "click",
    () => {
      backward = true;
      slideManually();
    },
    false
  );

  rightArrow.addEventListener(
    "click",
    () => {
      backward = false;
      slideManually();
    },
    false
  );

  playBtn.addEventListener(
    "click",
    () => {
      if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = 0;
      } else {
        slideInterval = setInterval(slide, SLIDE_INTERVAL);
      }
      playBtn.classList.toggle("carousel-play-btn-active");
    },
    false
  );

  animationBtn.addEventListener(
    "click",
    () => {
      animate = !animate;
      animationBtn.classList.toggle("carousel-animation-btn-active");
    },
    false
  );

  carousel.append(leftArrow, rightArrow, figure);
  for (let i = 0; i < images.length; i++) {
    const imgCircle = createElement("div", "img-circle");
    imgCircle.addEventListener(
      "click",
      () => {
        currentImageIndex = i;
        updateImageFigure();
        updateImageCircles();
      },
      false
    );
    imgCircles.appendChild(imgCircle);
  }
  carousel.appendChild(controllers);

  updateImageFigure();
  updateImageCircles();

  slideInterval = setInterval(slide, SLIDE_INTERVAL);

  return carousel;
}

export { Carousel };
