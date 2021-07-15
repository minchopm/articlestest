import React, { Component } from "react";
import { Tabs, Tab, Form, Button } from "react-bootstrap";
import * as moment from 'moment';

class EditArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
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
                    <Form style={{textAlign: 'left'}}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter article title" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter article content" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" name='date_of_birth' />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Is Active" />
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