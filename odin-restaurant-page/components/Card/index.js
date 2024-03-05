import "./index.css";

import createElement from "../../helpers/createElement.js";
import createFigCaption from "../../helpers/createFigCaption.js";

// TODO: Document Card component
/**
 * Image carousel component.
 * @param {Array<{
 *  image: HTMLImageElement,
 *  captionData: {
 *    name: { name: string?, url: string? }?,
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
export default function Card(props) {
  const card = createElement("div", "card");
  const cardTitle = props.cardTitle;
  const cardImage = props.cardImage;
  const cardImageWithCaption = props.cardImageWithCaption;
  const cardBody = props.cardBody;

  if (cardTitle) {
    card.appendChild(createElement("div", "card-title", cardTitle));
  }

  if (cardImage || cardImageWithCaption) {
    const figure = createElement("figure", "card-figure");
    if (cardImageWithCaption) {
      const figCaption = createFigCaption(
        cardImageWithCaption.captionData,
        "card-figcaption"
      );
      const image = cardImageWithCaption.image;
      image.className = image.className + " card-image";
      figure.append(image, figCaption);
    } else {
      cardImage.className = cardImage.className + " card-image";
      figure.appendChild(cardImage);
    }
    card.appendChild(figure);
  }

  if (cardBody) {
    card.appendChild(createElement("div", "card-body", cardBody));
  }

  return card;
}

export { Card };
