import React from 'react'

type Props = {
  className: string,
  cardTitle: String,
  cardContents: String
}

const LeaderboardCard = (props: Props) => {
  return (
      <div className={props.className}>
        <a>
          <h3>{props.cardTitle}</h3>
          <p className="desc">
            {props.cardContents}
          </p>
        </a>
      </div>
  )
}

export default LeaderboardCard;
