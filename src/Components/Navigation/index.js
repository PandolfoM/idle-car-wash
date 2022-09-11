import React from "react";
import { Box, Button, IconButton } from "@mui/material";
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
        zIndex: "99999",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "#444",
      }}>
      <Box component={"div"} sx={{ padding: "0 10px", li: {margin: "10px 0"} }}>
        <Box
          component={"li"}
          sx={{
            height: "150px",
            border: "red 2px solid",
            borderRadius: "10px",
          }}>
          <Button
            sx={{ width: "100%", height: "100%", fontSize: "50px" }}
            disableRipple>
            Upgrades
          </Button>
        </Box>
        <Box
          component={"li"}
          sx={{
            height: "150px",
            border: "blue 2px solid",
            borderRadius: "10px",
          }}>
          <Button
            sx={{ width: "100%", height: "100%", fontSize: "50px" }}
            disableRipple>
            Research
          </Button>
        </Box>
        <Box
          component={"li"}
          sx={{
            height: "150px",
            border: "orange 2px solid",
            borderRadius: "10px",
          }}>
          <Button
            sx={{ width: "100%", height: "100%", fontSize: "50px" }}
            disableRipple>
            Equipment
          </Button>
        </Box>
        <Box
          component={"li"}
          sx={{
            height: "150px",
            border: "black 2px solid",
            borderRadius: "10px",
          }}>
          <Button
            sx={{ width: "100%", height: "100%", fontSize: "50px" }}
            disableRipple>
            Store
          </Button>
        </Box>
      </Box>
      <IconButton sx={{ width: "fit-content", margin: '0 0px 10px 10px' }} size="large">
        <SettingsIcon sx={{width: "2em", height: "auto"}}/>
      </IconButton>
    </Box>
  );
}

export default Navigation;
