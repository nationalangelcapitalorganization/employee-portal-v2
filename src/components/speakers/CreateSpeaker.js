import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSpeaker, editSpeaker } from '../../store/actions/speakerActions'
import { Redirect } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Modal, Button } from "react-materialize"
import { DropzoneArea } from 'material-ui-dropzone'

const uuidv4 = require('uuid/v4')
const $ = window.$


class CreateSpeaker extends Component {
  state = {
    id: null,
    firstName: '',
    lastName: '',
    title: '',
    company: '',
    companySite: '',
    content: 'Enter your Modal Content here...',
    publish: false,
    headshot: '',
    errors: {}
  }

  componentDidMount() {
    document.addEventListener("keydown", this.saveHotkey, false)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.saveHotkey, false)
  }

  saveHotkey = e => {
    if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) && e.keyCode === 83) {
      e.preventDefault();
      let submitBtn = $('.submit-btn').first();
      submitBtn.trigger('click');
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleFile = (file, firebase) => {
    firebase.uploadFile(('speaker_images/' + Date.now()), file)
      .then(res => {
        res.uploadTaskSnapshot.ref.getDownloadURL().then( downloadURL => {
          this.setState({ headshot: downloadURL })
        });
      })
      .catch(err => {
        throw err;
      })
  }

  handleImageDelete = (image) => {
    this.setState({headshot: ''})
  }

  handleEditorChange = (e) => {
    const content = e.target.getContent()
    this.setState({ content: content });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const id = this.state.id ? this.state.id : uuidv4()
    const { errors, ...submission } = this.state
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
      this.setState((prevState) => ({ errors: { ...prevState.errors, general: 'There were errors in your submission. Please review and try again.' } }))
      return
    }
    submission.id = id
    if (this.state.id) {
      console.log("already submitted")
      this.props.editSpeaker(submission)
    } else {
      this.props.createSpeaker(submission)
      this.setState({ id: id })
    }
    $('#save-modal').modal('open')
    setTimeout(() => {
      $('#save-modal').modal('close');
      if (submission.publish) {
        this.props.history.push("/speakers");
      }
    }, 2000)
  }

  handlePublish = async e => {
    e.preventDefault();
    await $('#publish').trigger('click')
    this.handleSubmit(e)
  };

  // Customize text inside of Saving Modal based on whether or not user is publishing
  isPublished = () => {
    return this.state.publish ? <p>You have successfully published</p> : <p>You have successfully saved.</p>
  }

  render() {
    const { auth, firebase } = this.props
    const apiKey = process.env.REACT_APP_TINY_MCE_API_KEY

    if (!auth.uid) { return <Redirect to='/signin' /> }

      return (
        <div className="container" >

          <Modal
            id="save-modal"
            header='Success!'
          >
            {this.isPublished()}
          </Modal>

          <form className="white speaker-form">
            <div className="switch right-align publish-switch">
              <label>Publish:
              <input id="publish" onChange={(e) => { this.setState({ publish: e.target.checked }) }} type="checkbox" />
                <span className="lever"></span>
              </label>
            </div>
            <h5 className="grey-text text-darken-3">Create a New Speaker</h5>

            <div className="input-field">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" onChange={this.handleChange} />
              <span className="validation-text">{this.state.errors.firstName}</span>
            </div>

            <div className="input-field">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" onChange={this.handleChange} />
              <span className="validation-text">{this.state.errors.lastName}</span>
            </div>

            <div className="input-field">
              <label>Speaker Headshot</label>
              <div className="dropzone-container">
                <div><img className="headshot-img" src={this.state.headshot !== '' ? `${this.state.headshot}` : '/img/headshot-placeholder.jpg'} alt="Speaker Headshot" /></div>
                <DropzoneArea
                  dropZoneClass="headshot-dropzone"
                  dropzoneText='Drag and drop an image file here or click.'
                  onDrop={file => { this.handleFile(file, firebase) }}
                  filesLimit={1}
                  acceptedFiles={['image/*']}
                  onDelete={this.handleImageDelete}
                />
              </div>
              <span className="validation-text">{this.state.errors.headshot}</span>
            </div>

            <div className="input-field">
              <label htmlFor="title">Job Title</label>
              <input type="text" id="title" onChange={this.handleChange} />
              <span className="validation-text">{this.state.errors.title}</span>
            </div>

            <div className="input-field">
              <label htmlFor="company">Company Name</label>
              <input type="text" id="company" onChange={this.handleChange} />
              <span className="validation-text">{this.state.errors.company}</span>
            </div>

            <div className="input-field">
              <label htmlFor="companySite">Company Website</label>
              <input type="text" id="companySite" onChange={this.handleChange} />
              <span className="validation-text">{this.state.errors.companySite}</span>
            </div>

            <div className='input-field'>
              <label id="modal-label">Modal Content</label>
              <Editor
                id='content'
                apiKey={apiKey}
                initialValue={this.state.content}
                init={{
                  plugins: ['advlist autolink link image lists charmap print preview hr anchor pagebreak',
                    'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                    'table contextmenu directionality emoticons paste textcolor'],
                  toolbar: 'formatselect fontsizeselect forecolor backcolor | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image media emoticons | preview',
                  branding: false,
                  height: 400,
                  inline: true,
                  images_upload_handler: function (blobInfo, success, failure) {
                    let blob = blobInfo.blob()
                    firebase.uploadFile(('speaker_images/' + Date.now()), blob)
                      .then(res => {
                        res.uploadTaskSnapshot.ref.getDownloadURL().then(function (downloadURL) {
                          success(downloadURL);
                        });
                      })
                      .catch(err => {
                        failure(err)
                      })
                  },
                }}
                onChange={this.handleEditorChange}
              />
              <span className="validation-text">{this.state.errors.content}</span>
            </div>

            <div className="input-field">
              {this.state.publish ? <div><Button onClick={this.handleSubmit} className="btn submit-btn pink lighten-1 z-depth-0">
                Save
                  </Button></div> : <Modal
                  trigger={
                    <Button className="btn pink submit-btn lighten-1 z-depth-0">
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
                    Would you like to publish this speaker as well?
                </p>
                </Modal>}
              <span className="validation-text">{this.state.errors.general}</span>
            </div>
          </form>
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    firebase: state.firebase
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createSpeaker: (speaker) => dispatch(createSpeaker(speaker)),
    editSpeaker: (speaker) => dispatch(editSpeaker(speaker))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
  ])
)(CreateSpeaker)