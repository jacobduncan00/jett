import React from "react";
import styles from "../../styles/Home.module.css";
import Active from "./active";

const LargeCard = () => {
  return (
    <div>
      <div className={styles.settings_container}>
        <h3 className={styles.settings_title}>Time</h3>
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
      </div>
    </div>
  );
};

export default LargeCard;
