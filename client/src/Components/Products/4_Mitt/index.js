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
import { CURRENT_CASH, SET_MITT } from "../../../utils/actions";
import SoapIcon from "@mui/icons-material/Soap";
import { useMutation } from "@apollo/client";
import { UPDATE_MITT, UPDATE_WALLET } from "../../../utils/mutations";
import Auth from "../../../utils/auth";
import useFitText from "use-fit-text";
import config from "../config.json";

function Mitt() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [updateWallet] = useMutation(UPDATE_WALLET);
  const [updateMitt] = useMutation(UPDATE_MITT);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { mitt, cash, sfx, currentMultiplier } = state;
  const { fontSize, ref } = useFitText();

  useEffect(() => {
    if (mitt.manager) {
      setRunning(true);
    }
  }, [mitt.manager]);

  useEffect(() => {
    if (progress === 100) {
      dispatch({
        type: CURRENT_CASH,
        cash: cash + mitt.profit,
      });
      if (Auth.loggedIn()) {
        try {
          updateWallet({
            variables: {
              cash: cash + mitt.profit,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [progress]);

  useEffect(() => {
    if (cash < mitt.cost * currentMultiplier) {
      setDisabled(true);
    } else if (cash >= mitt.cost * currentMultiplier) {
      setDisabled(false);
    }
  }, [cash, currentMultiplier, mitt]);

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            if (!mitt.manager) setRunning(false);
            return 0;
          }
          return Math.min(oldProgress + mitt.speed, 100);
        });
      }, 100);

      return () => {
        clearInterval(timer);
      };
    }
  }, [running, mitt.manager, mitt.speed]);

  const buyProduct = async () => {
    let lvlUp = mitt.lvl + currentMultiplier;
    let costUp = mitt.cost * 1.06;
    let profitUp =
      mitt.profit + 42.1 * currentMultiplier;
    let speedUp = 0;

    if (mitt.lvl < 99) {
      speedUp = mitt.speed;
    } else if (mitt.lvl >= 99) {
      speedUp = mitt.speed + 23;
    } else if (mitt.lvl >= 199) {
      speedUp = mitt.speed + 23;
    } else if (mitt.lvl >= 299) {
      speedUp = mitt.speed + 23;
    } else if (mitt.lvl >= 399) {
      speedUp = mitt.speed + 23;
    }

    PlayBtnClick(sfx);
    dispatch({
      type: CURRENT_CASH,
      cash: cash - mitt.cost * currentMultiplier,
    });
    dispatch({
      type: SET_MITT,
      mitt: {
        lvl: lvlUp,
        cost: parseFloat(costUp.toFixed(2)),
        profit: parseFloat(profitUp.toFixed(2)),
        speed: speedUp,
        manager: mitt.manager,
      },
    });
    try {
      await updateWallet({
        variables: {
          cash: cash - mitt.cost * currentMultiplier,
        },
      });
      await updateMitt({
        variables: {
          lvl: lvlUp,
          cost: parseFloat(costUp.toFixed(2)),
          profit: parseFloat(profitUp.toFixed(2)),
          speed: speedUp,
          manager: mitt.manager,
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
          <Typography>{formatNumberAb(mitt.lvl, 2, true)}</Typography>
        </Box>
      </Box>
      {/* how much each component makes */}
      <Typography className="profit">
        {formatNumberAb(mitt.profit, 2)}
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
          <span>${formatNumberAb(mitt.cost * currentMultiplier, 2)}</span>
        </Button>
      </Box>
    </ProductBox>
  );
}

export default Mitt;
