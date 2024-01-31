import React from "react";
import "./style/Today.css"
import Hour from "./Hour";
import Chart from "./Chart";

export default function Today({ temperature , theme, time}) {
  const [type, setType] = React.useState("air_temperature");
  const [name, setName] = React.useState(
    "Temperature (" + temperature.meta.units[type] + ")"
  );

  const dataDay = [];
  const dataHours = [];
  const dataTime = [];

  const pom = new Date(time.datetime);
  for (let i = 0; i < 24; i++) {
    pom.setHours(pom.getHours() + 1)
    if(pom.getDate() === parseInt(time.day)){
      dataTime.push(
        pom.getDate() + ". " + (pom.getMonth() + 1) + ". " + pom.getHours() + ":00"
      );
      dataDay.push(temperature.timeseries[i].data.instant.details[type]);
      dataHours.push(temperature.timeseries[i]);
    }
  }

  let windDirection;
  if (
    temperature.timeseries[0].data.instant.details.wind_from_direction <= 90
  ) {
    windDirection = "East";
  } else if (
    temperature.timeseries[0].data.instant.details.wind_from_direction <= 180
  ) {
    windDirection = "South";
  } else if (
    temperature.timeseries[0].data.instant.details.wind_from_direction <= 270
  ) {
    windDirection = "West";
  } else {
    windDirection = "North";
  }

  const changeType = (e) => {
    document.querySelector(".div-graph .active").classList.remove("active")
    e.target.classList.add("active")
    setType(e.target.className.split(" ")[0]);
    setName(
      e.target.innerText +
        " (" +
        temperature.meta.units[e.target.className.split(" ")[0]] +
        ")"
    );
  };
  
  const hours = dataHours.map((e,i) => {
    return <Hour data={e} key={i} time={dataTime} id={i}/>
  })

  return (
    <>
      <div className="details">
        <div className="wind">
          <p>Wind</p>
          <h3>{temperature.timeseries[0].data.instant.details.wind_speed} m/s</h3>
          <p>{windDirection}</p>
        </div>
        <div className="pressure">
        <p>Pressure</p>
        <h3>
          {
            temperature.timeseries[0].data.instant.details
              .air_pressure_at_sea_level
          } hpa
        </h3>
        </div>
        <div>
          <p>Humidity</p>
        <h3 className="humidity">
          {temperature.timeseries[0].data.instant.details.relative_humidity} %
        </h3>
        </div>
        <div className="cloudFraction">
        <p>Cloud area fraction</p>
        <h3>
          {temperature.timeseries[0].data.instant.details.cloud_area_fraction} %
        </h3>
        </div>
      </div>
      {hours}
      <Chart name={name} dataTime={dataTime} dataDay={dataDay} theme={theme} changeType={changeType}/>
    </>
  );
}


