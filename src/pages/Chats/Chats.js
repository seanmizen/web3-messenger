import styles from "./Chats.module.css";
import { ChatScreen, AllChats } from "../../features";
import { useState } from "react";
import { useEffect } from "react";

const tempChats = [
  {
    id: 1,
    name: "My First Chat",
    messages: [
      {
        id: 1,
        senderAddress: "0x3",
        senderName: "John Smith",
        blockTimeStamp: "1647954706",
        unixTimeStamp: "1647940000",
        body: "ur bad",
      },
      {
        id: 2,
        senderAddress: "0x3",
        senderName: "John Smith",
        blockTimeStamp: "1647954706",
        unixTimeStamp: "1647954706",
        body: "I also think u smell",
      },
      {
        id: 3,
        senderAddress: "0x23A40E1461D493AF9ca7F6eEF6Dc28058463f210",
        senderName: "Current User",
        blockTimeStamp: "1647954706",
        unixTimeStamp: "1647954706",
        body: "I responded to a message???",
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
        blockTimeStamp: "1647954706",
        unixTimeStamp: "1647954706",
        body: "I sent a message!",
      },
      {
        id: 2,
        senderAddress: "0x3",
        senderName: "not u",
        blockTimeStamp: "1647954706",
        unixTimeStamp: "1647954706",
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
        blockTimeStamp: "1647954706",
        unixTimeStamp: "1647954600",
        body: "Sean",
      },
      {
        id: 2,
        senderAddress: "0x3",
        senderName: "Harry Hadden",
        blockTimeStamp: "1647954706",
        unixTimeStamp: "1647954601",
        body: "I think I messed up",
      },
      {
        id: 3,
        senderAddress: "0x23A40E1461D493AF9ca7F6eEF6Dc28058463f210",
        senderName: "Current User",
        blockTimeStamp: "1647954706",
        unixTimeStamp: "1647954700",
        body: "same as usual yeah?",
      },
      {
        id: 4,
        senderAddress: "0x3",
        senderName: "Harry Hadden",
        blockTimeStamp: "1647954706",
        unixTimeStamp: "1647954750",
        body: "No shortarse this time it was ur mum",
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
  {
    id: 8,
    name: "My Empty Chat",
    messages: [],
  },
  {
    id: 9,
    name: "My Empty Chat 9",
    messages: [],
  },
  {
    id: 10,
    name: "My Empty Chat 10",
    messages: [],
  },
  // {
  //   id: 11,
  //   name: "My Empty Chat 11",
  //   messages: [],
  // },
  // {
  //   id: 12,
  //   name: "My Empty Chat 12",
  //   messages: [],
  // },
];

let tempCurrentUser = {
  address: "0x23A40E1461D493AF9ca7F6eEF6Dc28058463f210",
  name: "Current User",
};

function Chats() {
  const [chats] = useState(tempChats);
  const [currentChatID, setCurrentChatID] = useState(0);
  const [currentChat, setCurrentChat] = useState();

  // update chat if a child component selects a new chatID
  useEffect(() => {
    chats.forEach((chat) => {
      if (chat.id === currentChatID) {
        setCurrentChat(chat);
      }
    });
  }, [chats, currentChatID]);

  return (
    <div className={styles["chats"]}>
      <div className={styles["all-chats"]}>
        <AllChats
          chats={chats}
          currentUser={tempCurrentUser}
          currentChatID={currentChatID}
          setCurrentChatID={setCurrentChatID}
        />
      </div>
      <div className={styles["chat-screen"]}>
        <ChatScreen chat={currentChat} currentUser={tempCurrentUser} />
      </div>
    </div>
  );
}

export default Chats;
