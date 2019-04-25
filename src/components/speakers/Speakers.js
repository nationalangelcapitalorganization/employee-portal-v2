import React, { Component } from "react"
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { Table } from "react-materialize";
import moment from 'moment'

class Dashboard extends Component {

  render() {

    const { auth, speakers } = this.props
    console.log(speakers)
    if (!auth.uid) { return <Redirect to='/signin' /> }

    return (
      <div className="speakers container">
        <div className="row">
          <div className="col">
            <div>
              <h2 className={`pink-text text-darken-3`}>Manage Speakers</h2>
              <Table>
                <thead>
                  <tr>
                    <th data-field="id">Name</th>
                    <th data-field="name">Title</th>
                    <th data-field="price">Status</th>
                    <th data-field="price">Created</th>
                  </tr>
                </thead>
                <tbody>

                  {speakers && speakers.map(speaker => {
                      return (
                        <tr key={speaker.id}>
                          <td>{speaker.firstName} {speaker.lastName}</td>
                          <td>{speaker.title}</td>
                          <td>{speaker.publish ? "Published" : "Not Published"}</td>
                          <td>{speaker.createdAt ? moment(speaker.createdAt.toDate()).calendar() : null}</td>
                        </tr>
                      )
                    
                  })}

                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    speakers: state.firestore.ordered.speakers,
    auth: state.firebase.auth,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'speakers' },
  ])
)(Dashboard)