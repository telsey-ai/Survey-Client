import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import { Button } from 'react-bootstrap'
// import Nav from 'react-bootstrap/Nav'
import { updateSurvey, indexSurvey } from '../../api/surveys'
import messages from '../AutoDismissAlert/messages'

class EditSurvey extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: props.user,
      survey: props.user.surveys.filter(survey => survey._id === this.props.match.params.id).pop()

    }
  }
  // const { msgAlert, history, setUser, user } = this.props
  componentDidMount () {
    // const { msgAlert, history, setUser, user } = this.props
    // console.log(this.state)
    // const { user } = this.props
    // console.log('this ran', user.surveys.filter(survey => survey._id === this.props.match.params.id)[0])
    // console.log(user)
  }

  handleChange = (event) => {
    // create an object with the key/value of the field I'm typing in
    const updatedField = {
      [event.target.name]: event.target.value
    }

    // merge state and updatedField
    // merge updatedField INTO this.state.book
    // assign updatedField TO this.state.book
    const editedBook = Object.assign(this.state.survey, updatedField)

    // set the state
    this.setState({ book: editedBook })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert, history, setUser, user } = this.props

    updateSurvey(this.state.survey, user, this.props.match.params.id)
      .then(res => indexSurvey(user))
      .then(res => {
        // console.log(res.data.user)
        setUser(res.data.user)
      })
      .then(() => msgAlert({
        heading: 'Update Survey Success',
        message: messages.updateSurveySuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: 'Update Survey Failed with error: ' + error.message,
          message: messages.updateSurveyFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    // const { user } = this.props
    // console.log(user)
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Title</label>
        <input
          placeholder="Book Title"
          name="title"
          value={this.state.survey.title || ''}
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default withRouter(EditSurvey)
