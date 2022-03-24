import styles from "./Settings.module.css";
import { ThemeContext } from "../../Theme";
import { ThemeToggle } from "../../components";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Settings() {
  const { mode, toggleMode } = useContext(ThemeContext);
  return (
    <div className={styles[""]}>
      <Link to="/" tabIndex={-1}>
        <button>back</button>
      </Link>
      <ThemeToggle mode={mode} toggleMode={toggleMode} />
    </div>
  );
}

export default Settings;
