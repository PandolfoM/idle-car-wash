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
import { CURRENT_CASH, SET_CARPET } from "../../../utils/actions";
import SoapIcon from "@mui/icons-material/Soap";
import { useMutation } from "@apollo/client";
import { UPDATE_CARPET, UPDATE_WALLET } from "../../../utils/mutations";
import Auth from "../../../utils/auth";
import useFitText from "use-fit-text";
import config from "../config.json";

function Carpet() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [updateWallet] = useMutation(UPDATE_WALLET);
  const [updateCarpet] = useMutation(UPDATE_CARPET);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { carpet, cash, sfx, currentMultiplier } = state;
  const { fontSize, ref } = useFitText();

  useEffect(() => {
    if (carpet.manager) {
      setRunning(true);
    }
  }, [carpet.manager]);

  useEffect(() => {
    if (progress === 100) {
      dispatch({
        type: CURRENT_CASH,
        cash: cash + carpet.profit,
      });
      if (Auth.loggedIn()) {
        try {
          updateWallet({
            variables: {
              cash: cash + carpet.profit,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [progress]);

  useEffect(() => {
    if (cash < carpet.cost * currentMultiplier) {
      setDisabled(true);
    } else if (cash >= carpet.cost * currentMultiplier) {
      setDisabled(false);
    }
  }, [cash, currentMultiplier, carpet]);

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            if (!carpet.manager) setRunning(false);
            return 0;
          }
          return Math.min(oldProgress + carpet.speed, 100);
        });
      }, 100);

      return () => {
        clearInterval(timer);
      };
    }
  }, [running, carpet.speed, carpet.manager]);

  const buyProduct = async () => {
    let lvlUp = carpet.lvl + currentMultiplier;
    let costUp = carpet.cost + parseInt(config.carpet.cost);
    let profitUp =
      carpet.profit * parseInt(config.carpet.profit) + currentMultiplier;
    let speedUp = 0;

    if (carpet.lvl < 99) {
      speedUp = carpet.speed;
    } else if (carpet.lvl >= 99) {
      speedUp = carpet.speed + 24.25;
    } else if (carpet.lvl >= 199) {
      speedUp = carpet.speed + 24.25;
    } else if (carpet.lvl >= 299) {
      speedUp = carpet.speed + 24.25;
    } else if (carpet.lvl >= 399) {
      speedUp = carpet.speed + 24.25;
    }

    PlayBtnClick(sfx);
    dispatch({
      type: CURRENT_CASH,
      cash: cash - carpet.cost * currentMultiplier,
    });
    dispatch({
      type: SET_CARPET,
      carpet: {
        lvl: lvlUp,
        cost: parseFloat(costUp.toFixed(2)),
        profit: profitUp,
        speed: speedUp,
        manager: carpet.manager,
      },
    });
    try {
      await updateWallet({
        variables: {
          cash: cash - carpet.cost * currentMultiplier,
        },
      });
      await updateCarpet({
        variables: {
          lvl: lvlUp,
          cost: parseFloat(costUp.toFixed(2)),
          profit: profitUp,
          speed: speedUp,
          manager: carpet.manager,
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
          <Typography>{formatNumberAb(carpet.lvl, 2, true)}</Typography>
        </Box>
      </Box>
      {/* how much each component makes */}
      <Typography className="profit">
        {formatNumberAb(carpet.profit, 2)}
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
          <span>${formatNumberAb(carpet.cost * currentMultiplier, 2)}</span>
        </Button>
      </Box>
    </ProductBox>
  );
}

export default Carpet;
