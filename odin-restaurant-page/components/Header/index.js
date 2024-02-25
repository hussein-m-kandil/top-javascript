import "./index.css";

import createElement from "../../helpers/createElement.js";

/**
 *
 * @param {Object<string, any>} props
 * @returns {HTMLElement}
 */
export default function Header({ headTextContent, menuButtonsData }) {
  const header = createElement("header", "header");
  header.appendChild(createElement("h1", "head", headTextContent));
  // Main Menu
  const nav = createElement("nav", "nav-menu");
  const navList = createElement("ul", "nav-ul");
  for (let i = 0; i < menuButtonsData.length; i++) {
    const navLi = createElement("li", "nav-li");
    const navBtn = createElement(
      "button",
      menuButtonsData[i].className,
      menuButtonsData[i].textContent,
      ["type", "button"]
    );
    if (menuButtonsData[i].onClick) {
      navBtn.addEventListener("click", menuButtonsData[i].onClick);
    }
    navLi.appendChild(navBtn);
    navList.appendChild(navLi);
  }
  nav.appendChild(navList), header.appendChild(nav);
  return header;
}

export { Header };
