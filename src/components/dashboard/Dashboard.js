import React, { Component } from "react"
import Notifications from "./Notifications"
import Departments from "./Departments"
import ArticleList from '../articles/ArticleList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {

  state = {
    currentDepartment: '',
    currentDepartmentName: 'All Articles',
    currentDepartmentColor: 'pink'
  }

  changeDepartment = (departmentId, departmentName, departmentColor) => {
    this.setState({currentDepartment: departmentId, currentDepartmentName: departmentName, currentDepartmentColor: departmentColor})
  }

  render() {

    const { articles, auth, notifications, departments } = this.props
    if (!auth.uid) { return <Redirect to='/signin' /> }

    let articleProps = articles

    if (this.state.currentDepartment !== '') {
      articleProps = articleProps.filter(article => article.department === this.state.currentDepartment)
    }

    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <div>
              <h2 className={`${this.state.currentDepartmentColor}-text text-darken-3 dashboard-department-title`}>{this.state.currentDepartmentName}</h2>
            </div>
            <ArticleList articles={articleProps} departments={departments} auth={auth} />
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications notifications={notifications} />
            <Departments departments={departments} departmentChanger={this.changeDepartment} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.firestore.ordered.articles,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    departments: state.firestore.ordered.departments
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'articles', orderBy: ['createdAt', 'desc'] },
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] },
    { collection: 'departments', orderBy: ['departmentName', 'asc'] }
  ])
)(Dashboard)