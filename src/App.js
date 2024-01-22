import React from "react";
import $ from "jquery";
import "./App.css";
import City from "./Component/City";
import Today from "./Component/Today";
import NextWeek from "./Component/NextWeek";
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
  const [day, setDay] = React.useState("today")
  const [theme, setTheme] = React.useState("dark")

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

  //changing values in input
  const changeCityValue = (e) => {
    setCityValue(e.target.value);
  };

  //change city after press enter
  const changeCity = (e) => {
    if (e.key === "Enter" && document.querySelector(".city").value.split(",")[0]) {
      setCity("");
      setCityName(e.target.value);
    }
  };

  const changeCityClick = () => {
    console.log(cityName)
    if(cityName !== document.querySelector(".city").value.split(",")[0]){
      setCity("");
      setCityName(document.querySelector(".city").value.split(",")[0]);
    }
  };

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
          <div className="input-search">
            <input
              className="city"
              type="text"
              onChange={changeCityValue}
              value={cityValue}
              onKeyDown={changeCity}
            />
            <svg
              onClick={changeCityClick}
              fill="#000000"
              height="25px"
              width="25px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488.4 488.4"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6 s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2 S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7 S381.9,104.65,381.9,203.25z"></path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
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
