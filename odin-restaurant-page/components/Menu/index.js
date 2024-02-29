import "./index.css";

import createElement from "../../helpers/createElement.js";
import Carousel from "../Carousel/index.js";

/**
 *
 * @param {Object<string, any>} props
 * @returns {HTMLElement}
 */
export default function Menu() {
  const menu = createElement("div", "menu");

  menu.appendChild(Carousel());

  return menu;
}

export { Menu };
