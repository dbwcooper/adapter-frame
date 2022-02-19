import { debounce } from "lodash";

let beforeScrollHeight = 0;
function observerDomChange(mutations) {
  if (
    mutations.every(
      (c) => c.attributeName === "style" && c.target.nodeName === "BODY"
    )
  ) {
    return;
  }
  if (
    beforeScrollHeight ===
    (document.documentElement.scrollHeight || document.body.scrollHeight)
  ) {
    document.body.style.height =
      parseInt(document.body.style.height, 10) - 1 + "px";
    document.documentElement.style.height =
      parseInt(document.documentElement.style.height, 10) - 1 + "px";
    if (
      parseInt(document.body.style.height, 10) ===
      (document.body.scrollHeight || document.documentElement.scrollHeight)
    ) {
      do {
        document.body.style.height =
          parseInt(document.body.style.height, 10) - 1 + "px";
        document.documentElement.style.height =
          parseInt(document.documentElement.style.height, 10) - 1 + "px";
      } while (
        parseInt(document.body.style.height, 10) ===
        (document.body.scrollHeight || document.documentElement.scrollHeight)
      );
    }
    handleDomChange(parseInt(document.body.style.height, 10) + 1);
    return;
  }
  handleDomChange();
}

const config = {
  attributes: true,
  childList: true,
  subtree: true,
  characterData: true,
};
const callback = debounce(observerDomChange, 50);
const observer = new MutationObserver(callback);
observer.observe(document.body, config);

window.addEventListener("load", setup);

const calcHeight = (iframeHeight) => {
  beforeScrollHeight =
    iframeHeight ||
    document.documentElement.scrollHeight ||
    document.body.scrollHeight;
  document.body.style.height =
    (iframeHeight ||
      document.documentElement.scrollHeight ||
      document.body.scrollHeight) + "px";
  window.top.postMessage(
    {
      type: "domChange",
      bodyHeight:
        iframeHeight ||
        document.documentElement.scrollHeight ||
        document.body.scrollHeight,
      scrollTop:
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop,
      clientHeight:
        document.documentElement.clientHeight || document.body.clientHeight,
    },
    "*"
  );
};

function handleDomChange(iframeHeight) {
  document.body.style.overflow = "hidden";
  calcHeight(iframeHeight);
}

let hasStart = false;
function setup() {
  if (hasStart) {
    return;
  }
  hasStart = true;

  document.body.style.height =
    (document.documentElement.scrollHeight || document.body.scrollHeight) +
    "px";
  handleDomChange();
}

setup();
