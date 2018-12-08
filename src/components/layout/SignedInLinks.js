import React from 'react'
import { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import M from 'materialize-css'

class SignedInLinks extends Component {

  state = {
    instance: null
  }

  componentDidMount() {
    const elem = document.querySelector('.sidenav')
    const instance = M.Sidenav.init(elem, {
      inDuration: 350,
      outDuration: 350
    })
    this.setState({instance: instance})
  }

  render() {
    return (
      <div>
        <a href="#!" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        <ul className="right hide-on-med-and-down">
          <li><NavLink to='/create'>New Article</NavLink></li>
          <li><a href="#!" onClick={this.props.signOut}>Log Out</a></li>
          <li><NavLink to='/userarticles' className='btn btn-floating pink lighten-1'>{this.props.profile.initials}</NavLink></li>
        </ul>

        <ul className="sidenav signedIn-sidenav" id="slide-out">
          <li>
            <div className="user-view">
              <div className="background">
                <img src="/img/nav-mobile-top-bg.jpg" alt="Office Buildings" />
              </div>
              <NavLink to='/userarticles' className='btn btn-floating pink lighten-1 sidenav-close'>{this.props.profile.initials}</NavLink>
              <span className="white-text pink lighten-1 badge">{this.props.profile.firstName} {this.props.profile.lastName}</span>
              <span className="white-text pink lighten-1 badge">{this.props.email}</span>
            </div>
          </li>
          <li><NavLink to='/create' className="sidenav-close">New Article</NavLink></li>
          <li><a href="#!" onClick={this.props.signOut} className="sidenav-close">Log Out</a></li>
        </ul>
    </div>
          )
        }
      }

const mapDispatchToProps = (dispatch) => {
  return {
            signOut: () => dispatch(signOut())
        }
      }

export default connect(null, mapDispatchToProps)(SignedInLinks)