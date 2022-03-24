import styles from "./AllChats.module.css";
import ChatStub from "./components/ChatStub";
import SearchBar from "./components/SearchBar";
import MenuBar from "../../components/MenuBar";
import { useState } from "react";

const AllChats = ({
  chats,
  user,
  currentChatID,
  setCurrentChatID,
  currentChatDisplayIndex,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [chatIDsToDisplay] = useState(Object.keys(chats)); //ordered

  const chatFilterReducer = (previous, current, i) => {
    const st = searchTerm.trim().toLowerCase();
    if (searchTerm.trim() === "") {
      previous.push(current);
      return previous;
    }
    const chat = chats[current];
    console.log(chat);
    //check for chat name
    if (chat.name?.toLowerCase().includes(st)) {
      previous.push(current);
    } else if (
      //check user names
      chat.currentUsers?.find((user) => {
        return user.name?.toLowerCase().includes(st);
      }) > -1
    ) {
      previous.push(current);
    } else if (
      //check for message content
      chat.messages?.find((message) => {
        return message.name?.toLowerCase().includes(st);
      }) > -1
    ) {
      previous.push(current);
    }
    console.log(chatIDsToDisplay.length);
    return previous;
  };

  const createNewChat = () => {
    return "no";
  };

  return (
    <div className={styles["left-side"]}>
      <SearchBar key={-1} setSearchTerm={setSearchTerm}></SearchBar>
      <ul className={styles["chat-list"]}>
        {chatIDsToDisplay.reduce(chatFilterReducer, []).map((chatID, index) => {
          return (
            <ChatStub
              key={index}
              displayIndex={index}
              chat={chats[chatID]}
              user={user}
              setCurrentChatID={setCurrentChatID}
              currentChatID={currentChatID}
              currentChatDisplayIndex={currentChatDisplayIndex}
            />
          );
        })}
      </ul>
      <MenuBar createChat={createNewChat} />
    </div>
  );
};

export default AllChats;
