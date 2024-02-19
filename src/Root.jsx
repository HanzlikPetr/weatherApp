import React from "react";
import Search from "./Component/Search";
import { Form } from "react-router-dom";
import "./Root.css"
import FavoritesCity from "./Component/FavoritesCity";

export default function Root() {
  const [favorites, setFavorites] = React.useState(Object.values({ ...localStorage }))
  
  const theme = localStorage.getItem("theme");

  const removeCity = (e) => {
    localStorage.removeItem(e.target.getAttribute('data-city'))
    setFavorites(Object.values({ ...localStorage }))
  }


  // eslint-disable-next-line array-callback-return
  const citie = favorites.map((e, i) => {    
    if(e !== "dark") 
      return <FavoritesCity name={e} i={i} removeCity={removeCity} key={e}/>
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
