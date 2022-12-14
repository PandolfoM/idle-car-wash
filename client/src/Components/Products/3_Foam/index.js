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
import { CURRENT_CASH, SET_FOAM } from "../../../utils/actions";
import SoapIcon from "@mui/icons-material/Soap";
import { useMutation } from "@apollo/client";
import { UPDATE_FOAM, UPDATE_WALLET } from "../../../utils/mutations";
import Auth from "../../../utils/auth";
import useFitText from "use-fit-text";

function Foam() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [updateWallet] = useMutation(UPDATE_WALLET);
  const [updateFoam] = useMutation(UPDATE_FOAM);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { foam, cash, sfx, currentMultiplier } = state;
  const { fontSize, ref } = useFitText();

  useEffect(() => {
    if (foam.manager) {
      setRunning(true);
    }
  }, [foam.manager]);

  useEffect(() => {
    if (progress === 100) {
      dispatch({
        type: CURRENT_CASH,
        cash: cash + foam.profit,
      });
      if (Auth.loggedIn()) {
        try {
          updateWallet({
            variables: {
              cash: cash + foam.profit,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [progress]);

  useEffect(() => {
    if (cash < foam.cost * currentMultiplier) {
      setDisabled(true);
    } else if (cash >= foam.cost * currentMultiplier) {
      setDisabled(false);
    }
  }, [cash, currentMultiplier, foam]);

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            if (!foam.manager) setRunning(false);
            return 0;
          }
          return Math.min(oldProgress + foam.speed, 100);
        });
      }, 100);

      return () => {
        clearInterval(timer);
      };
    }
  }, [running, foam.manager, foam.speed]);

  const buyProduct = async () => {
    let lvlUp = foam.lvl + currentMultiplier;
    let costUp = foam.cost * 1.05;
    let profitUp =
      foam.profit + 24 * currentMultiplier;
    let speedUp = 0;

    if (foam.lvl < 99) {
      speedUp = foam.speed;
    } else if (foam.lvl >= 99) {
      speedUp = foam.speed + 22.5;
    } else if (foam.lvl >= 199) {
      speedUp = foam.speed + 22.5;
    } else if (foam.lvl >= 299) {
      speedUp = foam.speed + 22.5;
    } else if (foam.lvl >= 399) {
      speedUp = foam.speed + 22.5;
    }

    PlayBtnClick(sfx);
    dispatch({
      type: CURRENT_CASH,
      cash: cash - foam.cost * currentMultiplier,
    });
    dispatch({
      type: SET_FOAM,
      foam: {
        lvl: lvlUp,
        cost: parseFloat(costUp.toFixed(2)),
        profit: parseFloat(profitUp.toFixed(2)),
        speed: speedUp,
        manager: foam.manager,
      },
    });
    try {
      await updateWallet({
        variables: {
          cash: cash - foam.cost * currentMultiplier,
        },
      });
      await updateFoam({
        variables: {
          lvl: lvlUp,
          cost: parseFloat(costUp.toFixed(2)),
          profit: parseFloat(profitUp.toFixed(2)),
          speed: speedUp,
          manager: foam.manager,
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
          <Typography>{formatNumberAb(foam.lvl, 2, true)}</Typography>
        </Box>
      </Box>
      {/* how much each component makes */}
      <Typography className="profit">
        {formatNumberAb(foam.profit, 2)}
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
          <span>${formatNumberAb(foam.cost * currentMultiplier, 2)}</span>
        </Button>
      </Box>
    </ProductBox>
  );
}

export default Foam;
