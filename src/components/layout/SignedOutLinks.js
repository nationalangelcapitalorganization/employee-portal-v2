import React from 'react'
import { Component } from 'react'
import { NavLink } from 'react-router-dom'
import M from 'materialize-css'

class SignedOutLinks extends Component {

  componentDidMount() {
    const elem = document.querySelector('.sidenav')
    const body = document.querySelector('body')
    const adjustBody = () => {
      body.style.margin = '0'
    }
    adjustBody()

    window.addEventListener('resize', adjustBody)
    M.Sidenav.init(elem, {
      inDuration: 350,
      outDuration: 350,
    })
  }

  render() {
    return (
      <div>
        <a href="#!" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        <ul className="right hide-on-med-and-down">
          <li><NavLink to='/signup'>Signup</NavLink></li>
          <li><NavLink to='/signin'>Login</NavLink></li>
        </ul>

        <ul className="sidenav" id="slide-out">
          <li><NavLink to='/signup' className="sidenav-close">Signup</NavLink></li>
          <li><NavLink to='/signin' className="sidenav-close">Login</NavLink></li>
        </ul>
      </div>
    )
  }
}

export default SignedOutLinks