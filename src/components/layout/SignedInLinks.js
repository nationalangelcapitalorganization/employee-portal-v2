import React from 'react'
import { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import M from 'materialize-css'

class SignedInLinks extends Component {


  componentDidMount() {
    const sidenav = document.querySelector('.sidenav')
    const dropdowns = document.querySelectorAll('.dropdown-trigger')
    const body = document.querySelector('body')
    const adjustBody = () => {
      if (window.innerWidth < 993) {
        body.style.margin = '0'
      } else {
        body.style.margin = '0 0 0 160px'
      }
    }
    adjustBody()

    window.addEventListener('resize', adjustBody)


    M.Sidenav.init(sidenav, {
      inDuration: 350,
      outDuration: 350,
    })
    M.Dropdown.init(dropdowns, {
      inDuration: 350,
      outDuration: 350,
      closeOnClick: true,
      constrainWidth: true,
      coverTrigger: false,
    })

  }

  render() {
    return (
      <div>
        <a href="#!" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        <ul className="right hide-on-med-and-down">
          <li><NavLink to='/create'>New Article</NavLink></li>
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
          
          <li><a className="dropdown-trigger" href="#!" data-target="dropdown1">NACOPedia<i className="material-icons right">arrow_drop_down</i></a></li>
          <ul id='dropdown1' className='dropdown-content'>
            <li><NavLink to='/' className="sidenav-close">Dashboard</NavLink></li>
            <li><NavLink to='/create' className="sidenav-close">New Article</NavLink></li>
            <li><NavLink to='/userarticles' className="sidenav-close">My Articles</NavLink></li>
          </ul>
          <li><a className="dropdown-trigger" href="#!" data-target="dropdown2">Speakers<i className="material-icons right">arrow_drop_down</i></a></li>
          <ul id='dropdown2' className='dropdown-content'>
            <li><NavLink to='#' className="sidenav-close">Add Speaker</NavLink></li>
            <li><NavLink to='#' className="sidenav-close">Review Speakers</NavLink></li>
          </ul>
          <li><div className="divider"></div></li>
          <li><a href="#!" onClick={this.props.signOut} className="sidenav-close">Log Out</a></li>
        </ul>

        <ul className="sidenav sidenav-fixed">
          <li className="grey darken-3"><img src="/img/NACO_Logo.png" alt="National Angel Capital Organization" /></li>
          <li><NavLink to='/' className="sidenav-close">NACOPedia</NavLink></li>
          <li><NavLink to='#' className="sidenav-close">Speakers</NavLink></li>
          <li><div className="divider"></div></li>
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