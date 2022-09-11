import { Grid } from "@mui/material";
import Display from "./Components/Display";
import Navigation from "./Components/Navigation";
import Upgrades from "./Components/Upgrades";

function App() {
  return (
    <Grid container sx={{height: "100vh"}}>
      <Grid item xs={3}>
        <Navigation />
      </Grid>
      <Grid item xs={9} sx={{maxHeight: "100vh", overflow: "hidden"}}>
        <Display />
        <Upgrades />
      </Grid>
    </Grid>
  );
}

export default App;
