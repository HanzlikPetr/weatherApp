import React from "react";
import imagesData from "../data";
import "./style/Hour.css"

export default function Hour({data, time, id}){
    let images;

    try{
      images = data.data.next_1_hours.summary.symbol_code;
    }catch{
      images = data.data.next_6_hours.summary.symbol_code;
    }

    return(
      <div className="hour">
        <p>{time[id].split(" ")[2]}</p>
        <img
          src={require("../images/" + imagesData[images] + ".svg")}
          alt=""
        />
        <p>{data.data.instant.details.air_temperature} °C</p>
        <p>{data.data.instant.details.wind_speed} m/s</p>
      </div>
    )
  }