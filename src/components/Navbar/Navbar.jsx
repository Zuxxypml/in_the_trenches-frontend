import React from "react";
import { AppBar, Toolbar, Typography, Avatar, Button } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import useStyles from "./styles.nav";
import memories from "../../images/memories.png";
import { useState } from "react";
import { auth } from "../../firebase/firebase.utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  console.log(user);
  const logoutHandler = async () => {
    await auth.signOut();
    dispatch({ type: "LOGOUT" });
    setUser(null);
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          className={classes.heading}
          component={Link}
          to="/"
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </div>
      <Toolbar>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.displayName}
              src={user.photoURL}
            >
              {user.displayName.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.displayName}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logoutHandler}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
