import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { createSurvey } from '../../api/surveys'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreateSurveys extends Component {
  constructor () {
    super()

    this.state = {
      title: '',
      question: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onCreateSurvey = event => {
    event.preventDefault()

    const { msgAlert, history, setUser, user } = this.props

    createSurvey(this.state, user)
      .then(res => {
        console.log(res.data.user)
        setUser(res.data.user)
      })
      .then(() => msgAlert({
        heading: 'Create Survey Success',
        message: messages.createSurveySuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: 'Create Survey Failed with error: ' + error.message,
          message: messages.createSurveyFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { title, question } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Create Survey</h3>
          <Form onSubmit={this.onCreateSurvey}>
            <Form.Group controlId="title">
              <Form.Label>Survey Title</Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                value={title}
                placeholder="Survey Title"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="question">
              <Form.Label>Question</Form.Label>
              <Form.Control
                required
                name="question"
                value={question}
                type="text"
                placeholder="Question"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(CreateSurveys)
