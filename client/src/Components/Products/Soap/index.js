import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  LinearProgress,
  Typography,
  IconButton,
} from "@mui/material";
import { formatNumber, formatNumberAb, PlayBtnClick } from "../../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_CASH, UPDATE_SOAP } from "../../../utils/actions";
import SoapIcon from "@mui/icons-material/Soap";

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
    border: "black 2px solid",
    boxShadow: "0 0 0px 3px #3c485e inset",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
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
  "& .buyBtn": {
    bottom: -15,
    position: "relative",
    textTransform: "none",
    color: "white",
    paddingTop: "0px !important",
    paddingBottom: "0px !important",
    border: "black 2px solid",
    borderRadius: "10px",
    transition: "all 0.1s linenpmar",
    fontSize: "1.1em",
    width: "90%",
    display: "flex",
    justifyContent: "space-between",
  },
  "& .buyBtn:active": {
    transform: "scale(0.95)",
  },
  "& .profit": {
    width: "0px",
    zIndex: 1,
    position: "relative",
    top: 13,
    left: "6vw",
    color: "white",
    textShadow:
      "2px 0 black, -2px 0 black, 0 2px black, 0 -2px black, 1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black",
  },
};

function Soap() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (progress === 100) {
      dispatch({
        type: CURRENT_CASH,
        cash: state.cash + state.soap.profit,
      });
    }
  }, [progress, state.soap.profit]);

  useEffect(() => {
    if (state.cash < state.soap.cost * state.currentMultiplier) {
      setDisabled(true);
    } else if (state.cash >= state.soap.cost * state.currentMultiplier) {
      setDisabled(false);
    }
  }, [state.cash, state.currentMultiplier, state.soap.cost]);

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            setRunning(false);
            return 0;
          }
          return Math.min(oldProgress + 5, 100);
        });
      }, 100);

      return () => {
        clearInterval(timer);
      };
    }
  }, [running]);

  const buySoap = () => {
    PlayBtnClick(state.sfx)
    dispatch({
      type: CURRENT_CASH,
      cash: state.cash - state.soap.cost * state.currentMultiplier,
    });
    dispatch({
      type: UPDATE_SOAP,
      soap: {
        lvl: state.soap.profit + state.currentMultiplier,
        cost: state.soap.cost * 1.15,
        profit: state.soap.profit + state.currentMultiplier,
      },
    });
  };

  return (
    <Box sx={UpgradesStyle}>
      <Box className="itemPic">
        {/* icon */}
        <IconButton size="large" disableRipple onClick={() => setRunning(true)}>
          <SoapIcon sx={{ width: "2em", height: "2em" }} />
        </IconButton>
        {/* level of component */}
        <Box className="itemLvl">
          <Typography>{formatNumberAb(state.soap.lvl, 0)}</Typography>
        </Box>
      </Box>
      {/* how much each component makes */}
      <Typography className="profit">
        {formatNumberAb(state.soap.profit, 0)}
      </Typography>
      <Box className="itemControls">
        <LinearProgress variant="determinate" value={progress} />
        {/* buy upgrades */}
        <Button
          className="buyBtn"
          variant="contained"
          disableRipple
          disabled={disabled}
          onClick={buySoap}>
          BUY x{formatNumber(state.currentMultiplier, 1)}
          {/* cost to upgrade */}
          <span>
            ${formatNumberAb(state.soap.cost * state.currentMultiplier, 1)}
          </span>
        </Button>
      </Box>
    </Box>
  );
}

export default Soap;
