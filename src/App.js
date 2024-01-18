import React from 'react';
import $ from 'jquery'
import './App.css';

function App() {
  const [ data, setData ] = React.useState("");
  const [ lat , setLat ] = React.useState("50.073658")
  const [ long , setLong ] = React.useState("14.418540")
  const [ city , setCity ] = React.useState("")
  const [ cityValue, setCityValue] = React.useState("")
  
  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${long}`)
      const resData = await res.json();
      setData(resData)
    }
    
    getData();
  }, [lat, long])

  
  React.useEffect(() => {
    $.ajax({
      method: 'GET',
      url: 'https://api.api-ninjas.com/v1/geocoding?city=' + city,
      headers: { 'X-Api-Key': 'A8i5MFMdPVPqf23nTuS6rA==GAha0TyZEdBjlWRc'},
      contentType: 'application/json',
      success: function(result) {
        console.log(result[0]);
        setLat(result[0].latitude)
        setLong(result[0].longitude)
      },
      error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
      }
    });
  }, [city])
  //console.log(lat)
  //console.log(long)
  

  const changeCityValue = (e) => {
    setCityValue(e.target.value)
  }

  const changeCity = (e) => {
    if (e.key === "Enter")
        setCity(e.target.value)
    }

  console.log(data)
  //console.log(cityValue)
  //console.log(city)

  return (
    <div className="App">
      <input type='text' onChange={changeCityValue} value={cityValue} onKeyDown={changeCity}/>
    </div>
  );
}

export default App;
