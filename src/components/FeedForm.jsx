import React, { Component } from "react";
import axios from "axios";

class FeedForm extends React.Component {
  state = {
    errors: {},
    Feed: {
      feedId: "",
      query: "",
      feedDate: "",
      feedTime: "",
      topic: "",
      relevance: "",
      keyword: "",
      totalComments: "",
    },
  };
  handleChange = (event) => {
    const Feed = { ...this.state.Feed }; // copying Feeds object
    Feed[event.target.name] = event.target.value; // Feeds[FeedId] = "ab"
    //Feeds.FeedId = "ab";
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ Feed: Feed });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    let errors = this.validateAll();
    if (this.isValid(errors)) {
      console.log("handleSubmit");
      const Feed = {
        feedId: this.state.Feed.feedId,
        query: this.state.Feed.query,
        feedTime: this.state.Feed.feedTime,
        feedDate: this.state.Feed.feedDate,
        topic: this.state.Feed.topic,
        relevance: this.state.Feed.relevance,
        totalComments: this.state.Feed.totalComments,
        keyword: this.state.Feed.keyword,
      };

      axios
        .post("http://localhost:8080/api/addFeed", Feed)
        .then((res) => {
          this.props.history.push("/Feed");
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
    let { query, keyword, topic } = this.state.Feed;
    let errors = {};
    errors.query = this.validateName(query);

    errors.keyword = this.validateName(keyword);
    errors.topic = this.validateName(topic);

    if (!query) errors.query = "query must be entered";

    if (!keyword) errors.keyword = "enter the keyword";
    if (!topic) errors.topic = "enter the topic";
    return errors;
  };
  validateName = (query) =>
    !query
      ? "query must be entered"
      : query.length < 10
      ? " min 10 character"
      : "";

  validateName = (topic) =>
    !topic
      ? "topic must be entered"
      : topic.length < 1
      ? " contain 10 digits"
      : "";

  validateName = (keyword) =>
    !keyword
      ? "keyword must be entered"
      : keyword.length < 3
      ? " min 3 character"
      : "";

  render() {
    let { query, topic, keyword } = this.state.Feed;
    let { errors } = this.state;
    return (
      <div>
        <h1>FeedForm Details</h1>
        <form onSubmit={this.handleSubmit} className="w-50 mx-auto border p-3">
          <div className="mb-3">
            <label for="exampleInputquery1" className="form-label">
              query
            </label>
            <input
              type="query"
              className="form-control"
              id="exampleInputquery1"
              value={this.state.Feed.query}
              name="query"
              onChange={this.handleChange}
            />
            {errors.query ? (
              <span className="text-danger">{errors.query}</span>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <label for="exampleInputFeedDate1" className="form-label">
              FeedDate
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleInputFeedDate1 "
              value={this.state.Feed.feedDate}
              name="feedDate"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputFeedTime1" className="form-label">
              FeedTime
            </label>
            <input
              type="Time"
              className="form-control"
              id="exampleInputFeedTime1"
              value={this.state.Feed.feedTime}
              name="feedTime"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputTopic1" className="form-label">
              Topic
            </label>
            <input
              type="topic"
              className="form-control"
              id="exampleInputTopic1"
              value={this.state.Feed.topic}
              name="topic"
              onChange={this.handleChange}
            />
            {errors.topic ? (
              <span className="text-danger">{errors.topic}</span>
            ) : (
              ""
            )}
          </div>

          <div className=" mb-3">
            <label for="exampleInputKeyword1" className="form-label">
              Keyword
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputkeyword1"
              value={this.state.Feed.keyword}
              name="keyword"
              onChange={this.handleChange}
            />
            {errors.keyword ? (
              <span className="text-danger">{errors.keyword}</span>
            ) : (
              ""
            )}
          </div>

          <div className="d-grid gap-2 mb-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default FeedForm;
