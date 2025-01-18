// src/components/StockChart.js
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import LoadingPage from "../LoadingPage/LoadingPage";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch data from the Alpha Vantage API (5-minute interval)
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/stock-data");
        const data = await response.json();

        // Extract and format data for charting
        const timeSeries = data["Time Series (5min)"];
        const labels = Object.keys(timeSeries)
          .reverse() // Reverse to make data chronological
          .filter((date) => {
            // Optionally, you can filter by a date range here
            return true; // For now, we keep all data
          });

        const closingPrices = labels.map((date) =>
          parseFloat(timeSeries[date]["4. close"])
        );

        setChartData({
          labels,
          datasets: [
            {
              label: "IBM Stock Price",
              data: closingPrices,
              fill: false, // No fill under the line
              borderColor: "rgba(75,192,192,1)", // Line color
              pointBackgroundColor: "rgba(75,192,192,1)", // Points on the line
              pointBorderColor: "white", // Point border color
              pointRadius: 5, // Larger points
              borderWidth: 2, // Line thickness
              tension: 0.4, // Smooth curve for the line
              spanGaps: false, // Ensure no gaps in the line
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `Date: ${
              tooltipItem.label
            }, Price: $${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Light grid lines
        },
        ticks: {
          font: {
            size: 10, // Smaller date labels
            family: "Arial, sans-serif",
            weight: "normal",
            color: "rgba(0, 0, 0, 0.6)", // Light gray for the date labels
          },
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Light grid lines
        },
        ticks: {
          font: {
            size: 10, // Smaller stock price labels
            family: "Arial, sans-serif",
            weight: "normal",
            color: "rgba(0, 0, 0, 0.6)", // Light gray for the price labels
          },
          callback: function (value) {
            return "$" + value.toFixed(2); // Format Y-axis as currency
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f9f9f9",
        padding: "20px",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333" }}>
        IBM Stock Prices (Intraday, 5-min)
      </h2>
      {chartData ? (
        <div className="flex items-center justify-center h-[90vh] ">
          <div className="w-[90%] h-[90vh] ">
            <Line data={chartData} options={options} />
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

export default LineChart;
