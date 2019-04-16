import React from "react";
import { ThemeContext } from "../providers/theme";
export const ThemedButton = () => (
  <ThemeContext.Consumer>
    {value => (
      <button>
        I'm button using context! Primary Color is {value.primaryColor}
      </button>
    )}
  </ThemeContext.Consumer>
);
