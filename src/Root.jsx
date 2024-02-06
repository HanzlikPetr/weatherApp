import React from "react";
import Search from "./Component/Search";
import { Form } from "react-router-dom";
import "./Root.css"
import FavoritesDays from "./Component/FavoritesDays";

export default function Root() {
 
  //localStorage.clear()
  defaultCities()
  const favorites =Object.values({ ...localStorage });
  
  const theme = localStorage.getItem("theme");
  // eslint-disable-next-line array-callback-return
  const citie = favorites.map((e, i) => {    
    if(e !== "dark") return <FavoritesDays name={e} i={i} />;
  });
  
  
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
  localStorage.setItem("Tokyo", "Tokyo")
  localStorage.setItem("Prague", "Prague")
  localStorage.setItem("Los Angeles", "Los Angeles")
}