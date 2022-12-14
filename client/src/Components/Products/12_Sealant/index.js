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
import { CURRENT_CASH, SET_SEALANT } from "../../../utils/actions";
import SoapIcon from "@mui/icons-material/Soap";
import { useMutation } from "@apollo/client";
import { UPDATE_SEALANT, UPDATE_WALLET } from "../../../utils/mutations";
import Auth from "../../../utils/auth";
import useFitText from "use-fit-text";
import config from "../config.json";

function Sealant() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [updateWallet] = useMutation(UPDATE_WALLET);
  const [updateSealant] = useMutation(UPDATE_SEALANT);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { sealant, cash, sfx, currentMultiplier } = state;
  const { fontSize, ref } = useFitText();

  useEffect(() => {
    if (sealant.manager) {
      setRunning(true);
    }
  }, [sealant.manager]);

  useEffect(() => {
    if (progress === 100) {
      dispatch({
        type: CURRENT_CASH,
        cash: cash + sealant.profit,
      });
      if (Auth.loggedIn()) {
        try {
          updateWallet({
            variables: {
              cash: cash + sealant.profit,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [progress]);

  useEffect(() => {
    if (cash < sealant.cost * currentMultiplier) {
      setDisabled(true);
    } else if (cash >= sealant.cost * currentMultiplier) {
      setDisabled(false);
    }
  }, [cash, currentMultiplier, sealant]);

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            if (!sealant.manager) setRunning(false);
            return 0;
          }
          return Math.min(oldProgress + sealant.speed, 100);
        });
      }, 100);

      return () => {
        clearInterval(timer);
      };
    }
  }, [running, sealant.speed, sealant.manager]);

  const buyProduct = async () => {
    let lvlUp = sealant.lvl + currentMultiplier;
    let costUp = sealant.cost * 1.14;
    let profitUp =
      sealant.profit + 217.69 * currentMultiplier;
    let speedUp = 0;

    if (sealant.lvl < 99) {
      speedUp = sealant.speed;
    } else if (sealant.lvl >= 99) {
      speedUp = sealant.speed + 24.75;
    } else if (sealant.lvl >= 199) {
      speedUp = sealant.speed + 24.75;
    } else if (sealant.lvl >= 299) {
      speedUp = sealant.speed + 24.75;
    } else if (sealant.lvl >= 399) {
      speedUp = sealant.speed + 24.75;
    }

    PlayBtnClick(sfx);
    dispatch({
      type: CURRENT_CASH,
      cash: cash - sealant.cost * currentMultiplier,
    });
    dispatch({
      type: SET_SEALANT,
      sealant: {
        lvl: lvlUp,
        cost: parseFloat(costUp.toFixed(2)),
        profit: profitUp,
        speed: speedUp,
        manager: sealant.manager,
      },
    });
    try {
      await updateWallet({
        variables: {
          cash: cash - sealant.cost * currentMultiplier,
        },
      });
      await updateSealant({
        variables: {
          lvl: lvlUp,
          cost: parseFloat(costUp.toFixed(2)),
          profit: profitUp,
          speed: speedUp,
          manager: sealant.manager,
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
          <Typography>{formatNumberAb(sealant.lvl, 2, true)}</Typography>
        </Box>
      </Box>
      {/* how much each component makes */}
      <Typography className="profit">
        {formatNumberAb(sealant.profit, 2)}
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
          <span>${formatNumberAb(sealant.cost * currentMultiplier, 2)}</span>
        </Button>
      </Box>
    </ProductBox>
  );
}

export default Sealant;
