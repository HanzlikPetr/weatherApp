import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function Graph({ temperature }) {
  let dataDay = [];
  let dataTime = [];

  for (let i = 0; i <= 61; i++) {
    const pom = new Date(temperature.timeseries[i].time)
    dataTime.push(pom.getDate() + '. ' + pom.getMonth() + 1 + ' ' + pom.getHours() + ':00');
    dataDay.push(
      temperature.timeseries[i].data.instant.details.air_temperature
    );
  }

  return (
    <div className="div-graph">
      <Line
        datasetIdKey="id"
        data={{
          labels: dataTime,
          datasets: [
            {
              label: "Teplota °C",
              data: dataDay,
              borderWidth: 1,
              fill: false,
              tension: 0.5,
            },
          ],
        }}
      />
    </div>
  );
}
