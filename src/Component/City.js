import React from 'react';
import imagesData from "../data"
import "./style/City.css"


export default function City({city, temperature, time}){
    const imagesPom = temperature.data.next_1_hours.summary.symbol_code

    return(
        <>
            <img src={require('../images/' + imagesData[imagesPom]+'.svg')} alt=''/>
            <h1 className='temperature'>{temperature.data.instant.details.air_temperature + "°C"}</h1>
            <div className='line'></div>
            <p>{time.day + '. ' + time.month + '. ' + time.year}</p>
            <p className='date'>{time.day_of_week + ', ' + time.hour + ':' + time.minute}</p>
            <h1  className='cityName'>{city.name}</h1>
            <p>{city.country + ( city.state === undefined ? "" : ', ' + city.state)}</p>            
        </>
    )
}