import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "react-toastify/ReactToastify.css"; 
import { Provider } from "@/components/ui/provider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
    <App />  
    </Provider>
  </StrictMode>
);
