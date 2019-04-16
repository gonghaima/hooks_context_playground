import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "./providers/theme";
import { ThemedButton } from "./components/ThemedButton";
import IncreaseCounter from "./components/IncreaseCounter";

class App extends Component {
  render() {
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
          </header>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
