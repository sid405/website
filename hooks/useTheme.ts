import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const isLightOS = () =>
  window.matchMedia("(prefers-color-scheme: light)").matches;

export function useTheme() {
  const [localStorageTheme, setLocalStorageTheme] = useState<Theme | null>();
  const [OSTheme, setOSTheme] = useState<Theme | null>();
  const appTheme = localStorageTheme || OSTheme;

  /**
   * 1. `OSTheme` stores what theme the OS wants us to set
   * 2. `localStorageTheme` stores what theme the localStorage wants us to set
   * 3. `appTheme` is derived from `OSTheme` & `localStorageTheme`:
   */

  // Set up side-effects for OSTheme
  useEffect(() => {
    if (!OSTheme) {
      // This will only happen on first render
      setOSTheme(isLightOS() ? "light" : "dark");
      setLocalStorageTheme(localStorage.getItem("theme") as Theme | null);
    }

    if (!localStorageTheme) {
      return;
    }

    if (OSTheme === localStorageTheme) {
      // If the current (non-null) OS theme is the same as the one in localStorage, remove the localStorage theme
      // This will cause the appTheme to "snap" back to the OS preference (instead of overriding it)
      setLocalStorageTheme(null);
    }
  }, [OSTheme, localStorageTheme]);

  // Set up side-effects for localStorageTheme
  useEffect(() => {
    if (localStorageTheme) {
      localStorage.setItem("theme", localStorageTheme);
    } else {
      localStorage.removeItem("theme");
    }
  }, [localStorageTheme]);

  // Set up side-effects for appTheme
  useEffect(() => {
    appTheme === "light"
      ? document.documentElement.classList.remove("dark")
      : document.documentElement.classList.add("dark");
  }, [appTheme]);

  // Set up OSTheme listener
  useEffect(() => {
    // Set up a listener that will change the theme as the user's OS theme changes
    const watchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    const onOSThemeChange = () =>
      setOSTheme((t) => (t === "light" ? "dark" : "light"));
    watchMedia.addEventListener("change", onOSThemeChange);

    return () => {
      watchMedia.removeEventListener("change", onOSThemeChange);
    };
  }, []);

  return { theme: appTheme, setTheme: setLocalStorageTheme };
}
