import { Box, Button, LinearProgress, Typography } from "@mui/material";
import React from "react";

const UpgradesStyle = {
  width: "95%",
  borderRadius: "50px 10px 10px 50px",
  height: "4.7em",
  bgcolor: "#3c485e",
  margin: "auto",
  marginTop: "15px",
  display: "flex",
  border: "black 2px solid",
  "& .circle": {
    padding: "0px !important",
    borderRadius: "100%",
    bgcolor: "#242b37",
    width: "5.9em",
    height: "5.9em",
    position: "relative",
    top: -60,
    right: -40,
    transform: "translate(-50%, 50%)",
    display: "flex",
    alignItems: "flex-end",
    border: "black 2px solid",
    boxShadow: "0 0 0px 3px #3c485e inset",
  },
  "& .pill": {
    width: "6em",
    height: "2.3em",
    boxShadow: "0 0 5px 1px black inset",
    borderRadius: "30px",
    bgcolor: "#2b2d42",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    bottom: -2,
  },
  "& .pill>p": {
    fontSize: "1.3em",
    fontWeight: "bold",
    color: "white",
    textShadow:
      "2px 0 black, -2px 0 black, 0 2px black, 0 -2px black, 1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black",
    overflow: "hidden",
    margin: "0 5px",
  },
  "& button": {
    width: "90%",
    bottom: -15,
    position: "relative",
    textTransform: "none",
    backgroundColor: "#70e000",
    fontSize: "1.2em",
    paddingTop: "0px !important",
    paddingBottom: "0px !important",
    border: "black 3px solid",
    borderRadius: "10px",
    transition: "all 0.1s linear"
  },
  "& button:active": {
    transform: "scale(0.95)",
    transition: "all 0.1s linear"
  }
};

function Upgrades() {
  return (
    <Box sx={UpgradesStyle}>
      <Box className="circle">
        <Box className="pill">
          <Typography>1,000</Typography>
        </Box>
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
            border: "black 3px solid",
          }}
        />
        <Button variant="contained" disableRipple> 
          BUY x1 SOAP
        </Button>
      </Box>
    </Box>
  );
}

export default Upgrades;
