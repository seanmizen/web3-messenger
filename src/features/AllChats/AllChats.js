import styles from "./AllChats.module.css";
import ChatStub from "./components/ChatStub";
import SearchBar from "./components/SearchBar";
import MenuBar from "../../components/MenuBar";
import { useState } from "react";

const AllChats = ({ chats, currentUser, currentChatID, setCurrentChatID }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const createNewChat = () => {
    return "no";
  };

  const chatMatchesSearch = (chat) => {
    if (searchTerm === "") {
      return true;
    }
    chat.messages.forEach((message) => {
      if (message.body.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
    });
    return false;
  };

  return (
    <div className={styles["left-side"]}>
      <SearchBar key={-1} setSearchTerm={setSearchTerm}></SearchBar>
      <ul className={styles["chat-list"]}>
        {chats
          ?.filter(chatMatchesSearch)
          .sort(
            (a, b) =>
              b.messages[b.messages.length - 1]?.unixTimeStamp -
              a.messages[a.messages.length - 1]?.unixTimeStamp
          )
          .map((chat, index) => {
            return (
              <ChatStub
                key={index}
                chat={chat}
                currentUser={currentUser}
                chatStubIndex={index}
                setCurrentChatID={setCurrentChatID}
                currentChatID={currentChatID}
              />
            );
          })}
      </ul>
      <MenuBar createNewChat={createNewChat} />
    </div>
  );
};

export default AllChats;
