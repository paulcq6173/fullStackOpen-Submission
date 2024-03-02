import { useEffect, useState } from "react";
import { FetchWeatherData } from "./FetchData";

const CountryDetails = ({ props }) => {
  const country = props;
  const countryName = country.name.common;
  const [tempInCelsius, setTempInCelsius] = useState(0.0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [weatherIcon, setWeatherIcon] = useState("01d");

  useEffect(() => {
    console.log("useEffect actived");
    const fetchData = async () => {
      const data = await FetchWeatherData(countryName);
      const {
        main: { temp },
        wind: { speed },
        weather,
      } = data;
      setTempInCelsius(temp - 273.15);
      setWindSpeed(speed);
      // Display icon of first weather condition in api
      setWeatherIcon(weather[0].icon);
      console.log("weather:", data);
    };

    if (country) {
      fetchData().catch((error) => console.log(error));
    } else {
      return;
    }
  });
  console.log(`Temp:${tempInCelsius} WindSpeed:${windSpeed}`);

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
      <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} />
      <p>Wind {windSpeed} m/s</p>
    </div>
  );
};

export default CountryDetails;
