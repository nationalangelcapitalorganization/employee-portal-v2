import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom'

const ProjectDetails = (props) => {
  const { project, auth, id } = props


  let editProjectButton = null

  if (project && project.authorId === auth.uid) {
    editProjectButton = <Link to={`/project/${id}/edit`} className='right btn pink lighten-1'>Edit</Link>
  }

  if (!auth.uid) { return <Redirect to='/signin' /> }

  if (project && (!(project.publish) && project.authorId !== auth.uid)) {
    return (
      <div className="container center">
        <p>This project is not yet published.</p>
      </div>
    )
  } else if (project && (project.publish || (!(project.publish) && project.authorId === auth.uid))) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            { editProjectButton }
            <span className="card-title">{project.title}</span>
            <p className="unpublished-container">{project.publish ? null : <span className="white-text pink lighten-1 unpublished">Not yet Published</span>}</p>
            <div>{ReactHtmlParser(project.content)}</div>
          </div>
          <div className="card-action greyj lighten-4 grey-text">
            <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
            <div>{moment(project.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading Project...</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id
  const projects = state.firestore.data.projects
  const project = projects ? projects[id] : null
  return {
    project: project,
    auth: state.firebase.auth,
    id: id
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects' }
  ])
)(ProjectDetails)
