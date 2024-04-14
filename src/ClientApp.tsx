import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const rootEle = document.getElementById("root");
if (rootEle) {
  hydrateRoot(
    rootEle,
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
}
