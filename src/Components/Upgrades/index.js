import React from "react";
import { Box, Button, Chip, LinearProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_CURRENT_MULTIPLIER } from "../../utils/actions";
import useFitText from "use-fit-text"

const UpgradesStyle = {
  width: "90%",
  borderRadius: "50px 10px 10px 50px",
  height: "4.7em",
  bgcolor: "#3c485e",
  margin: "auto",
  marginTop: "15px",
  display: "flex",
  border: "black 2px solid",
  "& .itemPic": {
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
  "& .itemLvl": {
    width: "6em",
    height: "2.3em",
    borderRadius: "30px",
    bgcolor: "#2b2d42",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    bottom: -2,
    border: "2px solid black",
    boxShadow: "0 0 0px 3px #3c485e inset",
  },
  "& .itemLvl>p": {
    fontSize: "1.3em",
    fontWeight: "bold",
    color: "white",
    textShadow:
      "2px 0 black, -2px 0 black, 0 2px black, 0 -2px black, 1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black",
    overflow: "hidden",
  },
  "& .itemControls": {
    padding: "0px !important",
    width: "80%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  "& .itemControls>span": {
    width: "90%",
    height: "1.7em",
    borderRadius: "20px",
    bottom: -5,
    position: "relative",
    border: "black 3px solid",
  },
  "& button": {
    // width: "90%",
    bottom: -15,
    position: "relative",
    textTransform: "none",
    // fontSize: "1.3em",
    paddingTop: "0px !important",
    paddingBottom: "0px !important",
    border: "black 3px solid",
    borderRadius: "10px",
    transition: "all 0.1s linear",
  },
  "& button:active": {
    transform: "scale(0.95)",
  },
};

function Upgrades() {
  const {fontSize, ref} = useFitText()
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
      multiplier = 1000;
    } else if (currentMultiplier === 1000) {
      multiplier = 1;
    }

    dispatch({
      type: UPDATE_CURRENT_MULTIPLIER,
      currentMultiplier: multiplier,
    });
  };

  return (
    <>
      <Chip label={`x${currentMultiplier}`} onClick={handleMultiChange}></Chip>
      {/* Upgrades */}
      <Box sx={UpgradesStyle}>
        <Box className="itemPic">
          <Box className="itemLvl">
            <Typography>1,000</Typography>
          </Box>
        </Box>
        <Box className="itemControls">
          <LinearProgress variant="determinate" value={34} />
          <Button variant="contained" disableRipple ref={ref} style={{fontSize, height: "6vh", width: "90%"}}>
            BUY x{new Intl.NumberFormat().format(currentMultiplier)} SOAP
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Upgrades;
