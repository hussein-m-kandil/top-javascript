import './index.css';

import createElement from '../../helpers/createElement.js';

/**
 * @param {Object<string, Any>?} props
 * @returns {HTMLElement}
 */
export default function Loading() {
  const DOT_COUNT = 3;
  const loading = createElement('div', 'loading');
  let dotAnimationEndCount = 0;
  let dotRemoved = false;

  function addLoadingDots() {
    for (let i = 0; i < DOT_COUNT; i++) {
      loading.appendChild(createElement('div', 'loading-dot'));
    }
  }

  loading.addEventListener('animationend', () => {
    if (++dotAnimationEndCount === DOT_COUNT) {
      [...loading.children].forEach((dot) => {
        if (!dot.style.animationName) {
          dot.style.opacity = 1;
          dot.style.animationName = 'fade-out';
        } else {
          loading.removeChild(dot);
          dotRemoved = true;
        }
      });
      if (dotRemoved) {
        addLoadingDots();
        dotRemoved = false;
      }
      dotAnimationEndCount = 0;
    }
  });

  addLoadingDots();

  return loading;
}

export { Loading };
