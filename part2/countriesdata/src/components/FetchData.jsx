export async function FetchWeatherData(location) {
  const KEY = import.meta.env.VITE_APP_WEATHER_API;

  try {
    const Response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${KEY}`
    );
    const rawData = await Response.json();
    const geoData = rawData[0];
    console.log(`geoData: ${geoData}`);
    const lat = geoData.lat;
    const lon = geoData.lon;
    const weatherDataRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}`
    );
    const weatherData = await weatherDataRes.json();
    //console.log("fetch weather: ", weatherData);
    return weatherData;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
}
