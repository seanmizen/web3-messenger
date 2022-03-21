import styles from "./Chats.module.css";
import { ChatScreen, AllChats } from "../../features";

function Chats() {
  return (
    <div className={styles[""]}>
      <AllChats />
      <ChatScreen />
    </div>
  );
}

export default Chats;
