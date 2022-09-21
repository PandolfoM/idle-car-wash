import React from "react";
import store from "./utils/store";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Currency from "./Components/Currency";
import Upgrades from "./Components/Upgrades";
import Settings from "./Components/Settings";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const ADDRESS = process.env.REACT_APP_ADDRESS;

const carWashTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
        disableFocusRipple: true,
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
        disableFocusRipple: true,
      },
    },
    MuiSwitch: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
        disableFocusRipple: true,
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

const httpLink = createHttpLink({
  uri: `http://${ADDRESS}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ThemeProvider theme={carWashTheme}>
          <Settings />
          <Currency />
          <Upgrades />
        </ThemeProvider>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
