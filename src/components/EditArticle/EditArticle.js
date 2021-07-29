import React, { Component } from "react";
import { Tabs, Tab, Form, Button } from "react-bootstrap";
import * as moment from 'moment';
import { Editor, OriginalTools } from 'react-bootstrap-editor';
import { Formik } from "formik";

class EditArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        
    }

    returnInitialValues = () => {
        if(this.props.match.params.id) {
            const articles = JSON.parse(localStorage.getItem('articles'));
            const foundArticle = articles[this.props.match.params.id-1];
            return {
                    id: foundArticle.id,
                    titleEN: foundArticle.titleEN,
                    descriptionEN: foundArticle.descriptionEN,
                    titleDE: foundArticle.titleDE,
                    descriptionDE: foundArticle.descriptionDE,
                    titleBG: foundArticle.titleBG,
                    descriptionBG: foundArticle.descriptionBG,
                    publishedAt: foundArticle.publishedAt,
                    isActive: foundArticle.isActive
            };
        } else {
            return {
                id: null,
                titleEN: '',
                descriptionEN: '',
                titleDE: '',
                descriptionDE: '',
                titleBG: '',
                descriptionBG: '',
                publishedAt: '',
                isActive: false
            }
        }
    }

    submitForm = (formProps) => {
        const articles = JSON.parse(localStorage.getItem('articles'));
        if(this.props.match.params.id) {
            const foundArticle = articles[this.props.match.params.id-1];
            foundArticle.titleEN = formProps.values.titleEN;
            foundArticle.descriptionEN = formProps.values.descriptionEN;
            foundArticle.titleDE = formProps.values.titleDE;
            foundArticle.descriptionDE = formProps.values.descriptionDE;
            foundArticle.titleBG = formProps.values.titleBG;
            foundArticle.descriptionBG = formProps.values.descriptionBG;
            foundArticle.publishedAt = formProps.values.publishedAt;
            foundArticle.isActive = formProps.values.isActive;
        } else {
            const newArticle = {
                id: +articles[articles.length-1].id+1,
                titleEN: formProps.values.titleEN,
                descriptionEN: formProps.values.descriptionEN,
                titleDE: formProps.values.titleDE,
                descriptionDE: formProps.values.descriptionDE,
                titleBG: formProps.values.titleBG,
                descriptionBG: formProps.values.descriptionBG,
                publishedAt: formProps.values.publishedAt,
                isActive: formProps.values.isActive
            };
            articles.push(newArticle);
        }
        localStorage.setItem('articles', JSON.stringify(articles));
        this.props.history.push('/articles');
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
                    <Formik initialValues={this.returnInitialValues()}>
                        {(formProps) => (
                            <Form className="py-3">
                                <Tabs defaultActiveKey="english" id="uncontrolled-tab-example" className="mb-3">
                                    <Tab eventKey="english" title="English">
                                        <Form.Group className="mb-3 otherGroup" controlId="exampleForm.ControlInput1">
                                            <Form.Label>
                                                Title <span className="red">*</span>
                                            </Form.Label>
                                            <Form.Control type="text" placeholder="Enter article title" name="titleEN" onChange={(event) => {
                                                formProps.setFieldValue('titleEN', event.target.value);
                                            }} value={formProps.values.titleEN} />
                                        </Form.Group>
                                        <Form.Group className="mb-3 contentGroup" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Content <span className="red">*</span></Form.Label>
                                            <Editor
                                                tools={OriginalTools}
                                                value={formProps.values.descriptionEN}
                                                onChange={(value) => formProps.setFieldValue('descriptionEN', value)}
                                            />
                                        </Form.Group>
                                    </Tab>
                                    <Tab eventKey="german" title="German">
                                        <Form.Group className="mb-3 otherGroup" controlId="exampleForm.ControlInput1">
                                            <Form.Label>
                                                Title <span className="red">*</span>
                                            </Form.Label>
                                            <Form.Control type="text" placeholder="Enter article title" name="titleDE" onChange={(event) => {
                                                formProps.setFieldValue('titleDE', event.target.value);
                                            }} value={formProps.values.titleDE} />
                                        </Form.Group>
                                        <Form.Group className="mb-3 contentGroup" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Content <span className="red">*</span></Form.Label>
                                            <Editor
                                                tools={OriginalTools}
                                                value={formProps.values.descriptionDE}
                                                onChange={(value) => formProps.setFieldValue('descriptionDE', value)}
                                            />
                                        </Form.Group>
                                    </Tab>
                                    <Tab eventKey="bulgarian" title="Bulgarian">
                                        <Form.Group className="mb-3 otherGroup" controlId="exampleForm.ControlInput1">
                                            <Form.Label>
                                                Title <span className="red">*</span>
                                            </Form.Label>
                                            <Form.Control type="text" placeholder="Enter article title" name="titleBG" onChange={(event) => {
                                                formProps.setFieldValue('titleBG', event.target.value);
                                            }} value={formProps.values.titleBG} />
                                        </Form.Group>
                                        <Form.Group className="mb-3 contentGroup" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Content <span className="red">*</span></Form.Label>
                                            <Editor
                                                tools={OriginalTools}
                                                value={formProps.values.descriptionBG}
                                                onChange={(value) => formProps.setFieldValue('descriptionBG', value)}
                                            />
                                        </Form.Group>
                                    </Tab>
                                </Tabs>
                                <Form.Group className="mb-3 otherGroup" controlId="formBasicCheckbox">
                                    <Form.Label>
                                        Date <span className="red">*</span>
                                    </Form.Label>
                                    <Form.Control type="date" name='publishedAt' onChange={(event) => formProps.setFieldValue('publishedAt', event.target.value)} 
                                        value={formProps.values.publishedAt} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Is Active" name="isActive" onChange={() => formProps.setFieldValue('isActive', !formProps.values.isActive)} checked={formProps.values.isActive} />
                                </Form.Group>
                                <Button variant="primary" onClick={() => this.submitForm(formProps)} 
                                    disabled={!formProps.values.title || !formProps.values.description || !formProps.values.publishedAt}
                                >
                                    Submit
                                </Button>
                            </Form>
                        )}
                        
                    </Formik>
                </div>
            </div>
        );
    }
};

export default EditArticle;