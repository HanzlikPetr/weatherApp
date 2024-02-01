import React from "react";
import "./style/Loading.css"


export default function Loading() {
  return (
    <div className={"lds-ring "}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
