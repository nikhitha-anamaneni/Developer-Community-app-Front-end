import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Developer extends React.Component {
  state = {
    developers: [],
  };
  componentDidMount() {
    axios
      .get("http://localhost:8080/api/getAllDevelopers")
      .then((response) => {
        console.log(response);
        this.setState({ developers: response.data });
      })
      .catch((error) => console.log(error));
  }
  handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/Deletedeveloper/${id}`)
      .then((res) => {
        const developers = this.state.developers.filter(
          (dev) => dev.devId != id
        );
        this.setState({ developers: developers });
      });
  };

  render() {
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>devId</th>
              <th>Name</th>
              <th>Email</th>
              <th>skillLevel</th>
              <th>membersince</th>
              <th>totalFeeds</th>
              <th>reputation</th>
            </tr>
          </thead>
          <tbody>
            {this.state.developers.map((developer) => (
              <tr>
                <td>{developer.devId}</td>
                <td>{developer.name}</td>
                <td>{developer.email}</td>
                <td>{developer.skillLevel}</td>
                <td>{developer.memberSince}</td>
                <td>{developer.totalFeeds}</td>
                <td>{developer.reputation}</td>
                {this.props.login.loggedIn && (
                  <td>
                    <Link to={`/developer/update/${developer.devId}`}>
                      <input
                        type="button"
                        value="Update"
                        className="btn btn-secondary me-2"
                      />
                    </Link>
                    <input
                      type="button"
                      value="Delete"
                      className="btn btn-outline-danger"
                      onClick={() => this.handleDelete(developer.devId)}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

export default connect(mapStateToProps)(Developer);
