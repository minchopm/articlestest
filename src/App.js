import React, {Component} from "react";
import './App.css';
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import Articles from "./components/Articles/Articles";
import SingleArticle from "./components/SingleArticle/SingleArticle";


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Redirect from="/" exact to="/articles" />
            <Route path="/articles" exact component={Articles} />
            <Route path="/articles/:id" component={SingleArticle} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;