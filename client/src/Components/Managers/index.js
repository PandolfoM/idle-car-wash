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
import { TOGGLE_MANAGERS } from "../../utils/actions";
import CloseBtn from "../CloseBtn";

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
  const { cash } = state;
  const [disabled, setDisabled] = useState({
    Water: true,
    "Wheel Cleaner": true,
    "Foam Cannon": true,
    "Wash Mitt": true,
    "Detail Spray": true,
    "Drying Towel": true,
    Vacuum: true,
    "Carpet Cleaner": true,
    "Spot Cleaner": true,
    Steamer: true,
    "Clay Bar": true,
    "Paint Sealant": true,
    "Window Cleaner": true,
    "Waffle Weave Towel": true,
    "Tire Shine": true,
  });

  const buyManager = (item, cost) => {
    if (cash < cost) {
      console.log("cannot afford");
    } else {
      console.log("bought");
    }
  };

  useEffect(() => {
    Object.keys(lvlArr).map((item, i) => {
      if (cash > lvlArr[item]) {
        return setDisabled({
          ...disabled,
          [item]: false,
        });
      }
    });
  }, [cash]);

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
                <BuyBtn
                  disabled={disabled[item]}
                  onClick={() => buyManager(item, lvlArr[item])}>
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
