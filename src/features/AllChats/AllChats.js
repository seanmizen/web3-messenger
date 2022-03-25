import styles from "./AllChats.module.css";
import ChatStub from "./components/ChatStub";
import SearchBar from "./components/SearchBar";
import MenuBar from "../../components/MenuBar";
import { useEffect, useState } from "react";

const AllChats = ({
  chats,
  user,
  currentChatID,
  setCurrentChatID,
  currentChatDisplayIndex,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [chatIDsToDisplay, setChatIDsToDisplay] = useState(Object.keys(chats)); //ordered

  const chatFilterReducer = (previous, current, i) => {
    const st = searchTerm.trim().toLowerCase();
    if (searchTerm.trim() === "") {
      previous.push(current);
      return previous;
    }
    const chat = chats[current];

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
    return previous;
  };

  const createNewChat = () => {
    return "no";
  };

  useEffect(() => {
    setChatIDsToDisplay(Object.keys(chats));
  }, [chats]);

  return (
    <div className={styles["left-side"]}>
      <SearchBar key={-1} setSearchTerm={setSearchTerm}></SearchBar>
      <div className={styles["chat-list-box"]}>
        <ul className={styles["chat-list"]}>
          {chatIDsToDisplay
            .reduce(chatFilterReducer, [])
            .map((chatID, index) => {
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
      </div>
      <MenuBar createChat={createNewChat} />
    </div>
  );
};

export default AllChats;
