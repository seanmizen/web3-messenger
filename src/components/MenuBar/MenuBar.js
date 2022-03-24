import styles from "./MenuBar.module.css";
import { Link } from "react-router-dom";
import { Add, Wrench } from "../../assets";
import { useContext } from "react";
import { ThemeToggleUnstyled } from "../ThemeToggle";
import { ThemeContext } from "../../Theme";

const MenuBar = ({ createChat }) => {
  const { mode, toggleMode } = useContext(ThemeContext);
  return (
    <div className={styles["menu-bar"]}>
      <div className={styles["other-side"]}>&gt;&gt;&gt;</div>
      <div className={styles["buttons-container"]}>
        <Link to="/" tabIndex={-1}>
          <ThemeToggleUnstyled mode={mode} toggleMode={toggleMode}>
            {mode[0].toUpperCase()}
          </ThemeToggleUnstyled>
        </Link>
        {/* <Add /> */}
        <Link to="/profile" tabIndex={-1}>
          <button>P</button>
        </Link>
        <Link to="/" tabIndex={-1}>
          <button onClick={createChat}>
            <Add />
          </button>
        </Link>
        <Link to="/settings" tabIndex={-1}>
          <button>
            <Wrench />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenuBar;
