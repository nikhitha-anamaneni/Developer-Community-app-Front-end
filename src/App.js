import "./App.css";
import Home from "./components/home";
import Nav from "./components/nav";
import Login from "./components/login";
//import Posts from "./components/posts"
import Register from "./components/register";
import PageNotFound from "./components/pagenotfound";

import { Route, Switch, Redirect } from "react-router-dom";
//import ValiationForm from './components/developerform copy';
import "bootstrap/dist/css/bootstrap.css";
import Developer from "./components/developer";
import DeveloperForm from "./components/developerform";
import Updatedeveloper from "./components/UpdateDeveloper";
import Feed from "./components/Feed";
import FeedForm from "./components/FeedForm";
import ResponseForm from "./components/ResponseForm";
import Response from "./components/response";
import Updateresponse from "./components/UpdateResponse";
import Updatefeed from "./components/UpdateFeed";
import ResponsesFeed from "./components/responsesfeed";
import Counter from "./components/likefeed";
import Logout from "./components/logout";
function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/register" component={Register} />

        <Route path="/developer/add" component={DeveloperForm} />
        <Route path="/Feeds" component={Feed} />
        <Route path="/api/addFeed" component={FeedForm} />
        <Route path="/responses" component={Response} />
        <Route path="/cg/addResponse" component={ResponseForm} />
        <Route path="/updateresponse/:respId" component={Updateresponse} />
        <Route path="/api/updateFeeds/:feedId" component={Updatefeed} />
        <Route path="/developer/update/:devId" component={Updatedeveloper} />
        <Route path="/developer" component={Developer} />
        <Route path="/likefeed" component={Counter} />
        <Route path="/response/get/:feedId" component={ResponsesFeed} />
        <Route exact path="/" component={Home} />
        <Redirect from="/home" to="/" />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
