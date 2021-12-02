import React, { useState } from "react";
// import Typography from "@mui/material/Typography";
// import Input from "@mui/material/Input";
// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
// importing with the help of destructring
import {
  Grid,
  Typography,
  Button,
  Box,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Paper,
} from "@mui/material";
import Joi from "joi-browser";
import Alert from "@mui/material/Alert";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../actions/login-action";

const ariaLabel = { "aria-label": "description" };

const Login = (props) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "",
  });

  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [errMsg, setErrMsg] = useState("");

  // Step1 : Define schema object
  const schema = {
    username: Joi.string().required(),
    password: Joi.string().min(3).required(),
    role: Joi.string().required(),
  };

  // Step2: Validate schema with user input
  const validate = () => {
    const errors = {};
    const result = Joi.validate(user, schema, { abortEarly: false });
    console.log(result);
    // setting error messages to error properties
    // ex: errors[username] = "username is required";
    // ex: errors[password] = "password is required";
    if (result.error != null)
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  // Capture user input and update state object
  const handleChange = (event) => {
    console.log("HandleChange");
    const usr = { ...user };
    usr[event.target.name] = event.target.value;
    //this.setState({ user: user });
    setUser(usr);
  };

  const handleSubmit = (event) => {
    // Prevent default behaviour of submit button
    event.preventDefault();
    console.log("Handle submit");

    // Validate user input againest schema
    setErrors(validate());
    console.log(errors);

    // if errors, don't redirect to products page
    if (errors) return;

    // Dispatch login action
    dispatch(loginAction(user));

    // Redirect to products page on successfull login
    if (login.loggedIn) {
      props.history.push("/home");
    }
  };
  return (
    <div>
      <Typography variant="h3">Login Page</Typography>
      <Grid container>
        <Grid item xs={4} style={{ marginLeft: "auto", marginRight: "auto" }}>
          {login.errMsg && <Alert severity="error">{login.errMsg}</Alert>}
          <Paper elevation={3}>
            <form
              onSubmit={handleSubmit}
              noValidate
              style={{
                padding: "20px",
                marginTop: "10px",
              }}
            >
              <Box mb={3}>
                <TextField
                  inputProps={ariaLabel}
                  type="unsername"
                  variant="outlined"
                  fullWidth
                  label="username"
                  value={user.username}
                  name="username"
                  onChange={handleChange}
                />
                {errors && (
                  <Typography variant="caption">{errors.username}</Typography>
                )}
              </Box>

              <Box mb={3}>
                <TextField
                  inputProps={ariaLabel}
                  type="password"
                  fullWidth
                  variant="outlined"
                  label="Password"
                  value={user.password}
                  name="password"
                  onChange={handleChange}
                />
                {errors && (
                  <Typography variant="caption">{errors.password}</Typography>
                )}
              </Box>
              <Box mb={3}>
                <TextField
                  inputProps={ariaLabel}
                  type="role"
                  fullWidth
                  variant="outlined"
                  label="role"
                  value={user.role}
                  name="role"
                  onChange={handleChange}
                />
                {errors && (
                  <Typography variant="caption">{errors.password}</Typography>
                )}
              </Box>
              <Box mt={3}>
                <Button variant="contained" type="submit" fullWidth>
                  Login
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
