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
import { CURRENT_CASH, SET_STEAMER } from "../../../utils/actions";
import SoapIcon from "@mui/icons-material/Soap";
import { useMutation } from "@apollo/client";
import { UPDATE_STEAMER, UPDATE_WALLET } from "../../../utils/mutations";
import Auth from "../../../utils/auth";
import useFitText from "use-fit-text";
import config from "../config.json";

function Steamer() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [updateWallet] = useMutation(UPDATE_WALLET);
  const [updateSteamer] = useMutation(UPDATE_STEAMER);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { steamer, cash, sfx, currentMultiplier } = state;
  const { fontSize, ref } = useFitText();

  useEffect(() => {
    if (steamer.manager) {
      setRunning(true);
    }
  }, [steamer.manager]);

  useEffect(() => {
    if (progress === 100) {
      dispatch({
        type: CURRENT_CASH,
        cash: cash + steamer.profit,
      });
      if (Auth.loggedIn()) {
        try {
          updateWallet({
            variables: {
              cash: cash + steamer.profit,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [progress]);

  useEffect(() => {
    if (cash < steamer.cost * currentMultiplier) {
      setDisabled(true);
    } else if (cash >= steamer.cost * currentMultiplier) {
      setDisabled(false);
    }
  }, [cash, currentMultiplier, steamer]);

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            if (!steamer.manager) setRunning(false);
            return 0;
          }
          return Math.min(oldProgress + steamer.speed, 100);
        });
      }, 100);

      return () => {
        clearInterval(timer);
      };
    }
  }, [running, steamer.speed, steamer.manager]);

  const buyProduct = async () => {
    let lvlUp = steamer.lvl + currentMultiplier;
    let costUp = steamer.cost * 1.12;
    let profitUp =
      steamer.profit + 162.13 * currentMultiplier;
    let speedUp = 0;

    if (steamer.lvl < 99) {
      speedUp = steamer.speed;
    } else if (steamer.lvl >= 99) {
      speedUp = steamer.speed + 24.5;
    } else if (steamer.lvl >= 199) {
      speedUp = steamer.speed + 24.5;
    } else if (steamer.lvl >= 299) {
      speedUp = steamer.speed + 24.5;
    } else if (steamer.lvl >= 399) {
      speedUp = steamer.speed + 24.5;
    }

    PlayBtnClick(sfx);
    dispatch({
      type: CURRENT_CASH,
      cash: cash - steamer.cost * currentMultiplier,
    });
    dispatch({
      type: SET_STEAMER,
      steamer: {
        lvl: lvlUp,
        cost: parseFloat(costUp.toFixed(2)),
        profit: profitUp,
        speed: speedUp,
        manager: steamer.manager,
      },
    });
    try {
      await updateWallet({
        variables: {
          cash: cash - steamer.cost * currentMultiplier,
        },
      });
      await updateSteamer({
        variables: {
          lvl: lvlUp,
          cost: parseFloat(costUp.toFixed(2)),
          profit: profitUp,
          speed: speedUp,
          manager: steamer.manager,
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
          <Typography>{formatNumberAb(steamer.lvl, 2, true)}</Typography>
        </Box>
      </Box>
      {/* how much each component makes */}
      <Typography className="profit">
        {formatNumberAb(steamer.profit, 2)}
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
          <span>${formatNumberAb(steamer.cost * currentMultiplier, 2)}</span>
        </Button>
      </Box>
    </ProductBox>
  );
}

export default Steamer;
