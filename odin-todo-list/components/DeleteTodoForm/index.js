import "./index.css";

import createElement from "../../helpers/createElement.js";
import Button from "../Button";
import TodoListEvents from "../../helpers/TodoListEvents";

export default function DeleteTodoForm() {
  const form = createElement("form", "del-todo-form");
  const message = createElement(
    "div",
    "del-todo-msg",
    "Are you sure you to DELETE this todo?"
  );
  const buttonsDiv = createElement("div", "del-todo-options");
  const deleteButton = Button({
    type: "submit",
    className: "del-todo-option del-todo-confirm",
    textContent: "Yes, Delete.",
  });
  const cancelButton = Button({
    type: "submit",
    className: "del-todo-option del-todo-cancel",
    textContent: "No, Cancel.",
  });

  deleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    TodoListEvents.emit(TodoListEvents.CONFIRM_DELETE_TODO);
  });
  cancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    TodoListEvents.emit(TodoListEvents.CANCEL_DELETE_TODO);
  });

  buttonsDiv.append(cancelButton, deleteButton);
  form.append(message, buttonsDiv);

  return form;
}

export { DeleteTodoForm };
