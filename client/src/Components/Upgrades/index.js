import React, { useEffect } from "react";
import { Box, Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_WHEEL,
  SET_WATER,
  UPDATE_CURRENT_MULTIPLIER,
  SET_FOAM,
  SET_MITT,
  SET_SPRAY,
  SET_DRY,
  SET_VAC,
  SET_CARPET,
  SET_SPOT,
  SET_STEAMER,
  SET_CLAY,
  SET_SEALANT,
  SET_WINDOW,
  SET_WAFFLE,
  SET_SHINE,
} from "../../utils/actions";
import SellIcon from "@mui/icons-material/Sell";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import LockedLvl from "../LockedLvl";

import Water from "../Products/PressureWasher";
import Wheel from "../Products/Wheel";
import Foam from "../Products/Foam";
import Mitt from "../Products/Mitt";
import Spray from "../Products/Spray";
import Dry from "../Products/Dry";
import Vac from "../Products/Vac";
import Carpet from "../Products/Carpet";
import Spot from "../Products/Spot";
import Steamer from "../Products/Steamer";
import Clay from "../Products/Clay";
import Sealant from "../Products/Sealant";
import Window from "../Products/Window";
import Waffle from "../Products/Waffle";
import Shine from "../Products/Shine";

function Upgrades() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { data: userData } = useQuery(QUERY_ME);
  const {
    currentMultiplier,
    wheel,
    foam,
    mitt,
    spray,
    dry,
    vac,
    carpet,
    spot,
    steamer,
    clay,
    sealant,
    window,
    waffle,
    shine,
  } = state;

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
        dispatch({
          type: SET_MITT,
          mitt: {
            lvl: userData.me.mitt.lvl,
            cost: userData.me.mitt.cost,
            profit: userData.me.mitt.profit,
            speed: userData.me.mitt.speed,
          },
        });
        dispatch({
          type: SET_SPRAY,
          spray: {
            lvl: userData.me.spray.lvl,
            cost: userData.me.spray.cost,
            profit: userData.me.spray.profit,
            speed: userData.me.spray.speed,
          },
        });
        dispatch({
          type: SET_DRY,
          dry: {
            lvl: userData.me.dry.lvl,
            cost: userData.me.dry.cost,
            profit: userData.me.dry.profit,
            speed: userData.me.dry.speed,
          },
        });
        dispatch({
          type: SET_VAC,
          vac: {
            lvl: userData.me.vac.lvl,
            cost: userData.me.vac.cost,
            profit: userData.me.vac.profit,
            speed: userData.me.vac.speed,
          },
        });
        dispatch({
          type: SET_CARPET,
          carpet: {
            lvl: userData.me.carpet.lvl,
            cost: userData.me.carpet.cost,
            profit: userData.me.carpet.profit,
            speed: userData.me.carpet.speed,
          },
        });
        dispatch({
          type: SET_SPOT,
          spot: {
            lvl: userData.me.spot.lvl,
            cost: userData.me.spot.cost,
            profit: userData.me.spot.profit,
            speed: userData.me.spot.speed,
          },
        });
        dispatch({
          type: SET_STEAMER,
          steamer: {
            lvl: userData.me.steamer.lvl,
            cost: userData.me.steamer.cost,
            profit: userData.me.steamer.profit,
            speed: userData.me.steamer.speed,
          },
        });
        dispatch({
          type: SET_CLAY,
          clay: {
            lvl: userData.me.clay.lvl,
            cost: userData.me.clay.cost,
            profit: userData.me.clay.profit,
            speed: userData.me.clay.speed,
          },
        });
        dispatch({
          type: SET_SEALANT,
          sealant: {
            lvl: userData.me.sealant.lvl,
            cost: userData.me.sealant.cost,
            profit: userData.me.sealant.profit,
            speed: userData.me.sealant.speed,
          },
        });
        dispatch({
          type: SET_WINDOW,
          window: {
            lvl: userData.me.window.lvl,
            cost: userData.me.window.cost,
            profit: userData.me.window.profit,
            speed: userData.me.window.speed,
          },
        });
        dispatch({
          type: SET_WAFFLE,
          waffle: {
            lvl: userData.me.waffle.lvl,
            cost: userData.me.waffle.cost,
            profit: userData.me.waffle.profit,
            speed: userData.me.waffle.speed,
          },
        });
        dispatch({
          type: SET_SHINE,
          shine: {
            lvl: userData.me.shine.lvl,
            cost: userData.me.shine.cost,
            profit: userData.me.shine.profit,
            speed: userData.me.shine.speed,
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
      }}>
      {/* Buy multiplier */}
      <Chip
        icon={<SellIcon />}
        label={`x${currentMultiplier}`}
        onClick={handleMultiChange}
        sx={{
          margin: "5px",
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
      {foam.lvl === 0 ? <LockedLvl cost="15000" lvl="foam cannon"/> : <Foam />}

      {/* Wash Mitt */}
      {mitt.lvl === 0 ? <LockedLvl cost="35000" lvl="wash mitt" /> : <Mitt />}

      {/* Detail Spray */}
      {spray.lvl === 0 ? (
        <LockedLvl cost="60000" lvl="detail spray" />
      ) : (
        <Spray />
      )}

      {/* Drying Towel */}
      {dry.lvl === 0 ? <LockedLvl cost="95000" lvl="drying towel" /> : <Dry />}

      {/* Vacuum */}
      {vac.lvl === 0 ? <LockedLvl cost="150000" lvl="vacuum" /> : <Vac />}

      {/* Carpet Cleaner */}
      {carpet.lvl === 0 ? (
        <LockedLvl cost="230000" lvl="carpet cleaner" />
      ) : (
        <Carpet />
      )}

      {/* Spot Cleaner */}
      {spot.lvl === 0 ? (
        <LockedLvl cost="300000" lvl="spot cleaner" />
      ) : (
        <Spot />
      )}

      {/* Steamer */}
      {steamer.lvl === 0 ? (
        <LockedLvl cost="375000" lvl="steamer" />
      ) : (
        <Steamer />
      )}

      {/* Clay Bar */}
      {clay.lvl === 0 ? <LockedLvl cost="375000" lvl="clay bar" /> : <Clay />}

      {/* Paint Sealant */}
      {sealant.lvl === 0 ? (
        <LockedLvl cost="500000" lvl="paint sealant" />
      ) : (
        <Sealant />
      )}

      {/* Window Cleaner */}
      {window.lvl === 0 ? (
        <LockedLvl cost="700000" lvl="window cleaner" />
      ) : (
        <Window />
      )}

      {/* Waffle Weave Towel */}
      {waffle.lvl === 0 ? (
        <LockedLvl cost="900000" lvl="waffle weave towel" />
      ) : (
        <Waffle />
      )}

      {/* Tire Shine */}
      {shine.lvl === 0 ? (
        <LockedLvl cost="1000000" lvl="tire shine" />
      ) : (
        <Shine />
      )}
    </Box>
  );
}

export default Upgrades;
