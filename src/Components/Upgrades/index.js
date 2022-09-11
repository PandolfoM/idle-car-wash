import { Box, Button, Typography } from "@mui/material";
import React from "react";

function Perks() {
  return (
    <Box
      sx={{
        bgcolor: "gray",
        height: "40vh",
        padding: "10px",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}>
      <Typography component={"h3"} variant={"h5"}>
        Upgrades
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          fontSize: "20px",
          div: {
            margin: "10px 0",
          },
        }}>
        <Box sx={{ width: "33%" }}>
          <Button
            variant="contained"
            disableRipple
            size="large"
            sx={{ fontWeight: "bold" }}>
            $100
          </Button>{" "}
          More Profit
        </Box>
        <Box sx={{ width: "33%" }}>
          <Button
            variant="contained"
            disableRipple
            size="large"
            sx={{ fontWeight: "bold" }}>
            $100
          </Button>{" "}
          Faster Wash
        </Box>
        <Box sx={{ width: "33%" }}>
          <Button
            variant="contained"
            disableRipple
            size="large"
            sx={{ fontWeight: "bold" }}>
            $100
          </Button>{" "}
          More Customers
        </Box>
        <Box sx={{ width: "33%" }}>
          <Button
            variant="contained"
            disableRipple
            size="large"
            sx={{ fontWeight: "bold" }}>
            $100
          </Button>{" "}
          More Customers
        </Box>
        <Box sx={{ width: "33%" }}>
          <Button
            variant="contained"
            disableRipple
            size="large"
            sx={{ fontWeight: "bold" }}>
            $100
          </Button>{" "}
          More Customers
        </Box>
        <Box sx={{ width: "33%" }}>
          <Button
            variant="contained"
            disableRipple
            size="large"
            sx={{ fontWeight: "bold" }}>
            $100
          </Button>{" "}
          More Customers
        </Box>
        <Box sx={{ width: "33%" }}>
          <Button
            variant="contained"
            disableRipple
            size="large"
            sx={{ fontWeight: "bold" }}>
            $100
          </Button>{" "}
          More Customers
        </Box>
      </Box>
    </Box>
  );
}

export default Perks;
