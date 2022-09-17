import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Currency from "./Components/Currency";
import Upgrades from "./Components/Upgrades";

const carWashTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#EF233C",
          "&:hover": {
            backgroundColor: "#D90429",
          },
          "&.Mui-disabled": {
            backgroundColor: "#444",
          },
        },
      },
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          border: "black 2px solid",
          borderRadius: "20px",
          width: "90%",
          height: "1.7em",
          bottom: -5,
          position: "relative",
        },
        bar1Determinate: {
          transition: "transform .1s linear",
        },
        colorPrimary: {
          backgroundColor: "#3c485e",
          boxShadow:
            "inset 0 1px 1px #222, inset 0 8px 16px -4px #222, inset 0 -1px 1px #222",
        },
        barColorPrimary: {
          backgroundColor: "#EF233C",
          boxShadow:
            "inset 0 1px 1px #222, inset 0 8px 16px -4px #222, inset 0 -1px 1px #222",
        },
      },
    },
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={carWashTheme}>
        <Currency />
        <Upgrades />
      </ThemeProvider>
    </div>
  );
}

export default App;
