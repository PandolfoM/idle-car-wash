import React from "react";
import { Box } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

function Navigation() {
  return (
    <Box
      sx={{
        listStyle: "none",
        minHeight: "100vh",
        width: "100%",
        minWidth: "fit-content",
        padding: 0,
        margin: 0,
        // float: 'left',
        zIndex: "99999",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
      <Box component={"div"} sx={{padding: "10px"}}>
        <Box
          component={"li"}
          sx={{
            height: "150px",
            border: "red 2px solid",
            borderRadius: "10px",
          }}>
          Upgrades
        </Box>
        <Box
          component={"li"}
          sx={{
            height: "150px",
            border: "blue 2px solid",
            borderRadius: "10px",
          }}>
          Research
        </Box>
        <Box
          component={"li"}
          sx={{
            height: "150px",
            border: "orange 2px solid",
            borderRadius: "10px",
          }}>
          Equipment
        </Box>
        <Box
          component={"li"}
          sx={{
            height: "150px",
            border: "black 2px solid",
            borderRadius: "10px",
          }}>
          Store
        </Box>
      </Box>
      <Box component={"div"}>
        <SettingsIcon />
      </Box>
    </Box>
  );
}

export default Navigation;
