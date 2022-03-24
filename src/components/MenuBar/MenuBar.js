import styles from "./MenuBar.module.css";
import { Link } from "react-router-dom";
import { Add, Wrench, User } from "../../assets";

// profile
// new chat
// settings

const MenuBar = ({ createChat }) => {
  return (
    <div className={styles["menu-bar"]}>
      <div className={styles["other-side"]}>&gt;&gt;&gt;</div>
      <div className={styles["buttons-container"]}>
        {/* <Add /> */}
        <Link to="/profile" tabIndex={-1}>
          <button>Profile</button>
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
