import React from "react";

export const ThemeContext = React.createContext(/** optional default value */);

export const ThemeProvider = props => (
  <ThemeContext.Provider value={{ primaryColor: "green" }}>
    {props.children}
  </ThemeContext.Provider>
);
