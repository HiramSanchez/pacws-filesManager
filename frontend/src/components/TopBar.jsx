import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";


export default function TopBar({ onFolderSelect, mode, toggleMode }) {
  const handleSelectFolder = async () => {
    try {
      const dirHandle = await window.showDirectoryPicker();
      onFolderSelect(dirHandle);
    } catch {}
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ minHeight: 56, px: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: "primary.main",
              boxShadow: "0 0 12px rgba(109,36,140,0.6)",
            }}
          />
          <Typography sx={{ fontWeight: 700, letterSpacing: 0.6, color: "text.primary" }}>
            File Manager
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Theme toggle */}
        <Tooltip title={mode === "dark" ? "Light mode" : "Dark mode"}>
          <IconButton
            onClick={toggleMode}
            sx={{
              mr: 1.5,
              color: "text.primary",
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "transparent",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>

        <Button
          onClick={handleSelectFolder}
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: 2,
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          Select folder
        </Button>
      </Toolbar>
    </AppBar>
  );

}
