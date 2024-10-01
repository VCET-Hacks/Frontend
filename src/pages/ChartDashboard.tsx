import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

export const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: "Jan",
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: "Feb",
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: "Mar",
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: "Apr",
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: "May",
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: "June",
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: "July",
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: "Aug",
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: "Sept",
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: "Oct",
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: "Nov",
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: "Dec",
  },
];

export function valueFormatter(value: number | null) {
  return `${value}mm`;
}

const ChartDashboard = () => {
    

    const chartSetting = {
      yAxis: [
        {
          label: "rainfall (mm)",
        },
      ],
      width: 500,
      height: 300,
      sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
          transform: "translate(-20px, 0)",
        },
      },
    };
  return (
    <div>
      <div className=" w-[1000px] border-2xl bg-white">
        <h1>No. of users</h1>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          height={300}
          margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
          grid={{ vertical: true, horizontal: true }}
          width={1000}
        />
      </div>
      <div>
        <h1>types of Jobs</h1>
        <div>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "series A" },
                  { id: 1, value: 15, label: "series B" },
                  { id: 2, value: 20, label: "series C" },
                  { id: 3, value: 20, label: "series D" },
                  { id: 4, value: 50, label: "series E" },
                ],
              },
            ]}
            width={400}
            height={200}
          />
        </div>
      </div>
      <div>Remark</div>
      <div>Platform they are using</div>
      <div>
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "month" }]}
          series={[
            { dataKey: "london", label: "London",  },
            { dataKey: "paris", label: "Paris",  },
            { dataKey: "newYork", label: "New York", },
            { dataKey: "seoul", label: "Seoul",  },
          ]}
          {...chartSetting}
        />
      </div>
    </div>
  );
}

export default ChartDashboard

