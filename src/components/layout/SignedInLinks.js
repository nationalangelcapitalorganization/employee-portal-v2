import React from 'react'
import { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import M from 'materialize-css'

class SignedInLinks extends Component {

  sideNavActiveApp(speakerApp) {
    if (speakerApp) {
      return <ul className="sidenav sidenav-fixed">
        <li className="grey darken-3"><img src="/img/NACO_Logo.png" alt="National Angel Capital Organization" /></li>
        <li><NavLink to='/' className="sidenav-close pink-text text-lighten-1 grey lighten-3"><i className="material-icons pink-text text-lighten-1">library_books</i>NACOPedia</NavLink></li>
        <li><NavLink to='/speakers' className="sidenav-close"><i className="material-icons">people</i>Speakers</NavLink></li>
        <li><div className="divider"></div></li>
        <li><a href="#!" onClick={this.props.signOut} className="sidenav-close">Log Out</a></li>
      </ul>
    } else {
      return <ul className="sidenav sidenav-fixed">
        <li className="grey darken-3"><img src="/img/NACO_Logo.png" alt="National Angel Capital Organization" /></li>
        <li><NavLink to='/' className="sidenav-close"><i className="material-icons">library_books</i>NACOPedia</NavLink></li>
        <li><NavLink to='/speakers' className="sidenav-close pink-text text-lighten-1 grey lighten-3"><i className="material-icons pink-text text-lighten-1">people</i>Speakers</NavLink></li>
        <li><div className="divider"></div></li>
        <li><a href="#!" onClick={this.props.signOut} className="sidenav-close">Log Out</a></li>
      </ul>
    }
  }

  topNavActiveApp(speakerApp) {
    if (speakerApp) {
      return <ul className="right hide-on-med-and-down">
        <li><NavLink to='/create'>New Article</NavLink></li>
        <li><NavLink to='/userarticles' className='btn btn-floating pink lighten-1'>{this.props.profile.initials}</NavLink></li>
      </ul>
    } else {
      return <ul className="right hide-on-med-and-down">
        <li><NavLink to='/createspeaker'>New Speaker</NavLink></li>
        <li><div style={{cursor: "default", marginLeft: "10px"}} className='btn btn-floating pink lighten-1'>{this.props.profile.initials}</div></li>
      </ul>
    }
  }


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

{/* Top Nav */}

        <a href="#!" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        {this.topNavActiveApp(this.props.speakerApp)}

{/* SideNav for mobile */}

        <ul className="sidenav signedIn-sidenav" id="slide-out">
          <li>
            <div className="user-view">
              <div className="background">
                <img src="/img/nav-mobile-top-bg.jpg" alt="Office Buildings" />
              </div>
              <div className='btn btn-floating pink lighten-1'>{this.props.profile.initials}</div>
              <span className="white-text pink lighten-1 badge">{this.props.profile.firstName} {this.props.profile.lastName}</span>
              <span className="white-text pink lighten-1 badge">{this.props.email}</span>
            </div>
          </li>        
          <li><a className="dropdown-trigger" href="#!" data-target="dropdown1"><i className="material-icons">library_books</i>NACOPedia<i className="material-icons right">arrow_drop_down</i></a></li>
          <ul id='dropdown1' className='dropdown-content'>
            <li><NavLink to='/' className="sidenav-close">Dashboard</NavLink></li>
            <li><NavLink to='/create' className="sidenav-close">New Article</NavLink></li>
            <li><NavLink to='/userarticles' className="sidenav-close">My Articles</NavLink></li>
          </ul>
          <li><a className="dropdown-trigger" href="#!" data-target="dropdown2"><i className="material-icons">people</i>Speakers<i className="material-icons right">arrow_drop_down</i></a></li>
          <ul id='dropdown2' className='dropdown-content'>
            <li><NavLink to='/createspeaker' className="sidenav-close">Add Speaker</NavLink></li>
            <li><NavLink to='/speakers' className="sidenav-close">Review Speakers</NavLink></li>
          </ul>
          <li><div className="divider"></div></li>
          <li><a href="#!" onClick={this.props.signOut} className="sidenav-close">Log Out</a></li>
        </ul>

{/* SideNav for full screen */}

        { this.sideNavActiveApp(this.props.speakerApp)}


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