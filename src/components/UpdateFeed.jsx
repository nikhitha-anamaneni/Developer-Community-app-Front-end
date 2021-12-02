import React, { Component } from "react";
import axios from "axios";

class Updatefeed extends React.Component {
  state = {
    feed: {
      feedId: "",
      query: " ",
      feedDate: " ",
      feedTime: " ",
      topic: " ",
      keyword: " ",
      relevance: " ",
      totalComments: " ",
    },
  };

  componentDidMount() {
    axios
      .get(
        `http://localhost:8080/api/getFeeds/${this.props.match.params.feedId}`
      )
      .then((res) => {
        const feed = { ...this.state.feed };
        feed.feedId = res.data.feedId;
        feed.query = res.data.query;
        feed.feedDate = res.data.feedDate;
        feed.feedTime = res.data.feedTime;
        feed.topic = res.data.topic;
        feed.relevance = res.data.relevance;
        feed.totalComments = res.data.totalComments;
        console.log(res.data);
        console.log(feed);
        this.setState({ feed: feed });
      })
      .catch((err) => console.log(err));
  }
  handleChange = (event) => {
    const feed = { ...this.state.feed }; // copying student object
    console.log(feed);
    feed[event.target.name] = event.target.value; // student[fullName] = "ab"
    //student.fullName = "ab";
    //student[fullName]="ab";
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({ feed: feed });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit");
    const feed = {
      feedId: this.state.feed.feedId,
      query: this.state.feed.query,
      feedDate: this.state.feed.feedDate,
      feedTime: this.state.feed.feedTime,
      topic: this.state.feed.topic,
      keyword: this.state.feed.keyword,
      relevance: this.state.feed.relevance,
      totalComments: this.state.feed.totalComments,
      feedId: 0,
    };
    console.log(feed);
    axios
      .put("http://localhost:8080/api/editFeed", this.state.feed)
      .then((res) => {
        this.props.history.push("/Feeds");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>FeedForm Details</h1>
        <form onSubmit={this.handleSubmit} className="w-50 mx-auto border p-3">
          <div className="mb-3">
            <label for="exampleInputFeedId1" className="form-label">
              FeedId
            </label>
            <input
              type="feedId"
              className="form-control"
              id="exampleInputFeedId1"
              value={this.state.feed.feedId}
              name="feedId"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputquery1" className="form-label">
              query
            </label>
            <input
              type="query"
              className="form-control"
              id="exampleInputquery1"
              value={this.state.feed.query}
              name="query"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputFeedDate1" className="form-label">
              FeedDate
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleInputFeedDate1 "
              value={this.state.feed.feedDate}
              name="feedDate"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputFeedTime1" className="form-label">
              FeedTime
            </label>
            <input
              type="feedTime"
              className="form-control"
              id="exampleInputFeedTime1"
              value={this.state.feed.feedTime}
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
              value={this.state.feed.topic}
              name="topic"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputRelevance1" className="form-label">
              Relevance
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputRelevance1"
              value={this.state.feed.relevance}
              name="relevance"
              onChange={this.handleChange}
            />
          </div>
          <div className=" mb-3">
            <label for="exampleInputKeyword1" className="form-label">
              Keyword
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputkeyword1"
              value={this.state.feed.keyword}
              name="keyword"
              onChange={this.handleChange}
            />
          </div>
          <div className=" mb-3">
            <label for="exampleInputTotalComments1" className="form-label">
              TotalComments
            </label>
            <input
              type="totalComments"
              className="form-control"
              id="exampleInputTotalComments1"
              value={this.state.feed.totalComments}
              name="totalComments"
              onChange={this.handleChange}
            />
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

export default Updatefeed;
