export const createProject = (project) => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore()
    const profile = getState().firebase.profile
    const authorId = getState().firebase.auth.uid
    firestore.collection('projects').add({
      ...project,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then((res) => {
      firestore.collection('users').doc(authorId).update({
        projects: firestore.FieldValue.arrayUnion(res.id)
      })
      firestore.collection('categories').doc(project.category).update({
        categoryProjects: firestore.FieldValue.arrayUnion(res.id)
      })
      return
    }).then(() => {
      dispatch({type: 'CREATE_PROJECT', project})
    }).catch((err) => {
      dispatch({ type: 'CREATE_PROJECT_ERROR', err })
    })
  }
}


export const editProject = (project) => {
  return (dispatch, getState, { getFirestore }) => {
    const { id, ...noIdProject } = project

    console.log(noIdProject)
     // make async call to database
     const firestore = getFirestore()
     firestore.collection('projects').doc(project.id).update({
      ...noIdProject,
      editedAt: new Date()
    }).then(() => {
      dispatch({ type: 'EDIT_PROJECT', project })
    }).catch((err) => {
      dispatch({ type: 'EDIT_PROJECT_ERROR', err })
    })
  }
}