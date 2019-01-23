const initState = {
  articles: []
}

const articleReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_ARTICLE':
      console.log(`created article ${action.articleId}`, action.article)
      return state
    case 'CREATE_ARTICLE_ERROR':
      console.log('create article error', action.err)
      return state
    case 'EDIT_ARTICLE':
      console.log('edited article', action.article)
      return state
    case 'EDIT_ARTICLE_ERROR':
      console.log('edit article error', action.err)
      return state
    case 'REMOVE_ARTICLE':
      console.log('removed article', action.article)
      return state
    case 'REMOVE_ARTICLE_ERROR':
      console.log('remove article error', action.err)
      return state
    default:
      return state
  }
}

export default articleReducer