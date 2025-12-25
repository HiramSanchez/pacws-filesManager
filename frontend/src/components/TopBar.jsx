import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export default function TopBar({ onFolderSelect }) {
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
        backgroundColor: "#0b0b0b",
        borderBottom: "1px solid #1e1e1e",
        // 👇 clave: arriba del Drawer
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
              backgroundColor: "#6D248C",
              boxShadow: "0 0 12px rgba(109,36,140,0.6)",
            }}
          />
          <Typography sx={{ fontWeight: 700, letterSpacing: 0.6 }}>
            File Manager
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          onClick={handleSelectFolder}
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: 2,
            backgroundColor: "#6D248C",
            "&:hover": { backgroundColor: "#5b1f75" },
          }}
        >
          Select folder
        </Button>
      </Toolbar>
    </AppBar>
  );
}
