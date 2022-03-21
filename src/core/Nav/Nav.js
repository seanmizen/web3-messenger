import React from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <nav className={styles["nav"]}>
      <div className="nav">
        <ul className={styles["nav-list"]}>
          <li className={styles["nav-list-item"]}>
            <Link to="/profile">Profile</Link>
          </li>
          <li className={styles["nav-list-spacer"]} />
          <li className={styles["nav-list-item"]}>
            <Link to="/">Chats</Link>
          </li>
          <li className={styles["nav-list-spacer"]} />
          <li className={styles["nav-list-item"]}>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
