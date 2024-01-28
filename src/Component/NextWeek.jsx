import React from "react";
import imagesData from "../data";
import "./style/NextWeek.css";

export default function NextWeek({ temperature, theme, time }) {
  const days = [];
  const [indexDay, setIndexDay] = React.useState(0);

  let pom = parseInt(time.day);
  temperature.timeseries.forEach(element => {
    const dayEl = new Date(element.time)

    if(dayEl.getDate() !== pom && (dayEl.getHours() - 1).toString() === "12"){
        pom = dayEl.getDate();
        days.push(element);
    }
  });

  const changeDay = (e) => {
    setIndexDay(e.className.split(" ")[0][1]);
  };

  const day = days.map((e, i) => {
    return <Day data={e} key={i} id={i} changeDay={changeDay} theme={theme} />;
  });

  

  return (
    <>
      <div className="days">{day}</div>
      <Details temperature={days[indexDay]} data={temperature}/>
    </>
  );
}

function Day({ data, id, changeDay, theme }) {
  const date = new Date(data.time);
  let pom;

  try {
    pom = data.data.next_12_hours.summary.symbol_code;
  } catch (error) {
    console.log(error);
    pom = data.data.next_6_hours.summary.symbol_code;
  }

  return (
    <div className={"i"+id + " " + theme} onClick={(e) => changeDay(e.target)}>
      <img
        className={"i"+id}
        src={require("../images/" + imagesData[pom] + ".svg")}
        alt=""
      />
      <h1 className={"i"+id}>{data.data.instant.details.air_temperature + "°C"}</h1>
      <h3 className={"i"+id}>
        {date.getDate() +
          ". " +
          (date.getMonth() + 1) + 
          ". " +
          date.getFullYear()}
      </h3>
    </div>
  );
}

function Details({ temperature, data }) {
  
  let windDirection;
  const date = new Date(temperature.time);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
    <>
      <h1>
        {date.getDate() +
          ". " +
          date.getMonth() +
          1 +
          ". " +
          date.getFullYear() + " " + daysOfWeek[date.getDay()]}
      </h1>
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
    </>
  );
}
