import { Web3Context, useChats } from "../../services";
import { useState } from "react";
import styles from "./Web3Debug.module.css";
import { useContext } from "react";
// import { useEffect } from "react";

// TODO pass in Web3Context as a prop from /app.js or /chats.js

// Debug information bar across the top of the website. Designed to look minimal and B/W!
const Web3Debug = () => {
  //   const context = Web3Context;
  //   const [latestBlock, setLatestBlock] = useState({ number: -1 });
  //   const [latestBlockNumber, setLatestBlockNumber] = useState();
  const [lastUpdated] = useState(new Date(0));
  const { latestBlock } = useContext(Web3Context);
  const chats = useChats("userAddress"); // every time this changes, a rerender will be triggered

  //   useEffect(() => {web3.eth.getAccounts}, [])

  //   console.log(context.web3.currentUser);
  //   context.web3.eth.getBlock(context.web3.eth.defaultBlock).then(setLatestBlock);
  //   console.log(context.);
  //   web3.eth.getBlock(web3.eth.defaultBlock).then(setLatestBlock);

  //TODO why is this not working?
  //   useEffect(() => {
  //     setLatestBlockNumber(latestBlock.number);
  //   }, [latestBlock]);

  //   web3.eth.getAccounts().then(console.log);

  return (
    <div className={styles["debug-bar"]}>
      <div>
        Latest Block:{" "}
        <span className={latestBlock?.number === -1 ? "" : styles["live-info"]}>
          {latestBlock?.number}
        </span>
      </div>
      <div>Last updated: {lastUpdated?.toLocaleString()}</div>
      <div></div>
    </div>
  );
};

export default Web3Debug;
