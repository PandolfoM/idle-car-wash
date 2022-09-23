import { IconButton } from "@mui/material";
import React from "react";

export default function CloseBtn() {
  return (
    <IconButton
      sx={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translate(-50%, 50%)",
        zIndex: 1500,
        borderRadius: "100px",
        width: "50px",
        height: "50px",
        backgroundColor: "#EF233C",
        border: "black 2px solid",
        boxShadow: "0 -5px 0 0.5px rgba(0, 0, 0, 0.5) inset",
        WebkitTextStroke: "2px black",
      }}>
      X
    </IconButton>
  );
}
