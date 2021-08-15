import React, { useEffect, useState } from "react";
import { Icon } from "./Icon";

type Theme = "light" | "dark";

export function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>();
  const setLightTheme = () => {
    setTheme("light");
    window.document.documentElement.classList.remove("dark");

    const isLightMode = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;
    if (isLightMode) {
      // If the current OS theme is light as well, remove the localStorage theme so that you start respecting the OS theme again
      localStorage.removeItem("theme");
    } else {
      // Otherwise, override the OS theme
      localStorage.setItem("theme", "light");
    }
  };
  const setDarkTheme = () => {
    setTheme("dark");
    window.document.documentElement.classList.add("dark");

    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (isDarkMode) {
      // If the current OS theme is dark as well, remove the localStorage theme so that you start respecting the OS theme again
      localStorage.removeItem("theme");
    } else {
      // Otherwise, override the OS theme
      localStorage.setItem("theme", "dark");
    }
  };
  const flipTheme = () =>
    theme === "light" ? setDarkTheme() : setLightTheme();

  useEffect(() => {
    const fixedTheme = localStorage.getItem("theme") as Theme;
    const onOSThemeChange = (e: MediaQueryListEvent) => {
      if (fixedTheme) {
        return;
      }

      if (e.matches) {
        setDarkTheme();
      } else {
        setLightTheme();
      }
    };

    // Set up a listener that will change the theme as the user's OS theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", onOSThemeChange);

    // If there's a theme saved in localStorage, do nothing and switch to that theme
    if (fixedTheme) {
      setTheme(fixedTheme);
    } else {
      // Set the initial value of the theme
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (isDarkMode) {
        setDarkTheme();
      } else {
        setLightTheme();
      }
    }

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", onOSThemeChange);
    };
  }, []);

  return (
    <button
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      onClick={flipTheme}
    >
      {theme === "light" && <Icon name="moon" />}
      {theme === "dark" && <Icon name="sun" />}
    </button>
  );
}
