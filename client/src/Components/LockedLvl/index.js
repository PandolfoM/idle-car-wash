import { useMutation, useQuery } from "@apollo/client";
import { Box, Button, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CURRENT_CASH,
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
  SET_WHEEL,
  SET_WINDOW,
} from "../../utils/actions";
import { formatNumberAb, PlayBtnClick } from "../../utils/helpers";
import {
  UPDATE_WHEEL,
  UPDATE_WALLET,
  UPDATE_FOAM,
  UPDATE_MITT,
  UPDATE_SPRAY,
  UPDATE_DRY,
  UPDATE_VAC,
  UPDATE_CARPET,
  UPDATE_CLAY,
  UPDATE_SEALANT,
  UPDATE_WINDOW,
  UPDATE_WAFFLE,
  UPDATE_STEAMER,
  UPDATE_SPOT,
  UPDATE_SHINE,
} from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const LockedBox = styled(Box)(() => ({
  width: "90%",
  borderRadius: "50px",
  height: "4.7em",
  bgcolor: "#3c485e",
  margin: "auto",
  marginTop: "15px",
  marginBottom: "30px",
  justifyContent: "center",
  alignContent: "center",
  display: "flex",
  border: "black 2px solid",
  "& .MuiButton-root": {
    color: "white",
    paddingTop: "0px !important",
    paddingBottom: "0px !important",
    borderRadius: "50px",
    transition: "all 0.1s linenpmar",
    fontSize: "1.1em",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#EF233C",
    WebkitTextStroke: "2px black",
    "&.Mui-disabled": {
      backgroundColor: "#444",
    },
  },
  "& :hover": {
    backgroundColor: "#D90429",
  },
  "& :active": {
    transform: "scale(0.95)",
  },
}));

