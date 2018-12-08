import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom'

const ArticleDetails = (props) => {
  const { article, auth, id, departments } = props

  let editArticleButton = null

  if (article && article.authorId === auth.uid) {
    editArticleButton = <Link to={`/article/${id}/edit`} className='right btn pink lighten-1'>Edit</Link>
  }

  if (!auth.uid) { return <Redirect to='/signin' /> }

  if (article && (!(article.publish) && article.authorId !== auth.uid)) {
    return (
      <div className="container center">
        <p>This article is not yet published.</p>
      </div>
    )
  } else if (article && departments && (article.publish || (!(article.publish) && article.authorId === auth.uid))) {
    const department = departments[article.department]

    return (
      <div className="container section article-details">
        <div className="card z-depth-0">
          <div className="card-content">
            { editArticleButton }
            <span className="card-title">{article.title}</span>
            <div className='details-department'>
              <span className='grey-text'>Department: </span><span className={`${department.color}-text`}>{department.departmentName}</span>
            </div>
            <p className="unpublished-container">{article.publish ? null : <span className="white-text pink lighten-1 unpublished">Not yet Published</span>}</p>
            <div>{ReactHtmlParser(article.content)}</div>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by {article.authorFirstName} {article.authorLastName}</div>
            <div>{moment(article.createdAt.toDate()).calendar()}</div>
          </div>
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

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id
  const articles = state.firestore.data.articles
  const article = articles ? articles[id] : null
  return {
    article: article,
    auth: state.firebase.auth,
    id: id,
    departments: state.firestore.data.departments
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'articles' }, { collection: 'departments' }
  ])
)(ArticleDetails)
