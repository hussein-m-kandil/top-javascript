const eventRegistry = {};

const TodoListEvents = {
  CREATE_NEW_TODO: "create-new-todo",
  NEW_TODO_CREATED: "new-todo-created",
  EDIT_TODO: "edit-todo",
  TODO_EDITED: "todo-edited",
  DELETE_TODO: "delete-todo",
  CANCEL_DELETE_TODO: "cancel-delete-todo",
  CONFIRM_DELETE_TODO: "confirm-delete-todo",

  add(eventName, ...callbacks) {
    if (!eventRegistry[eventName]) {
      eventRegistry[eventName] = [];
    }
    callbacks.forEach((callback) => eventRegistry[eventName].push(callback));
  },

  remove(eventName, callbacks) {
    if (eventRegistry[eventName]) {
      eventRegistry[eventName].forEach((handler, i) => {
        if (callbacks.includes(handler)) {
          eventRegistry[eventName].splice(i, 1);
        }
      });
    }
  },

  emit(eventName, data) {
    if (eventRegistry[eventName]) {
      eventRegistry[eventName].forEach((handler) => handler(data));
    }
  },
};

Object.freeze(TodoListEvents);
Object.freeze(TodoListEvents.add);
Object.freeze(TodoListEvents.remove);
Object.freeze(TodoListEvents.emit);

export default TodoListEvents;
export { TodoListEvents };
