import styles from "./Chats.module.css";
import { ChatScreen, AllChats } from "../../features";
import { useState } from "react";

const tempChats = [
  {
    id: 1,
    name: "My First Chat",
    messages: [
      {
        id: 1,
        senderAddress: "0x3",
        senderName: "John Smith",
        body: "ur bad",
      },
      {
        id: 2,
        senderAddress: "0x23A40E1461D493AF9ca7F6eEF6Dc28058463f210",
        senderName: "Current User",
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
        body: "I sent a message!",
      },
      {
        id: 2,
        senderAddress: "0x3",
        senderName: "not u",
        body: "I responded.",
      },
    ],
  },
  {
    id: 3,
    name: "My Empty Chat",
    messages: [],
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
  const [currentChat] = useState(chats[0] || {});

  return (
    <div className={styles["chats"]}>
      <div className={styles["all-chats"]}>
        <AllChats chats={chats} currentUser={tempCurrentUser} />
      </div>
      <div className={styles["chat-screen"]}>
        <ChatScreen chat={currentChat} currentUser={tempCurrentUser} />
      </div>
    </div>
  );
}

export default Chats;
