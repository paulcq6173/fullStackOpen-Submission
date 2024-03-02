const Filter = ({ searchText, setSearchText, setShowAll }) => {
  const handleSearchChange = (event) => {
    //console.log("Debug for input:", event);
    setSearchText(event.target.value);
    if (searchText !== "") {
      setShowAll(false);
    }
  };

  return (
    <div>
      filter shown with
      <input value={searchText} onChange={handleSearchChange}></input>
    </div>
  );
};

export default Filter;
