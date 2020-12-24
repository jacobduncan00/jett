import React, { useEffect, useState } from "react";
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
  const [modalStatus, setModalStatus] = useState("");
  const [on, setOn] = useState(false);
  let showHideClassName;

  useEffect(() => {
    showHideClassName = showModal
    ? "modal display-block"
    : "modal display-none";
    setModalStatus(showHideClassName);
    setOn(true);
  });
  const [name, setName] = useState("");

  const handleTyping = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const sendToDb = () => {
    // http://localhost:5500/leaderboard/insert
    axios.post("/api/insert", {
      userName: name,
      wpm: wpm,
      numberOfErrors: errors,
      accuracy: accuracy,
    });
    setName("");
    showModal = false; // This is probably a very bad thing to do
  };

  return (
    on ? 
    <div className={modalStatus}>
      <section className="modal-main">
        <button className="top-right" onClick={() => {
          handleClose();
          setModalStatus("modal display-none");
          setOn(false);
          showHideClassName = "modal display-none";
          }
        }>X</button>
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
              sendToDb();
            }}
          >
            Submit
          </button>
        </div>
      </section>
    </div>
    : <div>Hi</div>
  );
}

export default EntryModal;
