import * as React from "react";
import BarChart from "../Charts/BarChart";
import DoughnutChart from "../Charts/DoughNutChart";
import SideBar from "../Components/MainPage/SideBar";

export default function VolumeAnalysis() {
  return (
    <>
      <div className="flex mb-11">
        <div className="w-16 fixed top-0 left-0 h-full">
          <SideBar />
        </div>

        <div className="flex-1 ">
          <div className="w-[100%]">
            <div className="">
              <BarChart />
              <div className="mt-28">
                <DoughnutChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
