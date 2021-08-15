import { useEffect, useState } from "react";
import { Canvas } from "../lib/canvas/canvas";
import { useTheme } from "../lib/theme";

export function TopoBackground() {
  const [canvas, setCanvas] = useState<Canvas>();
  const { theme } = useTheme();

  useEffect(() => {
    if (!Canvas.isWebGLAvailable()) {
      return;
    }

    setCanvas(new Canvas(document.getElementById("topographic")!));

    return () => canvas?.dispose();
  }, []);

  useEffect(() => {
    theme && canvas?.setTheme(theme);
  }, [theme]);

  return (
    <div
      id="topographic"
      className="absolute top-0 left-0 w-screen h-screen"
      style={{
        zIndex: -1,
        opacity: 0.075,
      }}
    ></div>
  );
}
