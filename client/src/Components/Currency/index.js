import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import coin from "../../assets/coin.png";
import gem from "../../assets/gem.png";
import { useDispatch, useSelector } from "react-redux";
import { formatNumberAb } from "../../utils/helpers";
import SettingsIcon from "@mui/icons-material/Settings";
import { TOGGLE_MODAL } from "../../utils/actions";

const CurrencyStyle = {
  bgcolor: "#444",
  height: "6.5vh",
  borderBottom: "#333 4px solid",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "& .currency": {
    boxShadow: "0 0 4px 2px black inset",
    height: "100%",
    padding: "10px 15px",
    margin: "0 5px",
  },
  div: {
    width: "max-content",
    height: "50%",
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
  },
};

function Currency() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch()
  const { cash, gems } = state;

  return (
    <Box sx={CurrencyStyle}>
      <Box>
        <Box className="currency">
          <img src={coin} alt="coin" />
          <Typography variant="h3" component={"h3"} color={"#EDC429"}>
            {formatNumberAb(cash, 2)}
          </Typography>
        </Box>
        <Box className="currency">
          <img src={gem} alt="gem"></img>
          <Typography variant="h3" component={"h3"} color={"#9D47E7"}>
            {formatNumberAb(gems, 2)}
          </Typography>
        </Box>
      </Box>
      <IconButton
        onClick={() => {
          dispatch({ type: TOGGLE_MODAL });
        }}>
        <SettingsIcon />
      </IconButton>
    </Box>
  );
}

export default Currency;
