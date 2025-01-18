// src/components/BubbleChart.jsx
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
import { Bubble } from "react-chartjs-2";
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

const BubbleChart = () => {
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
        const formattedData = Object.keys(timeSeries).map((timestamp) => {
          const point = timeSeries[timestamp];
          return {
            x: new Date(timestamp), // Time
            y: parseFloat(point["4. close"]), // Close price
            r: Math.sqrt(parseInt(point["5. volume"], 10)) / 100, // Radius based on volume
          };
        });

        setChartData({
          datasets: [
            {
              label: "IBM Bubble Chart",
              data: formattedData.reverse(), // Reverse for chronological order
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
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
            const { x, y, r } = context.raw;
            return `Time: ${x}\nClose: ${y}\nVolume Size: ${Math.round(
              r * 100
            )}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "time",
        title: { display: true, text: "Time" },
      },
      y: {
        title: { display: true, text: "Close Price (USD)" },
      },
    },
  };

  if (error) return <div>Error: {error}</div>;

  return chartData ? (
    <div className="">
      <Bubble data={chartData} options={options} className="w-4/5" />
    </div>
  ) : (
    <LoadingPage />
  );
};

export default BubbleChart;
