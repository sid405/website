import React from "react";
import { useTheme } from "../hooks/useTheme";
import { Icon } from "./Icon";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" && <Icon name="moon" />}
      {theme === "dark" && <Icon name="sun" />}
    </button>
  );
}
