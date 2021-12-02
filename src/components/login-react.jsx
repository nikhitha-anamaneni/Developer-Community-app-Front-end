import React, { useState } from "react";
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
} from "@mui/material";

import axios from "axios";
import Joi from "joi-browser";
import Alert from "@mui/material/Alert";

const ariaLabel = { "aria-label": "description" };

const Login = (props) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    //role: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    //role: "",
  });
  const [errMsg, setErrMsg] = useState("");

  // Step1 : Define schema object
  const schema = {
    username: Joi.string().required(),
    password: Joi.string().min(3).required(),
    // role: Joi.string().required(),
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
    event.preventDefault();
    console.log("Handle submit");

    //const errors = validate();
    //console.log(errors);
    setErrors(validate());
    console.log(errors);
    if (errors) return;
    axios
      .post("http://localhost:8080/api/login", user)
      .then((res) => props.history.push("/home"))
      .catch((err) => {
        console.log(err.response.data.message);
        setErrMsg(err.response.data.message);
      });
  };
  return (
    <div>
      <Typography variant="h3">Login Page</Typography>
      <Grid container>
        <Grid item xs={4} style={{ marginLeft: "auto", marginRight: "auto" }}>
          {errMsg && <Alert severity="error">{errMsg}</Alert>}
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{
              border: "1px solid blue",
              padding: "20px",
              marginTop: "10px",
            }}
          >
            <Box mb={3}>
              <TextField
                inputProps={ariaLabel}
                type="username"
                variant="outlined"
                fullWidth
                label="User Name"
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

            <Box mt={3}>
              <Button variant="contained" type="submit" fullWidth>
                Login
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
