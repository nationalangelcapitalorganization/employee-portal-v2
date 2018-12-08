import React from "react"

const Departments = (props) => {
  const { departments, departmentChanger } = props
  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Departments</span>
          <ul className="departments">
            <li><a href='#!' onClick={() => {
              departmentChanger('', 'All Articles', 'pink')
            }} className='pink-text'>All Articles</a>
            </li>
            {departments && departments.map(item => {
              return (
                <li key={item.id}>
                  <a href='#!' onClick={() => {
                    departmentChanger(item.id, item.departmentName, item.color)
                    }} className={`${item.color}-text text-darken-3`}>{item.departmentName}</a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Departments