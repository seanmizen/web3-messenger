import styles from "../ChatScreen.module.css";
const Message = ({ message, isCurrentUser, isSequential }) => {
  const timestamp = new Date(message.unixTimeStamp * 1000);
  return (
    <li
      className={
        (isCurrentUser ? styles["current-user"] : styles["other-user"]) +
        " " +
        (isSequential ? styles["sequential"] : "")
      }
    >
      <div className={styles["message"]}>
        {!isCurrentUser && (
          <span className={styles["user-name"]}>
            {message.senderName || "Example name"}
          </span>
        )}
        <span>{message.body || "\xa0"}</span>
        <div className={styles["meta"]}>
          {/* <div className={styles["non-timestamp"]}>[crypto metadata here]</div> */}
        </div>
        <div className={styles["timestamp"]}>
          {timestamp.toLocaleTimeString()}
        </div>
      </div>
    </li>
  );
};

export default Message;
