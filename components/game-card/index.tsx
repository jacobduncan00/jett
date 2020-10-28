import React, { useState, useEffect } from 'react'
import styles from "../../styles/Home.module.css";


function GameCard() {
  const [corpus, setCorpus] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const url = "http://api.quotable.io/random"; // We need to make our own api with our backend to generate this for us
      const response = await fetch(url);
      const data = await response.json();
      setCorpus(data.content);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container2}>
      <div className={styles.textDisplay} id="textDisplay">{corpus}</div>
      <textarea id="textInput" className={styles.textInput} autoFocus></textarea>
    </div>
  )
}

export default GameCard
