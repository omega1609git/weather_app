import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [location, setLocation] = useState(null);
  const [temperatue, setTemperature] = useState(null);
  const [weather, setWeather] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [cityname, setCityname] = useState("");
  const [iserror, setIsError] = useState(false);
  const [isloading,setIsloading] = useState(true);

  useEffect(() => {}, [location]);

  const search = async (city) => {
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const api_key = "f00c38e0279b7bc85480c3fe775d518c";
    await axios
      .get(url, {
        params: {
          q: city,
          units: "metric",
          appid: api_key,
        },
      })
      .then((result) => {
        console.log(result);
        setLocation(result.data.name);
        setTemperature(result.data.main.temp);
        setWeather(result.data.weather[0].main);
        setWindSpeed(result.data.wind.speed);
        setIsloading(false);
        setIsError(false);
      })
      .catch((error) => {
        // console.log("error", error);
        setIsError(true);
      });
  };
  const handleCityNameChange = (event) => {
    setCityname(event.target.value);
  };

  const handleCityNameFormSubmit = (event) => {
    event.preventDefault();
    search(cityname);
    setCityname("");
    setIsloading(true);
  };
  let content = (
    <>
      <div>Location: {location}</div>
      <div>Temperature: {temperatue}</div>
      <div>Weather: {weather}</div>
      <div>windSpeed: {windSpeed}</div>
    </>
  );
  let errorMessage= <h2>city not found.</h2>

  return (
    <div>
      <form onSubmit={handleCityNameFormSubmit}>
        <h2>Weather</h2>
        <label>city</label>
        <input value={cityname} onChange={handleCityNameChange} />
      </form>
      <button onClick={search}>search</button>
      {iserror && errorMessage }
      { !isloading &&  content}
      
    </div>
  );
}

export default App;
