import React from 'react';


//<img src={require('../images/' + temperature.data.next_1_hours.summary.symbol_code+'.svg')} alt=''/>

export default function City({city, temperature}){
    console.log(city)
    const pom = new Date(temperature.time)
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return(
        <>
        
            <h1 className='temperature'>{temperature.data.instant.details.air_temperature + "°C"}</h1>
            <div className='line'></div>
            <p>{pom.getDate() + '.' + pom.getMonth() + 1 + '.' + pom.getFullYear()}</p>
            <p className='date'>{daysOfWeek[pom.getDay()] + ', ' + pom.getHours() + ':00'}</p>
            <h1  className='cityName'>{city.name}</h1>
            <p>{city.country + ( city.state === undefined ? "" : ', ' + city.state)}</p>            
        </>
    )
}