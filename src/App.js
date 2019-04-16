import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "./providers/theme";
import { ThemedButton } from "./components/ThemedButton";
import IncreaseCounter from "./components/useStateIncreaseCounter";
import ReducerIncreaseCounter from "./components/useReducerIncreaseCounter";

import { StateProvider } from "./providers/store";
import reducers from "./reducers";
import GlobalStateChangeName from "./components/useGlobalStateChangeName";

class App extends Component {
  render() {
    const initialState = {
      name: "Steven"
    };
    return (
      <ThemeProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <ThemedButton />
            <IncreaseCounter initialCount={5} />
            <ReducerIncreaseCounter initialCount={2} />
            <StateProvider initialState={initialState} reducer={reducers}>
              // App content...
              <GlobalStateChangeName />
            </StateProvider>
          </header>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
