import styles from "./AllChats.module.css";
import ChatStub from "./components/ChatStub";
import SearchBar from "./components/SearchBar";
import MenuBar from "../../components/MenuBar";
import { useState } from "react";

const AllChats = ({ chats, currentUser, currentChatID, setCurrentChatID }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const chatMatchesSearch = (chat) => {
    if (searchTerm === "") {
      return true;
    }
    chat.messages.forEach((message) => {
      if (message.body.toLowerCase().includes(searchTerm.toLowerCase())) {
        console.log(message.body);
        return true;
      }
    });
    return false;
  };

  return (
    <div className={styles["left-side"]}>
      <MenuBar />
      <SearchBar key={-1} setSearchTerm={setSearchTerm}></SearchBar>
      <ul className={styles["chat-list"]}>
        {chats?.filter(chatMatchesSearch).map((chat, index) => {
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
    </div>
  );
};

export default AllChats;
