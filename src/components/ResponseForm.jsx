import React, { Component } from "react";
import axios from "axios";
import response from "./response";
class ResponseForm extends React.Component {
  state = {
    errors: {},
    response: {
      accuracy: 0,
      answer: " ",
      respDate: "  ",
      respTime: " ",
      feedId: " ",
      feedDate: " ",
      feedTime: " ",
      keyword: " ",
      query: " ",
      relevance: 0,
      topic: " ",
      totalComments: 0,
    },
  };
  handleChange = (event) => {
    const response = { ...this.state.response }; // copying student object
    console.log(response);
    response[event.target.name] = event.target.value; // student[fullName] = "ab"
    //student.fullName = "ab";
    //student[fullName]="ab";
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ response: response });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      console.log("handleSubmit");
      const response = {
        accuracy: 0,
        answer: this.state.response.answer,
        feed: {
          feedDate: this.state.response.feedDate,
          feedId: this.state.response.feedId,
          feedTime: this.state.response.feedTime,
          keyword: this.state.response.keyword,
          query: this.state.response.query,
          relevance: this.state.response.relevance,
          topic: this.state.response.topic,
          totalComments: this.state.response.totalComments,
        },
        respDate: this.state.response.respDate,
        respId: 0,
        respTime: this.state.response.respTime,
      };
      this.setState({ response: response });
      console.log(response);
      axios
        .post("http://localhost:8080/api/addResponse", response)

        .then((response) => {
          this.props.history.push("/feeds");
        })
        .catch((error) => console.log(error));
    } else {
      let s1 = { ...this.state };
      s1.errors = errors;
      this.setState(s1);
    }
  };
  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };

  isFormValid = () => {
    let errors = this.validateAll();
    return this.isValid(errors);
  };
  validateAll = () => {
    let { answer } = this.state.response;
    let errors = {};
    errors.answer = this.validateName(answer);
    if (!answer) errors.answer = "answer must be entered";
    return errors;
  };
  validateName = (answer) =>
    !answer
      ? "answer must be entered"
      : answer.length < 5
      ? " min 5 character"
      : "";

  render() {
    let { answer } = this.state.response;
    let { errors } = this.state;
    return (
      <div>
        <h3>Response Details</h3>
        <form onSubmit={this.handleSubmit} className="w-50 mx-auto border p-3">
          <div className="mb-3">
            <label for="exampleInputanswer1" className="form-label">
              {" "}
              answer
            </label>
            <input
              type="answer"
              className="form-control"
              size="50"
              id="exampleInputanswer1"
              value={this.state.response.answer}
              name="answer"
              onChange={this.handleChange}
            />
            {errors.answer ? (
              <span className="text-danger">{errors.answer}</span>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <label for="exampleInputrespDate1" className="form-label">
              respDate
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleInputrespDate1"
              value={this.state.response.respDate}
              name="respDate"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputrespTime1" className="form-label">
              respTime
            </label>
            <input
              type="respTime"
              className="form-control"
              id="exampleInputrespTime1"
              value={this.state.response.respTime}
              name="respTime"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputfeedId1" className="form-label">
              Feed id
            </label>
            <input
              type="feedId"
              className="form-control"
              id="exampleInputfeedId1"
              value={this.state.response.feedId}
              name="feedId"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputfeedTime1" className="form-label">
              Feed Time
            </label>
            <input
              type="time"
              className="form-control"
              id="exampleInputfeedTime1"
              value={this.state.response.feedTime}
              name="feedTime"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputfeedDate1" className="form-label">
              Feed Dte
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleInputfeedDate1"
              value={this.state.response.feedDate}
              name="feedDate"
              onChange={this.handleChange}
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default ResponseForm;
