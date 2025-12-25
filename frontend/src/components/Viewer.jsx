import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

export default function Viewer({ file, personName }) {
  const viewerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const elem = viewerRef.current;
    if (!document.fullscreenElement) {
      elem.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  if (!file) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#777",
        }}
      >
        Select a file
      </Box>
    );
  }

  return (
    <Box
      ref={viewerRef}
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#0b0b0b",
        border: "1px solid #1e1e1e",
        boxShadow: "0 30px 80px rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      {!isFullscreen && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            px: 2,
            py: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 2,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0))",
          }}
        >
          <Typography variant="subtitle2" sx={{ color: "#ccc" }}>
            {personName || ""}
          </Typography>

          <IconButton
            onClick={toggleFullscreen}
            sx={{
              color: "white",
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          >
            <FullscreenIcon />
          </IconButton>
        </Box>
      )}

      {/* Media */}
      {file.type === "video" ? (
        <video
          src={file.url}
          controls
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      ) : (
        <img
          src={file.url}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      )}

      {/* Exit fullscreen */}
      {isFullscreen && (
        <IconButton
          onClick={toggleFullscreen}
          sx={{
            position: "fixed",
            top: 16,
            right: 16,
            zIndex: 9999,
            color: "white",
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        >
          <FullscreenExitIcon />
        </IconButton>
      )}
    </Box>
  );
}
