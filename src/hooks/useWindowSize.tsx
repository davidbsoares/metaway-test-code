import { useState, useEffect } from "react";

type Props = {
  width: number | null;
  height: number | null;
};

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState<Props>({
    width: null,
    height: null,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}
