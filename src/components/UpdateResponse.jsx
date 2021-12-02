import React, { Component } from "react";
import axios from "axios";

class Updateresponse extends React.Component {
  state = {
    response: {
      accuracy: " ",
      answer: " ",
      respDate: "  ",
      respTime: " ",
    },
  };

  componentDidMount() {
    axios
      .get(
        `http://localhost:8080/api/ResponseById/${this.props.match.params.respId}`
      )
      .then((res) => {
        const response = { ...this.state.response };
        response.accuracy = res.data.accuracy;
        response.answer = res.data.answer;
        response.respDate = res.data.respDate;
        response.respTime = res.data.respTime;
        response.respId = res.data.respId;

        console.log(response);
        this.setState({ response: response });
      })
      .catch((error) => console.log(error));
  }
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
    console.log("handleSubmit");
    const developer = {
      accuracy: this.state.response.accuracy,
      answer: this.state.response.answer,
      respDate: this.state.response.respDate,
      respTime: this.state.response.respTime,
      respId: 0,
    };
    axios
      .put("http://localhost:8080/api/editresponse", this.state.response)
      .then((res) => {
        this.props.history.push("/responses");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h3>Register Form</h3>
        <form onSubmit={this.handleSubmit} className="w-50 mx-auto border p-3">
          <div className="mb-3">
            <label for="exampleInputrespId1" className="form-label">
              respId
            </label>
            <input
              type="respId"
              className="form-control"
              size="6"
              id="exampleInputrespId1"
              value={this.state.response.respId}
              name="respId"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputaccuracy1" className="form-label">
              accuracy
            </label>
            <input
              type="accuracy"
              className="form-control"
              size="6"
              id="exampleInputaccuracy1"
              value={this.state.response.accuracy}
              name="accuracy"
              onChange={this.handleChange}
            />
          </div>
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

export default Updateresponse;
