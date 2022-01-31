import React from "react";
import LargeCard from "../../components/large-card";
import timeContext from "../../components/large-card";
import styles from "../../styles/Home.module.css";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";

const Settings = () => {
  return (
    <div className={styles.setting_headercontainer}>
      <Link href="/">
        <div className={styles.wrapperDiv}>
          <a className={styles.chevronLink} href="/">
            <FaChevronLeft size={32} />
          </a>
        </div>
      </Link>
      <LargeCard />
    </div>
  );
};

export default Settings;
