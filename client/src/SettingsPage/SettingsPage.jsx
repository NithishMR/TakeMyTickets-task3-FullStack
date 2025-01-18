import React, { useState, useEffect } from "react";

export default function SettingsPage() {
  const [chartVisibility, setChartVisibility] = useState({
    lineChart: true,
    barChart: true,
    comparativeLineChart: true,
    scatterPlot: true,
    pieChart: true,
    bubbleChart: true,
    doughnutChart: true,
    polarAreaChart: true,
    radarChart: true,
  });

  const [theme, setTheme] = useState("light");
  const [interval, setInterval] = useState("5min");

  // Effect to apply theme changes dynamically
  useEffect(() => {
    // Set the theme on the HTML element
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggleVisibility = (chart) => {
    setChartVisibility((prev) => ({
      ...prev,
      [chart]: !prev[chart],
    }));
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value); // Update theme state
  };

  const handleIntervalChange = (event) => {
    setInterval(event.target.value); // Update interval state
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

        {/* Theme Selection */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Theme</h2>
          <select
            value={theme}
            onChange={handleThemeChange}
            className="p-2 border rounded w-full"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Interval Selection */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Interval
          </h2>
          <select
            value={interval}
            onChange={handleIntervalChange}
            className="p-2 border rounded w-full"
          >
            <option value="1min">1 Minute</option>
            <option value="5min">5 Minutes</option>
            <option value="15min">15 Minutes</option>
            <option value="30min">30 Minutes</option>
            <option value="60min">1 Hour</option>
          </select>
        </div>

        {/* Chart Visibility */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Chart Visibility
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(chartVisibility).map((chart) => (
              <label
                key={chart}
                className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg"
              >
                <input
                  type="checkbox"
                  checked={chartVisibility[chart]}
                  onChange={() => handleToggleVisibility(chart)}
                  className="w-5 h-5"
                />
                <span className="text-gray-800 capitalize">
                  {chart.replace(/([A-Z])/g, " $1").toLowerCase()}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Changes will be reflected immediately on the dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
