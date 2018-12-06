import React from "react"

const Categories = (props) => {
  const { categories, categoryChanger } = props
  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Categories</span>
          <ul className="categories">
            <li><a href='#!' onClick={() => {
              categoryChanger('', 'All Projects', 'pink')
            }} className='pink-text'>All Projects</a>
            </li>
            {categories && categories.map(item => {
              return (
                <li key={item.id}>
                  <a href='#!' onClick={() => { 
                    categoryChanger(item.id, item.categoryName, item.color)
                    }} className={`${item.color}-text`}>{item.categoryName}</a>
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