import styles from "./Chats.module.css";
import { ChatScreen, AllChats } from "../../features";
import { Web3Context } from "../../services";
import { useState, useEffect, useContext } from "react";

const defaultChats = {
  1: {
    chatID: 1,
    name: "My First Chat",
    currentUsers: ["0xca1BFC2Bf173ada6d60c05C20F86eA670Dae6096"],
    messages: [
      {
        id: 1,
        senderAddress: "0x3",
        senderName: "John Smith",
        blockTimeStamp: "1648028969820",
        unixTimeStamp: "1648028969820",
        body: "Hello, friend",
      },
    ],
  },
  2: {
    chatID: 2,
    name: "My First Chat",
    currentUsers: ["0xca1BFC2Bf173ada6d60c05C20F86eA670Dae6096"],
    messages: [
      {
        id: 1,
        senderAddress: "0x3",
        senderName: "John Smith",
        blockTimeStamp: "1648028969820",
        unixTimeStamp: "1648028969820",
        body: "Hello, friend",
      },
      {
        id: 2,
        senderAddress: "0x3",
        senderName: "John Smith",
        blockTimeStamp: "1648028969820",
        unixTimeStamp: "1648028969820",
        body: "I hope you had a good day.",
      },
      {
        id: 3,
        senderAddress: "0x23A40E1461D493AF9ca7F6eEF6Dc28058463f210",
        senderName: "Current User",
        blockTimeStamp: "1648028969820",
        unixTimeStamp: "1648028969820",
        body: "You too!",
      },
    ],
  },
  3: {
    chatID: 3,
    name: "Another Chat",
    currentUsers: ["0xca1BFC2Bf173ada6d60c05C20F86eA670Dae6096"],
    messages: [],
  },
};

export const prettyTime = (time, prefix = "") => {
  // if last active today, just say the time. if not, say the whole date.
  if (typeof time !== "object") {
    return "";
  }
  const now = new Date(Date.now());
  let chatActiveToday = now.toLocaleDateString() === time.toLocaleDateString();
  const timeString = chatActiveToday
    ? time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : time.toLocaleString([], {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
  return (prefix.trim() + " " + timeString).trim();
};

function Chats() {
  // const [chats] = useState(defaultChats);
  const { user, chats } = useContext(Web3Context);
  const [currentChatID, setCurrentChatID] = useState(
    localStorage.getItem("currentChatID") || -1
  );
  const [currentChat, setCurrentChat] = useState(
    currentChatID > -1 ? chats[currentChatID] : {}
  );
  const [currentChatDisplayIndex, setCurrentChatDisplayIndex] = useState(
    Object.keys(chats).findIndex((id) => parseInt(id) === currentChatID)
  );

  const submitMessageBody = (body) => {
    let id = 1;
    currentChat.messages?.length &&
      (id = currentChat.messages[currentChat.messages.length - 1].id + 1);
    let userAddress = user.address;
    let senderName = user.name;
    let blockTimeStamp = "";
    let unixTimeStamp = Date.now();
    let message = {
      id, // id is local only -- not on .sol
      senderAddress: userAddress,
      senderName, // id is local only -- not on .sol
      blockTimeStamp, // blocktimestamp set by miner
      unixTimeStamp,
      body,
    };
    setCurrentChat(...currentChat.messages.push(message));
  };

  // update chat if a child component selects a new chatID
  useEffect(() => {
    setCurrentChatDisplayIndex(
      Object.keys(chats).findIndex(
        (id) => parseInt(id) === parseInt(currentChatID)
      )
    );
    if (typeof chats[currentChatID] != "undefined") {
      setCurrentChat(chats[currentChatID]);
      localStorage.setItem("currentChatID", currentChatID);
    }
  }, [chats, currentChatID]);

  return (
    <div className={styles["chats"]}>
      <div className={styles["all-chats"]}>
        <AllChats
          chats={chats}
          user={user}
          currentChatID={currentChatID}
          setCurrentChatID={setCurrentChatID}
          currentChatDisplayIndex={currentChatDisplayIndex}
        />
      </div>
      <div className={styles["chat-screen"]}>
        <ChatScreen
          chat={currentChat}
          currentUser={user}
          submitMessageBody={submitMessageBody}
        />
      </div>
    </div>
  );
}

export default Chats;
