import React from 'react'
import Link from "next/link";

type Props = {
  linkPath: string,
  className: string,
  cardTitle: String,
  cardContents: String
}

const HomepageCard = (props: Props) => {
  return (
    <Link href={props.linkPath}>
      <div className={props.className}>
        <a>
          <h3>{props.cardTitle}</h3>
          <p className="desc">
            {props.cardContents}
          </p>
        </a>
      </div>
    </Link>
  )
}

export default HomepageCard;
