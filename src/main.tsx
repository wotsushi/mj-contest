import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes } from "react-router";
import { Route } from "react-router";
import Result from "./Result";
import Form from "./Form";
import EditContest from "./EditContest";
import EditContestV2 from "./EditContestV2";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Root = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createTheme({
    colorSchemes: {
      dark: prefersDarkMode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <StrictMode>
        <BrowserRouter basename="/mj-contest">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/result/:id" element={<Result />} />
            <Route path="/form/:id" element={<Form />} />
            <Route path="/edit_contest/:id" element={<EditContest />} />
            <Route path="/edit_contest_v2/:id" element={<EditContestV2 />} />
          </Routes>
        </BrowserRouter>
      </StrictMode>
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);
