import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { getAppTheme } from "./theme";

function Root() {
  const [mode, setMode] = React.useState(() => {
    return localStorage.getItem("themeMode") || "dark";
  });

  const theme = React.useMemo(() => getAppTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("themeMode", next);
      return next;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App mode={mode} toggleMode={toggleMode} />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
