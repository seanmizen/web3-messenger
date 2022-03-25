import { Web3Context } from "../../services";
import styles from "./Web3Debug.module.css";
import { useContext } from "react";

const Web3Debug = () => {
  const { latestBlock, lastUpdated, userChats, pendingTransactions } =
    useContext(Web3Context);
  // const chats = useChats("userAddress"); // every time this changes, a rerender will be triggered
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
          {lastUpdated === 0 ? "-" : new Date(lastUpdated).toLocaleTimeString()}
        </span>
      </div>
      <div>
        Subscribed to{" "}
        <span className={userChats?.length === 0 ? "" : styles["live-info"]}>
          {userChats?.length}
        </span>{" "}
        chat{userChats?.length === 1 ? "" : "s"}
      </div>
      <div className={styles["live-info"]}>
        {pendingTransactions ? "pending transactions..." : ""}
      </div>
      {/* <button onClick={createChat("fff")}>t</button> */}
    </div>
  );
};

export default Web3Debug;
