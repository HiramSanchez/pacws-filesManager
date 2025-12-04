import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function TopBar({ onFolderSelect }) {
  const handleSelectFolder = async () => {
    try {
      const dirHandle = await window.showDirectoryPicker();
      onFolderSelect(dirHandle);
    } catch {}
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#6D248C" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          File Manager
        </Typography>
        <Button color="inherit" onClick={handleSelectFolder}>
          Select Folder
        </Button>
      </Toolbar>
    </AppBar>
  );
}