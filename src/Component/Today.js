import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import "./Today.css"

export default function Today({ temperature , theme}) {
  const [type, setType] = React.useState("air_temperature");
  const [name, setName] = React.useState(
    "Temperature (" + temperature.meta.units[type] + ")"
  );

  let dataDay = [];
  let dataTime = [];

  for (let i = 0; i <= 61; i++) {
    const pom = new Date(temperature.timeseries[i].time);
    dataTime.push(
      pom.getDate() + ". " + pom.getMonth() + 1 + ". " + pom.getHours() + ":00"
    );
    dataDay.push(temperature.timeseries[i].data.instant.details[type]);
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
      <div className="div-graph">
        <div className="selectType">
          <p className={"air_temperature active darker-" + theme} onClick={changeType}>
            Temperature
          </p>
          <p className={"wind_speed darker-"+ theme} onClick={changeType}>
            Wind speed
          </p>
          <p className={"relative_humidity darker-" + theme} onClick={changeType}>
            Humidity
          </p>
          <p className={"cloud_area_fraction darker-" + theme}  onClick={changeType}>
            Cloud area fraction
          </p>
        </div>
        <Line
          datasetIdKey="id"
          data={{
            labels: dataTime,
            datasets: [
              {
                label: name,
                data: dataDay,
                borderWidth: 1,
                fill: false,
                tension: 0.5,
              },
            ],
          }}
        />
      </div>
    </>
  );
}
