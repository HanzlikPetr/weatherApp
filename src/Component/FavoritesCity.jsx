import React from "react";
import { getDataWeather, getCity, getTime } from "../api";
import imagesData from "../data";
import "./style/FavoritesDays.css";

export default function FavoritesCity({ name, i, removeCity}) {
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
      ((new Date() - new Date(time.datetime)) / 86400000) * 24 - 1
    );

    let pom = parseInt(time.day);
    data.timeseries.forEach((element) => {
      const dayEl = new Date(element.time);
      dayEl.setHours(dayEl.getHours() - delay);

      if (
        dayEl.getDate() !== pom &&
        (dayEl.getHours() === 13 || dayEl.getHours() > (delay > 0 ? 10 : 15))
      ) {
        pom = dayEl.getDate();
        days.push(element);
      }
    });

    const tryImages = (e) => {
      try {
        return e.data.next_1_hours.summary.symbol_code;
      } catch (error) {
        
      }

      try {
        return e.data.next_6_hours.summary.symbol_code;
      } catch (error) {
        
      }

      try {
        return e.data.next_12_hours.summary.symbol_code;
      } catch (error) {
        
      }
    };

    const images = days.map((e) => tryImages(e));
    return (
      <div className="cities" key={name}>
          <img
            onClick={(e) => removeCity(e)}
            data-city={name}
            src={require("../images/heart_833472.png")}
            alt="heart"
            className="heart"
          />
      <button
        className={"button darker-" + theme}
        name="city"
        value={name}
        type="submit"
        key={i}
      >
        <div className="name">
          {name}
        </div>
        <div className="tepmerature">
          <h2>
            {images[0] !== undefined && (
              <img
                src={require("../images/" + imagesData[images[0]] + ".svg")}
                alt="weather icon"
              />
            )}
            {days[0].data.instant.details.air_temperature}
          </h2>
          <h2>
            {images[1] !== undefined && (
              <img
                src={require("../images/" + imagesData[images[1]] + ".svg")}
                alt="weather icon"
              />
            )}
            {days[1].data.instant.details.air_temperature}
          </h2>
          <h2>
            {images[2] !== undefined && (
              <img
                src={require("../images/" + imagesData[images[2]] + ".svg")}
                alt="weather icon"
              />
            )}
            {days[2].data.instant.details.air_temperature}
          </h2>
          <h2>
            {images[3] !== undefined && (
              <img
                src={require("../images/" + imagesData[images[3]] + ".svg")}
                alt="weather icon"
              />
            )}
            {days[3].data.instant.details.air_temperature}
          </h2>
        </div>
      </button>
      </div>
    );
  }
}
