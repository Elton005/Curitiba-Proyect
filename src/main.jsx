import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import { pageModules } from "./app/pageModules.js";
import { resolvePage } from "./data/pages.js";
import "../assets/css/site.css";

async function start() {
  const page = resolvePage(location.pathname).page;
  let PageComponent = null,
    loadError = false;
  if (pageModules[page]) {
    try {
      PageComponent = (await pageModules[page]()).default;
    } catch {
      loadError = true;
    }
  }
  createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App PageComponent={PageComponent} loadError={loadError} />
    </React.StrictMode>,
  );
}
start();
