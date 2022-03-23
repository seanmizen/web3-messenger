import { Web3Context, useChats } from "../../services";
import styles from "./Web3Debug.module.css";
import { useContext } from "react";
// import { useEffect } from "react";

// TODO pass in Web3Context as a prop from /app.js or /chats.js

// Debug information bar across the top of the website. Designed to look minimal and B/W!
const Web3Debug = () => {
  const { latestBlock, lastUpdated } = useContext(Web3Context);
  const chats = useChats("userAddress"); // every time this changes, a rerender will be triggered
  return (
    <div className={styles["debug-bar"]}>
      <div>
        Latest Block:{" "}
        <span className={latestBlock?.number === -1 ? "" : styles["live-info"]}>
          {latestBlock?.number === -1 ? "-" : latestBlock?.number}
        </span>
      </div>
      <div>
        Last updated:{" "}
        <span className={lastUpdated === 0 ? "" : styles["live-info"]}>
          {lastUpdated === 0 ? "-" : new Date(lastUpdated).toLocaleString()}
        </span>
      </div>
      <div>
        Subscribed to{" "}
        <span className={chats?.length === 0 ? "" : styles["live-info"]}>
          {chats?.length}
        </span>{" "}
        chats
      </div>
      {/* <button onClick={createChat("fff")}>t</button> */}
    </div>
  );
};

export default Web3Debug;
