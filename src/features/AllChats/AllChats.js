import styles from "./AllChats.module.css";
import ChatStub from "./components/ChatStub";
import SearchBar from "./components/SearchBar";
import { useState } from "react";

const AllChats = ({ chats, currentUser }) => {
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
    <ul className={styles["chat-list"]}>
      <SearchBar key={-1} setSearchTerm={setSearchTerm}></SearchBar>
      {chats?.filter(chatMatchesSearch).map((chat, index) => {
        return <ChatStub key={index} chat={chat} currentUser={currentUser} />;
      })}
    </ul>
  );
};

export default AllChats;
