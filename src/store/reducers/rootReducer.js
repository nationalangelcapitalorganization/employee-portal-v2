import authReducer from './authReducer'
import articleReducer from './articleReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import speakerReducer from './speakerReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  article: articleReducer,
  speaker: speakerReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer