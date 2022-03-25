import React, { useCallback, useReducer } from "react";
import { useEffect, useState } from "react";
import Web3 from "web3";
import SimpleMessagesJSON from "../contracts/artifacts/SimpleMessages.json";

let defaultUser = {
  address: "0xca1BFC2Bf173ada6d60c05C20F86eA670Dae6096",
  name: "Current User",
};

//uint256 chatID;
//string name;
//address[] currentUsers;
//Message[] messages;
//uint256 length; // Allows for easy interrogation in app

// const defaultChats = {
//   1: {
//     chatID: 1,
//     name: "My First Chat",
//     currentUsers: ["0xca1BFC2Bf173ada6d60c05C20F86eA670Dae6096"],
//     messages: [
//       {
//         id: 1,
//         senderAddress: "0x3",
//         senderName: "John Smith",
//         blockTimeStamp: "1648028969820",
//         unixTimeStamp: "1648028969820",
//         body: "Hello, friend",
//       },
//     ],
//   },
//   2: {
//     chatID: 2,
//     name: "My First Chat",
//     currentUsers: ["0xca1BFC2Bf173ada6d60c05C20F86eA670Dae6096"],
//     messages: [
//       {
//         id: 1,
//         senderAddress: "0x3",
//         senderName: "John Smith",
//         blockTimeStamp: "1648028969820",
//         unixTimeStamp: "1648028969820",
//         body: "Hello, friend",
//       },
//       {
//         id: 2,
//         senderAddress: "0x3",
//         senderName: "John Smith",
//         blockTimeStamp: "1648028969820",
//         unixTimeStamp: "1648028969820",
//         body: "I hope you had a good day.",
//       },
//       {
//         id: 3,
//         senderAddress: "0x23A40E1461D493AF9ca7F6eEF6Dc28058463f210",
//         senderName: "Current User",
//         blockTimeStamp: "1648028969820",
//         unixTimeStamp: "1648028969820",
//         body: "You too!",
//       },
//     ],
//   },
//   3: {
//     chatID: 3,
//     name: "Another Chat",
//     currentUsers: ["0xca1BFC2Bf173ada6d60c05C20F86eA670Dae6096"],
//     messages: [],
//   },
// };

// let defaultChats = {};

// let web3 = new Web3(Web3.givenProvider || "ws://127.0.0.1:7545");
let web3 = new Web3("ws://127.0.0.1:7545");
//("ws://" + process.env.DEFAULT_RPC_ADDRESS;

export const Web3Context = React.createContext({});

const SimpleMessages = new web3.eth.Contract(
  SimpleMessagesJSON.abi
  // "0x2aA35916Bba3435B49Ea8A4719603A5E0211Aba1"
);

SimpleMessages.options.address = "0x0676ca993DF8177D730F41d88B78a2171BD0A732";

const chatsReducer = (state, action) => {
  switch (action.type) {
    case "appendChatMessages": {
      return {
        ...state,
        [action.payload.chatID]: {
          ...(state[action.payload.chatID] ?? {}),
          chatID: action.payload.chatID,
          messages: action.payload.messages,
        },
      };
    }
    case "changeChatName": {
      return {
        ...state,
        [action.payload.chatID]: {
          ...(state[action.payload.chatID] ?? {}),
          name: action.payload.name,
        },
      };
    }
    default: {
      return state;
    }
  }
};

// const namesReducer = () => {
//   //
// };

