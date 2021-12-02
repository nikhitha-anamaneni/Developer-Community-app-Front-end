import React, { Component } from "react";
import axios from "axios";

class Updatedeveloper extends React.Component {
  state = {
    developer: {
      name: " ",
      email: " ",
      skillLevel: " ",
      memberSince: " ",
      totalFeeds: " ",
      reputation: " ",
    },
  };

  componentDidMount() {
    console.log(this.state.developer.devId);
    axios
      .get(
        `http://localhost:8080/api/getDeveloper/${this.props.match.params.devId}`
      )
      .then((res) => {
        const developer = { ...this.state.developer };
        developer.devId = res.data.devId;
        developer.name = res.data.name;
        developer.email = res.data.email;
        developer.skillLevel = res.data.skillLevel;
        developer.memberSince = res.data.memberSince;
        developer.totalFeeds = res.data.totalFeeds;
        developer.reputation = res.data.reputation;
        console.log(res.data);
        console.log(developer);
        this.setState({ developer: developer });
      })
      .catch((err) => console.log(err));
  }
  handleChange = (event) => {
    const developer = { ...this.state.developer }; // copying student object
    console.log(developer);
    developer[event.target.name] = event.target.value; // student[fullName] = "ab"
    //student.fullName = "ab";
    //student[fullName]="ab";
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ developer: developer });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit");
    const developer = {
      name: this.state.developer.name,
      email: this.state.developer.email,
      skillLevel: this.state.developer.skillLevel,
      memberSince: this.state.developer.memberSince,
      totalFeeds: this.state.developer.totalFeeds,
      reputation: this.state.developer.reputation,
      devId: 0,
    };
    console.log(developer);
    axios
      .put("http://localhost:8080/api/updateDeveloper", this.state.developer)
      .then((res) => {
        this.props.history.push("/developer");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h3>Register Form</h3>
        <form onSubmit={this.handleSubmit} className="w-50 mx-auto border p-3">
          <div className="mb-3">
            <label for="exampleInputdevId1" className="form-label">
              devId
            </label>
            <input
              type="devId"
              className="form-control"
              size="6"
              id="exampleInputdevId1"
              value={this.state.developer.devId}
              name="devId"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputname1" className="form-label">
              Name
            </label>
            <input
              type="name"
              className="form-control"
              size="6"
              id="exampleInputname1"
              value={this.state.developer.name}
              name="name"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputemail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              size="50"
              id="exampleInputemail1"
              value={this.state.developer.email}
              name="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputmemberSince1" className="form-label">
              member Since
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleInputmemberSince1"
              value={this.state.developer.memberSince}
              name="memberSince"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputskillLevel1" className="form-label">
              skillLevel
            </label>
            <br />
            <input
              type="skillLevel"
              className="form-control"
              id="exampleInputskillLevel"
              value={this.state.developer.skillLevel}
              name="skillLevel"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputtotalFeeds1" className="form-label">
              totalFeeds
            </label>
            <br />
            <input
              type="totalFeeds"
              className="form-control"
              id="exampleInputtotalFeeds1"
              value={this.state.developer.totalFeeds}
              name="totalFeeds"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputreputation1" className="form-label">
              reputation
            </label>
            <br />
            <input
              type="reputation"
              className="form-control"
              id="exampleInputreputation1"
              value={this.state.developer.reputation}
              name="reputation"
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

export default Updatedeveloper;
