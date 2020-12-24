import React, { useState, useRef, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import GameStats from "../../components/game-stats";
import EntryModal from "../../components/entry-modal";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";

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
  const [corpus, setCorpus] = useState("");
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    // Hit the backend for the corpus in which the user will type
    const res = axios.post("/api/sentences", {
      numSentences: 1
    });
    res.then((data) => {
      setCorpus(data.data.content);
    });
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setStarted(false);
    setEnded(true);
    setInput("");
  };

  const renderModal = () => {
    setShowModal(true);
  };

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
    } else if(event.shiftKey) {
      // if user presses Shift key, don't do anything cuz its not an error and its not correct always
    } else {
      setErrorIndex(errorIndex + 1);
      setIsError(true);
      setNumOfErrors(numOfErrors + 1);
    }

    // WPM Algorithm
    const timeRemains: any = ((60 - duration) / 60).toFixed(2);
    const tR = 0.5 - timeRemains;
    const _acc = Math.floor(((index - errorIndex) / index) * 1000);
    const _wpm = Math.round(
      (correctIndex / 5 - numOfErrors) / Math.abs(tR) + 0.000001
    );

    if (index > 5) {
      setAccuracy(_acc);
      if (_wpm < 0) {
        setWpm(0);
      } else {
        setWpm(_wpm);
      }
    }
    if (index + 1 === corpusText.length || errorIndex > 50) {
      handleEnd();
    }
  };

  return (
    <div>
      <div className={styles.setting_headercontainer}>
      <Link href="/">
        <div className={styles.wrapperDiv}>
          <a className={styles.chevronLink} href="/" >
            <FaChevronLeft size={32} />
          </a>
        </div>
        </Link>
    </div >
    <div className={styles.game}>
      <div className={styles.row}>
        <div className="col-sm-6 col-md-2 order-md-0 px-5">
          <ul className="list-unstyled text-center small">
            <GameStats name="Timer" data={duration} style={""} />
            <GameStats style={""} name="Errors" data={errorIndex} />
            <GameStats
              style={""}
              name="Acuracy"
              data={`${Math.round(accuracy * 0.1)}%`}
            />
          </ul>
        </div>
        <div className="col-sm-12 col-md-8 order-md-1">
          <div className="container">
            <div className="text-center mt-4 header">
              <div className="control my-5">
                {ended ? (
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => window.location.reload()}
                  >
                    Reload
                  </button>
                ) : started ? (
                  <button
                    className="btn btn-outline-success"
                    disabled
                  >
                    Type!
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-success"
                    onClick={handleStart}
                  >
                    Click here to start!
                  </button>
                )}
                <span className="btn-circle-animation" />
              </div>
            </div>

            {ended ? (
              <div className="bg-dark-complete mono p-4 mt-5 lead rounded">
                <h1>
                  <span>
                    Congratulations you got a score of{" "}
                    <span className="green">{wpm}</span> WPM!
                  </span>
                </h1>
                {/* This button needs styling */}
                <button className="modalButton" onClick={() => renderModal()}>
                  Add to Leaderboard
                </button>
                {showModal ? (
                  <EntryModal
                    showModal={showModal}
                    headerText="Add To Leaderboard"
                    wpm={wpm.toString()}
                    errors={errorIndex}
                    accuracy={`${Math.round(accuracy * 0.1)}%`}
                    handleClose={handleClose}
                  />
                ) : (
                  <div></div>
                )}
              </div>
            ) : started ? (
              <div
                className={`text-light mono quotes${started ? " active" : ""}${
                  isError ? " is-error" : ""
                }`}
                tabIndex={0}
                onKeyDown={handleTyping}
                ref={inputRef}
              >
                {input}
              </div>
            ) : (
              <div
                className="bg-dark mono quotes text-muted"
                tabIndex={-1}
                ref={inputRef}
              >
                {input}
              </div>
            )}

            <div className="p-4 mt-4 bg-dark rounded lead" ref={outputRef} />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Game;
