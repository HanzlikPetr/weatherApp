import React from "react";
import "./style/Search.css";
import { getCity } from "../api";
import { Form , redirect } from "react-router-dom";

export default function Search({ cityName, cityValueProp }) {
  //value in search bar
  const [cityValue, setCityValue] = React.useState(cityValueProp);

  //city that we want to found
  const [city, setCity] = React.useState("");

  //array of options
  const [option, setOption] = React.useState([]);

  React.useEffect(() => {
    //after 1 second that we dont write something in to search bar it show option
    const delayDebounceFn = setTimeout(() => {
      city !== "" &&
        getCity(city).then((result) => {
          const pom = [];
          setOption([]);
          result.forEach((element) => {
            pom.push(element);
          });
          setOption(pom);
        });
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [city]);

  //Set value in search bar
  const changeCityValue = (e) => {
    setCity(e.target.value);
    setCityValue(e.target.value);
  };

  const options = option.map((e, i) => {
    return <Option key={i} name={e} />;
  });

  function Option({ name }) {
    console.log(name)
    return (
      <button type="submit" name="city" value={name.name + ", " + name.country}>{name.name + ", " + name.country}</button>
    );
  }

  return (
    <div className="search">
      <Form className="input-search" method="post">
        <input
          placeholder="City name"
          className="city"
          type="text"
          onChange={changeCityValue}
          defaultValue={cityValue}
          name="city"
          //onKeyDown={changeCity}
        />
        <button type="submit">
          <svg
            //onClick={changeCityClick}
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
        </button>
      <div className="option">{options}</div>
      </Form>
    </div>
  );
}

  //changing city that we want found  
  export async function action({request, params}){
    //console.log(params.cityName)
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    
    
    const char = ["š", "ž", "č", "ř", "ě"];
    const correctChar = ["s", "z", "c", "r", "e"]
    let pom = updates.city.split(",")[0]

    if(char.some(ch => pom.includes(ch))){
      let wrongChar;
      pom.split("").forEach((e, i)  => {
        char.forEach(el => {
          if(el === e){
            wrongChar = i;
          }
        }) 
      })
      
      pom =  pom.substring(0, wrongChar) + correctChar[char.indexOf(updates.city.split(",")[0].charAt(wrongChar))] + pom.substring(wrongChar + 1)
    }
    
    if(pom === params.cityName)
    alert("Same city");

    return redirect(`/weather/${pom}`)
  }
