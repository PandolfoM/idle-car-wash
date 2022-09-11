import React from "react";
import { Box, Typography } from "@mui/material";
import cash from "../../assets/cash.png";

function Display() {
  return (
    <Box sx={{ bgcolor: "black", height: "60vh", width: "100%" }}>
      <Box
        sx={{
          bgcolor: "gray",
          width: "100%",
          height: "5vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}>
        <img
          src={cash}
          alt={"cash"}
          style={{ height: "70%", paddingRight: "5px" }}
        />
        <Typography variant="h5" sx={{ paddingRight: "10px" }}>
          1,000
        </Typography>
      </Box>
    </Box>
  );
}

export default Display;
