import React from "react";
import "./style/Search.css";

export default function Search({ cityName , cityValueProp, func}) {
    const [cityValue, setCityValue] = React.useState(cityValueProp);
    
    

    const changeCityValue = (e) => {
        setCityValue(e.target.value);
      };

      const changeCity = (e) => {
        if (e.key === "Enter" && document.querySelector(".city").value.split(",")[0]) {
          func(e.target.value);
        }
      };
    
      const changeCityClick = () => {
        console.log(cityName)
        if(cityName !== document.querySelector(".city").value.split(",")[0]){
          func (document.querySelector(".city").value.split(",")[0]);
        }
      };

  return (
    <>
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
    </>
  );
}
