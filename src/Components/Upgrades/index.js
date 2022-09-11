import { Box, Button, Typography } from "@mui/material";
import React from "react";

function Perks() {
  return (
    <Box
      sx={{
        bgcolor: "red",
        height: "65%",
      }}>
      <Typography component={"h3"} variant={"h5"}>
        Upgrades
      </Typography>
    </Box>
  );
}

export default Perks;
