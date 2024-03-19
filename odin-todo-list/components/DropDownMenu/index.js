import "./index.css";

import createElement from "../../helpers/createElement.js";

export default function DropDownMenu() {
  const choices = ["blah", "blah blah", "blah blah blah"];

  // Create elements
  const dropDownMenu = createElement(
    "div",
    "hmk-drop-down-menu",
    null,
    ["tabindex", "0"],
    ["role", "listbox"]
  );
  const currentChoice = createElement("span", "hmk-current-choice", choices[0]);
  const choicesMenu = createElement("ul", "hmk-choices-menu hidden", null, [
    "role",
    "presentation",
  ]);
  const choicesElements = [];
  for (let i = 0; i < choices.length; i++) {
    const choice = createElement(
      "li",
      "hmk-choice",
      choices[i],
      ["tabindex", "0"],
      ["role", "option"],
      i === 0 ? ["aria-selected", "true"] : ["aria-selected", "false"]
    );
    choice.addEventListener("click", () => {
      currentChoice.textContent = choice.textContent;
      const siblings = [...choice.parentElement.children];
      siblings.forEach((sibling) => {
        sibling.setAttribute("aria-selected", "false");
      });
      choice.setAttribute("aria-selected", "true");
      // TODO: Emit project selected event
    });
    choicesElements.push(choice);
  }

  // Append elements
  choicesMenu.append(...choicesElements);
  dropDownMenu.append(currentChoice, choicesMenu);

  // Handle events
  dropDownMenu.addEventListener("click", () => {
    choicesMenu.classList.toggle("hidden");
    dropDownMenu.classList.toggle("open");
  });
  document.addEventListener("click", (event) => {
    if (event.target !== dropDownMenu) {
      choicesMenu.classList.add("hidden");
    }
  });
  document.addEventListener("keyup", (event) => {
    console.log(`code = ${event.code}, key = ${event.key}`);
    if (
      event.target === dropDownMenu ||
      event.target.parentElement === choicesMenu
    ) {
      if (event.key === "Enter") {
        event.target.click();
      }
      if (event.key === "ArrowDown") {
        const tabKeyEvent = new KeyboardEvent("keyup", {
          bubbles: true,
          cancelable: true,
          composed: true,
          key: "Tab",
          code: "Tab",
          window: document.defaultView,
        });
        document.dispatchEvent(tabKeyEvent);
      }
    }
  });

  return dropDownMenu;
}

export { DropDownMenu };
