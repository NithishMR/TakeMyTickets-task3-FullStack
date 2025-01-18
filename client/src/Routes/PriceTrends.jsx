import * as React from "react";
import LineChart from "../Charts/LineChart";
import ComparativeLineChart from "../Charts/ComparativeLineChart";
import SideBar from "../Components/MainPage/SideBar";
export default function PriceTrends() {
  return (
    <>
      <div className="flex h-[100vh]">
        <div className="w-16 fixed top-0 left-0 h-full">
          <SideBar />
        </div>

        <div className="flex-1 ml-16">
          <div className="w-[100%] m-auto">
            <div className="my-10">
              <LineChart />
            </div>
            <div className="my-10">
              <ComparativeLineChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
