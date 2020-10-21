import React from "react";
import LargeCard from "../../components/large-card";
import styles from "../../styles/Home.module.css";

const Settings = () => {
  return (
    <div>
      <h1 className={styles.settings_header}>Settings</h1>
      <LargeCard />
    </div>
  );
};

export default Settings;
