import React from "react";
export default function LoadingPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin mb-4 w-16 h-16 border-8 border-t-8 border-blue-500 rounded-full border-t-transparent"></div>
          <h2 className="text-2xl font-semibold text-gray-700">
            Loading, please wait...
          </h2>
          <p className="mt-2 text-lg text-gray-500">
            Fetching the latest stock data...
          </p>
        </div>
      </div>
    </>
  );
}
