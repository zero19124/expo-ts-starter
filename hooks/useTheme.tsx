import { useState, useContext, createContext } from "react";
import { lightTheme, darkTheme } from "@/theme";
import { useColorScheme } from "react-native";

export type TThemeType = {
  themeColor: typeof darkTheme;
};

export type TThemeName = "dark" | "light";
const getCommonStyle = (theme: TThemeType["themeColor"]) => {
  if (!theme) {
    console.log("theme is ll getCommonStyle");
    return {};
  }
  return {
    commonBorderBottom: {
      borderBottomColor: theme.fillColor,
      borderBottomWidth: 2,
    },
  };
};
// Provider Types
export interface ThemeContextInterface extends TThemeType {
  setTheme: (value: TThemeType["themeColor"]) => void;
  commentStyle?: ReturnType<typeof getCommonStyle>;
}

// Context
const ThemeContext = createContext({} as ThemeContextInterface);

// Provider to be used in index/App/or top of any parent
export const ThemeProvider = ({ children }: any): JSX.Element => {
  const colorScheme = useColorScheme();

  // const [theme, setTheme] = useState(
  //   colorScheme === "dark" ? darkTheme : lightTheme
  // );
  const [theme, setTheme] = useState(darkTheme);
  console.log("ThemeProvider");
  return (
    <ThemeContext.Provider
      value={{
        themeColor: theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// useTheme hook for easy access to theme and setTheme
export const useTheme = () => {
  const state = useContext(ThemeContext);
  const colorScheme = useColorScheme();
  const [themeName, setThemeName] =
    useState<ReturnType<typeof useColorScheme>>("dark");

  const { setTheme, themeColor } = state;
  const toggleTheme = (theme: TThemeName) => {
    setThemeName(theme);
    setTheme(theme === "light" ? lightTheme : darkTheme);
    // console.log(themeName, "themeColor", themeColor);
  };

  return {
    themeColor,
    themeName,
    toggleTheme,
    commonStyle: getCommonStyle(themeColor),
  };
};
