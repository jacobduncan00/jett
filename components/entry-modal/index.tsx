import React, { useState } from "react";
import axios from "axios";

// Adding types to the prop passed in from the game
type Props = {
  showModal: boolean;
  headerText: string;
  wpm: string;
  errors: Number;
  accuracy: string;
  handleClose: () => void;
};

// Get information from game and from input and send to the server to be stored
// in the leaderboard database
function EntryModal({
  showModal,
  headerText,
  wpm,
  errors,
  accuracy,
  handleClose,
}: Props) {
  const showHideClassName = showModal
    ? "modal display-block"
    : "modal display-none";
  const [name, setName] = useState("");

  const handleTyping = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const sendToDb = () => {
    // console.log(name, wpm, errors, accuracy);
    axios.post("http://localhost:5500/leaderboard/insert", {
      userName: name,
      wpm: wpm,
      numberOfErrors: errors,
      accuracy: accuracy,
    });
    setName("");
    showModal = false; // This is probably a very bad thing to do
  };

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <h1 className="modal-header">{headerText}</h1>
        <hr className="modal-hr" />
        <label className="modalLabel">enter name</label>
        <input
          type="text"
          className="modalInput"
          placeholder="Name"
          value={name}
          onChange={handleTyping}
        />
        <div>
          <button
            className="modalButton"
            onClick={() => {
              handleClose();
              sendToDb();
            }}
          >
            Submit
          </button>
        </div>
      </section>
    </div>
  );
}

export default EntryModal;
