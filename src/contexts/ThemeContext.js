import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import light from "./../assets/themes/light";
import dark from "./../assets/themes/dark";

const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [colors, setColors] = useState(light);

  const changeTheme = useCallback((theme) => {
    switch (theme) {
      case "light":
        setColors(light);
        break;
      case "dark":
        setColors(dark);
        break;
      default:
        setColors(dark);
        break;
    }
  }, []);

  useEffect(() => {
    if (!!theme) {
      changeTheme(theme);
    }
  }, [theme, changeTheme]);

  // memoize the full context value
  const contextValue = useMemo(
    () => ({
      theme,
      colors,
      setTheme,
    }),
    [theme, colors, setTheme]
  );

  return (
    // the Provider gives access to the context to its children
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
