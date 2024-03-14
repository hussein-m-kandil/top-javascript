import "./index.css";

import { format as formatDate, isEqual, isAfter } from "date-fns";
import createElement from "../../helpers/createElement.js";
import TodoListEvents from "../../helpers/TodoListEvents.js";

export default function TodoForm() {
  // Current time
  const currentDateTime = formatDate(new Date(), "yyyy-MM-dd'T'HH:mm");

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
    null,
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
    ["checked", ""]
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
    ["type", "radio"]
  );
  lowPriorityDiv.append(lowPriorityRadio, lowPriorityLabel);
  priorityFieldset.append(
    priorityLegend,
    highPriorityDiv,
    mediumPriorityDiv,
    lowPriorityDiv
  );

  // Submit
  const submitDiv = createElement("div", "submit");
  const submitButton = createElement("button", "submit", "Create New Todo", [
    "type",
    "submit",
  ]);
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
    // TODO: Create new Todo ;)
    TodoListEvents.emit(TodoListEvents.CREATE_NEW_TODO, form);
  });

  return todoForm;
}

export { TodoForm };
