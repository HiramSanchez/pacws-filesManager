import { createTheme } from "@mui/material/styles";

export const getAppTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#6D248C" },
      background: {
        default: mode === "dark" ? "#0f0f0f" : "#f5f6f8",
        paper: mode === "dark" ? "#0b0b0b" : "#ffffff",
        hover: mode === "dark" ? "rgba(255,255,255,0.08)" : "#e3e2e2ff",
        light: mode === "dark" ? "#111" : "#f5f6f8",
      },
      divider: mode === "dark" ? "#1e1e1e" : "#e5e7eb",
    },
    shape: { borderRadius: 10 },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  });