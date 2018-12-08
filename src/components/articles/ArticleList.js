import React from 'react'
import ArticleSummary from './ArticleSummary'
import { Link } from 'react-router-dom'

const ArticleList = ({ articles, auth, departments }) => {

  return (
    <div className="article-list section">
      {articles && articles.map(article => {
        if (article.publish || (!(article.publish) && article.authorId === auth.uid)) {
          return (
            <Link to={`/article/${article.id}`} key={article.id}>
              <ArticleSummary article={article} departments={departments} />
            </Link>
          )
        } else { return null }
      })}
    </div>
  )
}

export default ArticleList