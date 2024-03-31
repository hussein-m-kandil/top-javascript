import './index.css';

import createElement from '../../helpers/createElement.js';
import heroImageSrc from './assets/images/ai-food_01.png';

/**
 *
 * @param {Object<string, any>} props
 * @returns {HTMLElement}
 */
export default function Home() {
  const home = createElement('div', 'home');

  const hero = createElement('div', 'home-hero');
  const heroImage = new Image(100, 100);
  heroImage.src = heroImageSrc;
  heroImage.className = 'hero-image';
  hero.appendChild(heroImage);

  const heroText = createElement('div', 'hero-text');
  const heroTextHead = createElement(
    'div',
    'hero-text-head',
    'AI Generated Food',
  );
  const heroTextBody = createElement(
    'div',
    'hero-text-body',
    'Makes you artificially stuffed',
  );
  heroText.appendChild(heroTextHead),
    heroText.appendChild(heroTextBody),
    hero.appendChild(heroText);

  home.appendChild(hero);
  return home;
}

export { Home };
