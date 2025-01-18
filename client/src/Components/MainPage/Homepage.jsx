import React, { useState, useEffect } from "react";

const HomePage = () => {
  // Function to get the current theme
  const getCurrentTheme = () => {
    return document.documentElement.getAttribute("data-theme") || "light"; // Default to light if not set
  };

  const [theme, setTheme] = useState(getCurrentTheme);

  // Sync theme state with document attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-8 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-4xl font-bold">IBM Stock Analysis Dashboard</h1>
        <p className="mt-4 text-xl">
          Analyze IBM's intraday stock price and volume, with a 5-minute
          interval breakdown.
        </p>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl mb-16">
        {/* Overview Section */}
        <div
          className={`p-6 rounded-lg shadow-lg ${
            theme === "dark"
              ? "bg-gray-800 text-gray-200"
              : "bg-white text-gray-800"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p>
            Get a comprehensive view of IBM's stock performance, including key
            metrics such as price trends and trading volume. Our default charts
            provide a quick snapshot of the current stock dynamics.
          </p>
        </div>

        {/* Volume Analysis */}
        <div
          className={`p-6 rounded-lg shadow-lg ${
            theme === "dark"
              ? "bg-gray-800 text-gray-200"
              : "bg-white text-gray-800"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Volume Analysis</h2>
          <p>
            Visualize IBM's trading volume over time with simple Bar and
            Doughnut charts. Explore volume fluctuations in detail, and gain
            insight into market activity.
          </p>
        </div>
      </div>

      {/* Price Trends Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl mb-16">
        <div
          className={`p-6 rounded-lg shadow-lg ${
            theme === "dark"
              ? "bg-gray-800 text-gray-200"
              : "bg-white text-gray-800"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Price Trends</h2>
          <p>
            Track IBM’s price movements over time with a Line Chart, and compare
            trends against other stocks with Comparative Line Charts.
          </p>
        </div>

        {/* Comparisons */}
        <div
          className={`p-6 rounded-lg shadow-lg ${
            theme === "dark"
              ? "bg-gray-800 text-gray-200"
              : "bg-white text-gray-800"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Comparisons</h2>
          <p>
            Use Scatter Plots to compare IBM’s stock with other variables like
            volume, or analyze price-related metrics using Radar and Bubble
            charts.
          </p>
        </div>
      </div>

      {/* Insights Section */}
      <div
        className={`p-6 rounded-lg shadow-lg w-full max-w-4xl mb-16 ${
          theme === "dark"
            ? "bg-gray-800 text-gray-200"
            : "bg-white text-gray-800"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-4">Insights & Correlations</h2>
        <p>
          Discover deep insights into IBM's stock behavior with advanced chart
          types like the Bubble and Polar Area charts, showing multi-variable
          correlations.
        </p>
      </div>

      <div className="text-center text-lg">
        <p>
          Powered by Alpha Vantage's real-time data, this dashboard helps you
          make informed decisions with detailed, visual stock analysis.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
