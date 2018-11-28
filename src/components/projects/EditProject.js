import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { editProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'

class EditProject extends Component {
  state = {
    title: '',
    content: 'Enter your Project here...',
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.project.title,
      content: nextProps.project.content
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleEditorChange = (e) => {
    const content = e.target.getContent()
    this.setState({ content: content });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.editProject(this.state)
    this.props.history.push('/')
  }

  render() {
    const { project, auth } = this.props
    const apiKey = process.env.REACT_APP_TINY_MCE_API_KEY
    if (!auth.uid) { return <Redirect to='/signin' /> }

    if (project) {
      return (
        <div className="container">
          <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Edit Project</h5>
            <div className="input-field">
              <label htmlFor="title" className="active">Title</label>
              <input type="text" id="title" onChange={this.handleChange} defaultValue={this.state.title} />
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
              <button className="btn pink lighten-1 z-depth-0">Create</button>
            </div>
          </form>
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
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id
  const projects = state.firestore.data.projects
  const project = projects ? projects[id] : null
  return {
    project: project,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editProject: (project) => dispatch(editProject(project))
  }
}

export default compose(
  connect(
    mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: 'projects' }]
  )
)(EditProject)
