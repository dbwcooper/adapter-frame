## Remove your iframe scrollbar （same origin website）

#### iframe inner

```js
import { debounce } from "lodash";
import { useEffect } from "react";

let beforeScrollHeight = 0;
function observerDomChange(mutations: MutationRecord[]) {
  if (
    mutations.every(
      (c) => c.attributeName === "style" && c.target.nodeName === "BODY"
    )
  ) {
    // ignore body style
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

const calcHeight = (iframeHeight?: number) => {
  beforeScrollHeight =
    iframeHeight ||
    document.documentElement.scrollHeight ||
    document.body.scrollHeight;
  document.body.style.height =
    (iframeHeight ||
      document.documentElement.scrollHeight ||
      document.body.scrollHeight) + "px";

  window.top?.postMessage(
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

function handleDomChange(iframeHeight?: number) {
  document.body.style.overflow = "hidden";
  calcHeight(iframeHeight);
}
function initConfig() {
  // listening htmlNode change
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
}

let hasStart = false;
function setup() {
  if (hasStart) {
    return;
  }
  hasStart = true;
  initConfig();
  document.body.style.height =
    (document.documentElement.scrollHeight || document.body.scrollHeight) +
    "px";
  handleDomChange();
}

export default function App() {
  useEffect(() => {
    setup();
  }, []);

  return <></>;
}
```

### iframe outer

```js
import React, { useState, useCallback, useEffect, useRef } from "react";

interface Props extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  height?: number | string;
  width?: number | string;
}
function IframeWrap(props: Props) {
  const { height: initHeight, width: initWidth, ...rest } = props;
  const [height, setHeight] = useState(initHeight);

  const useMessage = useCallback((event) => {
    if (event.data.type === "domChange") {
      const iframeHeight = event.data.bodyHeight;
      setHeight(iframeHeight);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", useMessage);
    return () => {
      window.removeEventListener("message", useMessage);
    };
  }, [useMessage]);

  return <iframe {...rest} height={height} width={initWidth} />;
}

export default React.forwardRef(IframeWrap);
s;
```
