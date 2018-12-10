import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createArticle } from '../../store/actions/articleActions'
import { Redirect } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import ReactMaterialSelect from 'react-material-select'
import 'react-material-select/lib/css/reactMaterialSelect.css'
import { Modal, Button } from "react-materialize";

class CreateArticle extends Component {
  state = {
    title: '',
    department: '',
    content: 'Enter your Article here...',
    publish: false,
    errors: {}
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSelect = (e) => {
    this.setState({
      department: e.value
    })
  }

  handleEditorChange = (e) => {
    const content = e.target.getContent()
    this.setState({ content: content });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {errors, ...submission} = this.state
    let error = false
    for (let item in submission) {
      if (submission[item] === '') {
        this.setState((prevState) => ({ errors: { ...prevState.errors, [item]: `Please input ${item === 'content' ? 'some content' : `a ${item}`}` } }))
        error = true
      } else {
        this.setState((prevState) => ({ errors: { ...prevState.errors, [item]: '' } }))
      }
    }
    if (error) { 
      this.setState((prevState) => ({ errors: { ...prevState.errors, general: 'There were errors in your submission. Please review your article and try again.' } }))
      return 
    }
    this.props.createArticle(submission)
    this.props.history.push('/')
  }

  handlePublish = async e => {
    e.preventDefault();
    await this.setState({publish: true})
    this.handleSubmit(e)
  };

  render() {
    const { auth, departments } = this.props
    const apiKey = process.env.REACT_APP_TINY_MCE_API_KEY

    if (!auth.uid) { return <Redirect to='/signin' /> }

    if (departments) {

      let departmentKeys = Object.keys(departments)

      return (
        <div className="container">
          <form className="white article-form">
            <div className="switch right-align publish-switch">
              <label>Publish:
              <input id="publish" onChange={(e) => { this.setState({ publish: e.target.checked }) }} type="checkbox" />
                <span className="lever"></span>
              </label>
            </div>
            <h5 className="grey-text text-darken-3">Create a New Article</h5>

            <div className="input-field">
              <label htmlFor="title">Title</label>
              <input type="text" id="title"  onChange={this.handleChange} />
              <span className="validation-text">{this.state.errors.title}</span>
            </div>
            <div className="input-field">
              <ReactMaterialSelect label='Department' resetLabel={false} defaultValue="" onChange={this.handleSelect}>
                {departmentKeys.map(key => {
                  return <option key={key} dataValue={key}>{departments[key].departmentName}</option>
                })
                }
              </ReactMaterialSelect>
              <span className="validation-text">{this.state.errors.department}</span>
            </div>
            
            <div className='input-field'>
              <Editor
                id='content'
                apiKey={apiKey}
                initialValue={this.state.content}
                init={{
                  plugins: ['advlist autolink link image lists charmap print preview hr anchor pagebreak',
                    'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                    'save table contextmenu directionality emoticons template paste textcolor'],
                  toolbar: 'formatselect fontsizeselect forecolor backcolor | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image media emoticons | preview',
                  branding: false,
                  height: 400,
                  inline: true,
                  images_upload_url: 'https://us-central1-naco-employee-portal.cloudfunctions.net/imageUpload'
                }}
                onChange={this.handleEditorChange}
              />
              <span className="validation-text">{this.state.errors.content}</span>
            </div>

            <div className="input-field">
            { this.state.publish ? <div><Button onClick={this.handleSubmit} className="btn pink lighten-1 z-depth-0">
                    Save
                  </Button></div> : <Modal
                trigger={
                  <Button className="btn pink lighten-1 z-depth-0">
                    Save
                  </Button>
                }
                header='Would you like to publish?'
                  actions={<div><Button onClick={this.handlePublish} className="btn z-depth-0 yes-button modal-close">
                Yes
              </Button>
                    <Button onClick={this.handleSubmit} className="btn pink lighten-1 z-depth-0 modal-close">
               No
              </Button></div>}
              >
                <p>
                  Would you like to publish this article as well?
                </p>
              </Modal> }
              <span className="validation-text">{this.state.errors.general}</span>
            </div>
          </form>
        </div>
      )
    } else {
      return (
        <div className="container center">
          <p>Loading Form...</p>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    departments: state.firestore.data.departments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createArticle: (article) => dispatch(createArticle(article))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'departments' }
  ])
)(CreateArticle)