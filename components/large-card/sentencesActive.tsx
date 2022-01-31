import React, { useState } from "react";
import styles from "../../styles/Home.module.css";
import { useStore } from "../../store";

type Element = {
  name: string;
};

type Props = {
  elements: Element[];
};

let words = "";

const SentencesActive = (props: Props) => {
  let { elements } = props;
  const { setSentences } = useStore();
  // const [active] = useState(elements);

  const [activeIndex, setActiveIndex] = useState(1); // figure out if I want to keep this 0 meaning it is the first button or if I want to make it out of reach "99" meaning that none of the buttons are activated
  const [activeString, setActiveString] = useState("");

  words = activeString;

  return (
    <>
      {elements.map((u, i) => (
        <button
          className={i === activeIndex ? styles.active : styles.settings_button}
          onClick={() => {
            setActiveIndex(i);
            setActiveString(u.name);
            setSentences(u.name);
          }}
          key={u.name}
        >
          {u.name}
        </button>
      ))}
    </>
  );
};

export default SentencesActive;
export const timeContext = React.createContext(words);
