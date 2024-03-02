import { useEffect, useState } from "react";
import CountryLayout from "./components/CountryLayout";
import Filter from "./components/Filter";
import "./styles/global.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const CountriesToShow = showResult
    ? countries.filter((e) => {
        const lowCaseName = e.name.common.toLowerCase();
        const lowCaseKeyword = searchText.toLowerCase();
        return lowCaseName.includes(lowCaseKeyword);
      })
    : null;
  useEffect(() => {
    console.log("useEffect actived");
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log("promise fulfilled");
        setCountries(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchText]);
  console.log(CountriesToShow);

  return (
    <div>
      <h2>Search Page</h2>
      <Filter
        searchText={searchText}
        setSearchText={setSearchText}
        setShowResult={setShowResult}
      />
      <h2>Result</h2>
      {showResult &&
        (CountriesToShow.length > 10 ? (
          "Too many matches, specify another filter"
        ) : (
          <CountryLayout props={CountriesToShow} setCountries={setCountries} />
        ))}
    </div>
  );
};

export default App;
