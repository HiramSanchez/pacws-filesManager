import React, { useMemo, useState } from "react";
import {
  Drawer,
  Box,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";

function getInitials(name) {
  if (!name) return "ALL";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function SideBar({
  categories,
  selectedCategories,
  onToggleCategory,
  persons,
  selectedPerson,
  onSelectPerson,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const sortedPersons = useMemo(
    () => persons.slice().sort((a, b) => a.name.localeCompare(b.name)),
    [persons]
  );

  const selectedLabel = selectedPerson || "All";
  const selectedBadge = getInitials(selectedPerson);

  const handleOpenMenu = (e) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handlePick = (value) => {
    onSelectPerson(value);
    handleCloseMenu();
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 72,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 72,
          boxSizing: "border-box",
          backgroundColor: "#0b0b0b",
          borderRight: "1px solid #1e1e1e",
          overflowX: "hidden",
          top: 58,
          height: "calc(100% - 58px)",
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 2,
          gap: 2,
        }}
      >
        {/* Categories */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {categories.map((cat) => {
            const active = selectedCategories.includes(cat);

            return (
              <Tooltip title={cat.toUpperCase()} placement="right" key={cat}>
                <IconButton
                  onClick={() => onToggleCategory(cat)}
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 2,
                    fontSize: 12,
                    fontWeight: "BOLD",
                    color: active ? "white" : "#777",
                    backgroundColor: active ? "#6D248C" : "transparent",
                    border: "1px solid",
                    borderColor: active ? "#6D248C" : "#1e1e1e",
                    "&:hover": {
                      backgroundColor: active
                        ? "#6D248C"
                        : "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  {cat.toUpperCase()}
                </IconButton>
              </Tooltip>
            );
          })}
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Person filter button (compact) */}
        <Tooltip title={`Filter: ${selectedLabel}`} placement="right">
          <IconButton
            onClick={handleOpenMenu}
            sx={{
              width: 46,
              height: 46,
              borderRadius: 2,
              backgroundColor: "#111",
              border: "1px solid #1e1e1e",
              color: "#eaeaea",
              fontWeight: 900,
              fontSize: 12,
              letterSpacing: 0.5,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
            }}
          >
            {selectedBadge}
          </IconButton>
        </Tooltip>

        {/* Floating menu */}
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          PaperProps={{
            sx: {
              mt: -1,
              ml: 1,
              minWidth: 240,
              maxHeight: 360,
              backgroundColor: "#0b0b0b",
              border: "1px solid #1e1e1e",
              color: "#eaeaea",
              borderRadius: 2,
              overflowY: "auto",
              overflowX: "hidden",
            },
          }}
        >
          <Box sx={{ px: 1.5, py: 1 }}>
            <Typography sx={{ fontSize: 12, color: "#aaa" }}>
              Filter by person
            </Typography>
          </Box>

          <MenuItem
            onClick={() => handlePick("")}
            selected={selectedPerson === ""}
            sx={{
              fontSize: 13,
              "&.Mui-selected": { backgroundColor: "rgba(109,36,140,0.25)" },
              "&.Mui-selected:hover": {
                backgroundColor: "rgba(109,36,140,0.35)",
              },
            }}
          >
            All
          </MenuItem>

          <Divider sx={{ borderColor: "#1e1e1e" }} />

          {sortedPersons.map((p) => (
            <MenuItem
              key={p.name}
              onClick={() => handlePick(p.name)}
              selected={selectedPerson === p.name}
              sx={{
                fontSize: 13,
                "&.Mui-selected": { backgroundColor: "rgba(109,36,140,0.25)" },
                "&.Mui-selected:hover": {
                  backgroundColor: "rgba(109,36,140,0.35)",
                },
              }}
            >
              {p.name}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Drawer>
  );
}
