import styles from "../AllChats.module.css";
import { prettyTime } from "../../../pages/Chats";
// displays the chat title and the last message or event in the chat

const ChatStub = ({
  chat,
  user,
  currentChatID,
  setCurrentChatID,
  displayIndex,
  currentChatDisplayIndex,
}) => {
  const onClick = () => {
    setCurrentChatID(chat.chatID);
  };

  const timestamp = new Date(
    chat.messages?.length
      ? parseInt(chat.messages[chat.messages.length - 1].unixTimeStamp)
      : 0
  );

  return (
    <li
      onClick={onClick}
      className={
        displayIndex === currentChatDisplayIndex ? styles["current-chat"] : ""
      }
    >
      <span className={styles["stub-name"]}>{chat.name || "\xa0"}</span>
      <span className={styles["stub-last-message"]}>
        {(chat.messages?.length &&
          (chat.messages[chat.messages.length - 1].senderName === user.name
            ? "You"
            : chat.messages[chat.messages.length - 1].senderName) +
            ": " +
            chat.messages[chat.messages.length - 1].body) ||
          "\xa0"}
      </span>
      <span className={styles["timestamp"]}>
        {timestamp.getTime() === 0 ? "Never Active" : prettyTime(timestamp)}
      </span>
    </li>
  );
};

export default ChatStub;
