import React from 'react'
import Timer from "../../components/timer";
import GameCard from "../../components/game-card";
import styles from "../../styles/Home.module.css";

function Game() {
  return (
    <div className={styles.container}>
      <Timer />
      <GameCard />
    </div>
  )
}

export default Game;
