import {
  Typography,
  Paper,
  Container,
  Grid,
  Avatar,
  Button,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
import { authActionType } from "../../constants/authActionTypes";
import {
  auth,
  // createUserProfileDocument,
  signInWithGoogle,
} from "../../firebase/firebase.utils";
import Icon from "./Icon";
import Input from "./Input";
import useStyles from "./styles.auth";

const initialFormDataState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialFormDataState);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (isSignUp) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const switchMode = () => {
    setIsSignUp((prevState) => !prevState);
  };

  let unsubscribeFromAuth = null;
  unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuthdata) => {
    if (userAuthdata) {
      const { accessToken, email, displayName, photoURL, uid } = userAuthdata;
      console.log(accessToken, email, displayName, photoURL, uid);
      try {
        dispatch({
          type: authActionType.AUTH,
          data: { accessToken, email, displayName, photoURL, uid },
        });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  });

  useEffect(() => {
    return () => {
      unsubscribeFromAuth();
    };
  }, [unsubscribeFromAuth]);

  return (
    <Container maxWidth="xs" component="main">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {!isSignUp ? "Sign In " : "Sign up"}
        </Typography>
        <form action="" className={classes.form} onSubmit={handleSubmit}>
          <Grid container justifyContent="center" spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign up" : "Sign In"}
          </Button>
          <Button
            className={classes.googleButton}
            color="primary"
            fullWidth
            onClick={signInWithGoogle}
            startIcon={<Icon />}
            variant="contained"
          >
            Google Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account ?, Sign In"
                  : "New here ? Create an Account."}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
