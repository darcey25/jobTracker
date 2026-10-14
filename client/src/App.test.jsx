import React from "react";
import ReactDOM from "react-dom";
import { it, vi } from "vitest";
import App from "./App";

// App checks the session on mount; keep that request inside the test.
vi.mock("axios", () => ({
  default: { get: () => Promise.reject({ response: { status: 401 } }) },
}));

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
