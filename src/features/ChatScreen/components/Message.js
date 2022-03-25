import { useEffect, useState } from "react";
import styles from "../ChatScreen.module.css";

const receiptWatcher = styles["receipt-watcher"];
const noReceipt = styles["no-receipt"];
const hasReceipt = styles["has-receipt"];
const transactionSuccess = styles["transaction-success"];
const transactionFailure = styles["transaction-failure"];
const transactionNotPartOfSession = styles["transaction-not-part-of-session"];

const Message = ({ message, isCurrentUser, isSequential }) => {
  const [receiptStyle, setReceiptStyle] = useState(noReceipt);
  const timestamp = new Date(parseInt(message.unixTimeStamp));

  // useEffect for monitoring message status
  useEffect(() => {
    if (message.blockTimestamp && true) {
      // message has been retrieved from the chain, rather than sent this session.
      // could imply concurrent session.
      setReceiptStyle(transactionNotPartOfSession);
    } else if (message.blockTimestamp) {
      setReceiptStyle(transactionNotPartOfSession);
    } else if (true) {
      setReceiptStyle(noReceipt);
    } else if (true) {
      setReceiptStyle(hasReceipt);
    } else if (true) {
      setReceiptStyle(transactionSuccess);
    } else if (true) {
      setReceiptStyle(transactionFailure);
    }
  }, [message]);

  return (
    <li
      className={
        (isCurrentUser ? styles["current-user"] : styles["other-user"]) +
        " " +
        (isSequential ? styles["sequential"] : "")
      }
    >
      <div className={styles["message"]}>
        {!isCurrentUser && (
          <span className={styles["user-name"]}>
            {message.userAddress.slice(-5) || "Example name"}
          </span>
        )}
        <span>{message.body || "\xa0"}</span>
        <div className={styles["meta"]}>
          {/* <div className={styles["non-timestamp"]}>[crypto metadata here]</div> */}
        </div>
        <div className={styles["timestamp"]}>
          {timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </div>
        <div className={styles["receipt-overlay"]}>
          <div className={receiptWatcher + " " + receiptStyle}>
            <div className={styles["receipt-info"]}>
              {JSON.stringify(message.receiptStatus) ||
                "Receipt information not available."}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Message;
