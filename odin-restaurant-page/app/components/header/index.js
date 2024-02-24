import "./styles/main.css";

import createElement from "../../helpers/create-element";

// Header
const header = createElement("header");
// Head
const head = createElement("h1", "head");
head.textContent = "Odin Restaurant";
header.appendChild(head);
// Nav menu
const nav = createElement("nav", "nav-menu");
const homeBtn = createElement("button", "nav-btn home-btn");
homeBtn.textContent = "Home";
const menuBtn = createElement("button", "nav-btn menu-btn");
menuBtn.textContent = "Menu";
const contactBtn = createElement("button", "nav-btn contact-btn");
contactBtn.textContent = "Contact";
nav.append(homeBtn, menuBtn, contactBtn);
header.appendChild(nav);

export default header;
