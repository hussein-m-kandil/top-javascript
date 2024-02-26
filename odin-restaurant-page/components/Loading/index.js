import "./index.css";

import createElement from "../../helpers/createElement.js";

/**
 * @param {Object<string, Any>?} props
 * @returns {HTMLElement}
 */
export default function Loading() {
  const loading = createElement("div", "loading");
  for (let i = 0; i < 3; i++) {
    loading.appendChild(createElement("div", "loading-dot"));
  }

  const observer = new MutationObserver((mutationList, observer) => {
    console.table("mutationList => ", mutationList);
    console.log("observer => ", observer);
    observer.disconnect();
  });

  observer.observe(document, {
    attribute: true,
    childList: true,
    subtree: true,
  });

  return loading;
}

export { Loading };
