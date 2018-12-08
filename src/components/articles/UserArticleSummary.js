import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Modal, Button } from 'react-materialize'

const UserArticleSummary = ({article, departments, removeArticle}) => {

  if (departments && article) {
  const department = departments.find(department => department.id === article.department)

  return (
    <div className="card z-depth-0 article-summary">
      <div><span className={`badge ${department ? department.color : 'yellow'} lighten-5 ${department ? department.color : 'yellow'}-text text-lighten-1`}>{department ? department.departmentName : 'No Department' }</span></div>
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{article.title}</span>
        <div className='buttons-container'>
          <Link to={`/article/${article.id}`}><Button className='grey lighten-1 white-text z-depth-0 button-spacing' waves='light'>View</Button></Link>
          <Link to={`/article/${article.id}/edit`}><Button className='grey lighten-1 white-text z-depth-0 button-spacing' waves='light'>Edit</Button></Link>
          <Modal
            trigger={
              <Button className='red lighten-1 white-text z-depth-0 button-spacing delete-button' waves='light'>Delete</Button>
            }
            header='Delete this article?'
            actions={
              <div>
                <Button onClick={() => {removeArticle(article)}} className="modal-close red lighten-1 btn z-depth-0 yes-button">
                  I am sure
                </Button>
                <Button className="btn lighten-1 z-depth-0 modal-close">
                  No, I will keep this article
                </Button>
              </div>
            }
          >
            <p>Are you sure you want to delete this article?</p>
            <p>This action can't be undone.</p>
          </Modal>
        </div>
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

export default UserArticleSummary