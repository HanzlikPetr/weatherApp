import React from "react";
import $ from "jquery";
import "./App.css";
import City from "./Component/City";
import Graph from "./Component/Graph";
//import Temperature from './Component/Temperature';

function App() {
  //create variables
  const [data, setData] = React.useState("");
  const [latLong, setLangLong] = React.useState({
    lat: "50.073658",
    long: "14.418540",
  });
  const [cityName, setCityName] = React.useState("Prague");
  const [cityValue, setCityValue] = React.useState("");
  const [city, setCity] = React.useState("");

  //work with yr api
  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latLong.lat}&lon=${latLong.long}`
      );
      const resData = await res.json();
      setData(resData.properties);
    };

    getData();
  }, [latLong]);

  //work with geolocation api
  React.useEffect(() => {
    $.ajax({
      method: "GET",
      url: "https://api.api-ninjas.com/v1/geocoding?city=" + cityName,
      headers: { "X-Api-Key": "A8i5MFMdPVPqf23nTuS6rA==GAha0TyZEdBjlWRc" },
      contentType: "application/json",
      success: function (result) {
        console.log(result[0]);
        setCity(result[0]);
        setCityValue(result[0].name + ", " + result[0].country);
        setLangLong({ lat: result[0].latitude, long: result[0].longitude });
      },
      error: function ajaxError(jqXHR) {
        console.error("Error: ", jqXHR.responseText);
      },
    });
  }, [cityName]);

  //changing values in input
  const changeCityValue = (e) => {
    setCityValue(e.target.value);
  };

  //change city after press enter
  const changeCity = (e) => {
    if (e.key === "Enter") setCityName(e.target.value);
  };

  if (data !== "" && city !== "") {
    return (
      <div className="App">
        <header>
          <input
            type="text"
            onChange={changeCityValue}
            value={cityValue}
            onKeyDown={changeCity}
          />
          <City city={city} temperature={data.timeseries[0]} />
        </header>
        <main>
        <Graph temperature={data} />
        </main>
      </div>
    );
  }
}

export default App;
