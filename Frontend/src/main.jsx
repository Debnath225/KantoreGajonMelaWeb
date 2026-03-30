import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/globals.css";
import LenisProvider from "./provider/LenisProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LenisProvider>
      <App />
    </LenisProvider>
  </StrictMode>,
);
