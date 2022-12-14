import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  LinearProgress,
  Typography,
  IconButton,
} from "@mui/material";
import {
  formatNumberAb,
  PlayBtnClick,
  ProductBox,
} from "../../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_CASH, SET_WINDOW } from "../../../utils/actions";
import SoapIcon from "@mui/icons-material/Soap";
import { useMutation } from "@apollo/client";
import { UPDATE_WINDOW, UPDATE_WALLET } from "../../../utils/mutations";
import Auth from "../../../utils/auth";
import useFitText from "use-fit-text";
import config from "../config.json";

function Window() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [updateWallet] = useMutation(UPDATE_WALLET);
  const [updateWindow] = useMutation(UPDATE_WINDOW);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { window, cash, sfx, currentMultiplier } = state;
  const { fontSize, ref } = useFitText();

  useEffect(() => {
    if (window.manager) {
      setRunning(true);
    }
  }, [window.manager]);

  useEffect(() => {
    if (progress === 100) {
      dispatch({
        type: CURRENT_CASH,
        cash: cash + window.profit,
      });
      if (Auth.loggedIn()) {
        try {
          updateWallet({
            variables: {
              cash: cash + window.profit,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [progress]);

  useEffect(() => {
    if (cash < window.cost * currentMultiplier) {
      setDisabled(true);
    } else if (cash >= window.cost * currentMultiplier) {
      setDisabled(false);
    }
  }, [cash, currentMultiplier, window]);

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            if (!window.manager) setRunning(false);
            return 0;
          }
          return Math.min(oldProgress + window.speed, 100);
        });
      }, 100);

      return () => {
        clearInterval(timer);
      };
    }
  }, [running, window.speed, window.manager]);

  const buyProduct = async () => {
    let lvlUp = window.lvl + currentMultiplier;
    let costUp = window.cost * 1.15;
    let profitUp =
      window.profit + 232.42 * currentMultiplier;
    let speedUp = 0;

    if (window.lvl < 99) {
      speedUp = window.speed;
    } else if (window.lvl >= 99) {
      speedUp = window.speed + 24.875;
    } else if (window.lvl >= 199) {
      speedUp = window.speed + 24.875;
    } else if (window.lvl >= 299) {
      speedUp = window.speed + 24.875;
    } else if (window.lvl >= 399) {
      speedUp = window.speed + 24.875;
    }

    PlayBtnClick(sfx);
    dispatch({
      type: CURRENT_CASH,
      cash: cash - window.cost * currentMultiplier,
    });
    dispatch({
      type: SET_WINDOW,
      window: {
        lvl: lvlUp,
        cost: parseFloat(costUp.toFixed(2)),
        profit: profitUp,
        speed: speedUp,
        manager: window.manager,
      },
    });
    try {
      await updateWallet({
        variables: {
          cash: cash - window.cost * currentMultiplier,
        },
      });
      await updateWindow({
        variables: {
          lvl: lvlUp,
          cost: parseFloat(costUp.toFixed(2)),
          profit: profitUp,
          speed: speedUp,
          manager: window.manager,
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
          <SoapIcon sx={{ width: "2em", height: "2em" }} />
        </IconButton>
        {/* level of component */}
        <Box className="itemLvl">
          <Typography>{formatNumberAb(window.lvl, 2, true)}</Typography>
        </Box>
      </Box>
      {/* how much each component makes */}
      <Typography className="profit">
        {formatNumberAb(window.profit, 2)}
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
          <span>${formatNumberAb(window.cost * currentMultiplier, 2)}</span>
        </Button>
      </Box>
    </ProductBox>
  );
}

export default Window;
