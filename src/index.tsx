import React from "react";

import reportWebVitals from "./reportWebVitals";
import { setupProject } from "./project-setup";
import App from "./App";
import "./index.css";

const isPlanTextContent = 
document.head.innerHTML === "" && 
document.body.querySelectorAll("pre").length === 1

if (isPlanTextContent || process.env.REACT_APP_BUILD_TARGET !== "extension") {
  // Renders the web-app/extension content to DOM.
  setupProject({
    rootElement: (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    ),
    injectExtensionTo: "body",
    injectWebAppTo: "#root",
  });

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
} else {
  console.info("chrome-extension-highlighter: skip render")
}
