// src/components/PieChart.jsx
import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import LoadingPage from "../LoadingPage/LoadingPage";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
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
        const openPrices = Object.keys(timeSeries)
          .slice(0, 5)
          .map((key) => ({
            label: key,
            value: parseFloat(timeSeries[key]["1. open"]),
          }));

        setChartData({
          labels: openPrices.map((point) => point.label),
          datasets: [
            {
              data: openPrices.map((point) => point.value),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
              ],
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
    },
  };

  if (error) return <div>Error: {error}</div>;

  return chartData ? (
    <Pie data={chartData} options={options} />
  ) : (
    <LoadingPage />
  );
};

export default PieChart;
