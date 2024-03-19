import "./index.css";

import createElement from "../../helpers/createElement.js";

export default function DropDownMenu() {
  const choices = ["blah", "blah blah", "blah blah blah"];
  let opened = false,
    currentChoiceIndex = 0;

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
      i === currentChoiceIndex
        ? ["aria-selected", "true"]
        : ["aria-selected", "false"]
    );
    choice.addEventListener("click", () => {
      currentChoice.textContent = choice.textContent;
      const siblings = [...choice.parentElement.children];
      siblings.forEach((sibling) => {
        sibling.setAttribute("aria-selected", "false");
      });
      choice.setAttribute("aria-selected", "true");
      currentChoiceIndex = i;
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
    opened = !opened;
  });

  document.addEventListener("click", (event) => {
    if (event.target !== dropDownMenu) {
      choicesMenu.classList.add("hidden");
    }
  });

  document.addEventListener("keyup", (event) => {
    console.log(`code = ${event.code}, key = ${event.key}`);
    // Only continue if the target is our menu or one of its children
    if (
      event.target === dropDownMenu ||
      event.target.parentElement === choicesMenu
    ) {
      if (event.key === "Enter") {
        event.target.click();
      }
      if (event.key === "Escape" && opened) {
        event.preventDefault();
        dropDownMenu.click();
        dropDownMenu.focus();
      }
      // If ArrowDown/Up,
      // Move down/up the menu if opened, else change the value.
      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (opened) {
          if (
            event.target === dropDownMenu ||
            event.target === choicesMenu.lastChild
          ) {
            choicesMenu.firstChild?.focus();
          } else {
            event.target.nextSibling?.focus();
          }
        } else {
          // If next index will be the end of the list,
          // return the index to Zero (0)
          if (currentChoiceIndex + 1 >= choices.length) {
            currentChoiceIndex = 0;
          } else {
            currentChoiceIndex++;
          }
          currentChoice.textContent = choices[currentChoiceIndex];
        }
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        if (opened) {
          if (
            event.target === dropDownMenu ||
            event.target === choicesMenu.firstChild
          ) {
            choicesMenu.lastChild?.focus();
          } else {
            // TODO: Try to use MenuElements
            event.target.previousSibling?.focus();
          }
        } else {
          // If next index will be the start of the list (0),
          // return the index to list.length - 1
          if (currentChoiceIndex - 1 < 0) {
            currentChoiceIndex = choices.length - 1;
          } else {
            currentChoiceIndex--;
          }
          currentChoice.textContent = choices[currentChoiceIndex];
        }
      }
    }
  });

  return dropDownMenu;
}

export { DropDownMenu };
