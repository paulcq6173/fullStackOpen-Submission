import CountryDetails from "./CountryDetail";

const CountryLayout = ({ props, setCountries }) => {
  let array = props;
  const handleShowClick = (event) => {
    const selectedName = event.currentTarget.value;
    const country = array.filter((e) => e.name.common === selectedName);
    setCountries(country);
  };
  if (array.length === 1) {
    return (
      <div>
        <CountryDetails props={array[0]} />
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
