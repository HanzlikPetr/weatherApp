import $ from "jquery";

/**
 * work with yr api and get wetaher data
 * @param {*} latLong
 * @returns data
 */
export async function getDataWeather(lat, long) {
  const res = await fetch(
    `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${long}`
  );
  const resData = await res.json();
  return resData.properties;
}

/**
 * get current time that is in the city
 * @param {*} cityName
 * @returns
 */
export async function getTime(cityName) {
  const res = $.ajax({
    method: "GET",
    url: "https://api.api-ninjas.com/v1/worldtime?city=" + cityName,
    headers: { "X-Api-Key": "A8i5MFMdPVPqf23nTuS6rA==GAha0TyZEdBjlWRc" },
    contentType: "application/json",
    success: function (result) {
      return result;
    },
    error: function ajaxError(jqXHR) {
      console.error("Error: ", jqXHR.responseText);
    },
  });

  if (res !== undefined) {
    return res;
  }
}

/**
 * get data about city from api
 * @param {string} cityName
 * @returns data
 */
export async function getCity(cityName) {
  const res = $.ajax({
    method: "GET",
    url: "https://api.api-ninjas.com/v1/geocoding?city=" + cityName,
    headers: { "X-Api-Key": "A8i5MFMdPVPqf23nTuS6rA==GAha0TyZEdBjlWRc" },
    contentType: "application/json",
    success: function (result) {
      return result;
    },
    error: function ajaxError(jqXHR) {
      console.error("Error: ", jqXHR.responseText);
    },
  });

  if (res !== undefined) {
    return res;
  }
}
