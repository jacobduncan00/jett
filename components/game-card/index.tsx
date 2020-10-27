import React from 'react'
import styles from "../../styles/Home.module.css";

function GameCard() {
  return (
    <div className={styles.container2}>
      <div className={styles.textDisplay} id="textDisplay">He's in a boy band which doesn't make much sense for a snake.
      It was a really good Monday for being a Saturday.
      He colored deep space a soft yellow.</div>
      <textarea id="textInput" className={styles.textInput} autoFocus></textarea>
    </div>
  )
}

export default GameCard
