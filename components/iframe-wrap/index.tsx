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
