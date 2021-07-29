import React, { Component } from "react";
import { Dropdown, Button } from "react-bootstrap";
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
                <Button onClick={() => this.props.history.push('/articles/add')}>Add article</Button>
                {this.state.articles.length > 0 && this.state.articles.map((el, index) =>
                <div style={{maxWidth: 600, textAlign: 'left', margin: 'auto'}} key={index}>
                    <h4 style={{color: '#4EAACD', margin: '10px 0', cursor: 'pointer', width: 'fit-content'}} onClick={() => this.props.history.push(`/articles/${el.id}`)}>{el.titleEN}</h4>
                    <div style={{flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 5}}>
                        {el.descriptionEN.length > 50 ? el.descriptionEN.substring(0,50)+'...' : el.descriptionEN}
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div style={{fontSize: 14, color: 'grey'}}>
                            {moment(el.publishedAt).format("MMMM DD, YYYY")}
                        </div>
                        <Button onClick={() => this.props.history.push(`/articles/edit/${el.id}`)}>Edit article</Button>
                    </div>
                    <Dropdown.Divider />
                </div>
                )}
            </div>
        );
    }
};

export default Articles;
