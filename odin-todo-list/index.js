import "./index.css";

import createElement from "./helpers/createElement.js";
import TodoListEvents from "./helpers/TodoListEvents.js";
import TodoForm from "./components/TodoForm";
import Button from "./components/Button";

const todoList = [];
let newTodoFormPresented = false;

const header = createElement("header", "todo-header");
header.appendChild(createElement("h1", "todo-head", "Odin Todo List"));

const main = createElement("main");
const emptyMain = () => {
  [...main.children].forEach((node) => main.removeChild(node));
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
    // TODO: Fill page with todos
    newTodoFormPresented = false;
    newTodoButton.textContent = "Add New Todo";
  }
});

header.appendChild(newTodoButton);

TodoListEvents.add(TodoListEvents.CREATE_NEW_TODO, (todoInfo) => {
  todoList.push(todoInfo);
  emptyMain();
  // TODO: Fill page with todos
});

document.body.append(header, main);
// Calc main's top margin = header's height + 1rem
main.setAttribute("style", `marginTop: calc(${header.offsetHeight}px + 1rem)`);
