import React, { Component } from "react";
import axios from "axios";
class DeveloperForm extends React.Component {
  state = {
    errors: {},
    developer: {
      name: "",
      email: "",
      password: "",
      reputation: "",
      totalFeeds: "",
      skillLevel: "",
      role: "",
      username: "",
      userId: "",
    },
  };
  handleChange = (event) => {
    const developer = { ...this.state.developer }; // copying student object
    developer[event.target.name] = event.target.value; // student[fullName] = "ab"
    //student.fullName = "ab";
    //student[fullName]="ab";
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ developer: developer });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      console.log("handleSubmit");
      const developer = {
        devId: 0,
        email: this.state.developer.email,
        name: this.state.developer.name,
        reputation: this.state.developer.reputation,
        totalFeeds: this.state.developer.totalFeeds,
        skillLevel: this.state.developer.skillLevel,
        users: {
          password: this.state.developer.password,
          role: this.state.developer.role,
          userId: this.state.developer.userId,
          username: this.state.developer.username,
        },
      };
      axios
        .post("http://localhost:8080/api/addDeveloper", developer)
        .then((res) => {
          this.props.history.push("/developer");
        })
        .catch((err) => console.log(err));
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
    let { name, email, password, reputation } = this.state.developer;
    let errors = {};
    errors.name = this.validateName(name);
    errors.email = this.validateName(email);
    errors.password = this.validateName(password);
    errors.reputation = this.validateName(reputation);

    if (!name) errors.name = "names must be entered";
    if (!email) errors.email = "email must be entered";
    if (!password) errors.password = "enter the password";
    if (!reputation) errors.reputation = "enter the reputation";
    return errors;
  };
  validateName = (name) =>
    !name ? "name must be entered" : name.length < 5 ? " min 5 character" : "";

  validateName = (email) =>
    !email
      ? "email must be entered"
      : (email.length = 10 ? " contain 10 digits" : "");

  validateName = (password) =>
    !password
      ? "password must be entered"
      : password.length < 4
      ? " min 4 character"
      : "";

  validateName = (reputation) =>
    !reputation
      ? "reputation must be entered"
      : reputation.length < 1
      ? " min 1 character"
      : "";

  render() {
    let { name, mobileNo, password, reputation } = this.state.developer;
    let { errors } = this.state;
    return (
      <div>
        <h3>Register Form</h3>
        <form onSubmit={this.handleSubmit} className="w-50 mx-auto border p-3">
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
            {errors.name ? (
              <span className="text-danger">{errors.name}</span>
            ) : (
              ""
            )}
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
            {errors.email ? (
              <span className="text-danger">{errors.email}</span>
            ) : (
              ""
            )}
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
            {errors.reputation ? (
              <span className="text-danger">{errors.reputation}</span>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <label for="exampleInputuserId1" className="form-label">
              User Id
            </label>
            <br />
            <input
              type="userId"
              className="form-control"
              id="exampleInputuserId1"
              value={this.state.developer.userId}
              name="userId"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputusername1" className="form-label">
              User Name
            </label>
            <br />
            <input
              type="username"
              className="form-control"
              id="exampleInputusername1"
              value={this.state.developer.username}
              name="username"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputpassword1" className="form-label">
              Password
            </label>
            <br />
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={this.state.developer.password}
              name="password"
              onChange={this.handleChange}
            />
            {errors.password ? (
              <span className="text-danger">{errors.password}</span>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <label for="exampleInputrole1" className="form-label">
              Role
            </label>
            <br />
            <input
              type="role"
              className="form-control"
              id="exampleInputrole1"
              value={this.state.developer.role}
              name="role"
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

export default DeveloperForm;
