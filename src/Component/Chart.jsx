import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function Chart({name, dataTime, dataDay, changeType, theme}){
    return(
        <div className="div-graph">
        <div className="selectType">
          <p className={"air_temperature active darker-" + theme} onClick={changeType}>
            Temperature
          </p>
          <p className={"wind_speed darker-"+ theme} onClick={changeType}>
            Wind speed
          </p>
          <p className={"relative_humidity darker-" + theme} onClick={changeType}>
            Humidity
          </p>
          <p className={"cloud_area_fraction darker-" + theme}  onClick={changeType}>
            Cloud area fraction
          </p>
        </div>
        <Line
          datasetIdKey="id"
          data={{
            labels: dataTime,
            datasets: [
              {
                label: name,
                data: dataDay,
                borderWidth: 1,
                fill: false,
                tension: 0.5,
              },
            ],
          }}
        />
        </div>
    )
}