import React from 'react'
import moment from 'moment'

const ProjectSummary = ({project}) => {

  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{project.title}</span>
        <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
        <p className="unpublished-container">{project.publish ? null : (<span className="pink lighten-1 white-text unpublished">Not yet published</span>)}</p>
        <p className="grey-text">{ project.createdAt ? moment(project.createdAt.toDate()).calendar() : null }</p>
      </div>
    </div>
  )
}

export default ProjectSummary