import debounce from "lodash/debounce";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Canvas } from "../lib/canvas/canvas";

export function TopoBackground() {
  const [canvas, setCanvas] = useState<Canvas>();
  const { resolvedTheme: theme } = useTheme();

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
          opacity: 0.05,
        }}
      ></div>
      <div
        className="absolute bottom-0 h-48 w-screen"
        style={{
          background: `linear-gradient(0deg, ${
            theme === "light"
              ? "rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%" // white, Need white-transparent for Safari
              : "rgba(39, 39, 42, 1) 0%, rgba(39, 39, 42, 0) 100%" // gray-800, Need black-transparent for Safari
          })`,
        }}
      ></div>
    </div>
  );
}