function LockedLvl({ cost, lvl }) {
  const [disabled, setDisabled] = useState(true);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [updateWallet] = useMutation(UPDATE_WALLET);
  const [updateWheel] = useMutation(UPDATE_WHEEL);
  const [updateMitt] = useMutation(UPDATE_MITT);
  const [updateFoam] = useMutation(UPDATE_FOAM);
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
  const { data: userData } = useQuery(QUERY_ME);
  const { cash, sfx, currentMultiplier } = state;

  useEffect(() => {
    if (cash < cost * currentMultiplier) {
      setDisabled(true);
    } else if (cash >= cost * currentMultiplier) {
      setDisabled(false);
    }
  }, [currentMultiplier, cash, cost]);

  const unlockLvl = async () => {
    PlayBtnClick(sfx);
    dispatch({
      type: CURRENT_CASH,
      cash: cash - cost,
    });
    if (lvl === "wheel cleaner") {
      dispatch({
        type: SET_WHEEL,
        wheel: {
          lvl: 1,
          cost: userData.me.wheel.cost,
          profit: userData.me.wheel.profit,
          speed: userData.me.wheel.speed,
        },
      });
    } else if (lvl === "foam cannon") {
      dispatch({
        type: SET_FOAM,
        foam: {
          lvl: 1,
          cost: userData.me.foam.cost,
          profit: userData.me.foam.profit,
          speed: userData.me.foam.speed,
        },
      });
    } else if (lvl === "wash mitt") {
      dispatch({
        type: SET_MITT,
        mitt: {
          lvl: 1,
          cost: userData.me.mitt.cost,
          profit: userData.me.mitt.profit,
          speed: userData.me.mitt.speed,
        },
      });
    } else if (lvl === "detail spray") {
      dispatch({
        type: SET_SPRAY,
        spray: {
          lvl: 1,
          cost: userData.me.spray.cost,
          profit: userData.me.spray.profit,
          speed: userData.me.spray.speed,
        },
      });
    } else if (lvl === "drying towel") {
      dispatch({
        type: SET_DRY,
        dry: {
          lvl: 1,
          cost: userData.me.dry.cost,
          profit: userData.me.dry.profit,
          speed: userData.me.dry.speed,
        },
      });
    } else if (lvl === "vacuum") {
      dispatch({
        type: SET_VAC,
        vac: {
          lvl: 1,
          cost: userData.me.vac.cost,
          profit: userData.me.vac.profit,
          speed: userData.me.vac.speed,
        },
      });
    } else if (lvl === "carpet cleaner") {
      dispatch({
        type: SET_CARPET,
        carpet: {
          lvl: 1,
          cost: userData.me.carpet.cost,
          profit: userData.me.carpet.profit,
          speed: userData.me.carpet.speed,
        },
      });
    } else if (lvl === "spot cleaner") {
      dispatch({
        type: SET_SPOT,
        spot: {
          lvl: 1,
          cost: userData.me.spot.cost,
          profit: userData.me.spot.profit,
          speed: userData.me.spot.speed,
        },
      });
    } else if (lvl === "steamer") {
      dispatch({
        type: SET_STEAMER,
        steamer: {
          lvl: 1,
          cost: userData.me.steamer.cost,
          profit: userData.me.steamer.profit,
          speed: userData.me.steamer.speed,
        },
      });
    } else if (lvl === "clay bar") {
      dispatch({
        type: SET_CLAY,
        clay: {
          lvl: 1,
          cost: userData.me.clay.cost,
          profit: userData.me.clay.profit,
          speed: userData.me.clay.speed,
        },
      });
    } else if (lvl === "paint sealant") {
      dispatch({
        type: SET_SEALANT,
        sealant: {
          lvl: 1,
          cost: userData.me.sealant.cost,
          profit: userData.me.sealant.profit,
          speed: userData.me.sealant.speed,
        },
      });
    } else if (lvl === "window cleaner") {
      dispatch({
        type: SET_WINDOW,
        window: {
          lvl: 1,
          cost: userData.me.window.cost,
          profit: userData.me.window.profit,
          speed: userData.me.window.speed,
        },
      });
    } else if (lvl === "waffle weave towel") {
      dispatch({
        type: SET_WAFFLE,
        waffle: {
          lvl: 1,
          cost: userData.me.waffle.cost,
          profit: userData.me.waffle.profit,
          speed: userData.me.waffle.speed,
        },
      });
    } else if (lvl === "tire shine") {
      dispatch({
        type: SET_SHINE,
        shine: {
          lvl: 1,
          cost: userData.me.shine.cost,
          profit: userData.me.shine.profit,
          speed: userData.me.shine.speed,
        },
      });
    }
    try {
      await updateWallet({
        variables: {
          cash: cash - cost,
        },
      });

      if (lvl === "wheel cleaner") {
        await updateWheel({
          variables: {
            lvl: 1,
          },
        });
      } else if (lvl === "foam cannon") {
        await updateFoam({
          variables: {
            lvl: 1,
          },
        });
      } else if (lvl === "wash mitt") {
        await updateMitt({
          variables: {
            lvl: 1,
          },
        });
      } else if (lvl === "detail spray") {
        await updateSpray({
          variables: {
            lvl: 1,
          },
        });
      } else if (lvl === "drying towel") {
        await updateDry({
          variables: {
            lvl: 1,
          },
        });
      } else if (lvl === "vacuum") {
        await updateVac({
          variables: {
            lvl: 1,
          },
        });
      } else if (lvl === "carpet cleaner") {
        await updateCarpet({
          variables: {
            lvl: 1,
          },
        });
      } else if (lvl === "spot cleaner") {
        await updateSpot({
          variables: {
            lvl: 1,
          },
        });
      } else if (lvl === "steamer") {
        await updateSteamer({
          variables: {
            lvl: 1,
          },
        });
      } else if (lvl === "clay bar") {
        await updateClay({
          variables: {
            lvl: 1,
          },
        });
      } else if (lvl === "paint sealant") {
        await updateSealant({
          variables: {
            lvl: 1,
          },
        });
      } else if (lvl === "window cleaner") {
        await updateWindow({
          variables: {
            lvl: 1,
          },
        });
      } else if (lvl === "waffle weave towel") {
        await updateWaffle({
          variables: {
            lvl: 1,
          },
        });
      } else if (lvl === "tire shine") {
        await updateShine({
          variables: {
            lvl: 1,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LockedBox>
      <Button
        className="buyBtn"
        variant="contained"
        disableRipple
        disabled={disabled}
        onClick={unlockLvl}>
        UNLOCK {lvl}
        {/* cost to upgrade */}
        <span>${formatNumberAb(cost, 0)}</span>
      </Button>
    </LockedBox>
  );
}

export default LockedLvl;
