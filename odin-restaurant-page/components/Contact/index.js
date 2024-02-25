import "./index.css";

import createElement from "../../helpers/createElement.js";

/**
 *
 * @param {Object<string, any>} props
 * @returns {HTMLElement}
 */
export default function Contact() {
  const contact = createElement(
    "div",
    "contact-content",
    "This is the content of the contact page!"
  );

  return contact;
}

export { Contact };
