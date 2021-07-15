import React, { Component } from "react";
import { Dropdown, Button } from "react-bootstrap";
import * as moment from 'moment';

class SingleArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            article: null
        };
    }

    componentDidMount() {
        fetch('https://newsapi.org/v2/everything?q=tesla&from=2021-06-15&sortBy=publishedAt&apiKey=896880d12b9340439f6e0519e2f9a449')
            .then(res => res.json())
            .then(res => {
            if(res.status === 'ok') {
                this.setState({article: res.articles[this.props.match.params.id-1]});
            }
        });
    }

    render() {
        return (
            <div style={{marginLeft: 15}}>
                <h1>Articles Details</h1>
                {this.state.article && <div style={{textAlign: 'left', maxWidth: 600}}>

                    <h4 style={{color: '#4EAACD', margin: '10px 0', cursor: 'pointer', width: 'fit-content'}}>Article {this.props.match.params.id}</h4>
                    <div style={{marginBottom: 5}}>{this.state.article.description ? this.state.article.description : 'Lorem ipsum '}</div>
                    <div>{moment(this.state.article.publishedAt).format("MMMM DD, YYYY")}</div>
                </div>}
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', maxWidth: 600}}>
                    <Dropdown.Divider style={{flex: '1 1 auto'}} /><a href="/articles" style={{textDecoration: 'none', marginLeft: 15}}>Back to the listing</a>
                </div>
                <div style={{maxWidth: 600}}>
                    
                </div>
            </div>
        );
    }
};

export default SingleArticle;
