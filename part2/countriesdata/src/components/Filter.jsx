const Filter = ({ searchText, setSearchText, setShowResult }) => {
  const handleSearchChange = (event) => {
    //console.log("Debug for input:", event);
    const keyword = event.target.value;
    setSearchText(keyword);
    if (keyword !== "") {
      setShowResult(true);
    }
  };

  return (
    <div>
      find countries
      <input value={searchText} onChange={handleSearchChange}></input>
    </div>
  );
};

export default Filter;
