import { useMutation } from "@apollo/client";
import { Box, Button, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_CASH, SET_FOAM, SET_WHEEL } from "../../utils/actions";
import { formatNumberAb, PlayBtnClick } from "../../utils/helpers";
import {
  UPDATE_WHEEL,
  UPDATE_WALLET,
  UPDATE_FOAM,
} from "../../utils/mutations";

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
    textTransform: "none",
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
    textTransform: "uppercase",
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
  const [updateFoam] = useMutation(UPDATE_FOAM);
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
          cost: 7,
          profit: 5,
          speed: 5,
        },
      });
    } else if (lvl === "foam cannon") {
      dispatch({
        type: SET_FOAM,
        foam: {
          lvl: 1,
          cost: 11,
          profit: 9,
          speed: 4,
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
