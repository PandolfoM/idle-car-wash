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
import { CURRENT_CASH, SET_WATER } from "../../../utils/actions";
import ShowerIcon from "@mui/icons-material/Shower";
import { useMutation } from "@apollo/client";
import { UPDATE_WALLET, UPDATE_WATER } from "../../../utils/mutations";
import Auth from "../../../utils/auth";
import useFitText from "use-fit-text"

function PressureWasher() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [updateWallet] = useMutation(UPDATE_WALLET);
  const [updateWater] = useMutation(UPDATE_WATER);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { water, cash, sfx, currentMultiplier } = state;
  const { fontSize, ref } = useFitText();

  useEffect(() => {
    if (progress === 100) {
      dispatch({
        type: CURRENT_CASH,
        cash: cash + water.profit,
      });
      if (Auth.loggedIn()) {
        try {
          updateWallet({
            variables: {
              cash: cash + water.profit,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [progress]);

  useEffect(() => {
    if (cash < water.cost * currentMultiplier) {
      setDisabled(true);
    } else if (cash >= water.cost * currentMultiplier) {
      setDisabled(false);
    }
  }, [cash, currentMultiplier, water]);

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            setRunning(false);
            return 0;
          }
          return Math.min(oldProgress + water.speed, 100);
        });
      }, 100);

      return () => {
        clearInterval(timer);
      };
    }
  }, [running]);

  const buyWater = async () => {
    PlayBtnClick(sfx);
    dispatch({
      type: CURRENT_CASH,
      cash: cash - water.cost * currentMultiplier,
    });
    dispatch({
      type: SET_WATER,
      water: {
        lvl: water.lvl + currentMultiplier,
        cost: water.cost * 1.05,
        profit: water.profit + currentMultiplier,
      },
    });
    try {
      await updateWallet({
        variables: {
          cash: cash - water.cost * currentMultiplier,
        },
      });
      await updateWater({
        variables: {
          lvl: water.lvl + currentMultiplier,
          cost: water.cost * 1.05,
          profit: water.profit + currentMultiplier,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductBox>
      <Box className="itemPic">
        {/* icon */}
        <IconButton size="large" disableRipple onClick={() => setRunning(true)}>
          <ShowerIcon sx={{ width: "2em", height: "2em" }} />
        </IconButton>
        {/* level of component */}
        <Box className="itemLvl">
          <Typography>{formatNumberAb(water.lvl, 2, true)}</Typography>
        </Box>
      </Box>
      {/* how much each component makes */}
      <Typography className="profit">
        {formatNumberAb(water.profit, 2)}
      </Typography>
      <Box className="itemControls">
        <LinearProgress variant="determinate" value={progress} />
        {/* buy upgrades */}
        <Button
          className="buyBtn"
          variant="contained"
          disableRipple
          disabled={disabled}
          onClick={buyWater}
          ref={ref}
          style={{fontSize}}>
          BUY x{currentMultiplier}
          {/* cost to upgrade */}
          <span>${formatNumberAb(water.cost * currentMultiplier, 2)}</span>
        </Button>
      </Box>
    </ProductBox>
  );
}

export default PressureWasher;
