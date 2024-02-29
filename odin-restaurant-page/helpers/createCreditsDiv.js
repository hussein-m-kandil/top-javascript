import createElement from "./createElement.js";

/**
 * Creates credits div with the given data.
 * @param {string?} textBeforeOwner
 * @param {string?} ownerName
 * @param {string?} ownerHref
 * @param {string?} textBeforeSite
 * @param {string?} siteName
 * @param {string?} siteHref
 * @returns {HTMLDivElement}
 */
export default function createCreditsDiv(
  textBeforeOwner,
  ownerName,
  ownerHref,
  textBeforeSite,
  siteName,
  siteHref
) {
  const credits = createElement("div", "credits");

  if (textBeforeOwner) {
    credits.appendChild(document.createTextNode(textBeforeOwner));
  }
  if (ownerName && ownerHref) {
    credits.appendChild(
      createElement("a", "credits-owner", ownerName, ["href", ownerHref])
    );
  } else if (ownerName) {
    credits.appendChild(document.createTextNode(ownerName));
  }
  if (textBeforeSite) {
    credits.appendChild(document.createTextNode(textBeforeSite));
  }
  if (siteName && siteHref) {
    credits.appendChild(
      createElement("a", "credits-site", siteName, ["href", siteHref])
    );
  } else if (siteName) {
    credits.appendChild(document.createTextNode(siteName));
  }

  return credits;
}

export { createCreditsDiv };
