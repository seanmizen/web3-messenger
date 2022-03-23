import styles from "./ChatScreen.module.css";
import MessageInput from "./components/MessageInput";
import Message from "./components/Message";
import { prettyTime } from "../../pages/Chats";

function ChatScreen({ chat, currentUser, submitMessageBody }) {
  if (typeof chat !== "object") {
    return <div></div>;
  }

  const chatLastActive = new Date(
    chat.messages?.length
      ? parseInt(chat.messages[chat.messages.length - 1].unixTimeStamp)
      : 0
  );
  return (
    <div className={styles["chat-screen"]}>
      <div className={styles["header"]}>
        <div className={styles["title"]}>{chat.name}</div>
        {/* The following div collapses if timestamp is not available (chatLastActive === 0) */}
        <div className={styles["meta"]}>
          {chatLastActive.valueOf() === 0
            ? ""
            : prettyTime(chatLastActive, "Chat last active at")}
        </div>
      </div>
      <ul className={styles["chat-view"]}>
        {chat.messages?.map((message, index) => {
          let isSequential = false;
          if (index > 0) {
            isSequential =
              chat.messages[index - 1].senderAddress === message.senderAddress;
          }
          const isCurrentUser = message.senderAddress === currentUser.address;
          return (
            <Message
              key={index}
              isSequential={isSequential}
              isCurrentUser={isCurrentUser}
              message={message}
            />
          );
        })}
      </ul>
      <MessageInput submitMessageBody={submitMessageBody} />
    </div>
  );
}

export default ChatScreen;

// harvested from Whatsapp:
//<svg viewBox="0 0 8 13" width="8" height="13" class=""><path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path><path fill="currentColor" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path></svg>
