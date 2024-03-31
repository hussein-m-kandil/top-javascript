import './index.css';

import createElement from '../../helpers/createElement.js';

/**
 *
 * @returns {HTMLElement}
 */
export default function Contact() {
  const contact = createElement('div', 'contact');

  const contactEntries = createElement('div', 'contact-entries');
  const address = createElement('div', 'address', 'Address ');
  address.appendChild(
    createElement(
      'span',
      'address-span',
      '7 Blah blah st, Earth Planet, Universe.',
    ),
  );
  const email = createElement('div', 'email', 'E-mail ');
  email.appendChild(
    createElement('span', 'email-span', 'odinrestaurant@example.com'),
  );
  const website = createElement('div', 'website', 'Website ');
  const websiteUrl =
    '' + (window.location.href?.replace(/#.+$/, '') ?? 'example.com');
  website.appendChild(
    createElement('a', 'website-url', 'wwwe.odinrestaurant.cool', [
      'href',
      websiteUrl,
    ]),
  );
  const tel = createElement('div', 'tel', 'Telephone ');
  tel.appendChild(createElement('span', 'tel-span', '00 000 000'));

  contactEntries.append(address, email, website, tel);
  contact.appendChild(contactEntries);

  return contact;
}

export { Contact };
