import React, { useMemo, useRef, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function Gallery({ files, selectedFile, onSelectFile }) {
  const scrollerRef = useRef(null);
  const itemRefs = useRef(new Map());
  const scrollByAmount = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(320, Math.floor(el.clientWidth * 0.6));
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const showArrows = useMemo(() => (files?.length || 0) > 0, [files]);

  useEffect(() => {
    if (!selectedFile) return;
    const el = itemRefs.current.get(selectedFile.fileName);
    if (el) {
      el.scrollIntoView({ behavior: "auto", inline: "nearest", block: "nearest" });
    }
  }, [selectedFile]);


  return (
    <Box
      sx={{
        height: "18vh",
        minHeight: 179,
        bgcolor: "background.default",
        borderTop: "1px solid",
        borderTopColor: "divider",
        px: 2,
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Left fade + button */}
      {showArrows && (
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 2,
            background:
              "linear-gradient(to right, rgba(15,15,15,0.6), rgba(15,15,15,0))",
          }}
        >
          <IconButton
            onClick={() => scrollByAmount(-1)}
            sx={{
              pointerEvents: "auto",
              color: "#eaeaea",
              backgroundColor: "rgba(255,255,255,0.06)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.14)" },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      )}

      {/* Scroller */}
      <Box
        ref={scrollerRef}
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          overflowY: "hidden",
          width: "100%",
          scrollBehavior: "smooth",
          scrollSnapType: "x proximity",
          pr: 6,
          pl: 6,

          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {files.map((file, index) => {
          const active = selectedFile?.fileName === file.fileName;

          return (
            <Box
              ref={(node) => {
                if (!node) return;
                itemRefs.current.set(file.fileName, node);
              }}
              key={file.fileName}
              onClick={() => onSelectFile(file)}
              sx={{
                flex: "0 0 auto",
                width: 120,
                aspectRatio: "1 / 1",
                borderRadius: 2,
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
                bgcolor: "divider",
                border: active ? "2px solid" : "1px solid",
                borderColor: active ? "#6D248C" : "divider",
                boxShadow: active ? "0 0 0 2px rgba(109,36,140,0.25)" : "none",
                transform: active ? "scale(1.03)" : "scale(1)",
                transition: "all 0.2s ease",
                scrollSnapAlign: "start",
                "&:hover": {
                  transform: "scale(1.03)",
                },
              }}
            >
              <img
                src={file.thumbnail || (file.type === "image" ? file.url : "")}
                alt=""
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Overlay hover */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(0,0,0,0.35)",
                  opacity: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "opacity 0.2s ease",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 20,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {file.type === "video" ? "▶" : "🔍"}
                </Typography>
              </Box>

              {/* Video badge */}
              {file.type === "video" && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    px: 0.8,
                    py: 0.2,
                    fontSize: 10,
                    borderRadius: 1,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    color: "#ccc",
                    letterSpacing: 0.5,
                  }}
                >
                  VIDEO
                </Box>
              )}
            </Box>
          );
        })}
      </Box>

      {/* Right fade + button */}
      {showArrows && (
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            background:
              "linear-gradient(to left, rgba(15,15,15,0.6), rgba(15,15,15,0))",
          }}
        >
          <IconButton
            onClick={() => scrollByAmount(1)}
            sx={{
              pointerEvents: "auto",
              color: "#eaeaea",
              backgroundColor: "rgba(255,255,255,0.06)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.14)" },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
