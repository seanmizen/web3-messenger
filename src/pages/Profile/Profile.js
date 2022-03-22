import styles from "./Profile.module.css";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <div className={styles[""]}>
      <Link to="/" tabIndex={-1}>
        <button>back</button>
      </Link>
    </div>
  );
}

export default Profile;
