import React, { useEffect } from "react";
import { Box, Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_WHEEL,
  SET_WATER,
  UPDATE_CURRENT_MULTIPLIER,
  SET_FOAM,
} from "../../utils/actions";
import SellIcon from "@mui/icons-material/Sell";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import LockedLvl from "../LockedLvl";

import Water from "../Products/PressureWasher";
import Wheel from "../Products/Wheel";
import Foam from "../Products/Foam";

function Upgrades() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { data: userData } = useQuery(QUERY_ME);
  const { currentMultiplier, wheel, foam } = state;

  const handleMultiChange = () => {
    let multiplier;

    if (currentMultiplier === 1) {
      multiplier = 2;
    } else if (currentMultiplier === 2) {
      multiplier = 10;
    } else if (currentMultiplier === 10) {
      multiplier = 100;
    } else if (currentMultiplier === 100) {
      multiplier = 1;
    }

    dispatch({
      type: UPDATE_CURRENT_MULTIPLIER,
      currentMultiplier: multiplier,
    });
  };

  useEffect(() => {
    if (Auth.loggedIn()) {
      if (userData) {
        dispatch({
          type: SET_WATER,
          water: {
            lvl: userData.me.water.lvl,
            cost: userData.me.water.cost,
            profit: userData.me.water.profit,
            speed: userData.me.water.speed,
          },
        });
        dispatch({
          type: SET_WHEEL,
          wheel: {
            lvl: userData.me.wheel.lvl,
            cost: userData.me.wheel.cost,
            profit: userData.me.wheel.profit,
            speed: userData.me.wheel.speed,
          },
        });
        dispatch({
          type: SET_FOAM,
          foam: {
            lvl: userData.me.foam.lvl,
            cost: userData.me.foam.cost,
            profit: userData.me.foam.profit,
            speed: userData.me.foam.speed,
          },
        });
      }
    }
  }, [userData, dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        overflowY: "scroll",
        height: "100vh",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}>
      {/* Buy multiplier */}
      <Chip
        icon={<SellIcon />}
        label={`x${currentMultiplier}`}
        onClick={handleMultiChange}
        sx={{
          width: "fit-content",
          margin: "5px",
          float: "right",
        }}></Chip>

      {/* Pressure Washer */}
      <Water />

      {/* Wheel Cleaner */}
      {wheel.lvl === 0 ? (
        <LockedLvl cost="1000" lvl="wheel cleaner" />
      ) : (
        <Wheel />
      )}

      {/* Foam Cannon */}
      {foam.lvl === 0 ? <LockedLvl cost="15000" lvl="foam cannon" /> : <Foam />}

      {/* Wash Mitt */}
      {/* Drying Towel */}
      {/* Vacuum */}
      {/* Carpet Cleaner */}
      {/* Spot Cleaner */}
      {/* Steamer */}
      {/* Clay */}
      {/* Paint Sealant */}
      {/* Window Cleaner */}
      {/* Waffle Weave Towel */}
      {/* Tire Shine */}
    </Box>
  );
}

export default Upgrades;
