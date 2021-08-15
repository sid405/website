import { useEffect } from "react"
import { TopoBackground as Canvas } from "../lib/canvas/canvas"

export function TopoBackground() {
  useEffect(() => {
    if (!Canvas.isWebGLAvailable()) {
      return
    }

    const bg = new Canvas(document.getElementById("topographic")!)
    bg.start()
    return () => {
      bg.dispose()
    }
  }, [])

  return (
    <div
      id="topographic"
      className="absolute top-0 left-0 w-screen h-screen"
      style={{ zIndex: -1 }}
    ></div>
  )
}
