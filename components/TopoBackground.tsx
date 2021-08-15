import { useTheme } from "@madebysid/usetheme";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import { Canvas } from "../lib/canvas/canvas";

export function TopoBackground() {
  const [canvas, setCanvas] = useState<Canvas>();
  const { theme } = useTheme();

  useEffect(() => {
    if (!Canvas.isWebGLAvailable()) {
      return;
    }

    setCanvas(new Canvas(document.getElementById("topographic")!));
    return () => canvas?.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    theme && canvas?.setTheme(theme);
  }, [canvas, theme]);

  useEffect(() => {
    const onResize = debounce(
      (_: UIEvent) => canvas?.setSize(window.innerWidth, window.innerHeight),
      100
    );
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [canvas]);

  return (
    <div
      className="absolute top-0 left-0"
      style={{
        zIndex: -1,
      }}
    >
      <div
        id="topographic"
        className="w-screen h-screen"
        style={{
          zIndex: -1,
          opacity: 0.075,
        }}
      ></div>
      <div
        className={
          "absolute bottom-0 h-48 w-screen" +
          "bg-gradient-to-b from-[rgba(255,255,255,0)] to-white dark:from-[rgba(0,0,0,0)] dark:to-gray-800"
        }
      ></div>
    </div>
  );
}
