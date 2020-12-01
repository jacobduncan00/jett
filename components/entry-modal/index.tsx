import React from "react";

// Adding types to the prop passed in from the game
type Props = {
    showModal: boolean,
    headerText: string,
    handleClose: () => void
};

// Get information from game and from input and send to the server to be stored
// in the leaderboard database

function EntryModal({showModal, headerText, handleClose}: Props) {
    const showHideClassName = showModal ? "modal display-block" : "modal display-none";
    return(
        <div className={showHideClassName}>
            <section className="modal-main">
                <h1>{headerText}</h1>
                <label className="modalLabel">Name</label>
                <input type="text" className="modalInput" placeholder="Name"/>
                <div><button className="modalButton" onClick={handleClose}>Submit</button></div>
            </section>
        </div>
    );
};

export default EntryModal;