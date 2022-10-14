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
import { CURRENT_CASH, SET_WAFFLE } from "../../../utils/actions";
import SoapIcon from "@mui/icons-material/Soap";
import { useMutation } from "@apollo/client";
import { UPDATE_WAFFLE, UPDATE_WALLET } from "../../../utils/mutations";
import Auth from "../../../utils/auth";
import useFitText from "use-fit-text";
import config from "../config.json";

function Waffle() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [updateWallet] = useMutation(UPDATE_WALLET);
  const [updateWaffle] = useMutation(UPDATE_WAFFLE);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { waffle, cash, sfx, currentMultiplier } = state;
  const { fontSize, ref } = useFitText();

  useEffect(() => {
    if (waffle.manager) {
      setRunning(true);
    }
  }, [waffle.manager]);

  useEffect(() => {
    if (progress === 100) {
      dispatch({
        type: CURRENT_CASH,
        cash: cash + waffle.profit,
      });
      if (Auth.loggedIn()) {
        try {
          updateWallet({
            variables: {
              cash: cash + waffle.profit,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [progress]);

  useEffect(() => {
    if (cash < waffle.cost * currentMultiplier) {
      setDisabled(true);
    } else if (cash >= waffle.cost * currentMultiplier) {
      setDisabled(false);
    }
  }, [cash, currentMultiplier, waffle]);

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            if (!waffle.manager) setRunning(false);
            return 0;
          }
          return Math.min(oldProgress + waffle.speed, 100);
        });
      }, 100);

      return () => {
        clearInterval(timer);
      };
    }
  }, [running, waffle.speed, waffle.manager]);

  const buyProduct = async () => {
    let lvlUp = waffle.lvl + currentMultiplier;
    let costUp = waffle.cost + parseInt(config.waffle.cost);
    let profitUp =
      waffle.profit * parseInt(config.waffle.profit) + currentMultiplier;
    let speedUp = 0;

    if (waffle.lvl < 99) {
      speedUp = waffle.speed;
    } else if (waffle.lvl >= 99) {
      speedUp = waffle.speed + 24.975;
    } else if (waffle.lvl >= 199) {
      speedUp = waffle.speed + 24.975;
    } else if (waffle.lvl >= 299) {
      speedUp = waffle.speed + 24.975;
    } else if (waffle.lvl >= 399) {
      speedUp = waffle.speed + 24.975;
    }

    PlayBtnClick(sfx);
    dispatch({
      type: CURRENT_CASH,
      cash: cash - waffle.cost * currentMultiplier,
    });
    dispatch({
      type: SET_WAFFLE,
      waffle: {
        lvl: lvlUp,
        cost: parseFloat(costUp.toFixed(2)),
        profit: profitUp,
        speed: speedUp,
        manager: waffle.manager,
      },
    });
    try {
      await updateWallet({
        variables: {
          cash: cash - waffle.cost * currentMultiplier,
        },
      });
      await updateWaffle({
        variables: {
          lvl: lvlUp,
          cost: parseFloat(costUp.toFixed(2)),
          profit: profitUp,
          speed: speedUp,
          manager: waffle.manager,
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
          <Typography>{formatNumberAb(waffle.lvl, 2, true)}</Typography>
        </Box>
      </Box>
      {/* how much each component makes */}
      <Typography className="profit">
        {formatNumberAb(waffle.profit, 2)}
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
          <span>${formatNumberAb(waffle.cost * currentMultiplier, 2)}</span>
        </Button>
      </Box>
    </ProductBox>
  );
}

export default Waffle;
