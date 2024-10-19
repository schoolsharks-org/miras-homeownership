import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import theme from "./theme.js";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import {BrowserRouter as Router} from "react-router-dom"
import store from "./app/store.js"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
