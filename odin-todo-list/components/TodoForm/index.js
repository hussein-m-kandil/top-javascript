import "./index.css";

import createElement from "../../helpers/createElement.js";

export default function TodoForm() {
  // Form
  const todoForm = createElement(
    "form",
    "todo-form",
    null,
    ["action", ""],
    ["method", "get"]
  );

  // Title
  const titleDiv = createElement("div", "todo-title");
  const titleLabel = createElement("label", "title-label", "Title ", [
    "for",
    "title-input",
  ]);
  const titleInput = createElement(
    "input",
    "title-input",
    null,
    ["id", "title-input"],
    ["type", "text"]
  );
  titleDiv.append(titleLabel, titleInput);

  // Submit
  const submitDiv = createElement("div", "todo-submit");
  const submitButton = createElement(
    "button",
    "submit-button",
    "Create New Todo",
    ["type", "submit"]
  );
  submitDiv.appendChild(submitButton);

  // Append all controls to form
  todoForm.append(titleDiv, submitDiv);

  // Handle form submission
  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Form submitted!");
  });

  return todoForm;
}

export { TodoForm };
