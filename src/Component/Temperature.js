import React from "react";

export default function Temperature(props){
    return(
        <p>{props.data.instant.details.air_temperature}</p>
    )
}