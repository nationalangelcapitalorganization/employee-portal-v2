import React from 'react'
import moment from 'moment'

const ArticleSummary = ({article, departments}) => {

  if (departments && article) {
  const department = departments.find(department => department.id === article.department)

  return (
    <div className="card z-depth-0 article-summary">
      <div><span className={`badge ${department ? department.color : 'yellow'} lighten-5 ${department ? department.color : 'yellow'}-text text-darken-3 summary-department-text`}>{department ? department.departmentName : 'No Department' }</span></div>
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{article.title}</span>
        <p>Posted by {article.authorFirstName} {article.authorLastName}</p>
        <p className="unpublished-container">{article.publish ? null : (<span className="pink lighten-1 white-text unpublished">Not yet published</span>)}</p>
        <p className="grey-text">{ article.createdAt ? moment(article.createdAt.toDate()).calendar() : null }</p>
      </div>
    </div>
  )
  } else {
    return (
      <div className="container center">
        <p>Loading Article...</p>
      </div>
    )
  }
}

export default ArticleSummary