import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css';

ReactDOM.render(<App />, document.getElementById("root"));

// The old Create React App build registered a cache-first service worker.
// Remove it so returning visitors get the current build.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then(registrations => registrations.forEach(r => r.unregister()))
    .catch(() => {});
}
