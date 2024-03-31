import './index.css';

import createElement from '../../helpers/createElement.js';
import createCredits from '../../helpers/createCredits.js';

/**
 * Image carousel component.
 * @param {{
 *  cardTitle: string?,
 *  image: HTMLImageElement?,
 *  cardImageWithCaption: {
 *    image: HTMLImageElement?,
 *    captionData: {
 *      owner: { name: string?, url: string? }?,
 *      site: { name: string?, url: string? }?
 *  }?}?,
 *  cardBody: string?
 * }?} props
 * Object that has some data for the card, like:
 * - cardTitle: string
 * - image: HTMLImageElement
 * - cardImageWithCaption: {image, captionData: {owner: {name, url}, site: {name, url}}}
 * - cardBody: string
 *
 * Note: All properties are optional.
 * @returns {HTMLDivElement}
 */
export default function Card(props) {
  const card = createElement('div', 'card');
  const cardTitle = props.cardTitle;
  const cardImage = props.cardImage;
  const cardImageWithCaption = props.cardImageWithCaption;
  const cardBody = props.cardBody;

  if (cardTitle) {
    card.appendChild(createElement('div', 'card-title', cardTitle));
  }

  if (cardImage || cardImageWithCaption) {
    const figure = createElement('figure', 'card-figure');
    if (cardImageWithCaption) {
      const figCaption = createCredits(
        'figcaption',
        'card-figcaption',
        cardImageWithCaption.captionData,
      );
      const image = cardImageWithCaption.image;
      image.className = image.className + ' card-image';
      figure.append(image, figCaption);
    } else {
      cardImage.className = cardImage.className + ' card-image';
      figure.appendChild(cardImage);
    }
    card.appendChild(figure);
  }

  if (cardBody) {
    card.appendChild(createElement('div', 'card-body', cardBody));
  }

  return card;
}

export { Card };
