import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./main.css";
import Home from "./page/home/home";
import { AppContextProvider } from "./contexts/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContextProvider>
      <Home />
    </AppContextProvider>
  </StrictMode>
);
