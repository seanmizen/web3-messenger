import styles from "../AllChats.module.css";

const SearchBar = ({ setSearchTerm }) => {
  const onChange = (e) => {
    setSearchTerm(e.currentTarget.value);
  };
  return (
    <div className={styles["search-bar"]}>
      <input placeholder="Search Chats" onChange={onChange} />
    </div>
  );
};
export default SearchBar;
