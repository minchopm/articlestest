import React, { Component } from "react";
import { Tabs, Tab, Form, Button } from "react-bootstrap";
import * as moment from 'moment';
import { Editor, OriginalTools } from 'react-bootstrap-editor';

class EditArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            date: '',
            isActive: false
        };
    }

    componentDidMount() {
        if(this.props.match.params.id) {
            
        }
    }

    submitForm = (event) => {
        event.preventDefault();
        console.log('state', this.state)
    }

    render() {
        return (
            <div style={{marginLeft: 15}}>
                <div style={{maxWidth: 600}}>
                    <h1>Edit Article</h1>
                    <Tabs defaultActiveKey="english" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="english" title="English">
                        </Tab>
                        <Tab eventKey="german" title="German">
                        </Tab>
                        <Tab eventKey="bulgarian" title="Bulgarian">
                        </Tab>
                    </Tabs>
                    <Form style={{textAlign: 'left'}} onSubmit={this.submitForm}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter article title" onChange={(event) => this.setState({title: event.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                            <Form.Label>Content</Form.Label>
                            <Editor
                                tools={OriginalTools}
                                value={this.state.content}
                                onChange={(value) => this.setState({content: value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" name='date_of_birth' onChange={(event) => this.setState({date: event.target.value})} value={this.state.date} />
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