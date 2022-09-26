import React, { useEffect } from "react";
import { Box, Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_SOAP,
  SET_WATER,
  UPDATE_CURRENT_MULTIPLIER,
} from "../../utils/actions";
import SellIcon from "@mui/icons-material/Sell";
import Soap from "../Products/Soap";
import Water from "../Products/Water";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import LockedLvl from "../LockedLvl";

function Upgrades() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { data: userData } = useQuery(QUERY_ME);
  const { currentMultiplier, soap } = state;

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
          },
        });
        dispatch({
          type: SET_SOAP,
          soap: {
            lvl: userData.me.soap.lvl,
            cost: userData.me.soap.cost,
            profit: userData.me.soap.profit,
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
      <Water />
      {soap.lvl === 0 ? <LockedLvl cost="1000" lvl="soap" /> : <Soap />}
    </Box>
  );
}

export default Upgrades;
