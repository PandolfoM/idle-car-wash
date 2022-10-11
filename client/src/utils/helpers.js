import { Box, styled } from "@mui/material";
import btnClick from "../assets/btnClick.wav"

export function formatNumberAb(num, fixed, lvl) {
  if (num < 1e3 && lvl) return  num;
  if (num < 1e3 && fixed === 0) return  num;
  if (num < 1e3) return num.toFixed(fixed);
  if (num >= 1e3 && num < 1e6) return +(num / 1e3).toFixed(fixed) + "K";
  if (num >= 1e6 && num < 1e9) return +(num / 1e6).toFixed(fixed) + "M";
  if (num >= 1e9 && num < 1e12) return +(num / 1e9).toFixed(fixed) + "B";
  if (num >= 1e12 && num < 1e15) return +(num / 1e12).toFixed(fixed) + "T";
  if (num >= 1e15 && num < 1e18) return +(num / 1e15).toFixed(fixed) + "A";
  if (num >= 1e18 && num < 1e21) return +(num / 1e18).toFixed(fixed) + "B";
  if (num >= 1e21) return +(num / 1e21).toFixed(fixed) + "C";
}

export function PlayBtnClick(enabled){
  let audio = new Audio(btnClick)

  if (enabled) {
    return audio.play()
  } else {
    return
  }

}

export const ProductBox = styled(Box)(({running}) => ({
  width: "90%",
  borderRadius: "50px 10px 10px 50px",
  height: "4.7em",
  backgroundColor: "#3c485e",
  margin: "auto",
  marginTop: "15px",
  marginBottom: "30px",
  display: "flex",
  border: "black 2px solid",
  "& .itemPic": {
    padding: "0px !important",
    borderRadius: "100%",
    backgroundColor: "#242b37",
    width: "5.9em",
    height: "5.9em",
    position: "relative",
    top: -60,
    right: -40,
    transform: "translate(-50%, 50%)",
    display: "flex",
    border: "black 2px solid",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    ...(running === "false" ?
      {boxShadow: "0 0 10px 2px #EF233C, 0 0 0 3px #3c485e inset"}:
      {boxShadow: "0 0 0 3px #3c485e inset"}
    ),
  },
  "& .itemLvl": {
    width: "6em",
    height: "2.3em",
    borderRadius: "30px",
    backgroundColor: "#2b2d42",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    bottom: -2,
    border: "2px solid black",
    boxShadow: "0 0 0px 3px #3c485e inset",
  },
  "& .itemLvl>p": {
    fontSize: "1.3em",
    fontWeight: "bold",
    color: "white",
    textShadow:
      "2px 0 black, -2px 0 black, 0 2px black, 0 -2px black, 1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black",
    overflow: "hidden",
  },
  "& .itemControls": {
    padding: "0px !important",
    width: "80%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  "& .MuiButton-root": {
    bottom: -15,
    position: "relative",
    textTransform: "none",
    color: "white",
    paddingTop: "0px !important",
    paddingBottom: "0px !important",
    border: "black 2px solid",
    borderRadius: "10px",
    transition: "all 0.1s linear",
    fontSize: "1.1em",
    width: "90%",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#EF233C",
    WebkitTextStroke: "2px black",
    "&.Mui-disabled": {
      backgroundColor: "#444",
    },
  },
  "& .MuiButton-root:hover": {
    backgroundColor: "#D90429",
  },
  "& .MuiButton-root:active": {
    transform: "scale(0.95)",
  },
  "& .profit": {
    width: "0px",
    zIndex: 1,
    position: "relative",
    top: "0.9rem",
    left: "6vw",
    color: "white",
    textShadow:
      "2px 0 black, -2px 0 black, 0 2px black, 0 -2px black, 1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black",
  },
}));
