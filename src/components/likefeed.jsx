import React, { Component } from "react";
import { Typography, IconButton, Box } from "@mui/material";
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";
import IndeterminateCheckBoxTwoToneIcon from "@mui/icons-material/IndeterminateCheckBoxTwoTone";

//import { increment, decrement } from "../actions/counter-action";

class Counter extends React.Component {
  state = {
    counter: 0,
  };
  increment = () => {
    this.setState({ counter: this.state.counter + 1 });
  };
  decrement = () => {
    this.setState({ counter: this.state.counter - 1 });
  };
  render() {
    return (
      <div>
        <Typography variant="h3">Counter Page</Typography>

        <IconButton aria-label="increment" onClick={this.increment}>
          <AddBoxTwoToneIcon />
        </IconButton>
        {this.state.counter}
        <IconButton aria-label="increment" onClick={this.decrement}>
          <IndeterminateCheckBoxTwoToneIcon />
        </IconButton>
      </div>
    );
  }
}

export default Counter;
