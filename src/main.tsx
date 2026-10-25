import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { DisplayProvider } from "./context/DisplayContext";
import { DemoProvider } from "./context/DemoContext";
import "./styles/main.scss";
import "./styles/DemoTheme.css";
import "./styles/Dialogs.css";

createRoot(document.getElementById("root")!).render(<StrictMode><BrowserRouter><DisplayProvider><DemoProvider><App /></DemoProvider></DisplayProvider></BrowserRouter></StrictMode>);
