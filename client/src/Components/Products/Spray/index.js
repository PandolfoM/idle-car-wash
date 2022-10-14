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
import { CURRENT_CASH, SET_SPRAY } from "../../../utils/actions";
import SoapIcon from "@mui/icons-material/Soap";
import { useMutation } from "@apollo/client";
import { UPDATE_SPRAY, UPDATE_WALLET } from "../../../utils/mutations";
import Auth from "../../../utils/auth";
import useFitText from "use-fit-text";
import config from "../config.json";

function Spray() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [updateWallet] = useMutation(UPDATE_WALLET);
  const [updateSpray] = useMutation(UPDATE_SPRAY);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { spray, cash, sfx, currentMultiplier } = state;
  const { fontSize, ref } = useFitText();

  useEffect(() => {
    if (spray.manager) {
      setRunning(true);
    }
  }, [spray.manager]);

  useEffect(() => {
    if (progress === 100) {
      dispatch({
        type: CURRENT_CASH,
        cash: cash + spray.profit,
      });
      if (Auth.loggedIn()) {
        try {
          updateWallet({
            variables: {
              cash: cash + spray.profit,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [progress]);

  useEffect(() => {
    if (cash < spray.cost * currentMultiplier) {
      setDisabled(true);
    } else if (cash >= spray.cost * currentMultiplier) {
      setDisabled(false);
    }
  }, [cash, currentMultiplier, spray]);

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            if (!spray.manager) setRunning(false);
            return 0;
          }
          return Math.min(oldProgress + spray.speed, 100);
        });
      }, 100);

      return () => {
        clearInterval(timer);
      };
    }
  }, [running, spray.speed, spray.manager]);

  const buyProduct = async () => {
    let lvlUp = spray.lvl + currentMultiplier;
    let costUp = spray.cost + parseInt(config.spray.cost);
    let profitUp =
      spray.profit * parseInt(config.spray.profit) + currentMultiplier;
    let speedUp = 0;

    if (spray.lvl < 99) {
      speedUp = spray.speed;
    } else if (spray.lvl >= 99) {
      speedUp = spray.speed + 24;
    } else if (spray.lvl >= 199) {
      speedUp = spray.speed + 24;
    } else if (spray.lvl >= 299) {
      speedUp = spray.speed + 24;
    } else if (spray.lvl >= 399) {
      speedUp = spray.speed + 24;
    }

    PlayBtnClick(sfx);
    dispatch({
      type: CURRENT_CASH,
      cash: cash - spray.cost * currentMultiplier,
    });
    dispatch({
      type: SET_SPRAY,
      spray: {
        lvl: lvlUp,
        cost: parseFloat(costUp.toFixed(2)),
        profit: profitUp,
        speed: speedUp,
        manager: spray.manager,
      },
    });
    try {
      await updateWallet({
        variables: {
          cash: cash - spray.cost * currentMultiplier,
        },
      });
      await updateSpray({
        variables: {
          lvl: lvlUp,
          cost: parseFloat(costUp.toFixed(2)),
          profit: profitUp,
          speed: speedUp,
          manager: spray.manager,
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
          <Typography>{formatNumberAb(spray.lvl, 2, true)}</Typography>
        </Box>
      </Box>
      {/* how much each component makes */}
      <Typography className="profit">
        {formatNumberAb(spray.profit, 2)}
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
          <span>${formatNumberAb(spray.cost * currentMultiplier, 2)}</span>
        </Button>
      </Box>
    </ProductBox>
  );
}

export default Spray;
