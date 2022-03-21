import styles from "./Settings.module.css";
import { ThemeContext } from "../../Theme";
import { ThemeToggle } from "../../components";
import React from "react";

function Settings() {
  const { mode, toggleMode } = React.useContext(ThemeContext);

  return (
    <div className={styles[""]}>
      <span>settings</span>
      <ThemeToggle mode={mode} toggleMode={toggleMode} />
    </div>
  );
}

export default Settings;
