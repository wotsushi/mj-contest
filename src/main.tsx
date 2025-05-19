import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes } from "react-router";
import { Route } from "react-router";
import Result from "./Result";
import Form from "./Form";
import EditContest from "./EditContest";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/mj-contest">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/result/:id" element={<Result />} />
        <Route path="/form/:id" element={<Form />} />
        <Route path="/edit_contest/:id" element={<EditContest />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
