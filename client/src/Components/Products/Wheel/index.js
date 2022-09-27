import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  LinearProgress,
  Typography,
  IconButton,
} from "@mui/material";
import { formatNumberAb, PlayBtnClick } from "../../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_CASH, SET_WHEEL } from "../../../utils/actions";
import TireRepairIcon from '@mui/icons-material/TireRepair';
import { useMutation } from "@apollo/client";
import { UPDATE_WALLET, UPDATE_WHEEL } from "../../../utils/mutations";
import Auth from "../../../utils/auth";

const UpgradesStyle = {
  width: "90%",
  borderRadius: "50px 10px 10px 50px",
  height: "4.7em",
  bgcolor: "#3c485e",
  margin: "auto",
  marginTop: "15px",
  marginBottom: "30px",
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
    backgroundColor: "#EF233C",
    WebkitTextStroke: "2px black",
    "&.Mui-disabled": {
      backgroundColor: "#444",
    },
  },
  "& .buyBtn:hover": {
    backgroundColor: "#D90429",
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

function Wheel() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [updateWallet] = useMutation(UPDATE_WALLET);
  const [updateWheel] = useMutation(UPDATE_WHEEL);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { wheel, cash, sfx, currentMultiplier } = state;

  useEffect(() => {
    if (progress === 100) {
      dispatch({
        type: CURRENT_CASH,
        cash: cash + wheel.profit,
      });
      if (Auth.loggedIn()) {
        try {
          updateWallet({
            variables: {
              cash: cash + wheel.profit,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [progress]);

  useEffect(() => {
    if (cash < wheel.cost * currentMultiplier) {
      setDisabled(true);
    } else if (cash >= wheel.cost * currentMultiplier) {
      setDisabled(false);
    }
  }, [cash, currentMultiplier, wheel]);

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            setRunning(false);
            return 0;
          }
          return Math.min(oldProgress + wheel.speed, 100);
        });
      }, 100);

      return () => {
        clearInterval(timer);
      };
    }
  }, [running]);

  const buyWheel = async () => {
    let lvlUp = wheel.lvl + currentMultiplier
    let costUp = wheel.cost * 1.08
    let profitUp = wheel.profit * 1.13 + currentMultiplier
    PlayBtnClick(sfx);
    dispatch({
      type: CURRENT_CASH,
      cash: cash - wheel.cost * currentMultiplier,
    });
    dispatch({
      type: SET_WHEEL,
      wheel: {
        lvl: lvlUp,
        cost: costUp,
        profit: profitUp,
      },
    });
    try {
      await updateWallet({
        variables: {
          cash: cash - wheel.cost * currentMultiplier,
        },
      });
      await updateWheel({
        variables: {
          lvl: lvlUp,
          cost: costUp,
          profit: profitUp,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={UpgradesStyle}>
      <Box className="itemPic">
        {/* icon */}
        <IconButton size="large" disableRipple onClick={() => setRunning(true)}>
          <TireRepairIcon sx={{ width: "2em", height: "2em" }} />
        </IconButton>
        {/* level of component */}
        <Box className="itemLvl">
          <Typography>{formatNumberAb(wheel.lvl, 2, true)}</Typography>
        </Box>
      </Box>
      {/* how much each component makes */}
      <Typography className="profit">
        {formatNumberAb(wheel.profit, 2)}
      </Typography>
      <Box className="itemControls">
        <LinearProgress variant="determinate" value={progress} />
        {/* buy upgrades */}
        <Button
          className="buyBtn"
          variant="contained"
          disableRipple
          disabled={disabled}
          onClick={buyWheel}>
          BUY x{currentMultiplier}
          {/* cost to upgrade */}
          <span>${formatNumberAb(wheel.cost * currentMultiplier, 2)}</span>
        </Button>
      </Box>
    </Box>
  );
}

export default Wheel;
