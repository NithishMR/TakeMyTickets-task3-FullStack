import * as React from "react";
import ScatterPlot from "../Charts/ScatterPlot";
import RadarChart from "../Charts/RadarChart";
import SideBar from "../Components/MainPage/SideBar";
export default function Comparisons() {
  return (
    <>
      <div className="flex h-[100vh]">
        <div className="w-16 fixed top-0 left-0 h-full">
          <SideBar />
        </div>

        <div className="flex-1 ml-10">
          <div className="w-[100%] m-auto">
            <div className="my-10">
              <ScatterPlot />
            </div>
            <div className="mt-10 mb-16">
              <RadarChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
