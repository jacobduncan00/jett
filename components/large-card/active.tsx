import React, { useState } from "react";
import styles from "../../styles/Home.module.css";

type Element = {
  name: string;
};

type Props = {
  elements: Element[];
};

const Active = (props: Props) => {
  let { elements } = props;
  // const [active] = useState(elements);

  const [activeIndex, setActiveIndex] = useState(99); // figure out if I want to keep this 0 meaning it is the first button or if I want to make it out of reach "99" meaning that none of the buttons are activated

  return (
    <>
      {elements.map((u, i) => (
        <button
          className={i === activeIndex ? styles.active : styles.settings_button}
          onClick={() => setActiveIndex(i)}
          key={u.name}
        >
          {u.name}
        </button>
      ))}
    </>
  );
};

export default Active;
