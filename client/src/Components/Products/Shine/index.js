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
import { CURRENT_CASH, SET_SHINE } from "../../../utils/actions";
import SoapIcon from "@mui/icons-material/Soap";
import { useMutation } from "@apollo/client";
import { UPDATE_SHINE, UPDATE_WALLET } from "../../../utils/mutations";
import Auth from "../../../utils/auth";
import useFitText from "use-fit-text";
import config from "../config.json";

function Shine() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [updateWallet] = useMutation(UPDATE_WALLET);
  const [updateShine] = useMutation(UPDATE_SHINE);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { shine, cash, sfx, currentMultiplier } = state;
  const { fontSize, ref } = useFitText();

  useEffect(() => {
    if (progress === 100) {
      dispatch({
        type: CURRENT_CASH,
        cash: cash + shine.profit,
      });
      if (Auth.loggedIn()) {
        try {
          updateWallet({
            variables: {
              cash: cash + shine.profit,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [progress]);

  useEffect(() => {
    if (cash < shine.cost * currentMultiplier) {
      setDisabled(true);
    } else if (cash >= shine.cost * currentMultiplier) {
      setDisabled(false);
    }
  }, [cash, currentMultiplier, shine]);

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            setRunning(false);
            return 0;
          }
          return Math.min(oldProgress + shine.speed, 100);
        });
      }, 100);

      return () => {
        clearInterval(timer);
      };
    }
  }, [running]);

  const buyProduct = async () => {
    let lvlUp = shine.lvl + currentMultiplier;
    let costUp = shine.cost * config.shine.cost;
    let profitUp = shine.profit * config.shine.profit + currentMultiplier;
    PlayBtnClick(sfx);
    dispatch({
      type: CURRENT_CASH,
      cash: cash - shine.cost * currentMultiplier,
    });
    dispatch({
      type: SET_SHINE,
      shine: {
        lvl: lvlUp,
        cost: costUp,
        profit: profitUp,
        speed: shine.speed
      },
    });
    try {
      await updateWallet({
        variables: {
          cash: cash - shine.cost * currentMultiplier,
        },
      });
      await updateShine({
        variables: {
          lvl: lvlUp,
          cost: costUp,
          profit: profitUp,
          speed: shine.speed
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
          <Typography>{formatNumberAb(shine.lvl, 2, true)}</Typography>
        </Box>
      </Box>
      {/* how much each component makes */}
      <Typography className="profit">
        {formatNumberAb(shine.profit, 2)}
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
          <span>${formatNumberAb(shine.cost * currentMultiplier, 2)}</span>
        </Button>
      </Box>
    </ProductBox>
  );
}

export default Shine;
