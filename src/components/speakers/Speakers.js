import React, { Component } from "react"
import SpeakerList from './SpeakerList'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { removeSpeaker } from '../../store/actions/speakerActions'
import { Table } from "react-materialize";


function SortArrow(props) {
  if (props.sortedBy === props.column && !props.ascending) {
    return (<i className="material-icons">
      arrow_drop_up
    </i>)
  } else if (props.sortedBy === props.column && props.ascending) {
    return (<i className="material-icons">
      arrow_drop_down
</i>)
  } else {
    return ""
  }
}


class Speakers extends Component {

  state = {
    sortedBy: "",
    ascending: false
  }

  handleSort = (speakers, field) => {
    console.log(speakers, field)
    const ascending = this.state.ascending
    let sortedSpeakers = speakers.sort((a, b) => {

      if (a[field] < b[field]) {
        return ascending ?  1 : -1
      }
      if (a[field] > b[field]) {
        return ascending ? -1 : 1
      }
      return 0;
    })
    this.setState({
      sortedBy: field,
      ascending: !ascending
    })
    console.log(sortedSpeakers)
    return sortedSpeakers
  }

  render() {

    const { auth, removeSpeaker } = this.props
    let { speakers } = this.props

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
                    <th data-field="lastName" onClick={(e) => {                     
                      speakers = this.handleSort(speakers, e.currentTarget.dataset.field)
                    }}>Name <SortArrow column='lastName' sortedBy={this.state.sortedBy} ascending={this.state.ascending} /></th>
                    <th data-field="company" onClick={(e) => {
                      speakers = this.handleSort(speakers, e.currentTarget.dataset.field)
                    }}>Company <SortArrow column='company' sortedBy={this.state.sortedBy} ascending={this.state.ascending} /></th>
                    <th data-field="publish" onClick={(e) => {
                      speakers = this.handleSort(speakers, e.currentTarget.dataset.field)
                    }}>Status <SortArrow column='publish' sortedBy={this.state.sortedBy} ascending={this.state.ascending} /></th>
                    <th data-field="createdAt" onClick={(e) => {
                      speakers = this.handleSort(speakers, e.currentTarget.dataset.field)
                    }}>Created <SortArrow column='createdAt' sortedBy={this.state.sortedBy} ascending={!this.state.ascending} /></th>
                    <th data-field="delete">&nbsp;</th>
                  </tr>
                </thead>
                
                <SpeakerList speakers={speakers} removeSpeaker={removeSpeaker} />

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
)(Speakers)