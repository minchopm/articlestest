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
                <div style={{textAlign: 'left', maxWidth: 600, margin: 'auto'}}>

                    <h4 style={{color: '#4EAACD', margin: '10px 0', cursor: 'pointer', width: 'fit-content'}}>{this.state.article.title}</h4>
                    <div style={{marginBottom: 5}}>{this.state.article.description}</div>
                    <div style={{fontSize: 14, color: 'grey'}}>{moment(this.state.article.publishedAt).format("MMMM DD, YYYY")}</div>
                </div>}
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', maxWidth: 600, margin: 'auto'}}>
                    <Dropdown.Divider style={{flex: '1 1 auto'}} />
                    <a style={{textDecoration: 'none', marginLeft: 15, color: '#0d6efd', cursor: 'pointer'}}
                        onClick={(event) => this.goToArticles(event)}>
                        Back to the listing
                    </a>
                </div>
                <div style={{maxWidth: 600, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', margin: 'auto'}}>
                    {this.props.match.params.id > 1 && 
                    <a style={{textDecoration: 'none', marginRight: 10, cursor: 'pointer', color: '#0d6efd'}} 
                        onClick={(event) => this.previous(event)}>
                            &lt; Previous
                    </a>}
                    {this.props.match.params.id > 1 && this.props.match.params.id < this.state.articles.length && <div>-</div>}
                    {this.props.match.params.id < this.state.articles.length && 
                    <a style={{textDecoration: 'none', marginLeft: 10, cursor: 'pointer', color: '#0d6efd'}} 
                        onClick={(event) => this.next(event)}>
                            Next &gt;
                    </a>}
                </div>
            </div>
        );
    }
};

export default SingleArticle;
