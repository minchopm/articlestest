import React, { Component } from "react";
import { Dropdown, Button } from "react-bootstrap";
import * as moment from 'moment';

class SingleArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            article: null,
            articles: []
        };
    }

    componentDidMount() {
        const articles = JSON.parse(localStorage.getItem('articles'));
        this.setState({ articles: articles, article: articles[this.props.match.params.id-1]});
    }
    next(event) {
        event.preventDefault();
        this.setState({ article: this.state.articles[+this.props.match.params.id]});
        this.props.history.push(`/articles/${+this.props.match.params.id+1}`);
    }
    previous(event) {
        event.preventDefault();
        this.setState({ article: this.state.articles[+this.props.match.params.id-2]});
        this.props.history.push(`/articles/${+this.props.match.params.id-1}`);
    }
    goToArticles(event) {
        event.preventDefault();
        this.props.history.push('/articles');
    }

    render() {
        return (
            <div style={{marginLeft: 15}}>
                <h1 style={{fontWeight: 300}}>Articles Listing</h1>
                <h2>Articles Details</h2>
                {this.state.article && 
                <div className="singleArticle">

                    <h4>{this.state.article.titleEN}</h4>
                    <div style={{marginBottom: 5}}>{this.state.article.descriptionEN}</div>
                    <div className="publishedAt">{moment(this.state.article.publishedAt).format("MMMM DD, YYYY")}</div>
                </div>}
                <div className="singleArticleLinks back">
                    <Dropdown.Divider className="divider" />
                    <a onClick={(event) => this.goToArticles(event)}>
                        Back to the listing
                    </a>
                </div>
                <div className="singleArticleLinks links">
                    {this.props.match.params.id > 1 && 
                    <a onClick={(event) => this.previous(event)} className="previous">
                        &lt; Previous
                    </a>}
                    {this.props.match.params.id > 1 && this.props.match.params.id < this.state.articles.length && <div>-</div>}
                    {this.props.match.params.id < this.state.articles.length && 
                    <a className="next" onClick={(event) => this.next(event)}>
                        Next &gt;
                    </a>}
                </div>
            </div>
        );
    }
};

export default SingleArticle;
