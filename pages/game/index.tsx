import React, { useState, useRef, useEffect } from "react";
import allowedKeys from "../../components/keys";
import Timer from "../../components/timer";
import GameCard from "../../components/game-card";
import styles from "../../styles/Home.module.css";
import GameStats from "../../components/game-stats";

let interval = null;

function Game() {
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [input, setInput] = useState("");
  const [duration, setDuration] = useState(30);
  const [index, setIndex] = useState(0);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [isError, setIsError] = useState(false);
  const [errorIndex, setErrorIndex] = useState(0);
  const [numOfErrors, setNumOfErrors] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [lastScore, setLastScore] = useState("0");
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
  };

  const handleEnd = () => {
    setEnded(true);
    setStarted(false);
    clearInterval(interval);
  };

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
  };

  const handleTyping = (event: any) => {
    event.preventDefault();
    const { key } = event; // Get the key that the user pressed from the event object
    const corpusText = corpus;

    if (key == corpusText.charAt(index)) {
      setIndex(index + 1); // Only increment the index to check if the user typed the correct key
      const currentCharacter = corpusText.substring(
        index + 1,
        index + corpusText.length
      );
      setInput(currentCharacter);
      setCorrectIndex(correctIndex + 1);
      setIsError(false);
      setNumOfErrors(0);
      outputRef.current.innerHTML += key;
    } else {
      setErrorIndex(errorIndex + 1);
      setIsError(true);
      setNumOfErrors(numOfErrors + 1);
    }

    const timeRemains: any = ((60 - duration) / 60).toFixed(2);
    const tR = 0.5 - timeRemains;
    const _acc = Math.floor((index - errorIndex) / index * 1000);
    const _wpm = Math.round(((correctIndex / 5) - numOfErrors) / Math.abs(tR) + 0.000001);
    console.log(_wpm);

    if (index > 5) {
      setAccuracy(_acc);
      setCpm(correctIndex);
      if (_wpm < 0) {
        setWpm(0);
      } else {
        setWpm(_wpm);
      }
    }
    if (index + 1 === corpusText.length || errorIndex > 50) {
      handleEnd();
    }
  }

  // const handleTyping = (event: any) => {
  //   event.preventDefault();
  //   const { key } = event; // Get the key that the user pressed from the event object
  //   const corpusText = corpus;

  //   setInterval(() => {
  //     setWpm(wpm);
  //   }, 1000);

  //   if (key === corpusText.charAt(index)) {
  //     setIndex(index + 1); // Only increment the index to check if the user typed the correct key
  //     const currentCharacter = corpusText.substring(
  //       index + 1,
  //       index + corpusText.length
  //     );
  //     setInput(currentCharacter);
  //     setCorrectIndex(correctIndex + 1);
  //     setIsError(false);
  //     outputRef.current.innerHTML += key;
  //   } else {
  //     if (allowedKeys.includes(key)) {
  //       setErrorIndex(errorIndex + 1);
  //       setNumOfErrors(numOfErrors + 1);
  //       setIsError(true);
  //     }
  //   }

  //   const timeRemaining = parseFloat(((60 - duration) / 60).toFixed(2));
  //   const accuracy2 = Math.floor((index - errorIndex) / (index * 100));
  //   const WPM3 = Math.round(((correctIndex / 1) - (numOfErrors * 2)) / 0.5);
  //   const WPM2 = (Math.round(correctIndex / 1 / timeRemaining)); // Its because here we are calculating in terms of 1 second interval, we need to do milliseconds

  //   if (index > 1) {
  //     setAccuracy(accuracy2);
  //     setCpm(correctIndex);
  //     setWpm(WPM3);
  //   }
  //   if (index + 1 === corpusText.length || errorIndex > 50) {
  //     handleEnd();
  //     setWpm(WPM3);
  //   }
  // };

  useEffect(() => {
    if (ended) {
      const wp = wpm.toString();
      localStorage.setItem("wpm", String(wpm));
    }
  }, [ended, wpm]);

  useEffect(() => {
    const storedScore = localStorage.getItem("wpm");
    if (storedScore) {
      setLastScore(storedScore);
    }
  });

  return (
    <div className={styles.game}>
      <div className={styles.row}>
        <div className="col-sm-6 col-md-2 order-md-0 px-5">
          <ul className="list-unstyled text-center small">
            <GameStats
              name="WPM"
              data={wpm}
              style={
                { color: "white", backgroundcolor: "white" }
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
                  <button
                    className="btn btn-circle btn-outline-success"
                    disabled
                  >
                    Hurry
                  </button>
                ) : (
                      <button
                        className="btn btn-circle btn-outline-success"
                        onClick={handleStart}
                      >
                        GO!
                      </button>
                    )}
                <span className="btn-circle-animation" />
              </div>
            </div>

            {/* If the player finished the game either by the timer or by entering all the letters */}
            {ended ? (
              <div className="bg-dark text-light p-4 mt-5 lead rounded">
                <span>Congratulations you got a score of {wpm} WPM!</span>
              </div>
            ) : started ? (
              <div
                className={`text-light mono quotes${started ? " active" : ""}${isError ? " is-error" : ""
                  }`}
                tabIndex={0}
                onKeyDown={handleTyping}
                ref={inputRef}
              >
                {input}
              </div>
            ) : (
                  // This is the textbox where the quote comes up
                  <div
                    className="bg-dark mono quotes text-muted"
                    tabIndex={-1}
                    ref={inputRef}
                  >
                    {input}
                  </div>
                )}

            <div
              className="p-4 mt-4 bg-dark text-light rounded lead"
              ref={outputRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
