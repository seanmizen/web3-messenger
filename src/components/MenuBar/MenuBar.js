import styles from "./MenuBar.module.css";
import { Link } from "react-router-dom";

// profile
// new chat
// settings

const MenuBar = ({ createNewChat }) => {
  return (
    <div className={styles["menu-bar"]}>
      <Link to="/profile" tabIndex={-1}>
        <button>Profile</button>
      </Link>
      <Link to="/" tabIndex={-1}>
        <button onClick={createNewChat}>new chat</button>
      </Link>
      <Link to="/settings" tabIndex={-1}>
        <button>settings</button>
      </Link>
    </div>
  );
};

export default MenuBar;
