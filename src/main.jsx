import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import { PeopleProvider } from "./contexts/PeopleContext.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PeopleProvider>
        <App />
        <ToastContainer
          position="bottom-right"
          theme="colored"
          autoClose={1000}
        />
      </PeopleProvider>
    </BrowserRouter>
  </StrictMode>
);
