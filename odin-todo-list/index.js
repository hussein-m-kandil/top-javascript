import "./index.css";

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
  newTodoFormPresented = false;

// Header
const header = createElement("header", "todo-header");
header.appendChild(createElement("h1", "todo-head", "Odin Todo List"));

// Main
const main = createElement("main");
const emptyMain = () => {
  [...main.children].forEach((node) => main.removeChild(node));
};
const showTodos = () => {
  todoInfoList.forEach((todoInfo) => main.appendChild(TodoCard(todoInfo)));
};

// Add new todo button
const newTodoButton = Button({
  className: "new-todo",
  type: "button",
  textContent: "Add New Todo",
});
newTodoButton.addEventListener("click", () => {
  emptyMain();
  if (!newTodoFormPresented) {
    main.appendChild(TodoForm());
    newTodoButton.textContent = "Home";
    newTodoFormPresented = true;
  } else {
    showTodos();
    newTodoFormPresented = false;
    newTodoButton.textContent = "Add New Todo";
  }
});
header.appendChild(newTodoButton);

// Listen to todo list events
TodoListEvents.add(TodoListEvents.CREATE_NEW_TODO, (todoInfo) => {
  todoInfo.id = generateId();
  todoInfoList.push(todoInfo);
  emptyMain();
  showTodos();
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
main.setAttribute("style", `marginTop: calc(${header.offsetHeight}px + 1rem)`);
