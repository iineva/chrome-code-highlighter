import React from "react";

import reportWebVitals from "./reportWebVitals";
import { setupProject } from "./project-setup";
import App from "./App";
import "./index.css";

if (document.body) {
  setupApp()
} else {
  const observer = new MutationObserver(function(mutations){
    const m = mutations.find(row => {
      if (row.target.nodeName.toLocaleLowerCase() !== "body") {
        return false
      }
      for (let i = 0; i < row.addedNodes.length; i++) {
        if (row.addedNodes[i].nodeName.toLocaleLowerCase() === "pre") {
          return true
        }
      }
      return false
    })
    if (m) {
      observer.disconnect()
      setupApp()
    }
  })
  observer.observe(document, { 
    childList: true,
    subtree: true, // needed if the node you're targeting is not the direct parent
  })
}

function setupApp() {
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
}
