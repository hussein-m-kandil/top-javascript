import "./index.css";

import createElement from "../../helpers/createElement.js";

/**
 *
 * @param {Object<string, any>} props
 * @returns {HTMLElement}
 */
export default function Home() {
  const home = createElement(
    "div",
    "home-content",
    "This is the content of the home page!"
  );

  return home;
}

export { Home };
