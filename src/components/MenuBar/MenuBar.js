import styles from "./MenuBar.module.css";
import { Link } from "react-router-dom";

// profile
// new chat
// settings

const MenuBar = ({ createNewChat }) => {
  return (
    <div className={styles["menu-bar"]}>
      <Link to="/profile">
        <button>Profile</button>
      </Link>
      <Link to="/">
        <button onClick={createNewChat}>new chat</button>
      </Link>
      <Link to="/settings">
        <button>settings</button>
      </Link>
    </div>
  );
};

export default MenuBar;
