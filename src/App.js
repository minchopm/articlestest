import React, {Component} from "react";
import './App.css';
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import Articles from "./components/Articles/Articles";
import SingleArticle from "./components/SingleArticle/SingleArticle";
import EditArticle from "./components/EditArticle/EditArticle";
import 'react-quill/dist/quill.snow.css';
import data from './db';

class App extends Component {
  componentDidMount() {
    localStorage.setItem('articles', JSON.stringify(data.articles));
    localStorage.setItem('language', 'EN');
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Redirect from="/" exact to="/articles" />
            <Route path="/articles" exact component={Articles} />
            <Route path="/articles/add" exact component={EditArticle} />
            <Route path="/articles/edit/:id" component={EditArticle} />
            <Route path="/articles/:id" component={SingleArticle} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
