import React, { Component } from "react";
import { Tabs, Tab, Form, Button } from "react-bootstrap";
import * as moment from 'moment';
import { Editor, OriginalTools } from 'react-bootstrap-editor';

class EditArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: '',
            description: '',
            publishedAt: '',
            isActive: false
        };
    }

    componentDidMount() {
        if(this.props.match.params.id) {
            const articles = JSON.parse(localStorage.getItem('articles'));
            const foundArticle = articles[this.props.match.params.id-1];
            this.setState({
                id: foundArticle.id,
                title: foundArticle.title,
                description: foundArticle.description,
                publishedAt: foundArticle.publishedAt,
                isActive: foundArticle.isActive
            });
        }
    }

    submitForm = (event) => {
        event.preventDefault();
        const articles = JSON.parse(localStorage.getItem('articles'));
        if(this.props.match.params.id) {
            const foundArticle = articles[this.props.match.params.id-1];
            foundArticle.title = this.state.title;
            foundArticle.description = this.state.description;
            foundArticle.publishedAt = this.state.publishedAt;
            foundArticle.isActive = this.state.isActive;
            localStorage.setItem('articles', JSON.stringify(articles));
            this.props.history.push('/articles');
        } else {
            const newArticle = {
                id: +articles[articles.length-1].id+1,
                title: this.state.title,
                description: this.state.description,
                publishedAt: this.state.publishedAt,
                isActive: this.state.isActive
            };
            articles.push(newArticle);
            localStorage.setItem('articles', JSON.stringify(articles));
            this.props.history.push('/articles');
        }
    }

    render() {
        return (
            <div style={{marginLeft: 15}}>
                <div style={{maxWidth: 600}}>
                    {
                        this.props.match.params.id 
                        ? <h1>Edit Article</h1> 
                        : <h1>Add Article</h1>
                    }
                    <Tabs defaultActiveKey="english" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="english" title="English">
                        </Tab>
                        <Tab eventKey="german" title="German">
                        </Tab>
                        <Tab eventKey="bulgarian" title="Bulgarian">
                        </Tab>
                    </Tabs>
                    <Form style={{textAlign: 'left'}} onSubmit={this.submitForm}>
                        <Form.Group className="mb-3 otherGroup" controlId="exampleForm.ControlInput1">
                            <Form.Label>
                                Title <span className="red">*</span>
                            </Form.Label>
                            <Form.Control type="text" placeholder="Enter article title" onChange={(event) => this.setState({title: event.target.value})} 
                            value={this.state.title} />
                        </Form.Group>
                        <Form.Group className="mb-3 contentGroup" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Content <span className="red">*</span></Form.Label>
                            <Editor
                                tools={OriginalTools}
                                value={this.state.description}
                                onChange={(value) => this.setState({description: value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 otherGroup" controlId="formBasicCheckbox">
                            <Form.Label>
                                Date <span className="red">*</span>
                            </Form.Label>
                            <Form.Control type="date" name='date_of_birth' onChange={(event) => this.setState({publishedAt: event.target.value})} value={this.state.publishedAt} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Is Active" onChange={() => this.setState({isActive: !this.state.isActive})} checked={this.state.isActive} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
};

export default EditArticle;