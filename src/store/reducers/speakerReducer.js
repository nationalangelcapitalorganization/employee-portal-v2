const initState = {
  speakers: []
}

const speakerReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_SPEAKER':
      console.log(`created speaker ${action.speakerId}`, action.speaker)
      return state
    case 'CREATE_SPEAKER_ERROR':
      console.log('create speaker error', action.err)
      return state
    case 'EDIT_SPEAKER':
      console.log('edited speaker', action.speaker)
      return state
    case 'EDIT_SPEAKER_ERROR':
      console.log('edit speaker error', action.err)
      return state
    case 'REMOVE_SPEAKER':
      console.log('removed speaker', action.speaker)
      return state
    case 'REMOVE_SPEAKER_ERROR':
      console.log('remove speaker error', action.err)
      return state
    default:
      return state
  }
}

export default speakerReducer