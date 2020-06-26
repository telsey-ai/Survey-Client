import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'

class Surveys extends Component {
  constructor (props) {
    super(props)
    this.state = props.user
  }
  // const { msgAlert, history, setUser, user } = this.props
  componentDidMount () {
    // const { msgAlert, history, setUser, user } = this.props
    console.log(this.state)
    // console.log(user)
  }

  render () {
    const { user } = this.props
    return (
      <div className="row">
        <ul className="col-sm-12 my-auto">
          {user.surveys.map(item => (
            <li key={item._id}>
              <div>{item.title}</div>
            </li>
          ))}
        </ul>
        <Nav.Link href="#create-surveys">{<Button variant="primary">Create Survey</Button>}</Nav.Link>
      </div>
    )
  }
}

export default withRouter(Surveys)
