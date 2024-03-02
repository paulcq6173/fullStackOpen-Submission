import { useState } from "react";
import CountryDetails from "./CountryDetail";

const CountryLayout = ({ props, setCountries }) => {
  let array = props;
  const [showDetail, setShowDetail] = useState(false);
  const handleShowClick = (event) => {
    const selectedName = event.currentTarget.value;
    const filteredArr = array.filter((e) => e.name.common === selectedName);
    setCountries(filteredArr);
    setShowDetail(true);
  };
  if (array.length === 1 || showDetail) {
    return (
      <div>
        <CountryDetails props={array[0]} setShowDetail={setShowDetail} />
      </div>
    );
  }

  return (
    <div>
      {array.map((e, index) => (
        <span key={index}>
          <li key={e.name.common}>
            {e.name.common}
            <button
              key={e.cca2}
              value={e.name.common}
              onClick={handleShowClick}
            >
              show
            </button>
          </li>
        </span>
      ))}
    </div>
  );
};

export default CountryLayout;
