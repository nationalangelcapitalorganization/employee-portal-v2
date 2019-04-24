import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import { compose } from 'redux'
import { Modal, Button } from "react-materialize"


const $ = window.$


class CreateSpeaker extends Component {
  state = {
    id: null,
    name: '',
    title: '',
    content: 'Enter your Modal Content here...',
    publish: false,
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

  handleEditorChange = (e) => {
    const content = e.target.getContent()
    this.setState({ content: content });
  }

  handleSubmit = (e) => {
    e.preventDefault()
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

          <form className="white article-form">
            <div className="switch right-align publish-switch">
              <label>Publish:
              <input id="publish" onChange={(e) => { this.setState({ publish: e.target.checked }) }} type="checkbox" />
                <span className="lever"></span>
              </label>
            </div>
            <h5 className="grey-text text-darken-3">Create a New Speaker</h5>

            <div className="input-field">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" onChange={this.handleChange} />
              <span className="validation-text">{this.state.errors.title}</span>
            </div>

            <div className='input-field'>
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
                    firebase.uploadFile(('article_images/' + Date.now()), blob)
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
                    Would you like to publish this article as well?
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

export default compose(
  connect(mapStateToProps)
)(CreateSpeaker)