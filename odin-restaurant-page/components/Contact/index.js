import "./index.css";

import createElement from "../../helpers/createElement.js";
import createCredits from "../../helpers/createCredits.js";

/**
 *
 * @returns {HTMLElement}
 */
export default function Contact() {
  const contact = createElement("div", "contact");

  const contactEntries = createElement("div", "contact-entries");
  const tel = createElement("div", "tel", "Tel ");
  tel.appendChild(createElement("span", "tel-span", "00 000 000"));
  const address = createElement("div", "address", "Address ");
  address.appendChild(
    createElement(
      "span",
      "address-span",
      "7 Blah blah st, Earth Planet, Universe."
    )
  );
  const email = createElement("div", "email", "E-mail ");
  email.appendChild(
    createElement("span", "email-span", "odinrestaurant@example.com")
  );
  const website = createElement("div", "website", "Website ");
  website.appendChild(
    createElement(
      "span",
      "website-span",
      "" + (window.location.href?.replace(/#.+$/, "") ?? "example.com")
    )
  );

  contactEntries.append(tel, address, email, website);
  contact.appendChild(contactEntries);

  return contact;
}

export { Contact };
