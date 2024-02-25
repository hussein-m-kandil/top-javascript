import "./index.css";

import createElement from "./helpers/createElement";
import Header from "./components/Header";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Contact from "./components/Contact";

const CONTENT_DIV_CLASS_NAME = "content-container";

function getHomeContent() {
  document.querySelector("." + CONTENT_DIV_CLASS_NAME)?.remove();
  // TODO: Try to delay the process a while and display loading GIF ;)
  const contentDiv = createElement("div", CONTENT_DIV_CLASS_NAME);
  contentDiv.appendChild(Home());
  document.body.appendChild(contentDiv);
}

function getMenuContent() {
  document.querySelector("." + CONTENT_DIV_CLASS_NAME)?.remove();
  // TODO: Try to delay the process a while and display loading GIF ;)
  const contentDiv = createElement("div", CONTENT_DIV_CLASS_NAME);
  contentDiv.appendChild(Menu());
  document.body.appendChild(contentDiv);
}

function getContactContent() {
  document.querySelector("." + CONTENT_DIV_CLASS_NAME)?.remove();
  // TODO: Try to delay the process a while and display loading GIF ;)
  const contentDiv = createElement("div", CONTENT_DIV_CLASS_NAME);
  contentDiv.appendChild(Contact());
  document.body.appendChild(contentDiv);
}

document.body.appendChild(
  Header({
    headTextContent: "Odin Restaurant",
    menuButtonsData: [
      {
        className: "nav-btn home-btn",
        textContent: "Home",
        onClick: getHomeContent,
      },
      {
        className: "nav-btn menu-btn",
        textContent: "Menu",
        onClick: getMenuContent,
      },
      {
        className: "nav-btn contact-btn",
        textContent: "Contact",
        onClick: getContactContent,
      },
    ],
  })
);
