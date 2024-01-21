import React from "react";
import imagesData from "../data";
import "./NextWeel.css";

export default function NextWeek({ temperature }) {
  const [indexDay, setIndexDay] = React.useState(0);

  const days = [];

  days.push(temperature.timeseries[24]);
  days.push(temperature.timeseries[45]);
  days.push(temperature.timeseries[56]);
  days.push(temperature.timeseries[60]);
  days.push(temperature.timeseries[64]);
  days.push(temperature.timeseries[68]);
  days.push(temperature.timeseries[72]);

  console.log(days)
  const changeDay = (e) => {
    setIndexDay(e.className)
    }

  const day = days.map((e, i) => {
    return <Day data={e} key={i} id={i} changeDay={changeDay}/>;
  });

  return (
    <>
      <div className="days">{day}</div>
      <Details temperature={days[indexDay]} />
    </>
  );
}

function Day({ data, id, changeDay}) {
  const date = new Date(data.time);
let pom;

  try {
    pom = data.data.next_12_hours.summary.symbol_code
  } catch (error) {
    console.log(error)
    pom = data.data.next_1_hours.summary.symbol_code
  }
  

  return (
    <div className={id} onClick={(e) => changeDay(e.target)}>
      <img className={id}
        src={require("../images/" +
          imagesData[pom] +
          ".svg")}
        alt=""
      />
      <h1 className={id}>{data.data.instant.details.air_temperature + "°C"}</h1>
      <h3 className={id}>
        {date.getDate() +
          ". " +
          date.getMonth() +
          1 +
          ". " +
          date.getFullYear()}
      </h3>
    </div>
  );
}

function Details({ temperature }) {
  let windDirection;
  if (temperature.data.instant.details.wind_from_direction <= 90) {
    windDirection = "East";
  } else if (temperature.data.instant.details.wind_from_direction <= 180) {
    windDirection = "South";
  } else if (temperature.data.instant.details.wind_from_direction <= 270) {
    windDirection = "West";
  } else {
    windDirection = "North";
  }
  return (
    <div className="details">
      <div className="wind">
        <p>Wind</p>
        <h3>{temperature.data.instant.details.wind_speed} m/s</h3>
        <p>{windDirection}</p>
      </div>
      <div className="pressure">
        <p>Pressure</p>
        <h3>
          {temperature.data.instant.details.air_pressure_at_sea_level} hpa
        </h3>
      </div>
      <div>
        <p>Humidity</p>
        <h3 className="humidity">
          {temperature.data.instant.details.relative_humidity} %
        </h3>
      </div>
      <div className="cloudFraction">
        <p>Cloud area fraction</p>
        <h3>{temperature.data.instant.details.cloud_area_fraction} %</h3>
      </div>
    </div>
  );
}

