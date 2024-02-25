import "./index.css";

import createElement from "../../helpers/createElement.js";

/**
 *
 * @param {Object<string, any>} props
 * @returns {HTMLElement}
 */
export default function Menu() {
  const menu = createElement(
    "div",
    "menu-content",
    "This is the content of the menu page!"
  );

  return menu;
}

export { Menu };
