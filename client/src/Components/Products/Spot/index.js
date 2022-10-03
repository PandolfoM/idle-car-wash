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
import { CURRENT_CASH, SET_SPOT } from "../../../utils/actions";
import SoapIcon from "@mui/icons-material/Soap";
import { useMutation } from "@apollo/client";
import { UPDATE_SPOT, UPDATE_WALLET } from "../../../utils/mutations";
import Auth from "../../../utils/auth";
import useFitText from "use-fit-text";

function Spot() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [updateWallet] = useMutation(UPDATE_WALLET);
  const [updateSpot] = useMutation(UPDATE_SPOT);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { spot, cash, sfx, currentMultiplier } = state;
  const { fontSize, ref } = useFitText();

  useEffect(() => {
    if (progress === 100) {
      dispatch({
        type: CURRENT_CASH,
        cash: cash + spot.profit,
      });
      if (Auth.loggedIn()) {
        try {
          updateWallet({
            variables: {
              cash: cash + spot.profit,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [progress]);

  useEffect(() => {
    if (cash < spot.cost * currentMultiplier) {
      setDisabled(true);
    } else if (cash >= spot.cost * currentMultiplier) {
      setDisabled(false);
    }
  }, [cash, currentMultiplier, spot]);

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            setRunning(false);
            return 0;
          }
          return Math.min(oldProgress + spot.speed, 100);
        });
      }, 100);

      return () => {
        clearInterval(timer);
      };
    }
  }, [running]);

  const buyProduct = async () => {
    let lvlUp = spot.lvl + currentMultiplier;
    let costUp = spot.cost * 1.12;
    let profitUp = spot.profit * 1.3 + currentMultiplier;
    PlayBtnClick(sfx);
    dispatch({
      type: CURRENT_CASH,
      cash: cash - spot.cost * currentMultiplier,
    });
    dispatch({
      type: SET_SPOT,
      spot: {
        lvl: lvlUp,
        cost: costUp,
        profit: profitUp,
        speed: spot.speed
      },
    });
    try {
      await updateWallet({
        variables: {
          cash: cash - spot.cost * currentMultiplier,
        },
      });
      await updateSpot({
        variables: {
          lvl: lvlUp,
          cost: costUp,
          profit: profitUp,
          speed: spot.speed
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductBox>
      <Box className="itemPic">
        {/* icon */}
        <IconButton size="large" disableRipple onClick={() => setRunning(true)}>
          <SoapIcon sx={{ width: "2em", height: "2em" }} />
        </IconButton>
        {/* level of component */}
        <Box className="itemLvl">
          <Typography>{formatNumberAb(spot.lvl, 2, true)}</Typography>
        </Box>
      </Box>
      {/* how much each component makes */}
      <Typography className="profit">
        {formatNumberAb(spot.profit, 2)}
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
          <span>${formatNumberAb(spot.cost * currentMultiplier, 2)}</span>
        </Button>
      </Box>
    </ProductBox>
  );
}

export default Spot;
