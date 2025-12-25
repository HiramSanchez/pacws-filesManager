import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

export default function Viewer({ file, personName }) {
  const viewerRef = useRef(null);
  const videoRef = useRef(null);
  const redirectingRef = useRef(false);
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
    const onChange = () => {
      const fsEl = document.fullscreenElement;
      setIsFullscreen(!!fsEl);

      if (
        fsEl &&
        videoRef.current &&
        fsEl === videoRef.current &&
        !redirectingRef.current
      ) {
        redirectingRef.current = true;
        document.exitFullscreen?.();
        setTimeout(() => {
          viewerRef.current?.requestFullscreen?.();
          setTimeout(() => {
            redirectingRef.current = false;
          }, 50);
        }, 0);
      }
    };

    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const originalRequest = v.requestFullscreen?.bind(v);
    if (originalRequest) {
      v.requestFullscreen = () => viewerRef.current?.requestFullscreen?.();
    }

    return () => {
      if (originalRequest) v.requestFullscreen = originalRequest;
    };
  }, [file?.url]);



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
        "&:fullscreen": { backgroundColor: "#0b0b0b" },
        border: "1px solid #1e1e1e",
        boxShadow: "0 30px 80px rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        "& video::-webkit-media-controls-fullscreen-button": {
          display: "none",
        },
        "& video::-webkit-media-controls-picture-in-picture-button": {
          display: "none",
        },
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
          ref={videoRef}
          src={file.url}
          controls
          playsInline
          disablePictureInPicture
          controlsList="nofullscreen noremoteplayback noplaybackrate"
          onDoubleClick={(e) => e.preventDefault()}
          onKeyDown={(e) => {
            // bloquea atajos típicos de fullscreen en players
            if (e.key?.toLowerCase() === "f" || e.key === "Enter")
              e.preventDefault();
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            backgroundColor: "#000",
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
