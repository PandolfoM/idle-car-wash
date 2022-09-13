import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Currency from "./Components/Currency";
import Upgrades from "./Components/Upgrades";

const carWashTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#EF233C",
          "&:hover": {
            backgroundColor: "#D90429"
          }
        },
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#3c485e",
        },
        barColorPrimary: {
          backgroundColor: "#EF233C",
        }
      }
    }
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
