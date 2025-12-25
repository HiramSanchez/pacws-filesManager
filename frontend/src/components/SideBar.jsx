import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Tooltip,
  MenuItem,
  Select,
  FormControl
} from "@mui/material";

export default function SideBar({
  categories,
  selectedCategories,
  onToggleCategory,
  persons,
  selectedPerson,
  onSelectPerson
}) {
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
          gap: 3,
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
                    fontWeight: "bold",
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

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Person selector */}
        <Box sx={{ width: "100%", px: 1, boxSizing: "border-box" }}>
          <FormControl fullWidth size="small">
            <Select
              value={selectedPerson || ""}
              displayEmpty
              onChange={(e) => onSelectPerson(e.target.value)}
              sx={{
                color: "#ccc",
                backgroundColor: "#111",
                borderRadius: 2,
                fontSize: 12,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1e1e1e",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#6D248C",
                },
                "& svg": {
                  color: "#777",
                },
              }}
            >
              <MenuItem value="">All</MenuItem>
              {persons
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((p) => (
                  <MenuItem key={p.name} value={p.name}>
                    {p.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Drawer>
  );
}
