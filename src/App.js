import React from 'react';
import $ from 'jquery'
import './App.css';
import City from './Component/Name';
import Temperature from './Component/Temperature';

function App() {
  //create variables
  const [ data, setData ] = React.useState("");
  const [ latLong, setLangLong ] = React.useState({lat:"50.073658", long:"14.418540"})
  const [ cityName , setCityName ] = React.useState("")
  const [ cityValue , setCityValue] = React.useState("")
  const [ city , setCity] = React.useState({});
  
  //work with yr api
  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latLong.lat}&lon=${latLong.long}`)
      const resData = await res.json();
      setData(resData.properties)
    }
    
    getData();
  }, [latLong])

  //work with geolocation api
  React.useEffect(() => {
    $.ajax({
      method: 'GET',
      url: 'https://api.api-ninjas.com/v1/geocoding?city=' + cityName,
      headers: { 'X-Api-Key': 'A8i5MFMdPVPqf23nTuS6rA==GAha0TyZEdBjlWRc'},
      contentType: 'application/json',
      success: function(result) {
        console.log(result[0]);
        setCity(result[0])
        setLangLong({lat: result[0].latitude, long:result[0].longitude})
      },
      error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
      }
    });
  }, [cityName])

  //changing values in input
  const changeCityValue = (e) => {
    setCityValue(e.target.value)
  }

  //change city after press enter
  const changeCity = (e) => {
    if (e.key === "Enter")
        setCityName(e.target.value)
    }

  
    const temperature = data.timeseries.map((e, i) => {
      return(
        <Temperature id={i} {...e}/>
      )
  });

  console.log(data !== "")
  console.log(data.timeseries)
  //console.log(city)
  //console.log(latLong)

  return (
    <div className="App">
      <input type='text' onChange={changeCityValue} value={cityValue} onKeyDown={changeCity}/>
      <City {...city}/>
      {temperature}
    </div>
  );
}

export default App;
