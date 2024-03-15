import "./index.css";

import createElement from "../../helpers/createElement.js";

/**
 *
 * @param {{
 *  title: string,
 *  description: string,
 *  dueDate: Date,
 *  priority: string
 * }} props
 * @returns {HTMLDivElement}
 */
export default function TodoCard(props) {
  const todoCard = createElement("div", "todo-card");
  const title = createElement("div", "title", "Title: " + props.title);
  const description = createElement(
    "div",
    "description",
    "Description: " + props.description
  );
  const dueDate = createElement(
    "div",
    "due-date",
    "Due Date: " + props.dueDate
  );
  const priority = createElement(
    "div",
    "priority",
    "Priority: " + props.priority
  );

  todoCard.append(title, description, dueDate, priority);

  return todoCard;
}

export { TodoCard };
