const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch(action.type) {
    case 'LOGIN_ERROR':
      console.log('login error')
      return {
        ...state,
        authError: 'Login Failed'
      }
    case 'LOGIN_NOT_AUTHORIZED':
      console.log('login unauthorized')
      return {
        ...state,
        authError: 'Login only authorized for NACO Staff'
      }
    case 'LOGIN_SUCCESS':
      console.log('login success')
      return {
        ...state,
        authError: null
      }
    case 'SIGNOUT_SUCCESS':
      console.log('signout success')
      return state
    case 'SIGNUP_SUCCESS':
      console.log('signup success')
      return {
        ...state,
        authError: null
      }
    case 'SIGNUP_ERROR':
      console.log('signup error')
      return {
        ...state,
        authError: action.err.message
      }
    case 'SIGNUP_NOT_AUTHORIZED':
      console.log('signup not authorized')
      return {
        ...state,
        authError: 'Signup only authorized for NACO Staff'
      }
    default:
      return state
  }
}

export default authReducer