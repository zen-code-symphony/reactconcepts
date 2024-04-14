import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.js";

const rootEle = document.getElementById("root");
if (rootEle) {
  ReactDOM.createRoot(rootEle).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
