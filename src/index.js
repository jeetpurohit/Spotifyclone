import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { StateProvider } from "./utils/StateProvider";
import reducer, { initialState } from "./utils/reducer.js";
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
    <Router> 
        <App />
      </Router>
    </StateProvider>
  </React.StrictMode>
);