export const Web3Provider = ({ children }) => {
  const [lastUpdated, setLastUpdated] = useState(0);
  const [latestBlock, setLatestBlock] = useState({ number: -1 });
  const [pendingTransactions, setPendingTransactions] = useState();
  const [user] = useState(defaultUser);
  const [userChats, setUserChats] = useState([]); // list of IDs
  // const [userNames, setUserNames] = useReducer(namesReducer, {}); //get usernames from the network
  // const [userChatCount, setUserChatCount] = useState(0);
  const [chats, dispatchChats] = useReducer(chatsReducer, {});

  // userChats = [1, 2, 7]
  // chats = {1: {...}, 2: {...}, 7: {...}}

  // get user's chat list when user updated
  useEffect(() => {
    SimpleMessages.methods
      .getUserChats(user.address)
      .call({
        from: user.address,
      })
      .then((userChatsResponse) => {
        setUserChats(userChatsResponse);
      });
  }, [user]);

  // messages getter
  useEffect(() => {
    if (userChats.length === 0) {
      return;
    }
    const getChatMessages = async (chatID) => {
      return SimpleMessages.methods.getChatMessages(chatID).call({
        from: user.address,
      });
    };

    const getAllChatMessages = async () => {
      const allChatMessages = await Promise.all(
        userChats.map((chatID) => getChatMessages(chatID))
      );

      allChatMessages.forEach((messages, index) => {
        dispatchChats({
          type: "appendChatMessages",
          payload: { chatID: userChats[index], messages },
        });
      });
    };

    getAllChatMessages();
  }, [userChats, user]);

  // chat metadata getter
  useEffect(() => {
    const getChat = async (chatID) => {
      return SimpleMessages.methods.chats(chatID).call({
        from: user.address,
      });
    };

    const getAllChatMessages = async () => {
      const allChatInfos = await Promise.all(
        userChats.map((chatID) => getChat(chatID))
      );

      allChatInfos.forEach((chat, index) => {
        dispatchChats({
          type: "changeChatName",
          payload: { chatID: chat.chatID, name: chat.name },
        });
      });
    };

    getAllChatMessages();
  }, [userChats, user]);

  //log chats on every change
  useEffect(() => {
    console.log("chats", chats);
  }, [chats]);

  // useEffect to update "lastUpdated" state
  useEffect(() => {
    setLastUpdated(Date.now());
  }, [latestBlock, pendingTransactions, chats]);

  // useEffect to monitor sync events
  useEffect(() => {
    const syncingSubscription = web3.eth.subscribe(
      "syncing",
      (error, result) => {
        if (!error) {
          console.log("Sync event taking place.", result);
        }
      }
    );
    return syncingSubscription.unsubscribe();
  }, []);

  // useEffect to monitor block updates
  useEffect(() => {
    const newBlockHeadersSubscription = web3.eth
      .subscribe("newBlockHeaders", (error, result) => {
        if (!error) {
          setLatestBlock(result);
          return;
        }
        console.error(error);
      })
      .on("connected", function (subscriptionId) {
        console.log("Watching block headers - subscription: " + subscriptionId);
      })
      .on("data", function (blockHeader) {})
      .on("error", console.error);

    return () => {
      newBlockHeadersSubscription.unsubscribe();
    };
  }, []);

  //https://ethereum.stackexchange.com/questions/35997/how-to-listen-to-events-using-web3-v1-0
  // useEffect to listen for messages
  useEffect(() => {
    const getChatMessages = async (chatID) => {
      return SimpleMessages.methods.getChatMessages(chatID).call({
        from: user.address,
      });
    };

    const updateChat = async (chatID) => {
      let chatMessages = await getChatMessages(chatID);
      console.log("New messages", chatMessages);
      dispatchChats({
        type: "appendChatMessages",
        payload: { chatID: chatID, messages: chatMessages },
      });
    };

    let messageListener = SimpleMessages.events
      .messagePosted(
        {
          // filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
          // fromBlock: 0
        },
        (error, event) => {
          console.log("Message posted: ", event);
          updateChat(event._chatID);
          // updateChat _chatID

          // dispatchChats({
          //   type: "appendChatMessages",
          //   payload: { chatID: userChats[index], messages },
          // });
          // const chatID = event.returnValues._chatID;
          // updateChats([chatID]);
        }
      )
      .on("data", (event) => {
        // same results as the optional callback above
      })
      .on("changed", (event) => {
        // remove event from local database
      })
      .on("error", console.error);

    // return;
    return messageListener.unsubscribe();
  }, [user.address]);

  // useEffect to listen for pendingTransactions
  useEffect(() => {
    const pendingTransactionsSubscription = web3.eth
      .subscribe("pendingTransactions", (error, result) => {
        // awaiting transactions
      })
      .on("data", function (transaction) {
        //pending transaction received
        setPendingTransactions(transaction);
      });
    return () => {
      pendingTransactionsSubscription.unsubscribe();
    };
  }, []);

  const createChat = (name) => {
    console.log("creating chat " + name);
    let f = SimpleMessages.methods
      .createChat(name)
      .send({
        from: user.address,
      })
      .on("receipt", (error, result) => {
        if (!error) {
          console.log(result);
        }
        //handle error
      });
    console.log(f);
  };

  const postMessage = (chatID, message) => {
    const timeStamp = Date.now();
    console.log("posting message " + message);

    SimpleMessages.methods
      .postMessage(chatID, "hi", timeStamp)
      .send({
        from: user.address,
      })
      .on("receipt", (error, result) => {
        console.log("Sent message!");
        console.log(result);
      });
    return;
  };

  return (
    <Web3Context.Provider
      // include below - sendMessage(), etc, etc
      // ALL on-chain interactions, up and down, need to be encapsulated and
      // probably get rid of web3 object ref
      value={{
        lastUpdated,
        latestBlock,
        pendingTransactions,
        userChats,
        createChat,
        postMessage,
        // SimpleMessages,
        user: user,
        chats: chats,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

// two things

// -make a contract call (or any web3.blah function call)
// web3.eth.sendTransaction

export const useChats = (userAddress) => {
  const [chatList] = useState([]);
  // add in useState, useEffect in here but without needing to return a component
  // useChat()

  // setChatList(newChat, ...chatList)

  // e.g. add a useEffect to listen / subscribe to messages in this chat

  // access the context from here for example

  // whenever I change chatList, components using this function will auto rerender
  return chatList;
};

// web3.eth.ContractCall(fwpfnwpeifwioefbw, wegfoebg)
