// src/components/ScatterPlot.jsx
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import LoadingPage from "../LoadingPage/LoadingPage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale
);

const ScatterPlot = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/stock-data");
        const data = await response.json();

        if (!data["Time Series (5min)"]) {
          setError("Failed to fetch data from Alpha Vantage.");
          return;
        }

        const timeSeries = data["Time Series (5min)"];
        const formattedData = Object.keys(timeSeries).map((timestamp) => ({
          x: new Date(timestamp),
          y: parseInt(timeSeries[timestamp]["5. volume"], 10),
        }));

        setChartData({
          datasets: [
            {
              label: "Volume",
              data: formattedData.reverse(),
              backgroundColor: "#36A2EB",
            },
          ],
        });
      } catch (err) {
        setError("Error fetching or parsing data.");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      x: { type: "time", title: { display: true, text: "Time" } },
      y: { title: { display: true, text: "Volume" } },
    },
  };

  if (error) return <div>Error: {error}</div>;

  return chartData ? (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="w-[90%] h-[90vh]">
        <Scatter data={chartData} options={options} />
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default ScatterPlot;
