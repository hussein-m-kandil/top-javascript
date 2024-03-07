import "./index.css";

import createElement from "./helpers/createElement.js";
import titleizeHash from "./helpers/titleizeHash.js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Contact from "./components/Contact";

const HOME_URL_HASH = "#home";
const MENU_URL_HASH = "#menu";
const CONTACT_URL_HASH = "#contact";
const MENU_BUTTONS_DATA = [
  {
    className: "nav-btn home-btn",
    hash: HOME_URL_HASH,
    textContent: titleizeHash(HOME_URL_HASH),
    default:
      !window.location.hash.length || window.location.hash === HOME_URL_HASH,
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
];

const header = Header({
  headTextContent: "Odin Restaurant",
  menuButtonsData: MENU_BUTTONS_DATA,
});
document.body.appendChild(header);

const contentDiv = createElement("div", "content-container");
document.body.appendChild(contentDiv);

const footer = Footer(MENU_BUTTONS_DATA);
let footerAdded = false;

// Observe the header intersection with viewport to know when to add the fixed footer
if (IntersectionObserver) {
  const intersectionObserver = new IntersectionObserver((entries, observer) => {
    setTimeout(() => {
      const headerEntry = entries.at(0);
      console.log("Is header visible? " + headerEntry.isIntersecting);
      if (!headerEntry.isIntersecting) {
        document.body.appendChild(footer);
        document.body.style.paddingBottom = `${footer.offsetHeight}px`;
        footerAdded = true;
      } else {
        if (footerAdded) {
          document.body.removeChild(footer);
          document.body.style.paddingBottom = "0px";
          footerAdded = false;
        }
      }
    }, 0);
  });
  intersectionObserver.observe(header);
}
// TODO: Add another observation method in case IntersectionObservation not supported

/**
 * Loads the correct content based on 'window.location.hash' or load 'Home' content.
 */
function loadPageContent() {
  // Empty contentDiv.
  [...contentDiv.children].forEach((node) => {
    contentDiv.removeChild(node);
  });
  // Get right content based on URL hash
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
}

loadPageContent();
window.addEventListener("hashchange", loadPageContent);
