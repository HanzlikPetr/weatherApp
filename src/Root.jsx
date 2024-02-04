import React from "react";
import Search from "./Component/Search";
import { Form } from "react-router-dom";
import "./Root.css"

export default function Root() {
  localStorage.setItem("Tokyo", "Tokyo")
  localStorage.setItem("Prague", "Prague")
  localStorage.setItem("Los Angeles", "Los Angeles")
  const favorites = Object.keys({ ...localStorage });
  
  const theme = localStorage.getItem("theme");
  console.log(theme)

  // eslint-disable-next-line array-callback-return
  const citie = favorites.map((e, i) => {
    //let data;
    if (e !== "theme"){      
      return <button className={"button darker-" + theme} name="city" value={e} type="submit" key={i}>{e}</button>;
    }
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
