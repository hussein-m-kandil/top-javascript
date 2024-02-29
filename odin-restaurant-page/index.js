import "./index.css";

import createElement from "./helpers/createElement.js";
import titleizeHash from "./helpers/titleizeHash.js";
import Header from "./components/Header";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import Loading from "./components/Loading";

const HOME_URL_HASH = "#home";
const MENU_URL_HASH = "#menu";
const CONTACT_URL_HASH = "#contact";

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

const contentDiv = createElement("div", "content-container");
document.body.appendChild(contentDiv);
let loadingId = 0;

/**
 * Removes all of the contentDiv's direct children.
 */
function cleanContentDiv() {
  [...contentDiv.children].forEach((node) => contentDiv.removeChild(node));
}

/**
 * Loads the correct content based on 'window.location.hash' or load 'Home' content.
 */
function loadPageContent() {
  // In case there is a loading timeout, clear it.
  if (loadingId) {
    clearTimeout(loadingId);
    loadingId = 0;
  }
  cleanContentDiv();
  // Delay presenting the content while showing loading indicator
  const loading = Loading();
  contentDiv.appendChild(loading);
  loadingId = setTimeout(() => {
    // Get right content based on URL hash
    let pageContent;
    switch (window.location.hash) {
      case MENU_URL_HASH:
        pageContent = Menu();
        break;
      case CONTACT_URL_HASH:
        pageContent = Contact();
        break;
      default:
        pageContent = Home();
        break;
    }
    // Show content
    cleanContentDiv();
    contentDiv.appendChild(pageContent);
    loadingId = 0;
  }, 3000);
}

loadPageContent();
window.addEventListener("hashchange", loadPageContent);
