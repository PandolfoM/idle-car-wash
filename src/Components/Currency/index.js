import React from "react";
import { Box, Typography } from "@mui/material";
import coin from "../../assets/coin.png";
import gem from "../../assets/gem.png";

function Currency() {
  return (
    <Box
      sx={{
        bgcolor: "#444",
        height: "5.5vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        div: {
          bgcolor: "#333",
          boxShadow: "0 0 5px 1px black inset",
          width: "max-content",
          height: "max-content",
          padding: "5px 15px",
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
          fontSize: "1.3em",
          marginLeft: "5px"
        }
      }}>
      <Box>
        <img src={coin} alt="coin" />
        <Typography variant="h3" component={"h3"}>1,000</Typography>
      </Box>
      <Box>
        <img src={gem} alt="gem"></img>
        <Typography variant="h3" component={"h3"}>1,000</Typography>
      </Box>
    </Box>
  );
}

export default Currency;
