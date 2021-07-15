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
        fetch('https://newsapi.org/v2/everything?q=tesla&from=2021-06-15&sortBy=publishedAt&apiKey=896880d12b9340439f6e0519e2f9a449')
            .then(res => res.json())
            .then(res => {
            if(res.status === 'ok') {
                this.setState({articles: res.articles});
            }
        });
    }

    render() {
        return (
            <div style={{marginLeft: 15}}>
                <h1>Articles listing</h1>
                {this.state.articles.length > 0 && this.state.articles.map((el, index) =>
                <div style={{maxWidth: 600, textAlign: 'left'}} key={index}>
                    <h4 style={{color: '#4EAACD', margin: '10px 0', cursor: 'pointer', width: 'fit-content'}} onClick={() => this.props.history.push(`/articles/${index+1}`)}>Article {index+1}</h4>
                    <div style={{flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 5}}>{el.description ? el.description : 'Lorem ipsum '}</div>
                    <div>{moment(el.publishedAt).format("MMMM DD, YYYY")}</div>
                    <Dropdown.Divider />
                </div>
                )}
            </div>
        );
    }
};

export default Articles;
