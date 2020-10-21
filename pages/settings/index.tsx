import React from "react";
import LargeCard from "../../components/large-card";
import styles from "../../styles/Home.module.css";
import { ReactComponent as BackButton } from "./back-button.svg";

const Settings = () => {
  return (
    <div className="styles.setting_headercontainer">
      {/* <img src="./back-button.svg" alt="Back Button SVG Image" /> */}
      
      <h1 className={styles.settings_header}>Settings</h1>
      <LargeCard />
    </div>
  );
};

export default Settings;
