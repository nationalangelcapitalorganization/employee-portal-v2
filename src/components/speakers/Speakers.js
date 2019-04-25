import React, { Component } from "react"
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { removeSpeaker } from '../../store/actions/speakerActions'
import { Table, Modal, Button } from "react-materialize";
import moment from 'moment'

class Dashboard extends Component {

  render() {

    const { auth, speakers, removeSpeaker } = this.props
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
                    <th data-field="name">Company</th>
                    <th data-field="price">Status</th>
                    <th data-field="price">Created</th>
                    <th data-field="price">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>

                  {speakers && speakers.map(speaker => {
                      return (
                        <tr key={speaker.id}>
                          <td>{speaker.firstName} {speaker.lastName}</td>
                          <td>{speaker.company}</td>
                          <td>{speaker.publish ? "Published" : "Not Published"}</td>
                          <td>{speaker.createdAt ? moment(speaker.createdAt.toDate()).calendar() : null}</td>
                          <td><Modal
                            trigger={
                              <Button style={{fontWeight: 'bold',}} className='transparent text-lighten-1 red-text z-depth-0 button-spacing delete-button' waves='light'>X</Button>
                            }
                            header='Delete this speaker?'
                            actions={
                              <div>
                                <Button onClick={() => { removeSpeaker(speaker) }} className="modal-close red lighten-1 btn z-depth-0 yes-button">
                                  I am sure
                </Button>
                                <Button className="btn lighten-1 z-depth-0 modal-close">
                                  No, I will keep this speaker
                </Button>       </div>
                            }
                          ><p>Are you sure you want to delete this speaker?</p>
                            <p>This action can't be undone.</p>
                          </Modal>
                </td>
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

const mapDispatchToProps = (dispatch) => {
  return {
    removeSpeaker: (speaker) => dispatch(removeSpeaker(speaker))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'speakers' },
  ])
)(Dashboard)