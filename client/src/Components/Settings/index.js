import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormGroup,
  FormLabel,
  styled,
  Switch,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_MODAL, TOGGLE_SFX } from "../../utils/actions";
import Off from "../../assets/off.png";
import On from "../../assets/on.png";


const SettingsSwitch = styled(Switch)(({ theme }) => ({
  width: 200,
  height: 60,
  padding: "7px 2px",
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(0px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(97px)",
      "& .MuiSwitch-thumb:before": {
        // backgroundImage: `url('${OnSvg}')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#89D973",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 100,
    height: 59,
    borderRadius: "50px",
    boxShadow: "0 0 0px 4px black inset",
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      // backgroundImage:`url('${OffSvg}')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#444444",
    borderRadius: "50px",
    boxShadow: "0 0 0 4px black inset, 0 5px 0 3px rgba(0, 0, 0, 0.4) inset",
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 26,
      height: 18,
    },
    '&:before': {
      width: 26,
      height: 18,
      backgroundImage: `url('${On}')`,
      // backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
      //   theme.palette.getContrastText(theme.palette.primary.main),
      // )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      width: 31,
      height: 18,
      backgroundImage: `url('${Off}')`,
      right: 12,
    },
  },
}));

function Settings() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch({ type: TOGGLE_SFX, sfx: e.target.checked });
  };

  return (
    <Dialog
      maxWidth="sm"
      open={state.modalOpen}
      onClose={() => {
        dispatch({ type: TOGGLE_MODAL });
      }}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <FormLabel>SFX</FormLabel>
        <FormGroup>
          <SettingsSwitch
            checked={state.sfx}
            onChange={handleChange}></SettingsSwitch>
        </FormGroup>
      </DialogContent>
    </Dialog>
  );
}

export default Settings;
