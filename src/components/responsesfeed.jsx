import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

class ResponsesFeed extends React.Component {
  state = {
    responses: [],
  };
  componentDidMount() {
    axios
      .get(
        `http://localhost:8080/api/getResponse/${this.props.match.params.feedId}`
      )
      .then((response) => {
        console.log(response);
        this.setState({ responses: response.data });
      })
      .catch((error) => console.log(error));
  }
  handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/Deleteresponse/${id}`)
      .then((res) => {
        const responses = this.state.responses.filter(
          (dev) => dev.respId != id
        );
        this.setState({ responses: responses });
      });
  };
  render() {
    return (
      <div className="container">
        {this.props.login.loggedIn && (
          <Link
            to="/cg/addResponse"
            className="btn btn-secondary btn-large mb-1 float-end"
          >
            Add
          </Link>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>Answer</th>
              <th>respDate</th>
              <th>respTime</th>
              <th>accuracy</th>
              <th>respId</th>
            </tr>
          </thead>
          <tbody>
            {this.state.responses.map((response) => (
              <tr>
                <td>{response.answer}</td>
                <td>{response.respDate}</td>
                <td>{response.respTime}</td>
                <td>{response.accuracy}</td>
                <td>{response.respId}</td>
                {this.props.login.loggedIn && (
                  <td>
                    <Link to={`/updateresponse/${response.respId}`}>
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
                      onClick={() => this.handleDelete(response.respId)}
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

export default connect(mapStateToProps)(ResponsesFeed);
