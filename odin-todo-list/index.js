import "./index.css";

import createElement from "./helpers/createElement.js";
import TodoListEvents from "./helpers/TodoListEvents.js";
import TodoForm from "./components/TodoForm";
import TodoCard from "./components/TodoCard";
import Button from "./components/Button";

const STORAGE_KEY_NAME = "todo-info-list";
const todoInfoList = [];
let newTodoFormPresented = false;

const header = createElement("header", "todo-header");
header.appendChild(createElement("h1", "todo-head", "Odin Todo List"));

const main = createElement("main");

const emptyMain = () => {
  [...main.children].forEach((node) => main.removeChild(node));
};
const showTodos = () => {
  todoInfoList.forEach((todoInfo) => main.appendChild(TodoCard(todoInfo)));
};

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

TodoListEvents.add(TodoListEvents.CREATE_NEW_TODO, (todoInfo) => {
  todoInfoList.push(todoInfo);
  emptyMain();
  showTodos();
});

if (localStorage) {
  // Get data
  let storedTodoInfoList = localStorage.getItem(STORAGE_KEY_NAME);
  if (storedTodoInfoList) {
    storedTodoInfoList = JSON.parse(storedTodoInfoList, (key, value) => {
      if (key === "dueDate") {
        return new Date(value);
      }
      return value;
    });
    storedTodoInfoList.forEach((todoInfo) => todoInfoList.push(todoInfo));
    showTodos();
  }
  // Store data
  document.defaultView.addEventListener("beforeunload", () => {
    localStorage.setItem(STORAGE_KEY_NAME, JSON.stringify(todoInfoList));
  });
}

document.body.append(header, main);
// Calc main's top margin = header's height + 1rem, because header is fixed.
main.setAttribute("style", `marginTop: calc(${header.offsetHeight}px + 1rem)`);
