import React from 'react'
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom'

const ProjectList = ({ projects, auth, categories }) => {

  return (
    <div className="project-list section">
      {projects && projects.map(project => {
        if (project.publish || (!(project.publish) && project.authorId === auth.uid)) {
          return (
            <Link to={`/project/${project.id}`} key={project.id}>
              <ProjectSummary project={project} categories={categories} />
            </Link>
          )
        } else { return null }
      })}
    </div>
  )
}

export default ProjectList