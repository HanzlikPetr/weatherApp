import React from "react";
import imagesData from "../data";
import "./style/Hour.css"

export default function Hour({data, time, id}){
    return(
      <div className="hour">
        <p>{time[id].split(" ")[2]}</p>
        <img
          src={require("../images/" + imagesData[data.data.next_1_hours.summary.symbol_code] + ".svg")}
          alt=""
        />
        <p>{data.data.instant.details.air_temperature} °C</p>
        <p>{data.data.instant.details.wind_speed} m/s</p>
      </div>
    )
  }