import React from 'react';
import imagesData from "../data"
import "./style/City.css"


export default function City({city, temperature, time}){
    const imagesPom = temperature.data.next_1_hours.summary.symbol_code
    const  pom = {...localStorage}
    

    const [favorite, setFavorite] = React.useState(Object.keys(pom).includes(city.name))
    
    const addToLocalStorage = () => {
        console.log(JSON.stringify([city.name, city.latitude, city.longitude]))
        localStorage.setItem(city.name, city.name)
      } 

    const removeLocalStorage = () => {
        localStorage.removeItem(city.name)
      } 


    const hadleClick = () => {
        favorite === true ? removeLocalStorage() : addToLocalStorage()
        setFavorite(!favorite)
    }

    return(
        <>
            <img src={require('../images/' + imagesData[imagesPom]+'.svg')} alt=''/>
            <h1 className='temperature'>{temperature.data.instant.details.air_temperature + "°C"}</h1>
            <div className='line'></div>
            <p className='date'>{time.day + '. ' + time.month + '. ' + time.year}</p>
            <p className='time'>{time.day_of_week + ', ' + time.hour + ':' + time.minute}</p>
            <h1  className='cityName'>{city.name } {<img className="star" src={!favorite ? require('../images/heart_872229.png') : require('../images/heart_833472.png')} alt='' onClick={hadleClick}/>}</h1>
            <p className='country'>{city.country + ( city.state === undefined ? "" : ', ' + city.state)}</p>            
        </>
    )
}