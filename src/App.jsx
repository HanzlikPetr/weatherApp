import React from "react";
import "./App.css";
import City from "./Component/City";
import Today from "./Component/Today";
import NextWeek from "./Component/NextWeek";
import Search from "./Component/Search";
import Loading from "./Component/Loading";
import {getDataWeather , getTime, getCity} from "./api";

function App() {
  //create variables
  //weather data
  const [data, setData] = React.useState("");

  const [latLong, setLangLong] = React.useState("");

  //const  pom = {...localStorage}
  const [cityName, setCityName] = React.useState(/*Object.values(pom)[0]*/"Prague");

  //city that we want to found
  const [city, setCity] = React.useState("");
  //curent value at search bar
  const [cityValue, setCityValue] = React.useState("");
  const [day, setDay] = React.useState("today")

  const [theme, setTheme] = React.useState("light")
  //current time in that city
  const [time, setTime] = React.useState("");

  const [loading, setLoading ] = React.useState()

  React.useEffect(() => {
    latLong !== "" && getDataWeather(latLong).then(value => setData(value));
  }, [latLong]);

  React.useEffect(() => {
    setLoading(0)
  
    getTime(cityName).then(value => {
      setTime(value) 
      setLoading(1)
    })

    setCityValue("")
    getCity(cityName).then(result => {
      setCity(result[0]);
      setCityValue(result[0].name + ", " + result[0].country);
      setLangLong({ lat: result[0].latitude, long: result[0].longitude });
      
    })
  }, [cityName]);


  //changing city that we want found  
  const changeCity = (city) => {
    setCity("")
    setCityName(city)
  }
  
  const changeDay = (e) => {
    setDay(e.target.classList.contains("today") ? "today": "nextWeek")
  }

  //changing from light to dark mode
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

  if (loading && data !== "" && cityValue !== "") {
    return (
      <div className="App">
        <header className={theme}>
          <Search cityName={cityName} cityValueProp={cityValue} func={changeCity}/>
          <City city={city} temperature={data.timeseries[0]}  time={time}/>
        </header>
        <main className={"darker-"+theme}>
          <div className="day">
            <div className="todayNextWeeek">
              <h2 className={day === "today" ? 'today darker-' + theme : "today  noactive darker-" + theme} onClick={changeDay}>Today</h2>
              <h2 className={day === "today" ? "nextWeek  noactive darker-"+theme :  'nextWeek darker-'+ theme} onClick={changeDay}>Next days</h2>
            </div>
            <h3 onClick={changeTheme} onTouchMove={changeTheme} className="switchTheme">{theme !== "light" ? "Light" : "Dark"} mode</h3>
          </div>
          {day === "today" && <Today temperature={data} theme={theme} time={time}/>}
          {day === "nextWeek" && <NextWeek temperature={data} theme={theme} time={time}/>} 
        </main>
      </div>
    );
  } else {
    return (
      <div className={"App " + theme}>
        <Loading theme={theme} />
      </div>
    );
  }
}

export default App;
