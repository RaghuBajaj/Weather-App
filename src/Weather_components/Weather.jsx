import React, { useEffect, useState } from "react";
import "./Weather.css";
import search_icon from "./Weather-icons/scr1.png";
import wtr3 from "./Weather-icons/wtr3.png";
import wtr12 from "./Weather-icons/wtr12.png";
import wtr13 from "./Weather-icons/wtr13.png";

function Weather() {
  const [weather, setWeather] = useState(false);
  const [place, setPlace] = useState("");

  const APP_ID = "866cecf597500ad6e52def8c06fc1929";
  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();

      console.log(data);
      const wtrIcons = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      // const wtrIcons = `https://openweathermap.org/img/wn/50d.png`
      setWeather({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        description: data.weather[0].description,
        icons: wtrIcons,
      });

      console.log(weather.icons);
    } catch (error) {}
  };

  useEffect(() => {
    search("Delhi");
  }, []);

  function handlechange(e) {
    setPlace(e.target.value);
  }
  function heandleSearch() {
    search(place);
  }
  return (
    <div className="Full ">
      <div className="Weather-container ">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            className="s-bar"
            onChange={handlechange}
          ></input>
          <img
            src={search_icon}
            className="img"
            onClick={heandleSearch}
            alt=""
          />
        </div>

        <div className="weather-ptn">
          <img src={weather.icons || wtr3} className="wtr" alt="" />
          <p className="wtr-dsp">{weather.description}</p>
          <p className="temp">{weather.temperature}&deg;C</p>
          <p className="city">{weather.location}</p>
        </div>

        <div className="other-data">
          <div className="humidity">
            <img src={wtr13} className="huwi" alt="" />
            <div className="info">
              <p className="pp">{weather.humidity}%</p>
              <p className="pp">Humidity</p>
            </div>
          </div>
          <div className="wind">
            <img src={wtr12} className="huwi" alt="" />
            <div className="info">
              <p className="pp">{weather.windSpeed}km/h</p>
              <p className="pp">Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
