import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import * as moment from 'moment';

class Articles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: []
        };
    }

    componentDidMount() {
        this.setState({ articles: JSON.parse(localStorage.getItem('articles'))})
    }

    render() {
        return (
            <div style={{marginLeft: 15}}>
                <h1>Articles listing</h1>
                {this.state.articles.length > 0 && this.state.articles.map((el, index) =>
                <div style={{maxWidth: 600, textAlign: 'left', margin: 'auto'}} key={index}>
                    <h4 style={{color: '#4EAACD', margin: '10px 0', cursor: 'pointer', width: 'fit-content'}} onClick={() => this.props.history.push(`/articles/${index+1}`)}>{el.title}</h4>
                    <div style={{flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 5}}>{el.description}</div>
                    <div style={{fontSize: 14, color: 'grey'}}>{moment(el.publishedAt).format("MMMM DD, YYYY")}</div>
                    <Dropdown.Divider />
                </div>
                )}
            </div>
        );
    }
};

export default Articles;
