import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN } from "../../utils/mutations";
import Auth from "../../utils/auth";

const LoginDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    backgroundColor: "#242b37",
    backgroundImage: "none",
    border: "#3C485E 2px solid",
    borderRadius: "15px",
    "& .MuiDialogTitle-root": {
      backgroundColor: "#1E242F",
      textAlign: "center",
      padding: "5px 0",
      fontSize: "15px",
      WebkitTextStroke: "2px black",
    },
    "& .MuiDialogContent-root": {
      padding: "20px 24px",
    },
  },
}));

const LoginBtn = styled(Button)(({ theme }) => ({
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
}));

function Login() {
  const state = useSelector((state) => state);
  const [addUser, { error: addUserErr }] = useMutation(ADD_USER);
  const [login, { error: loginErr }] = useMutation(LOGIN);
  const [isLogin, setLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    password2: "",
  });

  useEffect(() => {
    if (addUserErr) {
      if (addUserErr.message.includes("(5)")) {
        setErrorMsg("Password too short");
      } else if (addUserErr.message.includes("Path `email` is required.")) {
        setErrorMsg("Email is required");
      } else if (addUserErr.message.includes("Path `password` is required.")) {
        setErrorMsg("Password is required");
      }
    }

    if (loginErr) {
      if (loginErr.message.includes("Incorrect credentials")) {
        setErrorMsg("Incorrect credentials");
      }
    }
  }, [addUserErr, loginErr]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (isLogin) {
      try {
        const mutationResponse = await login({
          variables: {
            email: formState.email,
            password: formState.password,
          },
        });
        const token = mutationResponse.data.login.token;
        Auth.login(token);
      } catch (e) {
        console.error(e);
      }
    } else {
      if (formState.password !== formState.password2) {
        setErrorMsg("Passwords do not match");
      } else {
        try {
          const mutationResponse = await addUser({
            variables: {
              email: formState.email,
              password: formState.password,
            },
          });
          const token = mutationResponse.data.addUser.token;
          Auth.login(token);
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  return (
    <LoginDialog maxWidth="sm" open={state.loginOpen}>
      <DialogTitle>{isLogin ? "Login" : "Create Account"}</DialogTitle>
      <DialogContent>
        <Box
          component={"form"}
          autoComplete="off"
          noValidate
          onSubmit={handleFormSubmit}>
          <Stack spacing={2}>
            <TextField
              autoFocus
              name="email"
              label="Email"
              variant="standard"
              type={"email"}
              onChange={handleChange}
              sx={{ WebkitTextStroke: "2px black" }}
            />
            <TextField
              name="password"
              label="Password"
              variant="standard"
              type={"password"}
              onChange={handleChange}
              sx={{ WebkitTextStroke: "2px black" }}
            />
            {isLogin === false && (
              <TextField
                name="password2"
                label="Confirm Password"
                variant="standard"
                type={"password"}
                onChange={handleChange}
                sx={{ WebkitTextStroke: "2px black" }}
              />
            )}
            <LoginBtn
              variant="contained"
              type="submit"
              onClick={handleFormSubmit}>
              Submit
            </LoginBtn>
            {errorMsg !== '' && (
              <Alert
                variant="outlined"
                severity="error"
                sx={{
                  fontSize: "10px",
                  padding: "3px 8px",
                  display: "flex",
                  alignItems: "center",
                }}>
                {errorMsg}
              </Alert>
            )}
            <Box
              component={"a"}
              sx={{
                fontSize: "12px",
                cursor: "pointer",
                maxWidth: "fit-content",
                WebkitTextStroke: "2px black",
              }}
              onClick={() => (isLogin ? setLogin(false) : setLogin(true))}>
              {isLogin ? "Create Account" : "Login"}
            </Box>
          </Stack>
        </Box>
      </DialogContent>
    </LoginDialog>
  );
}

export default Login;
