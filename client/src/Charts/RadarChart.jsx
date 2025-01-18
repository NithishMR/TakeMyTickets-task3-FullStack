// src/components/RadarChart.jsx
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import LoadingPage from "../LoadingPage/LoadingPage";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Tooltip, Legend);

const RadarChart = () => {
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
        const openPrices = [];
        const closePrices = [];
        const highPrices = [];
        const lowPrices = [];

        Object.keys(timeSeries).forEach((timestamp) => {
          const point = timeSeries[timestamp];
          labels.push(timestamp);
          openPrices.push(parseFloat(point["1. open"]));
          closePrices.push(parseFloat(point["4. close"]));
          highPrices.push(parseFloat(point["2. high"]));
          lowPrices.push(parseFloat(point["3. low"]));
        });

        setChartData({
          labels: labels.reverse().slice(0, 10), // Most recent 10 timestamps
          datasets: [
            {
              label: "Stock Prices",
              data: [
                openPrices[0], // Most recent open price
                highPrices[0], // Most recent high price
                lowPrices[0], // Most recent low price
                closePrices[0], // Most recent close price
              ],
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
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
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 250,
      },
    },
  };

  if (error) return <div>Error: {error}</div>;

  return chartData ? (
    <div className="flex items-center justify-center h-[90vh] ">
      <div className="w-[90%] h-[90vh] ">
        <Radar data={chartData} options={options} />
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default RadarChart;
