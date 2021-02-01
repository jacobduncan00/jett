import React, {useState}  from 'react'

type Props = {
  className: string,
  username: string,
  wpm: number,
  errors: number,
  accuracy: number
  position: number;
}

const LeaderboardCard = (props: Props) => {

  return (
      <div className="leaderboard-card">
        <h3>{props.position}</h3>
        <h3>{props.username.toUpperCase()}</h3>
        <h2>{props.wpm} word/sec</h2>
        <p>{props.errors} errors</p>
        <p>{props.accuracy}% accuracy</p>
      </div>
  )
}

export default LeaderboardCard;
