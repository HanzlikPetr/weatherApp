import React from "react";
import "./style/Loading.css"


export default function Loading({theme}) {
  return (
    <div className={"lds-ring " + theme}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
