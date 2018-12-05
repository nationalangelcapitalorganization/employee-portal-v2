import React from 'react'
import moment from 'moment'

const ProjectSummary = ({project, categories}) => {
 
  if (categories && project) {
  const category = categories.find(category => category.id === project.category)

  return (
    <div className="card z-depth-0 project-summary">
      <div><span className={`badge ${category ? category.color : 'yellow'} lighten-5 ${category ? category.color : 'yellow'}-text text-lighten-1`}>{category ? category.categoryName : 'Uncategorized' }</span></div>
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{project.title}</span>
        <p>Posted by {project.authorFirstName} {project.authorLastName}</p>
        <p className="unpublished-container">{project.publish ? null : (<span className="pink lighten-1 white-text unpublished">Not yet published</span>)}</p>
        <p className="grey-text">{ project.createdAt ? moment(project.createdAt.toDate()).calendar() : null }</p>
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

export default ProjectSummary