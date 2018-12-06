export const signIn = (credentials) => {

  if (credentials.email.includes('@nacocanada.com')) {
    return (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase()
      firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      ).then(() => {
        if (firebase.auth().currentUser.email.includes('@nacocanada.com')) {
          dispatch({ type: 'LOGIN_SUCCESS' })
        } else {
          dispatch({ type: 'LOGIN_NOT_AUTHORIZED' })
        }
      }).catch((err) => {
        dispatch({ type: 'LOGIN_ERROR', err })
      })

    }
  } else {
    return (dispatch, getState) => {
      dispatch({ type: 'LOGIN_NOT_AUTHORIZED' })
    }
  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    })

  }
}

export const signUp = (newUser) => {

  if (newUser.email.includes('@nacocanada.com')) {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firebase = getFirebase()
      const firestore = getFirestore()

      firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password
      ).then((resp) => {
        console.log(firebase.auth().currentUser.email)        
        return firestore.collection('users').doc(resp.user.uid).set({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          initials: newUser.firstName[0] + newUser.lastName[0]
        })
      }).then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' })
      }).catch(err => {
        dispatch({ type: 'SIGNUP_ERROR', err })
      })
    }
  } else {
    return (dispatch, getState) => {
      dispatch({ type: 'SIGNUP_NOT_AUTHORIZED' })
    }
  }
}