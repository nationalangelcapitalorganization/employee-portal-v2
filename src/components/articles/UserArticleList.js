import React from 'react'
import UserArticleSummary from './UserArticleSummary'

const UserArticleList = ({ articles, auth, departments }) => {

  return (
    <div className="article-list section">
      {articles && articles.map(article => {
        if (article.publish || (!(article.publish) && article.authorId === auth.uid)) {
          return (
            <UserArticleSummary article={article} departments={departments} />
          )
        } else { return null }
      })}
    </div>
  )
}

export default UserArticleList