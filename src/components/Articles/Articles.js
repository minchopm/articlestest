import React, { Component } from "react";
import { Dropdown, Button, DropdownButton, ButtonGroup } from "react-bootstrap";
import * as moment from 'moment';
import PropTypes from 'prop-types';

class Articles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            language: ''
        };
    }

    componentDidMount() {
        this.setState({ articles: JSON.parse(localStorage.getItem('articles')), language: localStorage.getItem('language')});
    }
    
    returnArticle(el) {
        switch(this.state.language) {
            default:
            case 'EN':
                return (
                    <>
                        <h4 onClick={() => this.props.history.push(`/articles/${el.id}`)}>{el.titleEN}</h4>
                        <div className="articlesSingleDescription">
                            {el.descriptionEN.length > 50 ? el.descriptionEN.substring(0,50)+'...' : el.descriptionEN}
                        </div>
                    </>
                )
            case 'DE':
                return (
                    <>
                        <h4 onClick={() => this.props.history.push(`/articles/${el.id}`)}>{el.titleDE}</h4>
                        <div className="articlesSingleDescription">
                            {el.descriptionDE.length > 50 ? el.descriptionDE.substring(0,50)+'...' : el.descriptionDE}
                        </div>
                    </>
                )
            case 'BG':
                return (
                    <>
                        <h4 onClick={() => this.props.history.push(`/articles/${el.id}`)}>{el.titleBG}</h4>
                        <div className="articlesSingleDescription">
                            {el.descriptionBG.length > 50 ? el.descriptionBG.substring(0,50)+'...' : el.descriptionBG}
                        </div>
                    </>
                )
        }
    }

    setLanguage(language) {
        this.setState({language: language});
        localStorage.setItem('language', language);
    }

    render() {
        return (
            <div>
                <div className="language">
                    <h1>Articles listing</h1>
                    <DropdownButton as={ButtonGroup} title={this.state.language} id="bg-nested-dropdown">
                        <Dropdown.Item eventKey='EN' onClick={() => this.setLanguage('EN')}>EN</Dropdown.Item>
                        <Dropdown.Item eventKey='DE' onClick={() => this.setLanguage('DE')}>DE</Dropdown.Item>
                        <Dropdown.Item eventKey='BG' onClick={() => this.setLanguage('BG')}>BG</Dropdown.Item>
                    </DropdownButton>
                </div>
                <Button onClick={() => this.props.history.push('/articles/add')}>Add article</Button>
                {this.state.articles.length > 0 && this.state.articles.map((el, index) =>
                <div key={index} className="articlesSingle">
                    {this.returnArticle(el)}
                    <div className="articlesSingleContainer">
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
}

Articles.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    }),
    history: PropTypes.shape({
        push: PropTypes.func
    })
}

export default Articles;
