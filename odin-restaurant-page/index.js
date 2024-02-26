import "./index.css";

import createElement from "./helpers/createElement.js";
import titleizeHash from "./helpers/titleizeHash.js";
import Header from "./components/Header";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Contact from "./components/Contact";

const HOME_URL_HASH = "#home";
const MENU_URL_HASH = "#menu";
const CONTACT_URL_HASH = "#contact";
const CONTENT_DIV_CLASS_NAME = "content-container";

document.body.appendChild(
  Header({
    headTextContent: "Odin Restaurant",
    menuButtonsData: [
      {
        className: "nav-btn home-btn",
        hash: HOME_URL_HASH,
        textContent: titleizeHash(HOME_URL_HASH),
        default:
          !window.location.hash.length ||
          window.location.hash === HOME_URL_HASH,
      },
      {
        className: "nav-btn menu-btn",
        hash: MENU_URL_HASH,
        textContent: titleizeHash(MENU_URL_HASH),
        default: window.location.hash === MENU_URL_HASH,
      },
      {
        className: "nav-btn contact-btn",
        hash: CONTACT_URL_HASH,
        textContent: titleizeHash(CONTACT_URL_HASH),
        default: window.location.hash === CONTACT_URL_HASH,
      },
    ],
  })
);

/**
 * Loads the correct content based on 'window.location.hash' or load 'Home' content.
 */
function getPageContent() {
  document
    .querySelectorAll("body>." + CONTENT_DIV_CLASS_NAME)
    .forEach((node) => node.remove());
  const contentDiv = createElement("div", CONTENT_DIV_CLASS_NAME);
  // TODO: Try to delay presenting the content while showing loading indicator
  switch (window.location.hash) {
    case MENU_URL_HASH:
      contentDiv.appendChild(Menu());
      break;
    case CONTACT_URL_HASH:
      contentDiv.appendChild(Contact());
      break;
    default:
      contentDiv.appendChild(Home());
      break;
  }
  document.body.appendChild(contentDiv);
}

getPageContent();
window.addEventListener("hashchange", getPageContent);
