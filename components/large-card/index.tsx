import React from "react";
import styles from "../../styles/Home.module.css";
import Active from "./active";

const LargeCard = () => {
  return (
    <div>
      <div className={styles.settings_container}>
        <h3 className={styles.settings_title}>Time</h3>
        <hr className={styles.settings_hr} />
        <div className={styles.settings_buttontimeselector}>
          <Active
            elements={[
              { name: "15s" },
              { name: "30s" },
              { name: "60s" },
              { name: "120s" },
            ]}
          />
        </div>
        <h3 className={styles.settings_title}>Words</h3>
        <hr className={styles.settings_hr} />
        <div className={styles.settings_buttontimeselector}>
          <Active
            elements={[
              { name: "10" },
              { name: "25" },
              { name: "50" },
              { name: "100" },
            ]}
          />
        </div>
        <h3 className={styles.settings_title}>Dark Theme</h3>
        <hr className={styles.settings_hr} />
        <div className={styles.settings_buttontimeselector}>
          <Active elements={[{ name: "On" }, { name: "Off" }]} />
        </div>
      </div>
      <footer className={styles.footer}>
        Copyright &copy; 2020, Jacob Duncan
      </footer>
    </div>
  );
};

export default LargeCard;
