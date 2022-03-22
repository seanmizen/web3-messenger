import styles from "./ChatScreen.module.css";
import MessageInput from "./components/MessageInput";

// chat:
// {
//   id: 1,
//   name: "My First Chat",
//   messages: [
//    {
//      id: 1,
//      senderAddress: "0x2",
//      senderName: "John Smith",
//      body: "body 1",
//    }

// currentUser:
// .address
// .privateKey <-- should not be exposed here

function ChatScreen({ chat, currentUser }) {
  const chatLastActive = chat.messages.length
    ? chat.messages[chat.messages.length - 1].unixTimestamp
    : Date(0);

  const prettyTime = (prefix, time) => {
    return typeof time == "object"
      ? prefix.trim() + " " + time.toLocaleDateString()
      : "";
  };

  return (
    <div className={styles["chat-screen"]}>
      <div className={styles["header"]}>
        <div className={styles["title"]}>{chat.name}</div>
        {/* Let the following div collapse if timestamp is not available: */}
        <div className={styles["meta"]}>
          {prettyTime("Chat last active at", chatLastActive)}
        </div>
      </div>
      <ul className={styles["chat-view"]}>
        {chat.messages?.map((message) => {
          let isCurrentUser = message.senderAddress === currentUser.address;
          return (
            <li
              className={
                isCurrentUser ? styles["current-user"] : styles["other-user"]
              }
            >
              <div className={styles["message"]}>
                {!isCurrentUser && (
                  <span className={styles["user-name"]}>
                    {message.senderName || "Example name"}
                  </span>
                )}
                <span>{message.body}</span>
              </div>
            </li>
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
