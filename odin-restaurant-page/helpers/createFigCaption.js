import createElement from "./createElement.js";

/**
 * Creates 'figcaption' html element.
 * @param {{
 *    name: { name: string?, url: string? }?,
 *    site: { name: string?, url: string? }?
 *   }?} captionData
 * Object that has caption data.
 * - i.e. {owner:{name,url},site:{name, url}} (notice the keys' names).
 * Note: The 'captionData' key and all its nested keys are optional.
 * @returns {HTMLElement}
 * Returns A 'figcaption' element:
 * - Like "Image by owner.name from site.name".
 * - Has the names as '<a>' the 'url' key is present.
 */
export default function createFigCaption(captionData) {
  const figcaption = createElement("figcaption", "carousel-figcaption");
  if (figcaption) {
    if (captionData.owner.name && captionData.owner.url) {
      figcaption.appendChild(document.createTextNode("Image by "));
      figcaption.appendChild(
        createElement("a", "credits-owner", captionData.owner.name, [
          "href",
          captionData.owner.url,
        ])
      );
    } else if (captionData.owner.name) {
      figcaption.appendChild(
        document.createTextNode("Image by " + captionData.owner.name)
      );
    }
    if (captionData.site.name && captionData.site.url) {
      figcaption.appendChild(document.createTextNode(" from "));
      figcaption.appendChild(
        createElement("a", "credits-site", captionData.site.name, [
          "href",
          captionData.site.url,
        ])
      );
    } else if (captionData.site.name) {
      figcaption.appendChild(
        document.createTextNode(" from " + captionData.site.name)
      );
    }
  }
  return figcaption;
}

export { createFigCaption };
