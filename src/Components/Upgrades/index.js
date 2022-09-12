import { Box, Button, Grid, LinearProgress, Typography } from "@mui/material";
import React from "react";

function Upgrades() {
  return (
    <Box
      sx={{
        width: "95%",
        borderRadius: "50px 10px 10px 50px",
        height: "4.7em",
        bgcolor: "#333",
        margin: "auto",
        marginTop: "15px",
        display: "flex",
      }}>
      {/* Circle */}
      <Box
        sx={{
          padding: "0px !important",
          borderRadius: "100%",
          bgcolor: "#111",
          width: "6em",
          height: "6em",
          position: "relative",
          top: -58,
          right: -40,
          transform: "translate(-50%, 50%)",
          display: "flex",
          alignItems: "flex-end",
        }}>
        {/* Pill */}
        <Box
          sx={{
            width: "6em",
            height: "1.7em",
            border: "3px solid red",
            borderRadius: "30px",
          }}
        />
      </Box>
      <Box
        sx={{
          padding: "0px !important",
          width: "80%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}>
        <LinearProgress
          variant="determinate"
          value={34}
          sx={{
            width: "90%",
            height: "1.7em",
            borderRadius: "20px",
            bottom: -5,
            position: "relative",
          }}
        />
        <Button
          variant="contained"
          sx={{
            width: "85%",
            height: "2.8em",
            bottom: -15,
            position: "relative",
            textTransform: "none",
          }}>
          BUY x1 SOAP
        </Button>
      </Box>
    </Box>
  );
}

export default Upgrades;
