import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormGroup,
  FormLabel,
  Stack,
  styled,
  Switch,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_LOGIN, TOGGLE_MODAL, TOGGLE_SFX } from "../../utils/actions";
import Off from "../../assets/off.png";
import On from "../../assets/on.png";
import Login from "../Login";
import Auth from "../../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { UPDATE_USER } from "../../utils/mutations";
import CloseBtn from "../CloseBtn";

const SettingsSwitch = styled(Switch)(({ theme }) => ({
  opacity: 1,
  padding: "8px 0",
  width: 200,
  height: 60,
  "& .MuiSwitch-switchBase": {
    transform: "translateX(-8px)",
    "&.Mui-checked": {
      transform: "translateX(80px)",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#89D973",
      },
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  "& .MuiSwitch-track": {
    borderRadius: "50px",
    boxShadow: "0 0 0 3px black inset, 0 5px 0 3px rgba(0, 0, 0, 0.4) inset",
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
    },
    "&:before": {
      width: 26,
      height: 18,
      backgroundImage: `url('${On}')`,
      left: 30,
    },
    "&:after": {
      width: 31,
      height: 18,
      backgroundImage: `url('${Off}')`,
      right: 30,
    },
  },
  "& .MuiSwitch-thumb": {
    borderRadius: "50px",
    marginTop: "-1px",
    width: 110,
    height: 44,
    boxShadow: "0 0 0px 3px black inset, 0 -5px 0 3px rgba(0, 0, 0, 0.4) inset",
    backgroundColor: "#3C485E",
  },
}));

const AccountBtn = styled(Button)(({ theme }) => ({
  border: "black 4px solid",
  borderRadius: "15px",
  backgroundColor: Auth.loggedIn() ? "#EF233C" : "#89D973",
  color: "white",
  boxShadow: "0 -5px 0 0.5px rgba(0, 0, 0, 0.4) inset",
  textTransform: "none",
  fontSize: "15px",
  WebkitTextStroke: "2px black",
  "&:hover": {
    backgroundColor: Auth.loggedIn() ? "#EF233C" : "#89D973",
    boxShadow: "0 -5px 0 0.5px rgba(0, 0, 0, 0.4) inset",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));

const SettingsDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    backgroundColor: "#242b37",
    backgroundImage: "none",
    border: "#3C485E 2px solid",
    borderRadius: "15px",
    overflow: "visible",
    paddingBottom: "15px",
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
    },
  },
}));

function Settings() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { loading, error, data: userData } = useQuery(QUERY_ME);
  const [updateUser] = useMutation(UPDATE_USER);
  const [sfx, setSfx] = useState(true);

  const handleChange = async (e) => {
    setSfx(e.target.checked);
    dispatch({
      type: TOGGLE_SFX,
      sfx: e.target.checked,
    });
    if (Auth.loggedIn()) {
      try {
        await updateUser({
          variables: {
            sfx: e.target.checked,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (Auth.loggedIn()) {
      if (userData) {
        setSfx(userData.me.sfx);
      }
    }
  }, [userData]);

  return (
    <>
      <Login />
      <SettingsDialog
        maxWidth="sm"
        open={state.modalOpen}
        onClose={() => {
          dispatch({ type: TOGGLE_MODAL });
        }}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Box>
              <FormGroup>
                <FormLabel
                  sx={{
                    WebkitTextStroke: "2px black",
                    color: "white",
                    fontSize: "12px",
                    textAlign: "center",
                  }}>
                  SFX
                </FormLabel>
                <SettingsSwitch
                  checked={sfx}
                  onChange={handleChange}></SettingsSwitch>
              </FormGroup>
            </Box>
            <Box component={"hr"} sx={{ border: "#1E242F 1px solid" }} />
            {Auth.loggedIn() ? (
              <>
                <AccountBtn variant="contained" onClick={() => Auth.logout()}>
                  Logout
                </AccountBtn>
                {error ? (
                  <Box
                    component={"p"}
                    sx={{
                      fontSize: "10px",
                      WebkitTextStroke: "1.5px black",
                      textAlign: "center",
                    }}>
                    Error
                  </Box>
                ) : (
                  <Box
                    component={"p"}
                    sx={{
                      fontSize: "10px",
                      WebkitTextStroke: "1.5px black",
                      textAlign: "center",
                    }}>
                    {loading ? "Loading..." : userData.me._id}
                  </Box>
                )}
              </>
            ) : (
              <AccountBtn
                variant="contained"
                onClick={() => dispatch({ type: TOGGLE_LOGIN })}>
                Account
              </AccountBtn>
            )}
          </Stack>
          <Box onClick={() => dispatch({ type: TOGGLE_MODAL })}>
            <CloseBtn />
          </Box>
        </DialogContent>
      </SettingsDialog>
    </>
  );
}

export default Settings;
