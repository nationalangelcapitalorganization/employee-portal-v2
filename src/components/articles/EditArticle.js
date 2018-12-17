import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { editArticle } from "../../store/actions/articleActions";
import { Redirect } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import ReactMaterialSelect from "react-material-select";
import "react-material-select/lib/css/reactMaterialSelect.css";
import { Modal, Button } from "react-materialize";

class EditArticle extends Component {
  state = {
    id: this.props.id ? this.props.id : "",
    title: this.props.article ? this.props.article.title : "",
    content: this.props.article
      ? this.props.article.content
      : "Enter your Article here...",
    publish: this.props.article ? this.props.article.publish : false,
    department: this.props.article ? this.props.article.department : "",
    prevDepartment: this.props.article ? this.props.article.department : "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.id,
      title: nextProps.article.title,
      content: nextProps.article.content,
      publish: nextProps.article.publish,
      department: nextProps.article.department,
      prevDepartment: nextProps.article.department
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSelect = e => {
    this.setState({
      department: e.value
    });
  };

  handleEditorChange = e => {
    const content = e.target.getContent();
    this.setState({ content: content });
  };

  handleSubmit = e => {
    e.preventDefault();

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
      this.setState((prevState) => ({ errors: { ...prevState.errors, general: 'There were errors in your submission. Please review your article and try again.' } }))
      return
    }

    this.props.editArticle(submission);
    this.props.history.push("/");
  };

  handlePublish = async e => {
    e.preventDefault();
    await this.setState({publish: true})
    this.handleSubmit(e)
  };


  render() {
    const { article, auth, departments } = this.props;
    const apiKey = process.env.REACT_APP_TINY_MCE_API_KEY;
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }

    if (article && article.authorId !== auth.uid) {
      return (
        <div className="container center">
          <p>You are not authorized to edit this article.</p>
        </div>
      );
    } else if (
      article &&
      departments &&
      (article.publish || (!article.publish && article.authorId === auth.uid))
    ) {
      let departmentKeys = Object.keys(departments);

      return (
        <div className="container">
          <form className="white article-form">
            <div className="switch right-align publish-switch">
              <label>
                Publish:
                <input
                  id="publish"
                  defaultChecked={this.state.publish}
                  onChange={e => {
                    this.setState({ publish: e.target.checked });
                  }}
                  type="checkbox"
                />
                <span className="lever" />
              </label>
            </div>
            <h5 className="grey-text text-darken-3">Edit Article</h5>
            <div className="input-field">
              <label htmlFor="title" className="active">
                Title
              </label>
              <input
                type="text"
                id="title"
                onChange={this.handleChange}
                defaultValue={this.state.title}
              />
              <span className="validation-text">{this.state.errors.title}</span>
            </div>
            <div className="input-field">
              <ReactMaterialSelect
                label="Department"
                resetLabel={false}
                defaultValue={this.state.department}
                onChange={this.handleSelect}
              >
                {departmentKeys.map(key => {
                  return (
                    <option key={key} dataValue={key}>
                      {departments[key].departmentName}
                    </option>
                  );
                })}
              </ReactMaterialSelect>
              <span className="validation-text">{this.state.errors.department}</span>
            </div>

            <div className="input-field">
              <Editor
                id="content"
                apiKey={apiKey}
                initialValue={this.state.content}
                init={{
                  plugins: [
                    "advlist autolink link image lists charmap print preview hr anchor pagebreak",
                    "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                    "save table contextmenu directionality emoticons paste textcolor"
                  ],
                  toolbar:
                    "formatselect fontsizeselect forecolor backcolor | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image media emoticons | preview",
                  branding: false,
                  height: 400,
                  inline: true
                }}
                onChange={this.handleEditorChange}
              />
              <span className="validation-text">{this.state.errors.content}</span>
            </div>

            <div className="input-field">
            { this.state.publish ? <div><Button onClick={this.handleSubmit} className="btn pink lighten-1 z-depth-0">
                    Update
                  </Button></div> : <Modal
                trigger={
                  <Button className="btn pink lighten-1 z-depth-0">
                    Update
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
      );
    } else {
      return (
        <div className="container center">
          <p>Loading Article...</p>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const articles = state.firestore.data.articles;
  const article = articles ? articles[id] : null;
  return {
    article: article,
    auth: state.firebase.auth,
    id: id,
    departments: state.firestore.data.departments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editArticle: article => dispatch(editArticle(article))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "articles" }, { collection: "departments" }])
)(EditArticle);
