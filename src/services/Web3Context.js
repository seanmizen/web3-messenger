import React from "react";
import { useEffect, useState } from "react";
import Web3 from "web3";
import SimpleMessagesJSON from "../contracts/artifacts/SimpleMessages.json";

const defaultUser = {
  name: "",
  address: "",
  key: "",
};

const defaultChats = [];
// let web3 = new Web3(Web3.givenProvider || "ws://127.0.0.1:7545");
let web3 = new Web3("ws://127.0.0.1:7545");
//("ws://" + process.env.DEFAULT_RPC_ADDRESS;

export const Web3Context = React.createContext({});

export const Web3Provider = ({ children }) => {
  const [lastUpdated, setLastUpdated] = useState();
  const [latestBlock, setLatestBlock] = useState({ number: -1 });
  const [pendingTransactions, setPendingTransactions] = useState();

  // useEffect to update "lastUpdated" state
  useEffect(() => {
    setLastUpdated(Date.now());
  }, [latestBlock, pendingTransactions]);

  // useEffect to monitor block updates
  useEffect(() => {
    const newBlockHeadersSubscription = web3.eth
      .subscribe("newBlockHeaders", function (error, result) {
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

  // web3.eth.getAccounts().then(console.log);

  useEffect(() => {
    const pendingTransactionsSubscription = web3.eth
      .subscribe("pendingTransactions", function (error, result) {
        // awaiting transactions
      })
      .on("data", function (transaction) {
        //pending transaction received
        // console.log("pending transaction: " + transaction);
        setPendingTransactions(transaction);
      });
    return () => {
      pendingTransactionsSubscription.unsubscribe();
    };
  }, []);

  //web3.eth.Contract.transcationBlockTimeout -- TODO use this to see if a message has failed?

  const SimpleMessages = new web3.eth.Contract(SimpleMessagesJSON.abi);

  return (
    <Web3Context.Provider
      // include below - sendMessage(), etc, etc
      // ALL on-chain interactions, up and down, need to be encapsulated and
      // probably get rid of web3 object ref
      value={{
        lastUpdated,
        latestBlock,
        pendingTransactions,
        SimpleMessages,
        currentUser: defaultUser,
        chats: defaultChats,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

// two things

// -make a contract call (or any web3.blah function call)
// web3.eth.sendTransaction
//
// -

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
