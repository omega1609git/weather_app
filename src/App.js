import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [location, setLocation] = useState(null);
  const [temperatue, setTemperature] = useState(null);
  const [weather, setWeather] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [cityname, setCityname] = useState("");
  const [iserror, setIsError] = useState(false);
  const [isloading, setIsloading] = useState(true);

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
    <div className=" flex flex-col items-center content ">
      <div className="text-2xl" >{location}</div>
      <div className="text-xl">Temperature: {temperatue}</div>
      <div  className="text-xl">Weather: {weather}</div>
      <div className="text-xl">windSpeed: {windSpeed}</div>
    </div>
  );
  let errorMessage = <h2>city not found.</h2>;

  return (
    <div className="  flex flex-col items-center ">
      <h1 className="text-3xl m-4  ">Weather App</h1>
      <div className="  flex flex-row justify-center ">
        <form className="p-1   " onSubmit={handleCityNameFormSubmit}>
          <input
            className="border rounded border-blue-400 "
            value={cityname}
            placeholder="Enter City Name...     "
            onChange={handleCityNameChange}
          />
        </form>
        <button
          className="button bg-blue-500 rounded-md border text-white   "
          onClick={search}
        >
          search
        </button>
      </div>
      {iserror && errorMessage}
      {!isloading && content}
    </div>
  );
}

export default App;
