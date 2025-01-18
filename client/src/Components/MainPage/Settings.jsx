import * as React from "react";
import SideBar from "./SideBar";
import SettingsPage from "../../SettingsPage/SettingsPage";

export default function Settings() {
  return (
    <>
      <div className="flex h-[100vh]">
        <div className="w-16 fixed top-0 left-0 h-full">
          <SideBar />
        </div>

        <div className="flex-1 ml-16">
          <div className="w-[100%] m-auto">
            <SettingsPage />
          </div>
        </div>
      </div>
    </>
  );
}
