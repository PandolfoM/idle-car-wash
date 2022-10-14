import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_CARPET,
  SET_CLAY,
  SET_DRY,
  SET_FOAM,
  SET_MITT,
  SET_SEALANT,
  SET_SHINE,
  SET_SPOT,
  SET_SPRAY,
  SET_STEAMER,
  SET_VAC,
  SET_WAFFLE,
  SET_WATER,
  SET_WHEEL,
  SET_WINDOW,
  TOGGLE_MANAGERS,
} from "../../utils/actions";
import CloseBtn from "../CloseBtn";
import { UPDATE_CARPET, UPDATE_CLAY, UPDATE_DRY, UPDATE_FOAM, UPDATE_MITT, UPDATE_SEALANT, UPDATE_SHINE, UPDATE_SPOT, UPDATE_SPRAY, UPDATE_STEAMER, UPDATE_VAC, UPDATE_WAFFLE, UPDATE_WALLET, UPDATE_WATER, UPDATE_WHEEL, UPDATE_WINDOW } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";

const SettingsDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    backgroundColor: "#242b37",
    backgroundImage: "none",
    border: "#3C485E 2px solid",
    borderRadius: "15px",
    position: "relative",
    overflow: "visible !important",
    paddingBottom: "15px",
    maxHeight: "50vh",
    "& .MuiDialogTitle-root": {
      backgroundColor: "#1E242F",
      textAlign: "center",
      padding: "5px 0",
      fontSize: "15px",
      WebkitTextStroke: "2px black",
      borderRadius: " 15px 15px 0 0",
    },
    "& .MuiDialogContent-root": {
      padding: "20px 24px",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  },
}));

