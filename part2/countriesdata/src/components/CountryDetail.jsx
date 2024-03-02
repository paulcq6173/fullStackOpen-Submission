import { useEffect, useState } from "react";
import { FetchWeatherData } from "./FetchData";

const CountryDetails = ({ props, setShowDetail }) => {
  const country = props;
  if (!country || country === undefined) {
    setShowDetail(false); // Avoid throw error.
  }
  console.log("props:", country);
  const countryName = country.name.common;
  const [tempInCelsius, setTempInCelsius] = useState(0.0);
  const [windSpeed, setWindSpeed] = useState(0);

  useEffect(() => {
    console.log("useEffect actived");
    const fetchData = async () => {
      const data = await FetchWeatherData(countryName);
      const {
        main: { temp },
        wind: { speed },
      } = data;
      setTempInCelsius(temp - 273.15);
      setWindSpeed(speed);
    };

    fetchData().catch((error) => console.log(error));
  });

  return (
    <div key={1}>
      <h2 key={countryName}>{countryName}</h2>
      <li key={country.capital}>capital {country.capital}</li>
      <li key={country.area}>area {country.area}</li>
      <h4>languages</h4>
      <ul>
        {Object.values(country.languages).map((lng, index) => {
          return <li key={index}>{lng}</li>;
        })}
      </ul>
      <img src={country.flags.png} />
      <h3>Weather in {country.capital}</h3>
      <p>Temperature {tempInCelsius} Celsius</p>
      <p>Wind {windSpeed} m/s</p>
    </div>
  );
};

export default CountryDetails;
