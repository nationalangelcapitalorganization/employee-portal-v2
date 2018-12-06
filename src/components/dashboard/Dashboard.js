import React, { Component } from "react"
import Notifications from "./Notifications"
import Categories from "./Categories"
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {

  state = {
    currentCategory: '',
    currentCategoryName: 'All Projects',
    currentCategoryColor: 'pink'
  }

  changeCategory = (categoryId, categoryName, categoryColor) => {
    this.setState({currentCategory: categoryId, currentCategoryName: categoryName, currentCategoryColor: categoryColor})
  }

  render() {

    const { projects, auth, notifications, categories } = this.props
    if (!auth.uid) { return <Redirect to='/signin' /> }

    let projectProps = projects

    if (this.state.currentCategory !== '') {
      projectProps = projectProps.filter(project => project.category === this.state.currentCategory)
    }

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <div>
              <h2 className={`${this.state.currentCategoryColor} lighten-1 white-text dashboard-category-title`}>{this.state.currentCategoryName}</h2>
            </div>
            <ProjectList projects={projectProps} categories={categories} auth={auth} />
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications notifications={notifications} />
            <Categories categories={categories} categoryChanger={this.changeCategory} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    categories: state.firestore.ordered.categories
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects', orderBy: ['createdAt', 'desc'] },
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] },
    { collection: 'categories', orderBy: ['categoryName'] }
  ])
)(Dashboard)