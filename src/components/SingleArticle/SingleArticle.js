import React, { Component } from "react";
import { Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import * as moment from 'moment';
import PropTypes from 'prop-types';

class SingleArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            article: null,
            articles: [],
            language: ''
        };
    }

    componentDidMount() {
        const articles = JSON.parse(localStorage.getItem('articles'));
        this.setState({ articles: articles, article: articles[this.props.match.params.id-1], language: localStorage.getItem('language')});
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

    setLanguage(language) {
        this.setState({language: language});
        localStorage.setItem('language', language);
    }

    returnArticle() {
        switch(this.state.language) {
            default:
            case 'EN':
                return (
                    <>
                        <h4>{this.state.article.titleEN}</h4>
                        <div style={{marginBottom: 5}}>{this.state.article.descriptionEN}</div>
                    </>
                )
            case 'DE':
                return (
                    <>
                        <h4>{this.state.article.titleDE}</h4>
                        <div style={{marginBottom: 5}}>{this.state.article.descriptionDE}</div>
                    </>
                )
            case 'BG':
                return (
                    <>
                        <h4>{this.state.article.titleBG}</h4>
                        <div style={{marginBottom: 5}}>{this.state.article.descriptionBG}</div>
                    </>
                )
        }
    }

    render() {
        return (
            <div style={{marginLeft: 15}}>
                <div className="language">
                    <h1>Articles listing</h1>
                    <DropdownButton as={ButtonGroup} title={this.state.language} id="bg-nested-dropdown">
                        <Dropdown.Item eventKey='EN' onClick={() => this.setLanguage('EN')}>EN</Dropdown.Item>
                        <Dropdown.Item eventKey='DE' onClick={() => this.setLanguage('DE')}>DE</Dropdown.Item>
                        <Dropdown.Item eventKey='BG' onClick={() => this.setLanguage('BG')}>BG</Dropdown.Item>
                    </DropdownButton>
                </div>
                <h2>Articles Details</h2>
                {this.state.article && 
                <div className="singleArticle">

                    {this.returnArticle()}
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
}

SingleArticle.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    }),
    history: PropTypes.shape({
        push: PropTypes.func
    })
}

export default SingleArticle;
