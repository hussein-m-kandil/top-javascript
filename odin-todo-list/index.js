import "./index.css";

import { isEqual, isAfter } from "date-fns";
import createElement from "./helpers/createElement.js";
import TodoListEvents from "./helpers/TodoListEvents.js";
import TodoForm from "./components/TodoForm";
import TodoCard from "./components/TodoCard";
import Button from "./components/Button";

const STORAGE_KEY_NAME = "todo-info-list";

const generateId = () => {
  return `${Math.random()}${new Date().getTime()}`.slice(2);
};

let todoInfoList = [],
  newTodoFormPresented = false,
  todoToEdit = null;

// Header
const header = createElement("header", "todo-header");
header.appendChild(createElement("h1", "todo-head", "Odin Todo List"));

// Main
const main = createElement("main");

// Manipulate main content
const emptyMain = () => {
  [...main.children].forEach((node) => main.removeChild(node));
};
const showTodos = () => {
  todoInfoList.forEach((todoInfo) => main.appendChild(TodoCard(todoInfo)));
};
const showTodoForm = (todoId) => {
  emptyMain();
  // If todoId, so we need to assign the todo that has this id to the global variable todoToEdit
  // then, give it to the form to be edit-todo form instead of create-new-todo form
  if (todoId) {
    for (let i = 0; i < todoInfoList.length; i++) {
      if (todoInfoList[i].id === todoId) {
        todoToEdit = todoInfoList[i];
        main.appendChild(TodoForm(todoToEdit));
        break;
      }
    }
    if (!todoToEdit) {
      main.appendChild(TodoForm());
    }
  } else {
    main.appendChild(TodoForm());
  }
  newTodoButton.textContent = "Home";
  newTodoFormPresented = true;
};
const removeTodoForm = () => {
  emptyMain();
  showTodos();
  newTodoFormPresented = false;
  newTodoButton.textContent = "Add New Todo";
};

// Add new todo button
const newTodoButton = Button({
  className: "new-todo",
  type: "button",
  textContent: "Add New Todo",
});
newTodoButton.addEventListener("click", () => {
  if (!newTodoFormPresented) {
    showTodoForm();
  } else {
    removeTodoForm();
  }
});
header.appendChild(newTodoButton);

// Listen to todo list events
TodoListEvents.add(TodoListEvents.CREATE_NEW_TODO, (todoInfo) => {
  todoInfo.id = generateId();
  todoInfoList.push(todoInfo);
  // Sort the todos based on dueDate
  todoInfoList.sort((a, b) => {
    if (isEqual(a.dueDate, b.dueDate)) {
      return 0;
    } else if (isAfter(a.dueDate, b.dueDate)) {
      return 1;
    } else {
      return -1;
    }
  });
  removeTodoForm();
});
TodoListEvents.add(TodoListEvents.EDIT_TODO, (todoId) => {
  showTodoForm(todoId);
});
TodoListEvents.add(TodoListEvents.TODO_EDITED, (todoInfo) => {
  // Use todoToEdit global variable to update the todo with edits, then, reset it.
  if (todoToEdit && todoToEdit.id === todoInfo.id) {
    Object.assign(todoToEdit, todoInfo);
  } else {
    throw TypeError("Todo edit cannot be confirmed!");
  }
  todoToEdit = null;
  removeTodoForm();
});

// Local storage logic
if (localStorage) {
  // Get stored data
  let storedTodoInfoList = localStorage.getItem(STORAGE_KEY_NAME);
  if (storedTodoInfoList) {
    storedTodoInfoList = JSON.parse(storedTodoInfoList, (key, value) => {
      if (key === "dueDate") {
        return new Date(value);
      }
      return value;
    });
    todoInfoList = storedTodoInfoList;
    showTodos();
  }
  // Store data
  document.defaultView.addEventListener("beforeunload", () => {
    localStorage.setItem(STORAGE_KEY_NAME, JSON.stringify(todoInfoList));
  });
}

// Show result, then, Calculate main's top margin because header is fixed.
document.body.append(header, main);
main.setAttribute(
  "style",
  `margin-top: calc(${header.offsetHeight}px + 1rem);`
);
