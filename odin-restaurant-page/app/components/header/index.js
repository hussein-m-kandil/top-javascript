import "./styles/main.css";

import createElement from "../../helpers/create-element";

const header = createElement("header", "header");
header.appendChild(createElement("h1", "head", null, "Odin Restaurant"));
// Main Menu
const menuButtonsData = [
  { className: "nav-btn home-btn", textContent: "Home" },
  { className: "nav-btn menu-btn", textContent: "Menu" },
  { className: "nav-btn contact-btn", textContent: "Contact" },
];
const nav = createElement("nav", "nav-menu");
const navList = createElement("ul", "nav-ul");
for (let i = 0; i < menuButtonsData.length; i++) {
  const navLi = createElement("li", "nav-li");
  navLi.appendChild(
    createElement(
      "button",
      menuButtonsData[i].className,
      null,
      menuButtonsData[i].textContent,
      ["type", "button"]
    )
  );
  navList.appendChild(navLi);
}
nav.appendChild(navList), header.appendChild(nav);

export default header;
