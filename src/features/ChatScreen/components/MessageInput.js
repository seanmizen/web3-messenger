import styles from "../ChatScreen.module.css";
import { useRef, useState } from "react";

const MessageInput = ({ chat, submitMessageBody }) => {
  const inputRef = useRef();
  const submitRef = useRef();
  const [messageBody, setMessageBody] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (messageBody === "") {
      return;
    }
    submitMessageBody(messageBody);
    setMessageBody("");
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const keyDown = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      submitRef.current.click();
    }
  };

  return (
    <form className={styles["message-input-form"]} onSubmit={onSubmit}>
      <textarea
        onKeyDown={(e) => keyDown(e)}
        onChange={(e) => setMessageBody(e.target.value)}
        className={styles["message-input"]}
        ref={inputRef}
      />
      <button type="submit" ref={submitRef}>
        &gt;
      </button>
    </form>
  );
};

export default MessageInput;
