import React from "react";
import { Box } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

function Navigation() {
  return (
    <Box
      component={"ul"}
      sx={{
        listStyle: "none",
        minHeight: "100vh",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
      <Box component={"div"}>
        <Box component={"li"}>Upgrades</Box>
        <Box component={"li"}>Research</Box>
        <Box component={"li"}>Equipment</Box>
        <Box component={"li"}>Store</Box>
      </Box>
      <Box component={"div"}>
        <SettingsIcon />
      </Box>
    </Box>
  );
}

export default Navigation;
