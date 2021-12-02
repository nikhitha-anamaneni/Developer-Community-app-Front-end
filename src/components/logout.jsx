import { Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../actions/login-action";

const Logout = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  useEffect(() => {
    dispatch(logoutAction(login.username));
  }, []);

  return (
    <div>
      <Typography>Logged out successfully!</Typography>
    </div>
  );
};

export default Logout;
