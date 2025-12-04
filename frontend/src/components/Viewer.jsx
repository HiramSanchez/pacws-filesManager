import React, { useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

export default function Viewer({ file, personName }) {
  const viewerRef = useRef(null);

  const toggleFullscreen = () => {
    const elem = viewerRef.current;

    if (!document.fullscreenElement) {
      elem.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  if (!file)
    return (
      <Box sx={{ height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        Select a file
      </Box>
    );

  return (
    <Box
      ref={viewerRef}
      sx={{
        height: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        position: "relative",
      }}
    >

      <IconButton
        onClick={toggleFullscreen}
        sx={{ position: "absolute", top: 8, right: 8, color: "white", backgroundColor: "rgba(0,0,0,0.3)" }}
      >
        {!document.fullscreenElement ? <FullscreenIcon /> : <FullscreenExitIcon />}
      </IconButton>

      {personName && (
        <Typography variant="h8" sx={{ mb: 1 }}>
          {personName}
        </Typography>
      )}

      {file.type === "video" ? (
        <video
          src={file.url}
          controls
          style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
      ) : (
        <img
          src={file.url}
          alt=""
          style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
      )}
    </Box>
  );
}
