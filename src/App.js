import React from "react";
import $ from "jquery";
import "./App.css";
import City from "./Component/City";
import Today from "./Component/Today";
import NextWeek from "./Component/NextWeek";
import Search from "./Component/Search";
//import Temperature from './Component/Temperature';

function App() {
  //create variables
  const [data, setData] = React.useState("");
  const [latLong, setLangLong] = React.useState({
    lat: "50.073658",
    long: "14.418540",
  });
  const [cityName, setCityName] = React.useState("Prague");
  const [city, setCity] = React.useState("");
  const [day, setDay] = React.useState("today")
  const [theme, setTheme] = React.useState("dark")
  const [cityValue, setCityValue] = React.useState("");

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
        //console.log(result[0]);
        setCity(result[0]);
        setCityValue(result[0].name + ", " + result[0].country);
        setLangLong({ lat: result[0].latitude, long: result[0].longitude });
      },
      error: function ajaxError(jqXHR) {
        console.error("Error: ", jqXHR.responseText);
      },
    });
  }, [cityName]);


  const changeCity = (city) => {
    setCity("")
    setCityName(city)
  }


  const changeDay = (e) => {
    setDay(e.target.classList.contains("today") ? "today": "nextWeek")
  }

  const changeTheme = () => {
    setTheme((prev) => {
      const light = document.querySelectorAll("." + prev);
      const darkerLight = document.querySelectorAll(".darker-" + prev);

      light.forEach(e => e.classList.remove(prev))
      darkerLight.forEach(e => e.classList.remove("darker-" + prev))

      const newTheme = prev === "light" ? "dark" : "light";

      light.forEach(e => e.classList.add(newTheme))
      darkerLight.forEach(e => e.classList.add("darker-" + newTheme))
      return newTheme;
    })
  }

  if (city !== "" && data !== "") {
    return (
      <div className="App">
        <header className={theme}>
          <Search cityName={cityName} cityValueProp={cityValue} func={changeCity}/>
          <City city={city} temperature={data.timeseries[0]} />
        </header>
        <main className={"darker-"+theme}>
          <div className="day">
            <div className="todayNextWeeek">
              <h2 className={day === "today" ? 'today darker-' + theme : "today  noactive darker-" + theme} onClick={changeDay}>Today</h2>
              <h2 className={day === "today" ? "nextWeek  noactive darker-"+theme :  'nextWeek darker-'+ theme} onClick={changeDay}>Next week</h2>
            </div>
            <h3 onClick={changeTheme} onTouchMove={changeTheme} className="switchTheme">{theme !== "light" ? "Light" : "Dark"} mode</h3>
          </div>
          {day === "today" && <Today temperature={data} theme={theme}/>}
          {day === "nextWeek" && <NextWeek temperature={data} theme={theme}/>} 
        </main>
      </div>
    );
  } else {
    return (
      <div className={"lds-ring " + theme}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default App;
