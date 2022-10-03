import { useMutation, useQuery } from "@apollo/client";
import { Box, Button, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_CASH, SET_FOAM, SET_MITT, SET_SPRAY, SET_WHEEL } from "../../utils/actions";
import { formatNumberAb, PlayBtnClick } from "../../utils/helpers";
import {
  UPDATE_WHEEL,
  UPDATE_WALLET,
  UPDATE_FOAM,
  UPDATE_MITT,
  UPDATE_SPRAY,
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
    } 
    else if (lvl === "foam cannon") {
      dispatch({
        type: SET_FOAM,
        foam: {
          lvl: 1,
          cost: userData.me.foam.cost,
          profit: userData.me.foam.profit,
          speed: userData.me.foam.speed,
        },
      });
    }
    else if (lvl === "wash mitt") {
      dispatch({
        type: SET_MITT,
        mitt: {
          lvl: 1,
          cost: userData.me.mitt.cost,
          profit: userData.me.mitt.profit,
          speed: userData.me.mitt.speed,
        },
      });
    }
    else if (lvl === "detail spray") {
      dispatch({
        type: SET_SPRAY,
        spray: {
          lvl: 1,
          cost: userData.me.spray.cost,
          profit: userData.me.spray.profit,
          speed: userData.me.spray.speed,
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
      } 
      else if (lvl === "foam cannon") {
        await updateFoam({
          variables: {
            lvl: 1,
          },
        });
      }
      else if (lvl === "wash mitt") {
        await updateMitt({
          variables: {
            lvl: 1,
          },
        });
      }
      else if (lvl === "detail spray") {
        await updateSpray({
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
        <span>${formatNumberAb(cost, 2)}</span>
      </Button>
    </LockedBox>
  );
}

export default LockedLvl;
