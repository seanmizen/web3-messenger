import styles from "../AllChats.module.css";

// displays the last message of a chat

// Expects a chat object with .messages in the following format:
// {
//     id: 1,
//     senderAddress: "0x2",
//     senderName: "John Smith",
//     body: "body 1",
// }

const ChatStub = ({ chat, currentUser }) => {
  // console.log(currentUser.name);
  return (
    <li>
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
    </li>
  );
};

export default ChatStub;
