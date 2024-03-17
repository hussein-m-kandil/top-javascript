import "./index.css";

import { format as formatDate, isEqual, isAfter } from "date-fns";
import createElement from "../../helpers/createElement.js";
import TodoListEvents from "../../helpers/TodoListEvents.js";
import Button from "../Button";

/**
 * Creates form for edit todo's info or make new todo.
 * @param {{
 *  id: string,
 *  title: string,
 *  description: string,
 *  dueDate: Date,
 *  priority: string
 * }?} todoInfo - If preset, then, it will be edit todo form
 * @returns {HTMLFormElement}
 */
export default function TodoForm(todoInfo) {
  // Current time
  const currentDateTime = formatDate(new Date(), "yyyy-MM-dd'T'HH:mm");
  const defaultDateTime = todoInfo
    ? formatDate(todoInfo.dueDate, "yyyy-MM-dd'T'HH:mm")
    : formatDate(new Date(), "yyyy-MM-dd'T'HH:mm"); // TODO: make default time after the current

  // Form
  const todoForm = createElement(
    "form",
    "todo-form",
    null,
    ["action", ""],
    ["method", "get"]
  );

  // Title
  const titleDiv = createElement("div", "title");
  const titleLabel = createElement("label", "title", "Title ", [
    "for",
    "title",
  ]);
  const titleInput = createElement(
    "input",
    "title",
    null,
    ["id", "title"],
    ["name", "title"],
    ["type", "text"],
    ["value", todoInfo ? todoInfo.title : ""],
    ["autocomplete", "on"],
    ["autofocus", ""],
    ["required", ""]
  );
  titleDiv.append(titleLabel, titleInput);

  // Description
  const descriptionDiv = createElement("div", "description");
  const descriptionLabel = createElement(
    "label",
    "description",
    "Description ",
    ["for", "description"]
  );
  const descriptionText = createElement(
    "textarea",
    "description",
    todoInfo ? todoInfo.description : null,
    ["id", "description"],
    ["name", "description"]
  );
  descriptionDiv.append(descriptionLabel, descriptionText);

  // Due date
  const dueDateDiv = createElement("div", "due-date");
  const dueDateLabel = createElement("label", "due-date", "Due Date ", [
    "for",
    "due-date",
  ]);
  const dueDateInput = createElement(
    "input",
    "due-date",
    null,
    ["id", "due-date"],
    ["name", "due-date"],
    ["type", "datetime-local"],
    ["value", defaultDateTime],
    ["min", currentDateTime],
    ["required", ""]
  );
  dueDateDiv.append(dueDateLabel, dueDateInput);

  // Priority
  const priorityFieldset = createElement("fieldset", "priority");
  const priorityLegend = createElement("legend", "priority", "Priority ");
  const highPriorityDiv = createElement("div", "priority");
  const highPriorityLabel = createElement("label", "priority", "High ", [
    "for",
    "high-priority",
  ]);
  const highPriorityRadio = createElement(
    "input",
    "priority",
    null,
    ["id", "high-priority"],
    ["name", "priority"],
    ["value", "high"],
    ["type", "radio"]
  );
  highPriorityDiv.append(highPriorityRadio, highPriorityLabel);
  const mediumPriorityDiv = createElement("div", "priority");
  const mediumPriorityLabel = createElement("label", "priority", "Medium ", [
    "for",
    "medium-priority",
  ]);
  const mediumPriorityRadio = createElement(
    "input",
    "priority",
    null,
    ["type", "radio"],
    ["id", "medium-priority"],
    ["name", "priority"],
    ["value", "medium"]
  );
  mediumPriorityDiv.append(mediumPriorityRadio, mediumPriorityLabel);
  const lowPriorityDiv = createElement("div", "priority");
  const lowPriorityLabel = createElement("label", "priority", "Low ", [
    "for",
    "low-priority",
  ]);
  const lowPriorityRadio = createElement(
    "input",
    "priority",
    null,
    ["id", "low-priority"],
    ["name", "priority"],
    ["value", "low"],
    ["type", "radio"]
  );
  lowPriorityDiv.append(lowPriorityRadio, lowPriorityLabel);
  if (todoInfo) {
    console.log(todoInfo.priority);
    switch (todoInfo.priority) {
      case "low":
        lowPriorityRadio.checked = true;
        break;
      case "high":
        highPriorityRadio.checked = true;
        break;
      default:
        mediumPriorityRadio.checked = true;
        break;
    }
  } else {
    mediumPriorityRadio.checked = true;
  }
  priorityFieldset.append(
    priorityLegend,
    highPriorityDiv,
    mediumPriorityDiv,
    lowPriorityDiv
  );

  // Submit
  const submitDiv = createElement("div", "submit");
  const submitButton = Button({
    className: "submit",
    type: "submit",
    textContent: "Create New Todo",
  });
  submitDiv.appendChild(submitButton);

  // Append all controls to form
  todoForm.append(
    titleDiv,
    descriptionDiv,
    dueDateDiv,
    priorityFieldset,
    submitDiv
  );

  // Handle form submission
  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    // Validate title field
    if (!form["title"].value) {
      form["title"].setCustomValidity("Todo's title cannot be empty!");
      form["title"].addEventListener("input", () => {
        form["title"].setCustomValidity("");
      });
    }
    // Validate due date field
    if (
      !isEqual(new Date(form["due-date"].value), new Date(currentDateTime)) &&
      !isAfter(new Date(form["due-date"].value), new Date(currentDateTime))
    ) {
      form["due-date"].setCustomValidity(
        "The date/time must be after or equal to the current date/time!"
      );
      form["due-date"].addEventListener("change", () => {
        form["due-date"].setCustomValidity("");
      });
    }
    // Emit create new Todo event
    if (todoInfo) {
      todoInfo.title = form["title"].value;
      todoInfo.description = form["description"].value;
      todoInfo.dueDate = new Date(form["due-date"].value);
      todoInfo.priority = form["priority"].value;
      TodoListEvents.emit(TodoListEvents.TODO_EDITED, todoInfo);
    } else {
      const todoInfo = {
        title: form["title"].value,
        description: form["description"].value,
        dueDate: new Date(form["due-date"].value),
        priority: form["priority"].value,
      };
      TodoListEvents.emit(TodoListEvents.CREATE_NEW_TODO, todoInfo);
    }
  });

  return todoForm;
}

export { TodoForm };
