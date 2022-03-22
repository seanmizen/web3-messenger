import { useRef } from "react";
const MessageInput = ({ chat }) => {
  const inputRef = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <input ref={inputRef} />
    </form>
  );
};

export default MessageInput;
