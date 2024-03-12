import "./index.css";

import createElement from "./helpers/createElement.js";
import TodoForm from "./components/TodoForm";

document.body.appendChild(createElement("h1", "head", "Odin Todo List"));

document.body.appendChild(TodoForm());
