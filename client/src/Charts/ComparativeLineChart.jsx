// src/components/ComparativeLineChart.jsx
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import LoadingPage from "../LoadingPage/LoadingPage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  TimeScale
);

const ComparativeLineChart = () => {
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
        const labels = Object.keys(timeSeries)
          .map((timestamp) => new Date(timestamp))
          .reverse();
        const openPrices = Object.values(timeSeries)
          .map((point) => parseFloat(point["1. open"]))
          .reverse();
        const closePrices = Object.values(timeSeries)
          .map((point) => parseFloat(point["4. close"]))
          .reverse();

        setChartData({
          labels,
          datasets: [
            {
              label: "Open Prices",
              data: openPrices,
              borderColor: "#FF6384",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
            },
            {
              label: "Close Prices",
              data: closePrices,
              borderColor: "#36A2EB",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
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
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index" },
    },
    scales: {
      x: { type: "time", title: { display: true, text: "Time" } },
      y: { title: { display: true, text: "Price (USD)" } },
    },
  };

  if (error) return <div>Error: {error}</div>;

  return chartData ? (
    <div className="flex items-center justify-center h-[90vh] ">
      <div className="w-[90%] h-[90vh] ">
        <Line data={chartData} options={options} />
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default ComparativeLineChart;
