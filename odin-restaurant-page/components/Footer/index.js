import "./index.css";

import createElement from "../../helpers/createElement.js";

/**
 *
 * @param {{
 *       className: string,
 *       hash: string,
 *       textContent: string,
 *       default: boolean,
 *     }} menuButtonsData
 * The data needed to create menu buttons in the footer
 * NOTE: The 'hash' must be the same as 'textContent' prefixed with '#'.
 * @returns {HTMLFooterElement}
 */
export default function Footer(menuButtonsData) {
  const footer = createElement("footer", "footer");
  // Main Menu
  const nav = createElement("nav", "nav-menu");
  const navList = createElement("ul", "nav-ul");
  for (let i = 0; i < menuButtonsData.length; i++) {
    const navLi = createElement("li", "nav-li");
    const navBtn = createElement(
      "button",
      menuButtonsData[i].className +
        (menuButtonsData[i].default ? " underlined" : ""),
      menuButtonsData[i].textContent,
      ["type", "button"]
    );
    navBtn.addEventListener("click", (event) => {
      window.location.hash = menuButtonsData[i].hash;
      footer
        .querySelectorAll("button")
        .forEach((btn) => btn.classList.remove("underlined"));
      event.target.classList.add("underlined");
    });
    navLi.appendChild(navBtn);
    navList.appendChild(navLi);
  }
  nav.appendChild(navList), footer.appendChild(nav);
  return footer;
}

export { Footer };
