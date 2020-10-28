import React, { useState } from "react";
import LargeCard from "../../components/large-card";
import styles from "../../styles/Home.module.css";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";

const Settings = () => {
  const [time, setTime] = useState(0);
  const [words, setWords] = useState(0);
  // If I can't find a way to get this time and words state to the game component
  // I feel like it wouldn't be too bad to set it in an API post
  // then set the state in the game component using a useEffect and setting the values on component mount
  return (
    <div className={styles.setting_headercontainer}>
      <Link href="/">
        <div className={styles.wrapperDiv}>
          <a className={styles.chevronLink} href="/" >
            <FaChevronLeft size={32} />
          </a>
          <h1 className={styles.settings_header}>Settings</h1>
        </div>
      </Link>
      <LargeCard />
    </div >
  );
};

export default Settings;
