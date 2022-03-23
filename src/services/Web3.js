import React from "react";
import { useEffect, useState } from "react";
import Web3 from "web3";
import SimpleMessagesJSON from "../contracts/artifacts/SimpleMessages.json";

const defaultUser = {
  name: "",
  address: "0xca1BFC2Bf173ada6d60c05C20F86eA670Dae6096",
};

//uint256 chatID;
//string name;
//address[] currentUsers;
//Message[] messages;
//uint256 length; // Allows for easy interrogation in app

const defaultChats = {
  1: {
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
    chatID: 2,
    name: "Another Chat",
    currentUsers: ["0xca1BFC2Bf173ada6d60c05C20F86eA670Dae6096"],
    messages: [],
  },
};

// let web3 = new Web3(Web3.givenProvider || "ws://127.0.0.1:7545");
let web3 = new Web3("ws://127.0.0.1:7545");
//("ws://" + process.env.DEFAULT_RPC_ADDRESS;

export const Web3Context = React.createContext({});

const SimpleMessages = new web3.eth.Contract(
  SimpleMessagesJSON.abi
  // "0x2aA35916Bba3435B49Ea8A4719603A5E0211Aba1"
);

SimpleMessages.options.address = "0x8CB1154C9D6c2b3394F21CB8fe0F7e1A6F74316b";

export const Web3Provider = ({ children }) => {
  const [lastUpdated, setLastUpdated] = useState(0);
  const [latestBlock, setLatestBlock] = useState({ number: -1 });
  const [pendingTransactions, setPendingTransactions] = useState();
  const [currentUser] = useState(defaultUser);
  const [userChats] = useState([2]);
  const [chats, setChats] = useState(defaultChats);

  // updateChats - force re-poll each chat listed
  // can be used to update a single chat
  const updateChats = (chatIDs) => {
    chatIDs.forEach((chatID) => {
      console.log("Chat id " + chatID);
      //update name
      SimpleMessages.methods
        .chats(chatID)
        .call({
          from: currentUser.address,
        })
        .then((result) => {
          let chat = chats[chatID];
          chat.name = result.name;
          setChats({ chatID: chat, ...chats });
        });

      //update messages
      SimpleMessages.methods
        .getChatMessages(chatID)
        .call({
          from: currentUser.address,
        })
        .then((result) => {
          let chat = chats[chatID];
          chat.messages = result; //for now simply overwrite the entire result //
          setChats({ chatID: chat, ...chats });
        });
    });
    return;
  };

  // useEffect to update "lastUpdated" state
  useEffect(() => {
    setLastUpdated(Date.now());
  }, [latestBlock, pendingTransactions]);

  // useEffect to monitor sync events
  useEffect(() => {
    const syncingSubscription = web3.eth.subscribe(
      "syncing",
      (error, result) => {
        if (!error) {
          console.log("Sync event taking place.");
          console.log(result);
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
          // web3.eth.getTransactionReceipt("address?").then(console.log);
          // web3.eth.getBlock(web3.eth.defaultBlock).then(console.log);
          return;
        }
        console.error(error);
      })
      .on("connected", function (subscriptionId) {
        console.log("Watching block headers - subscription: " + subscriptionId);
      })
      .on("data", function (blockHeader) {
        // console.log("newBlockHeader1: " + blockHeader);
      })
      .on("error", console.error);

    return () => {
      newBlockHeadersSubscription.unsubscribe();
    };
  }, []);

  //https://ethereum.stackexchange.com/questions/35997/how-to-listen-to-events-using-web3-v1-0
  // useEffect to listen for messages
  useEffect(() => {
    let messageListener = SimpleMessages.events
      .messagePosted(
        {
          // filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
          // fromBlock: 0
        },
        (error, event) => {
          // console.log(event);
          console.log(event.returnValues._chatID);
          const chatID = event.returnValues._chatID;
          updateChats([chatID]);
        }
      )
      .on("data", (event) => {
        // console.log(event); // same results as the optional callback above
      })
      .on("changed", (event) => {
        // remove event from local database
      })
      .on("error", console.error);

    // return;
    return messageListener.unsubscribe();
  }, [userChats]);

  // useEffect to listen for pendingTransactions
  useEffect(() => {
    const pendingTransactionsSubscription = web3.eth
      .subscribe("pendingTransactions", (error, result) => {
        // awaiting transactions
      })
      .on("data", function (transaction) {
        //pending transaction received
        console.log("pending transaction: " + transaction);
        setPendingTransactions(transaction);
      });
    return () => {
      pendingTransactionsSubscription.unsubscribe();
    };
  }, []);

  //web3.eth.Contract.transcationBlockTimeout -- TODO use this to see if a message has failed?

  // console.log(SimpleMessages.methods);
  // SimpleMessages.methods.somFunc().send({from: 0x84Bc529771C13D548737517Ad92204D8E2Df75F6
  // .on('receipt', function(){
  //     ...
  // });

  const createChat = (name) => {
    console.log("creating chat " + name);
    let f = SimpleMessages.methods
      .createChat(name)
      .send({
        from: currentUser.address,
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

    SimpleMessages.methods
      .postMessage(chatID, "hi", timeStamp)
      .send({
        from: currentUser.address,
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
        createChat,
        postMessage,
        // SimpleMessages,
        currentUser: currentUser,
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
