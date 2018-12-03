import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import ReactMaterialSelect from 'react-material-select'
import 'react-material-select/lib/css/reactMaterialSelect.css'


class CreateProject extends Component {
  state = {
    title: '',
    category: '',
    content: 'Enter your Project here...',
    publish: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSelect = (e) => {
    this.setState({
      category: e.value
    })
  }

  handleEditorChange = (e) => {
    const content = e.target.getContent()
    this.setState({ content: content });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createProject(this.state)
    this.props.history.push('/')
  }

  render() {
    const { auth, categories } = this.props
    const apiKey = process.env.REACT_APP_TINY_MCE_API_KEY
    
    if (!auth.uid) { return <Redirect to='/signin' /> }
    
    if (categories) {

      let categoryKeys = Object.keys(categories)

      return (
        <div className="container">
          <form onSubmit={this.handleSubmit} className="white">
            <div className="switch right-align publish-switch">
              <label>Publish:
              <input id="publish" onChange={(e) => { this.setState({ publish: e.target.checked }) }} type="checkbox" />
                <span className="lever"></span>
              </label>
            </div>
            <h5 className="grey-text text-darken-3">Create a New Project</h5>
            
            <div className="input-field">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <ReactMaterialSelect label='Category' resetLabel={false} defaultValue="" onChange={this.handleSelect}>
                {categoryKeys.map(key => {
                  return <option key={key} dataValue={key}>{categories[key].categoryName}</option>
                })
                }
              </ReactMaterialSelect>
            </div>

            <Editor
              id='content'
              apiKey={apiKey}
              initialValue={this.state.content}
              init={{
                plugins: ['advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker',
                  'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                  'save table contextmenu directionality emoticons template paste textcolor'],
                toolbar: 'formatselect fontsizeselect forecolor backcolor | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image media emoticons | preview',
                branding: false,
                height: 400,
                inline: true
              }}
              onChange={this.handleEditorChange}
            />

            <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0">Save</button>
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
    categories: state.firestore.data.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project) => dispatch(createProject(project))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'categories' }
  ])
)(CreateProject)