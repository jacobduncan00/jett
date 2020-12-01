import React from 'react'

const GameStats = ({ name, data, style }) => {
  return (
    <li className="list-item my-1 py-4 border rounded" {...style}>
      {name}
      <span className="d-block display-4">
        {" "}{data}
      </span>
    </li>
  )
}

export default GameStats
