import * as React from "react";
import BubbleChart from "../Charts/BubbleChart";
import PolarAreaChart from "../Charts/PolarAreaChart";
import SideBar from "../Components/MainPage/SideBar";
export default function Insights() {
  return (
    <>
      <div className="flex h-[100vh]">
        <div className="w-16 fixed top-0 left-0 h-full">
          <SideBar />
        </div>

        <div className="flex-1 ml-10">
          <div className="w-[90%] m-auto">
            <div className="my-10">
              <BubbleChart />
            </div>
            <div className="my-10">
              <PolarAreaChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
