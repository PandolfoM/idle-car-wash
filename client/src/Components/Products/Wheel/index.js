import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  LinearProgress,
  Typography,
  IconButton,
} from "@mui/material";
import { formatNumberAb, PlayBtnClick, ProductBox } from "../../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_CASH, SET_WHEEL } from "../../../utils/actions";
import TireRepairIcon from "@mui/icons-material/TireRepair";
import { useMutation } from "@apollo/client";
import { UPDATE_WALLET, UPDATE_WHEEL } from "../../../utils/mutations";
import Auth from "../../../utils/auth";
import useFitText from "use-fit-text";
import config from "../config.json";

function Wheel() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [updateWallet] = useMutation(UPDATE_WALLET);
  const [updateWheel] = useMutation(UPDATE_WHEEL);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { wheel, cash, sfx, currentMultiplier } = state;
  const { fontSize, ref } = useFitText();

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

  const buyProduct = async () => {
    let lvlUp = wheel.lvl + currentMultiplier;
    let costUp = wheel.cost * config.wheel.cost;
    let profitUp = wheel.profit * config.wheel.profit + currentMultiplier;
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
        speed: wheel.speed
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
          speed: wheel.speed
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductBox running={running.toString()}>
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
          onClick={buyProduct}
          ref={ref}
          style={{ fontSize }}>
          BUY x{currentMultiplier}
          {/* cost to upgrade */}
          <span>${formatNumberAb(wheel.cost * currentMultiplier, 2)}</span>
        </Button>
      </Box>
    </ProductBox>
  );
}

export default Wheel;
