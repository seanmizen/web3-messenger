import styles from "../ChatScreen.module.css";
import { useRef, useState } from "react";

const MessageInput = ({ chat, submitMessageBody }) => {
  const inputRef = useRef();
  const submitRef = useRef();
  const [messageBody, setMessageBody] = useState();

  const onSubmit = (e) => {
    // e.preventDefault();
  };

  const keyDown = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      console.log("Submitting " + messageBody + "!");
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
