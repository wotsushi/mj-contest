import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes } from "react-router";
import { Route } from "react-router";
import Result from "./Result.tsx";
import Form from "./Form";
import EditContest from "./EditContest/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/result" element={<Result />} />
        <Route path="/form" element={<Form />} />
        <Route path="/edit_contest/:id" element={<EditContest />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
