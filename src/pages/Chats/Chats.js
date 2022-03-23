import styles from "./Chats.module.css";
import { ChatScreen, AllChats } from "../../features";
import { useState, useEffect } from "react";

const tempChats = [
  {
    id: 1,
    name: "My First Chat",
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
  {
    id: 2,
    name: "My Second Chat",
    messages: [
      {
        id: 1,
        senderAddress: "0x23A40E1461D493AF9ca7F6eEF6Dc28058463f210",
        senderName: "Current User",
        blockTimeStamp: "1648020000000",
        unixTimeStamp: "1648020000000",
        body: "I sent a message!",
      },
      {
        id: 2,
        senderAddress: "0x3",
        senderName: "not u",
        blockTimeStamp: "1648020000000",
        unixTimeStamp: "1648026000000",
        body: "I responded.",
      },
    ],
  },
  {
    id: 3,
    name: "Harry's Special Chat",
    messages: [
      {
        id: 1,
        senderAddress: "0x3",
        senderName: "Harry Hadden",
        blockTimeStamp: "1648028969820",
        unixTimeStamp: "1648028969820",
        body: "Sean",
      },
      {
        id: 2,
        senderAddress: "0x3",
        senderName: "Harry Hadden",
        blockTimeStamp: "1648028969820",
        unixTimeStamp: "1648028969820",
        body: "I think I messed up",
      },
      {
        id: 3,
        senderAddress: "0x23A40E1461D493AF9ca7F6eEF6Dc28058463f210",
        senderName: "Current User",
        blockTimeStamp: "1648028969820",
        unixTimeStamp: "1648028969820",
        body: "same as usual?",
      },
      {
        id: 4,
        senderAddress: "0x3",
        senderName: "Harry Hadden",
        blockTimeStamp: "1648028969820",
        unixTimeStamp: "1648030000000",
        body: "No, this time it was the haberdashery",
      },
    ],
  },
  {
    id: 4,
    name: "My Empty Chat",
    messages: [],
  },
  {
    id: 5,
    name: "My Empty Chat",
    messages: [],
  },
  {
    id: 6,
    name: "My Empty Chat",
    messages: [],
  },
  {
    id: 7,
    name: "My Empty Chat",
    messages: [],
  },
];

let tempCurrentUser = {
  address: "0x23A40E1461D493AF9ca7F6eEF6Dc28058463f210",
  name: "Current User",
};

// function setItem(item) {
//   const newList = [...list];
//   const index = list.findIndex((listItem) => listItem.id === item.id);

//   //this next bit is cool -
//   //destructure your newlist[item] and your item and then re-merge them.
//   //because "item" is later than "newList[item]"", it's values will take priority.
//   newList[index] = {
//     ...newList[index],
//     ...item,
//   };
//   setList(newList);
// }

// const clearLocalStorage = () => {
//   setDeckName("");
//   setList([]);
//   localStorage.clear();
//   return 0;
// };

export const prettyTime = (time, prefix = "") => {
  // if last active today, just say the time. if not, say the whole date.
  if (typeof time !== "object") {
    return "";
  }
  const now = new Date(Date.now());
  let chatActiveToday = now.toLocaleDateString() === time.toLocaleDateString();
  const timeString = chatActiveToday
    ? time.toLocaleTimeString()
    : time.toLocaleString();
  return (prefix.trim() + " " + timeString).trim();
};

function Chats() {
  const [chats] = useState(tempChats);
  const [currentChatID, setCurrentChatID] = useState(
    localStorage.getItem("currentChatID") || -1
  );
  const chatIndexToRetrieve = chats.findIndex(
    ({ id }) => id === parseInt(currentChatID)
  );
  const [currentChat, setCurrentChat] = useState(
    currentChatID > -1 ? chats[chatIndexToRetrieve] : {}
  );
  const [currentUser] = useState(tempCurrentUser);

  const submitMessageBody = (body) => {
    let id = 1;
    currentChat.messages?.length &&
      (id = currentChat.messages[currentChat.messages.length - 1].id + 1);
    let senderAddress = currentUser.address;
    let senderName = currentUser.name;
    let blockTimeStamp = "";
    let unixTimeStamp = Date.now();
    let message = {
      id,
      senderAddress,
      senderName,
      blockTimeStamp,
      unixTimeStamp,
      body,
    };
    let chatCopy = { ...currentChat };
    chatCopy.messages.push(message);
    setCurrentChat(chatCopy);
  };

  // update chat if a child component selects a new chatID
  useEffect(() => {
    const currentChat = chats.find(({ id }) => currentChatID === id);
    if (typeof currentChat != "undefined") {
      setCurrentChat(currentChat);
      localStorage.setItem("currentChatID", currentChatID);
    }
  }, [chats, currentChatID]);

  return (
    <div className={styles["chats"]}>
      <div className={styles["all-chats"]}>
        <AllChats
          chats={chats}
          currentUser={currentUser}
          currentChatID={currentChatID}
          setCurrentChatID={setCurrentChatID}
        />
      </div>
      <div className={styles["chat-screen"]}>
        <ChatScreen
          chat={currentChat}
          currentUser={currentUser}
          submitMessageBody={submitMessageBody}
        />
      </div>
    </div>
  );
}

export default Chats;
