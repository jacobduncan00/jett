import React from 'react'
import styles from "../../styles/Home.module.css";

type Props = {
  className: string,
  cardTitle: String,
  cardContents: String
}

const HomepageCard = (props: Props) => {
  return (
    <div className={props.className}>
      <h3>{props.cardTitle}</h3>
      <p className="desc">
        {props.cardContents}
      </p>
    </div>
  )
}

export default HomepageCard;
