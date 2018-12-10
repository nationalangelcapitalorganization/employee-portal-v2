import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUp } from '../../store/actions/authActions'

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    errors: {}
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { errors, ...submission } = this.state
    let error = false
    for (let item in submission) {
      if (submission[item] === '') {
        let errorMessage = ''

        switch (item) {
          case 'email':
            errorMessage = 'Please enter a valid email'
            break
          case 'password':
            errorMessage = 'Please enter a password'
            break
          case 'firstName':
            errorMessage = 'Please enter a first name'
            break
          case 'lastName':
            errorMessage = 'Please enter a last name'
            break
          default:
            errorMessage = ''
        }

        this.setState((prevState) => ({ errors: { ...prevState.errors, [item]: errorMessage } }))
        error = true
      } else {
        this.setState((prevState) => ({ errors: { ...prevState.errors, [item]: '' } }))
      }
    }
    if (error) {
      this.setState((prevState) => ({ errors: { ...prevState.errors, general: 'There were errors in your submission. Please review your details and try again.' } }))
      return
    }

    this.props.signUp(submission)
  }

  render() {
    const { auth, authError } = this.props
    if (auth.uid) { return <Redirect to='/' /> }
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={this.handleChange} />
            <span className="validation-text">{this.state.errors.firstName}</span>
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.handleChange} />
            <span className="validation-text">{this.state.errors.lastName}</span>
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
            <span className="validation-text">{this.state.errors.email}</span>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
            <span className="validation-text">{this.state.errors.password}</span>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
            <div><span className="validation-text">{this.state.errors.general}</span></div>
            <div className="red-text center">
              { authError ? <p>{ authError }</p> : null }
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const matchDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(SignUp)
