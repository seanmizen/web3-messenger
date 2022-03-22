const SearchBar = ({ setSearchTerm }) => {
  const onChange = (e) => {
    setSearchTerm(e.currentTarget.value);
  };
  return (
    <div>
      <input onChange={onChange} />
    </div>
  );
};
export default SearchBar;
