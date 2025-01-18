import React, { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import LoadingPage from "../LoadingPage/LoadingPage";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const chartRef = useRef(null); // Reference for the Chart.js instance

  const getCurrentTheme = () =>
    document.documentElement.getAttribute("data-theme") || "light";

  const [theme, setTheme] = useState(getCurrentTheme);

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(getCurrentTheme);
    };

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

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
        const closes = [];

        Object.keys(timeSeries).forEach((timestamp) => {
          const point = timeSeries[timestamp];
          labels.push(timestamp);
          closes.push(parseFloat(point["4. close"]));
        });

        setChartData({
          labels: labels.reverse().slice(0, 10),
          datasets: [
            {
              label: "Closing Price",
              data: closes.reverse().slice(0, 10),
              backgroundColor:
                theme === "dark"
                  ? "rgba(255, 99, 132, 0.6)"
                  : "rgba(66, 165, 245, 0.6)",
              borderColor:
                theme === "dark"
                  ? "rgba(255, 99, 132, 1)"
                  : "rgba(66, 165, 245, 1)",
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
  }, [theme]);

  useEffect(() => {
    if (chartRef.current && chartRef.current.chartInstance) {
      const chartInstance = chartRef.current.chartInstance;
      chartInstance.options.scales.x.grid.color =
        theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
      chartInstance.options.scales.y.grid.color =
        theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
      chartInstance.data.datasets[0].backgroundColor =
        theme === "dark"
          ? "rgba(255, 99, 132, 0.6)"
          : "rgba(66, 165, 245, 0.6)";
      chartInstance.data.datasets[0].borderColor =
        theme === "dark" ? "rgba(255, 99, 132, 1)" : "rgba(66, 165, 245, 1)";
      chartInstance.update(); // Trigger a re-render of the chart
    }
  }, [theme, chartData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (context) => {
            const price = context.raw;
            return `Price: $${price.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: { grid: { color: "rgba(0, 0, 0, 0.1)" } },
      y: {
        grid: { color: "rgba(0, 0, 0, 0.1)" },
        ticks: {
          callback: (value) => `$${value.toFixed(2)}`,
        },
      },
    },
  };

  if (error) return <div>Error: {error}</div>;

  return chartData ? (
    <div className="flex items-center justify-center h-full">
      <div className="w-[90%] h-[100vh]">
        <Bar ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default BarChart;
