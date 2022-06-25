import React, { useEffect } from "react";
import { createContext } from "react";
export const ThemeContext = createContext();
const defaultTheme = "light";

export function ThemeProvider({ children }) {
  const toggleTheme = () => {
    const oldTheme = getTheme();
    const newTheme = oldTheme === "light" ? "dark" : defaultTheme;
    updateTheme(newTheme, oldTheme);
  };
  useEffect(() => {
    const oldTheme = localStorage.getItem("theme");
    let newTheme;
    if (!oldTheme) {
      localStorage.setItem("theme", "light");
      newTheme = "light";
    } else {
      newTheme = oldTheme;
    }
    document.documentElement.classList.add(newTheme);
  }, []);
  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

const getTheme = () => localStorage.getItem("theme");
const updateTheme = (addTheme, removeTheme) => {
  if (removeTheme) {
    document.documentElement.classList.remove(removeTheme);
  }
  document.documentElement.classList.add(addTheme);
  localStorage.setItem("theme", addTheme);
};
