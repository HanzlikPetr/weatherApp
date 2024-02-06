import React from "react";
import imagesData from "../data";
import "./style/NextWeek.css";
import Hour from "./Hour";
import Chart from "./Chart";
import { useTasks } from "../App";


export default function NextWeek({ temperature, time}) {
  const days = [];
  const [indexDay, setIndexDay] = React.useState(0);
  const [type, setType] = React.useState("air_temperature");
  const [name, setName] = React.useState(
    "Temperature (" + temperature.meta.units[type] + ")"
  );

  const theme = useTasks();
  const delay = Math.round((new Date()  - new Date(time.datetime)) / 86400000 * 24)

  console.log(delay)

  let pom = parseInt(time.day);
  temperature.timeseries.forEach(element => {
    const dayEl = new Date(element.time)
    dayEl.setHours(dayEl.getHours() - delay)

    //console.log(dayEl.getHours())
    if(dayEl.getDate() !== pom && (dayEl.getHours() === 13 || dayEl.getHours() > 9)){
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
  
  const dataDay = [];
  const dataTime = [];
  const dayCheck = new Date(days[indexDay].time).getDate();

  temperature.timeseries.forEach(e => {
    const pom = new Date(e.time);
    if(dayCheck === pom.getDate()){
      dataTime.push(
        pom.getDate() + ". " + (pom.getMonth() + 1) + ". " + pom.getHours() + ":00"
      );
      dataDay.push(e.data.instant.details[type]);
    }
  })

  return (
    <>
      <div className="days">{day}</div>
      <Details temperature={days[indexDay]} data={temperature} time={time}/>
      <Chart theme={theme} name={name} changeType={changeType} dataDay={dataDay} dataTime={dataTime}/>
    </>
  );
}

function Day({ data, id, changeDay, theme }) {
  const date = new Date(data.time);
  let pom;

  try {
    pom = data.data.next_6_hours.summary.symbol_code;
  } catch (error) {
    console.log(error);      
  }

  if(typeof pom !== "string"){
    try {
      pom = data.data.next_12_hours.summary.symbol_code;
    } catch (error) {
      console.log(error);      
    }
  }
  
  if(typeof pom === "string")
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

function Details({ temperature, data, time }) {
  const date = new Date(temperature.time);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const hoursArray = []
  const dataTime = [];

  const wind = [];
  const pressure = [];
  const humidity = [];
  const cloudFraciton = []
  const temp = []

  data.timeseries.forEach(e => {   
    const delay = Math.round((new Date()  - new Date(time.datetime)) / 86400000 * 24)
    const pom = new Date(e.time)
    pom.setHours(pom.getHours() - delay)
    if(pom.getUTCDate() === new Date(temperature.time).getDate()){
      dataTime.push(
        pom.getUTCDate() + ". " + pom.getUTCMonth() + 1 + ". " + pom.getHours() + ":00"
      );
      hoursArray.push(e)
      wind.push(e.data.instant.details.wind_speed)
      pressure.push(e.data.instant.details.air_pressure_at_sea_level)
      humidity.push(e.data.instant.details.relative_humidity)
      cloudFraciton.push(e.data.instant.details.cloud_area_fraction)
      temp.push(e.data.instant.details.air_temperature)
    }
  })

  const hours = hoursArray.map((e, i) =>{
    return <Hour data={e} key={i} time={dataTime} id={i}/>
  })

  return (
    <>
      <h1>
        {date.getDate() +
          ". " +
          (parseInt(date.getUTCMonth()) + 1) +
          ". " +
          date.getFullYear() + " " + daysOfWeek[date.getDay()]}
      </h1>
      <div className="details-nextWeek">
        <div className="wind">
          <p>Average Wind</p>
          <h3>{(wind.reduce((a, b) => a + b, 0) / wind.length).toFixed(1)} m/s</h3>
        </div>
        <div className="pressure">
          <p>Average Pressure</p>
          <h3>
            {(pressure.reduce((a, b) => a + b, 0) / pressure.length).toFixed(1)} hpa
          </h3>
        </div>
        <div>
          <p>Average Humidity</p>
          <h3 className="humidity">
            {(humidity.reduce((a, b) => a + b, 0) / humidity.length).toFixed(1)} %
          </h3>
        </div>
        <div className="cloudFraction">
          <p>Average Cloud area fraction</p>
          <h3>{(cloudFraciton.reduce((a, b) => a + b, 0) / cloudFraciton.length).toFixed(1)} %</h3>
        </div>
        <div className="temeprature">
          <p>Average Temperature</p>
          <h3>{(temp.reduce((a, b) => a + b, 0) / temp.length).toFixed(1)} °C</h3>
        </div>
      </div>
      {hours}
    </>
  );
}
