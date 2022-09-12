import React from "react";
import { Box, Typography } from "@mui/material";
import coin from "../../assets/coin.png";
import gem from "../../assets/gem.png";

function Currency() {
  return (
    <Box
      sx={{
        bgcolor: "#444",
        height: "6.5vh",
        borderBottom: "#333 4px solid",
        width: "100%",
        display: "flex",
        alignItems: "center",
        div: {
          bgcolor: "#333",
          boxShadow: "0 0 4px 2px black inset",
          width: "max-content",
          height: "50%",
          padding: "10px 15px",
          margin: "0 5px",
          display: "flex",
          alignItems: "center",
          borderRadius: "30px",
        },
        img: {
          width: "1.5em",
          height: "1.5em",
        },
        h3: {
          fontSize: "1.2em",
          marginLeft: "5px",
          fontWeight: "bold",
        }
      }}>
      <Box>
        <img src={coin} alt="coin" />
        <Typography variant="h3" component={"h3"} color={"#EDC429"}>1,000</Typography>
      </Box>
      <Box>
        <img src={gem} alt="gem"></img>
        <Typography variant="h3" component={"h3"} color={"#477DE7"}>1,000</Typography>
      </Box>
    </Box>
  );
}

export default Currency;
