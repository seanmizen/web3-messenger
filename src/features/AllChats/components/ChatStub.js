import styles from "../AllChats.module.css";
// displays the chat title and the last message or event in the chat

const ChatStub = ({ chat, currentUser, currentChatID, setCurrentChatID }) => {
  const onClick = () => {
    setCurrentChatID(chat.id);
  };

  const timestamp = new Date(
    (chat.messages.length
      ? chat.messages[chat.messages.length - 1].unixTimeStamp
      : 0) * 1000
  );

  return (
    <li
      onClick={onClick}
      className={chat.id === currentChatID ? styles["current-chat"] : ""}
    >
      <span className={styles["stub-name"]}>{chat.name || "\xa0"}</span>
      <span className={styles["stub-last-message"]}>
        {(chat.messages.length &&
          (chat.messages[chat.messages.length - 1].senderName ===
          currentUser.name
            ? "You"
            : chat.messages[chat.messages.length - 1].senderName) +
            ": " +
            chat.messages[chat.messages.length - 1].body) ||
          "\xa0"}
      </span>
      <span className={styles["timestamp"]}>{timestamp.toLocaleString()}</span>
    </li>
  );
};

export default ChatStub;
