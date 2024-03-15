import "./index.css";

import createElement from "../../helpers/createElement.js";
import capitalize from "../../helpers/capitalize.js";
import {
  isDate,
  isToday,
  isTomorrow,
  isPast,
  formatDate,
  formatDistanceToNow,
} from "date-fns";

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
  // Prepare todo due date
  let overdue = false;
  let dueDateText = "Due ";
  if (isDate(props.dueDate)) {
    if (isPast(props.dueDate, new Date())) {
      overdue = true;
      dueDateText = "" + formatDistanceToNow(props.dueDate) + " Overdue!";
    } else if (isToday(props.dueDate)) {
      dueDateText += "today at " + formatDate(props.dueDate, "hh:mm a");
    } else if (isTomorrow(props.dueDate)) {
      dueDateText += "tomorrow at " + formatDate(props.dueDate, "hh:mm a");
    } else {
      dueDateText += formatDistanceToNow(props.dueDate);
    }
  } else {
    dueDateText += props.dueDate;
  }

  // Create card elements
  const todoCard = createElement("div", "todo-card");
  const title = createElement("div", "title", props.title);
  const dueDate = createElement(
    "div",
    "due-date" + (overdue ? " overdue" : ""),
    dueDateText
  );
  const description = createElement(
    "div",
    "description",
    props.description ? props.description : "..."
  );
  const priority = createElement(
    "div",
    "priority " + props.priority,
    capitalize(props.priority) + " priority"
  );

  // Append card elements
  todoCard.append(title, dueDate, description, priority);

  return todoCard;
}

export { TodoCard };
