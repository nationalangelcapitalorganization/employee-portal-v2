import React, { Component } from "react"
import UserArticleList from './UserArticleList'
import {removeArticle} from '../../store/actions/articleActions'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class UserArticleDashboard extends Component {

  render() {

    const { articles, auth, departments, removeArticle } = this.props

    if (!auth.uid) { return <Redirect to='/signin' /> }

    if (articles) {
      const unPublishedArticles = articles.filter(article => !article.publish)
      const publishedArticles = articles.filter(article => article.publish)
      return (
        <div className="dashboard container">
          <h2 className='grey-text text-darken-3 dashboard-department-title'>Your Articles</h2>
          <h5 className='pink white-text darken-3 dashboard-department-title'>To Be Published:</h5>
          <UserArticleList removeArticle={removeArticle} articles={unPublishedArticles} departments={departments} auth={auth} />
          <h5 className='cyan white-text darken-3 dashboard-department-title'>Published:</h5>
          <UserArticleList removeArticle={removeArticle} articles={publishedArticles} departments={departments} auth={auth} />
        </div>
      )
    } else {
      return (
        <div className="container center">
          <p>Loading Articles...</p>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.firestore.ordered.articles,
    auth: state.firebase.auth,
    departments: state.firestore.ordered.departments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeArticle: article => dispatch(removeArticle(article))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'articles', orderBy: ['createdAt', 'desc'] },
    { collection: 'departments', orderBy: ['departmentName', 'asc'] }
  ])
)(UserArticleDashboard)