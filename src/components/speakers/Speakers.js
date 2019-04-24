import React, { Component } from "react"
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {

  render() {

    const { auth } = this.props
    if (!auth.uid) { return <Redirect to='/signin' /> }

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <div>
              <h2 className={`pink-text text-darken-3`}>Manage Speakers</h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.firestore.ordered.articles,
    auth: state.firebase.auth,
  }
}

export default compose(
  connect(mapStateToProps)
)(Dashboard)