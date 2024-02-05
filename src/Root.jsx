import React from "react";
import Search from "./Component/Search";
import { Form } from "react-router-dom";
import "./Root.css"
import { getDataWeather } from "./api";

export default function Root() {
 
  //localStorage.clear()
  defaultCities()
  const favorites =Object.values({ ...localStorage });
  
  const theme = localStorage.getItem("theme");
  // eslint-disable-next-line array-callback-return
  const citie = favorites.map((e, i) => {
    e = JSON.parse(e)
    
    return <button className={"button darker-" + theme} name="city" value={e[0]} type="submit" key={i}>{e[0]}</button>;
  });
  
  //
  return (
    <div className={theme ? "router " +  theme : "router"}>
      <Search />
      <Form method="post">
       {citie}
      </Form>
    </div>
  );
}

const defaultCities = () => {
  const Tokyo = JSON.stringify(["Tokyo",35.6828387,139.7594549])
  const prague = JSON.stringify(["Prague",50.0874654,14.4212535])
  const LA = JSON.stringify(["Los Angeles",34.0536909,-118.242766])
  localStorage.setItem("Tokyo", Tokyo)
  localStorage.setItem("Prague", prague)
  localStorage.setItem("Los Angeles", LA)
}