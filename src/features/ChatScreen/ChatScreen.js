import styles from "./ChatScreen.module.css";
import MessageInput from "./components/MessageInput";
import Message from "./components/Message";

function ChatScreen({ chat, currentUser }) {
  if (typeof chat !== "object") {
    return <div></div>;
  }

  const chatLastActive = chat.messages.length
    ? new Date(chat.messages[chat.messages.length - 1].unixTimeStamp * 1000)
    : new Date(0);

  const prettyTime = (prefix, time) => {
    // if last active today, just say the time. if not, say the whole date.
    if (typeof time !== "object") {
      return "";
    }
    const now = new Date(Date.now());
    let chatActiveToday =
      now.toLocaleDateString() === time.toLocaleDateString();
    const timeString = chatActiveToday
      ? time.toLocaleTimeString()
      : time.toLocaleString();
    return prefix.trim() + " " + timeString;
  };

  return (
    <div className={styles["chat-screen"]}>
      <div className={styles["header"]}>
        <div className={styles["title"]}>{chat.name}</div>
        {/* The following div collapses if timestamp is not available: */}
        <div className={styles["meta"]}>
          {prettyTime("Chat last active at", chatLastActive)}
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
              isSequential={isSequential}
              isCurrentUser={isCurrentUser}
              message={message}
            />
          );
        })}
      </ul>
      <MessageInput />
    </div>
  );
}

export default ChatScreen;

// harvested from Whatsapp:
//<svg viewBox="0 0 8 13" width="8" height="13" class=""><path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path><path fill="currentColor" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path></svg>
