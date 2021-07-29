import React, { Component } from "react";
import { Tabs, Tab, Form, Button } from "react-bootstrap";
import * as moment from 'moment';
import { Editor, OriginalTools } from 'react-bootstrap-editor';
import { Formik } from "formik";

class EditArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            missingFields: []
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
        if(this.disabledButton(formProps.values)) {
            this.setState({submitted: true, missingFields: this.validations(formProps.values)});
            return;
        }
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

    disabledButton = (values) => {
        return !values.titleEN || !values.descriptionEN || !values.titleDE || !values.descriptionDE || !values.titleBG || !values.descriptionBG || !values.publishedAt;
    }

    validations = (values) => {
        const validationsArray = [];
        const validationsMessages = {
            titleEN: 'Missing English title',
            descriptionEN: 'Missing English description',
            titleDE: 'Missing German title',
            descriptionDE: 'Missing German description',
            titleBG: 'Missing Bulgarian title',
            descriptionBG: 'Missing Bulgarian description',
            publishedAt: 'Missing Publishing date'
        };
        ['titleEN', 'descriptionEN', 'titleDE', 'descriptionDE', 'titleBG', 'descriptionBG', 'publishedAt'].forEach((el) => {
            if(!values[el]) {
                validationsArray.push(validationsMessages[el]);
            }
        });
        return validationsArray;
    }

    setValue = (fieldValue, value, formProps) => {
        formProps.setFieldValue(fieldValue, value);
        this.setState({missingFields: this.validations({...formProps.values, [fieldValue]: value})});
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
                                            <Form.Control type="text" placeholder="Enter article title" name="titleEN" 
                                                onChange={(event) => this.setValue('titleEN', event.target.value, formProps)}
                                                value={formProps.values.titleEN} />
                                        </Form.Group>
                                        <Form.Group className="mb-3 contentGroup" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Content <span className="red">*</span></Form.Label>
                                            <Editor
                                                tools={OriginalTools}
                                                value={formProps.values.descriptionEN}
                                                onChange={(value) => this.setValue('descriptionEN', value, formProps)}
                                            />
                                        </Form.Group>
                                    </Tab>
                                    <Tab eventKey="german" title="German">
                                        <Form.Group className="mb-3 otherGroup" controlId="exampleForm.ControlInput1">
                                            <Form.Label>
                                                Title <span className="red">*</span>
                                            </Form.Label>
                                            <Form.Control type="text" placeholder="Enter article title" name="titleDE" 
                                                onChange={(event) => this.setValue('titleDE', event.target.value, formProps)}
                                                value={formProps.values.titleDE} />
                                        </Form.Group>
                                        <Form.Group className="mb-3 contentGroup" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Content <span className="red">*</span></Form.Label>
                                            <Editor
                                                tools={OriginalTools}
                                                value={formProps.values.descriptionDE}
                                                onChange={(value) => this.setValue('descriptionDE', value, formProps)}
                                            />
                                        </Form.Group>
                                    </Tab>
                                    <Tab eventKey="bulgarian" title="Bulgarian">
                                        <Form.Group className="mb-3 otherGroup" controlId="exampleForm.ControlInput1">
                                            <Form.Label>
                                                Title <span className="red">*</span>
                                            </Form.Label>
                                            <Form.Control type="text" placeholder="Enter article title" name="titleBG"
                                                onChange={(event) => this.setValue('titleBG', event.target.value, formProps)}
                                                value={formProps.values.titleBG} />
                                        </Form.Group>
                                        <Form.Group className="mb-3 contentGroup" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Content <span className="red">*</span></Form.Label>
                                            <Editor
                                                tools={OriginalTools}
                                                value={formProps.values.descriptionBG}
                                                onChange={(value) => this.setValue('descriptionBG', value, formProps)}
                                            />
                                        </Form.Group>
                                    </Tab>
                                </Tabs>
                                <Form.Group className="mb-3 otherGroup" controlId="formBasicCheckbox">
                                    <Form.Label>
                                        Date <span className="red">*</span>
                                    </Form.Label>
                                    <Form.Control type="date" name='publishedAt' 
                                        onChange={(event) => this.setValue('publishedAt', event.target.value, formProps)}
                                        value={formProps.values.publishedAt} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Is Active" name="isActive" onChange={() => formProps.setFieldValue('isActive', !formProps.values.isActive)} checked={formProps.values.isActive} />
                                </Form.Group>
                                {
                                    this.state.submitted && this.state.missingFields.map((el, index) => 
                                    <div key={index} className="red">
                                        {el}
                                    </div>)
                                }
                                <Button variant="primary" onClick={() => this.submitForm(formProps)} style={{marginTop: '10px'}}>
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