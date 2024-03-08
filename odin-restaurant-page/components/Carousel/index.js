import "./index.css";

import createElement from "../../helpers/createElement.js";
import createCredits from "../../helpers/createCredits.js";

/**
 * Image carousel component.
 * @param {Array<{
 *  image: HTMLImageElement,
 *  captionData: {
 *    owner: { name: string?, url: string? }?,
 *    site: { name: string?, url: string? }?
 *   }?
 * }>} images
 * Array of objects, each of which has 'image' key (type 'Image')
 * and (optional) 'captionData' (type 'Object').
 * - 'captionData' is {owner:{name,url},site:{name, url}} (notice the keys' names).
 * - 'captionData' produces an image's caption like "Image by owner.name from site.name".
 * - 'captionData' produces the names as '<a>' the 'url' key is present.
 *
 * Note: The 'captionData' key and all its nested keys are optional.
 * @returns {HTMLDivElement}
 */
export default function Carousel(images) {
  if (!images || !Array.isArray(images)) {
    throw TypeError(
      "Carousel must invoked with images: Array<Object<HTMLImageElement, Object?>>."
    );
  }
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
  const PLAY_ICON = "▶";
  const PAUSE_ICON = "| |";
  const carousel = createElement("div", "carousel");
  carousel.tabIndex = 0;
  const figure = createElement("figure", "carousel-figure");
  figure.tabIndex = 0;
  const leftArrow = createElement("div", "carousel-left-arrow");
  leftArrow.tabIndex = 0;
  const rightArrow = createElement("div", "carousel-right-arrow");
  rightArrow.tabIndex = 0;
  const controllers = createElement("div", "carousel-controllers");
  controllers.tabIndex = 0;
  const playBtn = createElement("div", "carousel-play-btn", PLAY_ICON);
  playBtn.tabIndex = 0;
  const imgCircles = createElement("div", "carousel-img-circles");
  imgCircles.tabIndex = 0;
  const animationBtn = createElement("div", "carousel-animation-btn", "▶▶");
  animationBtn.tabIndex = 0;
  controllers.append(playBtn, imgCircles, animationBtn);
  let currentImageIndex = 0,
    slideInterval = 0,
    play = true,
    animate = true,
    backward = false,
    increment = true;

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
    const captionData = images[currentImageIndex].captionData;
    [...figure.children].forEach((child) => figure.removeChild(child));
    images[currentImageIndex].image.classList.add("carousel-image");
    figure.appendChild(images[currentImageIndex].image);
    if (captionData) {
      figure.appendChild(
        createCredits("figcaption", "carousel-figcaption", captionData)
      );
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
    if (increment) {
      if (backward) {
        decrementImageIndex();
      } else {
        incrementImageIndex();
      }
    }
    updateImageFigure();
    updateImageCircles();
    backward = false;
    increment = true;
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
    if (play) {
      slideInterval = setInterval(slide, SLIDE_INTERVAL);
    }
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
      if (play) {
        clearInterval(slideInterval);
        slideInterval = 0;
        play = false;
        playBtn.textContent = PAUSE_ICON;
      } else {
        play = true;
        // 'SlideManually' needs 'play = true' to set slide interval
        slideManually();
        playBtn.textContent = PLAY_ICON;
      }
      playBtn.classList.toggle("carousel-play-btn-inactive");
    },
    false
  );

  animationBtn.addEventListener(
    "click",
    () => {
      animate = !animate;
      animationBtn.classList.toggle("carousel-animation-btn-inactive");
    },
    false
  );

  carousel.addEventListener("keydown", (event) => {
    if ((event.isTrusted && event.key === " ") || event.key === "Enter") {
      event.target.click();
    }
  });

  carousel.append(leftArrow, rightArrow, figure);
  for (let i = 0; i < images.length; i++) {
    const imgCircle = createElement("div", "img-circle");
    imgCircle.tabIndex = 0;
    imgCircle.addEventListener(
      "click",
      () => {
        currentImageIndex = i;
        increment = false;
        slideManually();
      },
      false
    );
    imgCircles.appendChild(imgCircle);
  }
  carousel.appendChild(controllers);

  updateImageFigure();
  updateImageCircles();

  if (play) {
    slideInterval = setInterval(slide, SLIDE_INTERVAL);
  }

  return carousel;
}

export { Carousel };
