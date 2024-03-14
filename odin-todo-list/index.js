import "./index.css";

import createElement from "./helpers/createElement.js";
import TodoListEvents from "./helpers/TodoListEvents.js";
import TodoForm from "./components/TodoForm";

document.body.appendChild(createElement("h1", "head", "Odin Todo List"));

document.body.appendChild(TodoForm());

TodoListEvents.add(TodoListEvents.CREATE_NEW_TODO, (data) => {
  console.log("Create new todo using these data => ", data);
});
