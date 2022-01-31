import React from "react";

type Props = {
  className: string;
  username: string;
  wpm: number;
  errors: number;
  accuracy: number;
  position: string;
};

const LeaderboardCard = (props: Props) => {
  return (
    <div className="leaderboard-card">
      <h3 className="leaderboard-card-position">{props.position}</h3>
      <h3 className="leaderboard-card-username">
        {props.username.toUpperCase()}
      </h3>
      <h2 className="leaderboard-card-wpm">{props.wpm} words/sec</h2>
      <p className="leaderboard-card-errors">{props.errors} errors</p>
      <p className="leaderboard-card-accuracy">{props.accuracy}% accuracy</p>
    </div>
  );
};

export default LeaderboardCard;
