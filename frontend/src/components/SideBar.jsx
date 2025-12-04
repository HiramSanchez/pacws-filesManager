import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemIcon,
  Box,
  Typography
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
    <Drawer variant="permanent" anchor="left">
      <Box sx={{ width: "190px", mt: 2, px: 2 }}>

      <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "#6D248C",
            mb: 2
          }}
        >
          File Manager
        </Typography>

        <List>
          <ListItem sx={{ mb: 2, px: 0 }}>
            <FormControl fullWidth size="small">
              <InputLabel>find</InputLabel>
              <Select
                value={selectedPerson || ""}
                label="find"
                onChange={(e) => onSelectPerson(e.target.value)}
              >
                <MenuItem value="">(todas)</MenuItem>
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
          </ListItem>

          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              border: "1px solid #ddd",
              backgroundColor: "#f7f7f7",
              width: "82%",
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
              Categories
            </Typography>

            {categories.map((cat) => (
              <ListItem
                key={cat}
                button
                sx={{
                  py: 0.5,
                  px: 1,
                  borderRadius: 1,
                  "&:hover": { backgroundColor: "#eaeaea" }
                }}
                onClick={() => onToggleCategory(cat)}
              >
                <ListItemIcon sx={{ minWidth: "36px" }}>
                  <Checkbox size="small" checked={selectedCategories.includes(cat)} />
                </ListItemIcon>
                <ListItemText primary={cat.toUpperCase()} />
              </ListItem>
            ))}
          </Box>

        </List>
      </Box>
    </Drawer>
  );
}
