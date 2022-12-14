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
import { CURRENT_CASH, SET_DRY } from "../../../utils/actions";
import SoapIcon from "@mui/icons-material/Soap";
import { useMutation } from "@apollo/client";
import { UPDATE_DRY, UPDATE_WALLET } from "../../../utils/mutations";
import Auth from "../../../utils/auth";
import useFitText from "use-fit-text";
import config from "../config.json";

function Dry() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [updateWallet] = useMutation(UPDATE_WALLET);
  const [updateDry] = useMutation(UPDATE_DRY);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { dry, cash, sfx, currentMultiplier } = state;
  const { fontSize, ref } = useFitText();

  useEffect(() => {
    if (dry.manager) {
      setRunning(true);
    }
  }, [dry.manager]);

  useEffect(() => {
    if (progress === 100) {
      dispatch({
        type: CURRENT_CASH,
        cash: cash + dry.profit,
      });
      if (Auth.loggedIn()) {
        try {
          updateWallet({
            variables: {
              cash: cash + dry.profit,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [progress]);

  useEffect(() => {
    if (cash < dry.cost * currentMultiplier) {
      setDisabled(true);
    } else if (cash >= dry.cost * currentMultiplier) {
      setDisabled(false);
    }
  }, [cash, currentMultiplier, dry]);

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            if (!dry.manager) setRunning(false);
            return 0;
          }
          return Math.min(oldProgress + dry.speed, 100);
        });
      }, 100);

      return () => {
        clearInterval(timer);
      };
    }
  }, [running, dry.speed, dry.manager]);

  const buyProduct = async () => {
    let lvlUp = dry.lvl + currentMultiplier;
    let costUp = dry.cost * 1.08;
    let profitUp = dry.profit + 81.2 * currentMultiplier;
    let speedUp = 0;

    if (dry.lvl < 99) {
      speedUp = dry.speed;
    } else if (dry.lvl >= 99) {
      speedUp = dry.speed + 24;
    } else if (dry.lvl >= 199) {
      speedUp = dry.speed + 24;
    } else if (dry.lvl >= 299) {
      speedUp = dry.speed + 24;
    } else if (dry.lvl >= 399) {
      speedUp = dry.speed + 24;
    }

    PlayBtnClick(sfx);
    dispatch({
      type: CURRENT_CASH,
      cash: cash - dry.cost * currentMultiplier,
    });
    dispatch({
      type: SET_DRY,
      dry: {
        lvl: lvlUp,
        cost: parseFloat(costUp.toFixed(2)),
        profit: profitUp,
        speed: speedUp,
        manager: dry.manager,
      },
    });
    try {
      await updateWallet({
        variables: {
          cash: cash - dry.cost * currentMultiplier,
        },
      });
      await updateDry({
        variables: {
          lvl: lvlUp,
          cost: parseFloat(costUp.toFixed(2)),
          profit: profitUp,
          speed: speedUp,
          manager: dry.manager,
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
          <Typography>{formatNumberAb(dry.lvl, 2, true)}</Typography>
        </Box>
      </Box>
      {/* how much each component makes */}
      <Typography className="profit">
        {formatNumberAb(dry.profit, 2)}
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
          <span>${formatNumberAb(dry.cost * currentMultiplier, 2)}</span>
        </Button>
      </Box>
    </ProductBox>
  );
}

export default Dry;
