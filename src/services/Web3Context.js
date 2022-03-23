import React from "react";
import Web3 from "web3";

const defaultUser = {
  name: "",
  address: "",
  key: "",
};

const defaultChats = [];
// let web3 = new Web3(Web3.givenProvider || "ws://127.0.0.1:7545");
let web3 = new Web3("ws://127.0.0.1:7545");
//("ws://" + process.env.DEFAULT_RPC_ADDRESS;
web3.eth.getAccounts(); //.then(console.log);

const chatSubscription = web3.eth
  .subscribe("pendingTransactions", function (error, result) {
    // awaiting transactions
  })
  .on("data", function (transaction) {
    //pending transaction received
    // console.log("pending transaction: " + transaction);
  });

const blockHeaderSubscription = web3.eth
  .subscribe("newBlockHeaders", function (error, result) {
    if (!error) {
      // console.log("newBlockHeader: " + JSON.stringify(result));
      console.log(
        "block " +
          result.number +
          " minted at " +
          new Date(result.timestamp * 1000).toLocaleString()
      );
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

const Web3Context = React.createContext({
  web3,
  chatSubscription,
  blockHeaderSubscription,
  currentUser: defaultUser,
  chats: defaultChats,
});

export default Web3Context;