const BuyBtn = styled(Button)(({ theme }) => ({
  border: "black 4px solid",
  borderRadius: "15px",
  backgroundColor: "#89D973",
  color: "white",
  boxShadow: "0 -5px 0 0.5px rgba(0, 0, 0, 0.4) inset",
  textTransform: "none",
  fontSize: "15px",
  WebkitTextStroke: "2px black",
  "&:hover": {
    backgroundColor: "#89D973",
    boxShadow: "0 -5px 0 0.5px rgba(0, 0, 0, 0.4) inset",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
  "&.Mui-disabled": {
    backgroundColor: "#444",
  },
}));

const lvlArr = {
  Water: 1000,
  "Wheel Cleaner": 25000,
  "Foam Cannon": 25000,
  "Wash Mitt": 25000,
  "Detail Spray": 25000,
  "Drying Towel": 25000,
  Vacuum: 25000,
  "Carpet Cleaner": 25000,
  "Spot Cleaner": 25000,
  Steamer: 25000,
  "Clay Bar": 25000,
  "Paint Sealant": 25000,
  "Window Cleaner": 25000,
  "Waffle Weave Towel": 25000,
  "Tire Shine": 25000,
};

function Managers() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [updateWallet] = useMutation(UPDATE_WALLET);
  const [updateWater] = useMutation(UPDATE_WATER);
  const [updateWheel] = useMutation(UPDATE_WHEEL);
  const [updateFoam] = useMutation(UPDATE_FOAM);
  const [updateMitt] = useMutation(UPDATE_MITT);
  const [updateSpray] = useMutation(UPDATE_SPRAY);
  const [updateDry] = useMutation(UPDATE_DRY);
  const [updateVac] = useMutation(UPDATE_VAC);
  const [updateCarpet] = useMutation(UPDATE_CARPET);
  const [updateSpot] = useMutation(UPDATE_SPOT);
  const [updateSteamer] = useMutation(UPDATE_STEAMER);
  const [updateClay] = useMutation(UPDATE_CLAY);
  const [updateSealant] = useMutation(UPDATE_SEALANT);
  const [updateWindow] = useMutation(UPDATE_WINDOW);
  const [updateWaffle] = useMutation(UPDATE_WAFFLE);
  const [updateShine] = useMutation(UPDATE_SHINE);
  const {
    cash,
    water,
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

  const dispatchEvt = (type, item, manager) => {
    if (type === "water") {
      dispatch({
        type: SET_WATER,
        water: {
          lvl: item.lvl,
          cost: item.cost,
          profit: item.profit,
          speed: item.speed,
          manager: manager,
        },
      });
    } else if (type === "wheel") {
      dispatch({
        type: SET_WHEEL,
        wheel: {
          lvl: item.lvl,
          cost: item.cost,
          profit: item.profit,
          speed: item.speed,
          manager: manager,
        },
      });
    } else if (type === "foam") {
      dispatch({
        type: SET_FOAM,
        foam: {
          lvl: item.lvl,
          cost: item.cost,
          profit: item.profit,
          speed: item.speed,
          manager: manager,
        },
      });
    } else if (type === "mitt") {
      dispatch({
        type: SET_MITT,
        mitt: {
          lvl: item.lvl,
          cost: item.cost,
          profit: item.profit,
          speed: item.speed,
          manager: manager,
        },
      });
    } else if (type === "spray") {
      dispatch({
        type: SET_SPRAY,
        spray: {
          lvl: item.lvl,
          cost: item.cost,
          profit: item.profit,
          speed: item.speed,
          manager: manager,
        },
      });
    } else if (type === "dry") {
      dispatch({
        type: SET_DRY,
        dry: {
          lvl: item.lvl,
          cost: item.cost,
          profit: item.profit,
          speed: item.speed,
          manager: manager,
        },
      });
    } else if (type === "vac") {
      dispatch({
        type: SET_VAC,
        vac: {
          lvl: item.lvl,
          cost: item.cost,
          profit: item.profit,
          speed: item.speed,
          manager: manager,
        },
      });
    } else if (type === "carpet") {
      dispatch({
        type: SET_CARPET,
        carpet: {
          lvl: item.lvl,
          cost: item.cost,
          profit: item.profit,
          speed: item.speed,
          manager: manager,
        },
      });
    } else if (type === "spot") {
      dispatch({
        type: SET_SPOT,
        spot: {
          lvl: item.lvl,
          cost: item.cost,
          profit: item.profit,
          speed: item.speed,
          manager: manager,
        },
      });
    } else if (type === "steamer") {
      dispatch({
        type: SET_STEAMER,
        steamer: {
          lvl: item.lvl,
          cost: item.cost,
          profit: item.profit,
          speed: item.speed,
          manager: manager,
        },
      });
    } else if (type === "clay") {
      dispatch({
        type: SET_CLAY,
        clay: {
          lvl: item.lvl,
          cost: item.cost,
          profit: item.profit,
          speed: item.speed,
          manager: manager,
        },
      });
    } else if (type === "sealant") {
      dispatch({
        type: SET_SEALANT,
        sealant: {
          lvl: item.lvl,
          cost: item.cost,
          profit: item.profit,
          speed: item.speed,
          manager: manager,
        },
      });
    } else if (type === "window") {
      dispatch({
        type: SET_WINDOW,
        window: {
          lvl: item.lvl,
          cost: item.cost,
          profit: item.profit,
          speed: item.speed,
          manager: manager,
        },
      });
    } else if (type === "waffle") {
      dispatch({
        type: SET_WAFFLE,
        waffle: {
          lvl: item.lvl,
          cost: item.cost,
          profit: item.profit,
          speed: item.speed,
          manager: manager,
        },
      });
    } else if (type === "shine") {
      dispatch({
        type: SET_SHINE,
        shine: {
          lvl: item.lvl,
          cost: item.cost,
          profit: item.profit,
          speed: item.speed,
          manager: manager,
        },
      });
    }
  };

  const updateDB = (type, item) => {
    try {
      updateWallet({
        variables: {
          cash: cash + item.profit,
        },
      });
      type({
        variables: {
          lvl: item.lvl,
          cost: item.cost,
          profit: item.profit,
          speed: item.speed,
          manager: true,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const buyManager = (item, cost) => {
    const newItem = item.toLowerCase();
    if (cash >= cost) {
      if (newItem === "water") {
        dispatchEvt("water", water, true);
        if (Auth.loggedIn()) {
          updateDB(updateWater, water);
        }
      } else if (newItem === "wheel cleaner") {
        dispatchEvt("wheel", wheel, true);
        if (Auth.loggedIn()) {
          updateDB(updateWheel, wheel);
        }
      } else if (newItem === "foam cannon") {
        dispatchEvt("foam", foam, true);
        if (Auth.loggedIn()) {
          updateDB(updateFoam, foam);
        }
      } else if (newItem === "wash mitt") {
        dispatchEvt("mitt", mitt, true);
        if (Auth.loggedIn()) {
          updateDB(updateMitt, mitt);
        }
      } else if (newItem === "detail spray") {
        dispatchEvt("spray", spray, true);
        if (Auth.loggedIn()) {
          updateDB(updateSpray, spray);
        }
      } else if (newItem === "drying towel") {
        dispatchEvt("dry", dry, true);
        if (Auth.loggedIn()) {
          updateDB(updateDry, dry);
        }
      } else if (newItem === "vacuum") {
        dispatchEvt("vac", vac, true);
        if (Auth.loggedIn()) {
          updateDB(updateVac, vac);
        }
      } else if (newItem === "carpet cleaner") {
        dispatchEvt("carpet", carpet, true);
        if (Auth.loggedIn()) {
          updateDB(updateCarpet, carpet);
        }
      } else if (newItem === "spot cleaner") {
        dispatchEvt("spot", spot, true);
        if (Auth.loggedIn()) {
          updateDB(updateSpot, spot);
        }
      } else if (newItem === "steamer") {
        dispatchEvt("steamer", steamer, true);
        if (Auth.loggedIn()) {
          updateDB(updateSteamer, steamer);
        }
      } else if (newItem === "clay bar") {
        dispatchEvt("clay", clay, true);
        if (Auth.loggedIn()) {
          updateDB(updateClay, clay);
        }
      } else if (newItem === "paint sealant") {
        dispatchEvt("sealant", sealant, true);
        if (Auth.loggedIn()) {
          updateDB(updateSealant, sealant);
        }
      } else if (newItem === "window cleaner") {
        dispatchEvt("window", window, true);
        if (Auth.loggedIn()) {
          updateDB(updateWindow, window);
        }
      } else if (newItem === "waffle weave towel") {
        dispatchEvt("waffle", waffle, true);
        if (Auth.loggedIn()) {
          updateDB(updateWaffle, waffle);
        }
      } else if (newItem === "tire shine") {
        dispatchEvt("shine", shine, true);
        if (Auth.loggedIn()) {
          updateDB(updateShine, shine);
        }
      }
    } else {
      console.log("not enough");
    }
  };

  return (
    <>
      <SettingsDialog
        maxWidth="sm"
        open={state.managersOpen}
        onClose={() => {
          dispatch({ type: TOGGLE_MANAGERS });
        }}>
        <DialogTitle>Managers</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            {Object.keys(lvlArr).map((item, i) => (
              <Box
                key={i}
                sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>{item}</Typography>
                <BuyBtn onClick={() => buyManager(item, lvlArr[item])}>
                  ${lvlArr[item]}
                </BuyBtn>
              </Box>
            ))}
          </Stack>
          <Box onClick={() => dispatch({ type: TOGGLE_MANAGERS })}>
            <CloseBtn />
          </Box>
        </DialogContent>
      </SettingsDialog>
    </>
  );
}

export default Managers;
