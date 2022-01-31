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

const Active = (props: Props) => {
  let { elements } = props;
  const { setTime } = useStore();
  // const [active] = useState(elements);

  const [activeIndex, setActiveIndex] = useState(1);
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
            setTime(u.name);
          }}
          key={u.name}
        >
          {u.name}
        </button>
      ))}
    </>
  );
};

export default Active;
export const timeContext = React.createContext(words);
