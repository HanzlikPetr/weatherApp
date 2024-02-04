import React from "react";
import Search from "./Component/Search";
import { Form } from "react-router-dom";
import "./Root.css"

export default function Root() {
  const favorites = Object.keys({ ...localStorage });
  console.log(favorites);

  // eslint-disable-next-line array-callback-return
  const citie = favorites.map((e, i) => {
    if (e !== "theme") 
        return <button name="city" value={e} type="submit" key={i}>{e}</button>;
  });

  return (
    <div className="router">
      <Search />
      <Form method="post">
        {citie}
      </Form>
    </div>
  );
}
