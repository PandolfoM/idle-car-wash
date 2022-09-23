import React from "react";
import { Box, Chip} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_CURRENT_MULTIPLIER } from "../../utils/actions";
import SellIcon from "@mui/icons-material/Sell";
import Soap from "../Products/Soap";

function Upgrades() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { currentMultiplier } = state;

  const handleMultiChange = () => {
    let multiplier;

    if (currentMultiplier === 1) {
      multiplier = 2;
    } else if (currentMultiplier === 2) {
      multiplier = 10;
    } else if (currentMultiplier === 10) {
      multiplier = 100;
    } else if (currentMultiplier === 100) {
      multiplier = 1;
    }

    dispatch({
      type: UPDATE_CURRENT_MULTIPLIER,
      currentMultiplier: multiplier,
    });
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      {/* Buy multiplier */}
      <Chip
        icon={<SellIcon />}
        label={`x${currentMultiplier}`}
        onClick={handleMultiChange}
        sx={{
          width: "fit-content",
          margin: "5px",
          float: "right",
        }}></Chip>

      {[...Array(5)].map((x, i) => (
        <Soap key={i} />
      ))}
      {/* Upgrades */}
    </Box>
  );
}

export default Upgrades;
