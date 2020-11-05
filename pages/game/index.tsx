import React, { useState, useRef, useEffect } from 'react'
import allowedKeys from "../../components/keys";
import Timer from "../../components/timer";
import GameCard from "../../components/game-card";
import styles from "../../styles/Home.module.css";
import GameStats from '../../components/game-stats';

let interval = null;

function Game() {
  const inputRef = useRef(null);
  let outputRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [input, setInput] = useState("");
  const [duration, setDuration] = useState(30);
  const [index, setIndex] = useState(0);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [isError, setIsError] = useState(false);
  const [errorIndex, setErrorIndex] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [lastScore, setLastScore] = useState('0');
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


  const handleStart = () => {
    setStarted(true);
    setEnded(false);
    setInput(corpus);
    inputRef.current.focus();
    setTimer();
  }

  const handleEnd = () => {
    setEnded(true);
    setStarted(false);
    clearInterval(interval);
  }

  const setTimer = () => {
    const now = Date.now();
    const seconds = now + duration * 1000;
    interval = setInterval(() => {
      const timeLeft = Math.round((seconds - Date.now()) / 1000);
      setDuration(timeLeft);
      if (timeLeft === 0) {
        handleEnd();
      }
    }, 1000);
  }

  const handleTyping = (event) => {
    event.preventDefault();
    const { key } = event;
    const corpusText = corpus;

    if (key === corpusText.charAt(index)) {
      setIndex(index + 1);
      const currentCharacter = corpusText.substring(index + 1, index + corpusText.length);
      setInput(currentCharacter);
      setCorrectIndex(correctIndex + 1);
      setIsError(false);
      outputRef.current.innerHTML += key;
    } else {
      if (allowedKeys.includes(key)) {
        setErrorIndex(errorIndex + 1);
        setIsError(true);
        outputRef.current.innerHTML += `<span class="danger">${key}</span>`
      }
    }

    const timeRemaining = ((60 - duration) / 60).toFixed(2);
    const timeRemaining2 = parseInt(timeRemaining);
    const accuracy2 = Math.floor((index - errorIndex) / index * 1000);
    const wpm2 = Math.round(correctIndex / 5 / timeRemaining2);

    // For some reason WPM is infinity here and IDK why
    console.log(`Time Remaining: ${timeRemaining}, Accuracy: ${accuracy2}, WPM: ${wpm2}, Duration: ${duration}, CorrectIndex: ${correctIndex}`)

    if (index > 5) {
      setAccuracy(accuracy2);
      setCpm(correctIndex);
      setWpm(wpm2);
    }
    if (index + 1 === corpusText.length || errorIndex > 50) {
      handleEnd();
    }
  }

  useEffect(() => {
    if (ended) {
      const wp = wpm.toString();
      localStorage.setItem('wpm', wp);
    }
  }, [ended, wpm]);

  useEffect(() => {
    const storedScore = localStorage.getItem('wpm');
    if (storedScore) {
      setLastScore(storedScore);
    }
  })


  return (
    <div className={styles.game}>
      <div className={styles.row}>
        <div className="col-sm-6 col-md-2 order-md-0 px-5">
          <ul className="list-unstyled text-center small">
            <GameStats
              name="WPM"
              data={wpm}
              style={
                wpm > 0 && wpm < 20 ? (
                  { color: 'white', backgroundcolor: '#eb4841' }
                ) : wpm >= 20 && wpm < 40 ? (
                  { color: 'white', backgroundcolor: '#f48847' }
                ) : wpm >= 40 && wpm < 60 ? (
                  { color: 'white', backgroundcolor: '#ffc84a' }
                ) : wpm >= 60 && wpm < 80 ? (
                  { color: 'white', backgroundcolor: '#a6c34c' }
                ) : wpm >= 80 ? (
                  { color: 'white', backgroundcolor: '#4ec04e' }
                ) : (
                            {}
                          )
              }
            />
            <GameStats name="Timer" data={duration} style={""} />
          </ul>
        </div>
        <div className="col-sm-12 col-md-8 order-md-1">
          <div className="container">
            <div className="text-center mt-4 header">
              <div className="control my-5">
                {ended ? (
                  <button
                    className="btn btn-outline-danger btn-circle"
                    onClick={() => window.location.reload()}
                  >
                    Reload
                  </button>
                ) : started ? (
                  <button className="btn btn-circle btn-outline-success" disabled>
                    Hurry
                  </button>
                ) : (
                      <button className="btn btn-circle btn-outline-success" onClick={handleStart}>
                        GO!
                      </button>
                    )}
                <span className="btn-circle-animation" />
              </div>
            </div>

            {ended ? (
              <div className="bg-dark text-light p-4 mt-5 lead rounded">
                <span>"{corpus.corpus}"</span>
                <span className="d-block mt-2 text-muted small">- {corpus.author}</span>
              </div>
            ) : started ? (
              <div
                className={`text-light mono quotes${started ? ' active' : ''}${isError
                  ? ' is-error'
                  : ''}`}
                tabIndex={0}
                onKeyDown={handleTyping}
                ref={inputRef}
              >
                {input}
              </div>
            ) : (
                  <div className="mono quotes text-muted" tabIndex={-1} ref={inputRef}>
                    {input}
                  </div>
                )}

            <div className="p-4 mt-4 bg-dark text-light rounded lead" ref={outputRef} />
          </div>
        </div>
        {/* <div className={styles.container}>
            <Timer />
            <GameCard />
          </div> */}
      </div>
    </div>
  )
}

export default Game;
