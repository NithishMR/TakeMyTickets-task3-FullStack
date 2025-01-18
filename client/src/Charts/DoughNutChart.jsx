// src/components/DoughnutChart.jsx
import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import LoadingPage from "../LoadingPage/LoadingPage";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
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
        const labels = [];
        const volumes = [];

        Object.keys(timeSeries).forEach((timestamp) => {
          const point = timeSeries[timestamp];
          labels.push(timestamp);
          volumes.push(parseInt(point["5. volume"], 10));
        });

        setChartData({
          labels: labels.reverse().slice(0, 10), // Show the most recent 10 intervals
          datasets: [
            {
              label: "Volume",
              data: volumes.reverse().slice(0, 10), // Corresponding volumes
              backgroundColor: [
                "#ff6384",
                "#36a2eb",
                "#ffcd56",
                "#4bc0c0",
                "#9966ff",
                "#ff9f40",
                "#e76f51",
                "#2a9d8f",
                "#264653",
                "#e9c46a",
              ],
              borderColor: "#ffffff",
              borderWidth: 1,
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
      tooltip: {
        callbacks: {
          label: (context) => {
            const volume = context.raw;
            return `Volume: ${volume}`;
          },
        },
      },
    },
  };

  if (error) return <div>Error: {error}</div>;

  return chartData ? (
    <div className="flex items-center justify-center h-full ">
      <div className="w-[400px] h-[400px]">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-full">
      <LoadingPage />
    </div>
  );
};

export default DoughnutChart;
