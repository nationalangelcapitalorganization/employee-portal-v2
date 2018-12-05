import React from "react"
import { Link } from 'react-router-dom'

const Categories = (props) => {
  const { categories } = props
  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Categories</span>
          <ul className="categories">
            {categories && categories.map(item => {
              return (
                <li key={item.id}>
                  <Link to='#' className={`${item.color}-text`}>{item.categoryName}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Categories