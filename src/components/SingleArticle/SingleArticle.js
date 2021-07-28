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
                    <Dropdown.Divider style={{flex: '1 1 auto'}} /><a href="/articles" style={{textDecoration: 'none', marginLeft: 15}}>Back to the listing</a>
                </div>
                <div style={{maxWidth: 600, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', margin: 'auto'}}>
                    {this.props.match.params.id > 1 && <a href={`/articles/${+this.props.match.params.id-1}`} style={{textDecoration: 'none', marginRight: 10}}>&lt; Previous</a>}
                    {this.props.match.params.id > 1 && this.props.match.params.id < this.state.articles.length && <div>-</div>}
                    {this.props.match.params.id < this.state.articles.length && <a href={`/articles/${+this.props.match.params.id+1}`} style={{textDecoration: 'none', marginLeft: 10}}>Next &gt;</a>}
                </div>
            </div>
        );
    }
};

export default SingleArticle;
