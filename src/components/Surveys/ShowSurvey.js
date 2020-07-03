import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
// import { Button } from 'react-bootstrap'
// import Nav from 'react-bootstrap/Nav'
import { deleteSurvey, indexSurvey } from '../../api/surveys'
import messages from '../AutoDismissAlert/messages'

class ShowSurvey extends Component {
  constructor (props) {
    super(props)
    this.state = props.user
  }
  // const { msgAlert, history, setUser, user } = this.props
  componentDidMount () {
    // const { msgAlert, history, setUser, user } = this.props
    console.log(this.state)
    const { user } = this.props
    console.log('this ran', user.surveys.filter(survey => survey._id === this.props.match.params.id))
    // console.log(user)
  }

  destroy = (event) => {
    event.preventDefault()

    const { msgAlert, history, user, setUser } = this.props

    deleteSurvey(user, this.props.match.params.id)
      .then(res => indexSurvey(user))
      .then(res => {
        console.log(res.data.user)
        setUser(res.data.user)
      })
      .then(() => msgAlert({
        heading: 'Delete Survey Success',
        message: messages.deleteSurveySuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: 'Delete Survey Failed with error: ' + error.message,
          message: messages.deleteSurveyFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { user } = this.props
    console.log(user)
    return (
      <div className="row">
        <ul className="col-sm-12 my-auto">
          {user.surveys.filter(survey => survey._id === this.props.match.params.id).map(item => (
            <li key={item._id}>
              <div>{item.title}</div>
            </li>
          ))}
        </ul>
        <button>
          <Link to={`/edit-surveys/${this.props.match.params.id}`}>Update Survey</Link>
        </button>
        <button onClick={this.destroy}>Delete</button>
      </div>
    )
  }
}

export default withRouter(ShowSurvey)
