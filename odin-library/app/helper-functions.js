// HELPER FUNCTIONS FOR ODIN LIBRARY

/**
 * Sets multiple attributes on element (mutate the element) at once.
 * @param {HTMLElement} element - HTML Element to set attributes on.
 * @param {[string, string][]} attrs - Attributes with its values as a list of string pairs.
 * @returns {void}
 */
function setAttributes(element, attrs) {
  if (element && element.setAttribute) {
    if (attrs && Array.isArray(attrs)) {
      for (let i = 0; i < attrs.length; i++) {
        if (Array.isArray(attrs) && attrs[i].length === 2) {
          element.setAttribute(attrs[i][0], attrs[i][1]);
        }
      }
    }
  }
}

/**
 * Creates input with its label.
 * @param {string} [labelText] - Text for the label.
 * @param {[string, string][]} [labelAttrs] - Attributes for label as list of string pairs.
 * @param {[string, string][]} [inputAttrs] - Attributes for input as list of string pairs.
 * @returns {[HTMLLabelElement, HTMLInputElement]}
 */
function createLabelAndInput(labelText, labelAttrs, inputAttrs) {
  const labelElement = document.createElement("label");
  if (labelText && typeof labelText === "string") {
    labelElement.appendChild(document.createTextNode(labelText));
  }
  setAttributes(labelElement, labelAttrs);
  const inputElement = document.createElement("input");
  setAttributes(inputElement, inputAttrs);
  return [labelElement, inputElement];
}

/**
 * Creates a span with its textContent & its className.
 * @param {string} spanText
 * @param {string} className
 * @returns {HTMLSpanElement}
 */
function createSpan(spanText, className) {
  const newSpan = document.createElement("span");
  newSpan.className = className ?? "";
  newSpan.appendChild(document.createTextNode(spanText ?? ""));
  return newSpan;
}

/**
 * Creates an entry for book-card's body.
 * @param {string} entryTitle
 * @param {string} entryData
 * @returns {HTMLDivElement}
 */
function createBookCardBodyEntry(entryTitle, entryData) {
  const bookCardEntry = document.createElement("div");
  bookCardEntry.className = "book-card-entry";
  bookCardEntry.appendChild(
    createSpan(entryTitle + ": ", "book-card-entry-title")
  );
  bookCardEntry.appendChild(createSpan(entryData, "book-card-entry-data"));
  return bookCardEntry;
}

/**
 * Toggles book's read state.
 * @param {HTMLButtonElement} togglerBtn
 * @param {string} togglerText
 * @param {string} fromTogglerClass
 * @param {string} toTogglerClass
 * @param {HTMLSpanElement} readStateElement
 * @param {string} readStateElementText
 * @param {string} fromReadStateTextClass
 * @param {string} toReadStateTextClass
 * @returns {void}
 */
function readStateToggler(
  togglerBtn,
  togglerText,
  fromTogglerClass,
  toTogglerClass,
  readStateElement,
  readStateElementText,
  fromReadStateTextClass,
  toReadStateTextClass
) {
  togglerBtn.textContent = togglerText;
  togglerBtn.classList.replace(fromTogglerClass, toTogglerClass);
  togglerBtn.classList.replace(toReadStateTextClass, fromReadStateTextClass);
  readStateElement.textContent = readStateElementText;
  readStateElement.classList.replace(
    fromReadStateTextClass,
    toReadStateTextClass
  );
}

/**
 * Creates a button with its textContent & type, class, id and value attributes.
 * @param {string} textContent
 * @param {string} type
 * @param {string} className - String of spaces-separated class list.
 * @param {string} id
 * @param {string} value
 * @returns {HTMLButtonElement}
 */
function createButton(textContent, type, className, id, value) {
  const button = document.createElement("button");
  button.appendChild(document.createTextNode(textContent));
  button.setAttribute("type", type);
  button.className = className ?? "";
  button.id = id ?? "";
  button.value = value ?? "";
  return button;
}

/**
 * Stores the library's array on the locale Storage.
 * @param {string} key
 * @param {Book[]} data - The library.
 */
function storeOnLocalStorage(key, data) {
  if (localStorage) {
    const JSONDataStr = JSON.stringify(data);
    if (JSONDataStr.length < 3 * 1024 * 1024) {
      localStorage.setItem(key, JSONDataStr);
    }
  }
}

export {
  createBookCardBodyEntry,
  createLabelAndInput,
  createButton,
  setAttributes,
  readStateToggler,
  storeOnLocalStorage,
};
