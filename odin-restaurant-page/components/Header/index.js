import './index.css';

import createElement from '../../helpers/createElement.js';

/**
 *
 * @param {Object<string, any>} props
 * @returns {HTMLElement}
 */
export default function Header({ headTextContent, menuButtonsData }) {
  const header = createElement('header', 'header');
  // Main title
  const head = createElement('h1', 'head');
  const headBtn = createElement('button', 'nav-btn', headTextContent, [
    'type',
    'button',
  ]);
  headBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (window.location) {
      window.location.replace(
        window.location.href.replace(/#[^\/\s,]+\/?$/, ''),
      );
    }
  });
  head.appendChild(headBtn);
  header.appendChild(head);
  // Main Menu
  const nav = createElement('nav', 'nav-menu');
  const navList = createElement('ul', 'nav-ul');
  for (let i = 0; i < menuButtonsData.length; i++) {
    const navLi = createElement('li', 'nav-li');
    const navBtn = createElement(
      'button',
      menuButtonsData[i].className +
        (menuButtonsData[i].default ? ' underlined' : ''),
      menuButtonsData[i].textContent,
      ['type', 'button'],
    );
    navBtn.addEventListener('click', (event) => {
      window.location.hash = menuButtonsData[i].hash;
      header
        .querySelectorAll('button')
        .forEach((btn) => btn.classList.remove('underlined'));
      event.target.classList.add('underlined');
    });
    navLi.appendChild(navBtn);
    navList.appendChild(navLi);
  }
  nav.appendChild(navList), header.appendChild(nav);
  return header;
}

export { Header };
