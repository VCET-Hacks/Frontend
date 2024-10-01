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
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        {/* Your header code */}
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* First Section: User Statistics */}
        <div className="max-w-5xl mx-auto mb-10 p-6 border-2 border-gray-200 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-semibold text-gray-700 mb-6">
            No. of Users
          </h1>
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

        {/* Combined Section: Types of Jobs and Platform Usage */}
        <div className="max-w-5xl mx-auto mb-10 p-6 border-2 border-gray-200 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-semibold text-gray-700 mb-6">
            Insights
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Types of Jobs */}
            <div className="p-6 border-2 border-gray-200 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Types of Jobs
              </h2>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: "Series A" },
                      { id: 1, value: 15, label: "Series B" },
                      { id: 2, value: 20, label: "Series C" },
                      { id: 3, value: 20, label: "Series D" },
                      { id: 4, value: 50, label: "Series E" },
                    ],
                  },
                ]}
                width={400}
                height={200}
              />
            </div>

            {/* Platform Usage */}
            <div className="p-6 border-2 border-gray-200 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Platform Usage
              </h2>
              <BarChart
                dataset={dataset}
                xAxis={[{ scaleType: "band", dataKey: "month" }]}
                series={[
                  { dataKey: "london", label: "London" },
                  { dataKey: "paris", label: "Paris" },
                  { dataKey: "newYork", label: "New York" },
                  { dataKey: "seoul", label: "Seoul" },
                ]}
                {...chartSetting}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartDashboard

