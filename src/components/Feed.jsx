import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Feed extends React.Component {
  state = {
    feeds: [],
    counter: 0,
  };
  componentDidMount() {
    axios
      .get("http://localhost:8080/api/getAllfeed")
      .then((response) => {
        console.log(response);
        this.setState({ feeds: response.data });
      })
      .catch((error) => console.log(error));
  }
  handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/Deletefeed/${id}`).then((res) => {
      const feeds = this.state.feeds.filter((feed) => feed.feedId != id);
      this.setState({ feeds: feeds });
    });
  };
  increment = () => {
    this.setState({ counter: this.state.counter + 1 });
  };
  decrement = () => {
    this.setState({ counter: this.state.counter - 1 });
  };
  render() {
    return (
      <div className="container">
        {this.props.login.loggedIn && (
          <Link
            to="/api/addFeed"
            className="btn btn-secondary btn-large mb-1 float-end"
          >
            Add
          </Link>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>FeedId</th>
              <th>Query</th>
              <th>FeedDate</th>
              <th>FeedTime</th>
              <th>Topic</th>
              <th>Relevance</th>
              <th>Keyword</th>

              <th>Totalcomments</th>
            </tr>
          </thead>
          <tbody>
            {this.state.feeds.map((feed) => (
              <tr>
                <td>{feed.feedId}</td>
                <td>{feed.query}</td>
                <td>{feed.feedDate}</td>
                <td>{feed.feedTime}</td>
                <td>{feed.topic}</td>
                <td>{feed.relevance}</td>
                <td>{feed.keyword}</td>

                <td>{feed.totalComments}</td>
                {this.props.login.loggedIn && (
                  <td>
                    <Link to={`/api/updateFeeds/${feed.feedId}`}>
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
                      onClick={() => this.handleDelete(feed.feedId)}
                    />
                  </td>
                )}
                <td>
                  <Link to={`/response/get/${feed.feedId}`}>
                    <input
                      type="button"
                      value="Responses"
                      className="btn btn-secondary me-2"
                    />
                  </Link>
                </td>
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

export default connect(mapStateToProps)(Feed);
