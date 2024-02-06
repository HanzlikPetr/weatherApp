import React from "react";
import { getDataWeather, getCity, getTime } from "../api";
import imagesData from "../data";
import "./style/FavoritesDays.css";

export default function FavoritesDays({ name, i }) {
  const [data, setData] = React.useState("");
  const [time, setTime] = React.useState("");

  const theme = localStorage.getItem("theme");

  React.useEffect(() => {
    getCity(name).then((result) => {
      getDataWeather(result[0].latitude, result[0].longitude).then((value) =>
        setData(value)
      );
    });

    getTime(name).then((value) => {
      setTime(value);
    });
  }, [name]);

  if (data !== "" && time !== "") {
    const days = [];
    const delay = Math.round(
      ((new Date() - new Date(time.datetime)) / 86400000) * 24
    );

    let pom = parseInt(time.day);
    data.timeseries.forEach((element) => {
      const dayEl = new Date(element.time);
      dayEl.setHours(dayEl.getHours() - delay);

      if (dayEl.getDate() !== pom && dayEl.getHours() === 13 - delay) {
        pom = dayEl.getDate();
        days.push(element);
      }
    });
    

    return (
      <button
        className={"button darker-" + theme}
        name="city"
        value={name}
        type="submit"
        key={i}
      >
        <div className="name">
            <img src={require("../images/heart_833472.png")} alt="heart" className="heart"/>
            {name}
        </div>
        <div className="tepmerature">
          <h2>
            <img
              src={require("../images/" +
                imagesData[days[0].data.next_12_hours.summary.symbol_code] +
                ".svg")}
              alt="weather icon"
            />{" "}
            {days[0].data.instant.details.air_temperature}
          </h2>
          <h2>
            <img
              src={require("../images/" +
                imagesData[days[1].data.next_12_hours.summary.symbol_code] +
                ".svg")}
              alt="weather icon"
            />{" "}
            {days[1].data.instant.details.air_temperature}
          </h2>
          <h2>
            <img
              src={require("../images/" +
                imagesData[days[2].data.next_12_hours.summary.symbol_code] +
                ".svg")}
              alt="weather icon"
            />{" "}
            {days[2].data.instant.details.air_temperature}
          </h2>
          <h2>
            <img
              src={require("../images/" +
                imagesData[days[3].data.next_12_hours.summary.symbol_code] +
                ".svg")}
              alt="weather icon"
            />{" "}
            {days[3].data.instant.details.air_temperature}
          </h2>
        </div>
      </button>
    );
  }
}
