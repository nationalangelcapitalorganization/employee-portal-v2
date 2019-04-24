import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const Navbar = (props) => {
  const { auth, profile } = props
  let speakerApp = props.location.pathname !== '/createspeaker' && props.location.pathname !== '/speakers'
  const links = auth.uid ? <SignedInLinks profile={profile} speakerApp={speakerApp} email={auth.email} /> : <SignedOutLinks />
  const headerLogo = speakerApp ? <Link to='/' className="brand-logo logo"><i className="material-icons">library_books</i>NACOPedia</Link> : <Link to='/speakers' className="brand-logo logo"><i className="material-icons">people</i>Speakers</Link>
  return (
    <nav id="navigation-bar" className="nav-wrapper grey darken-2">
      <div className="container">
        { headerLogo }
        {links}
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default withRouter(connect(mapStateToProps)(Navbar))