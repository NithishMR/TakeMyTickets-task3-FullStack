import * as React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartBar,
  faChartLine,
  faBalanceScale,
  faSearch,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

export default function SideBar() {
  return (
    <>
      <div className="">
        <div className="h-[100vh] w-14">
          <div className="flex flex-col justify-between items-center h-full pt-4">
            {/* Top section with three icons */}
            <div className="flex flex-col gap-4">
              <Link to={"/"}>
                <div className="tooltip tooltip-right" data-tip=" Home">
                  <div className="p-2 hover:bg-gray-400 rounded-lg">
                    <FontAwesomeIcon icon={faHome} />
                  </div>
                </div>
              </Link>
              <Link to="/volume-analysis">
                <div
                  className="tooltip tooltip-right"
                  data-tip="Volume Analysis"
                >
                  <div className="p-2 hover:bg-gray-400 rounded-lg">
                    <FontAwesomeIcon icon={faChartBar} />
                  </div>
                </div>
              </Link>
              <Link to={"/price-trends"}>
                <div className="tooltip tooltip-right" data-tip="Price Trend">
                  <div className="p-2 hover:bg-gray-400 rounded-lg">
                    <FontAwesomeIcon icon={faChartLine} />
                  </div>
                </div>
              </Link>
              <Link to={"/comparisons"}>
                <div className="tooltip tooltip-right" data-tip="Comparison">
                  <div className="p-2 hover:bg-gray-400 rounded-lg">
                    <FontAwesomeIcon icon={faBalanceScale} />
                  </div>
                </div>
              </Link>
              <Link to={"/insights"}>
                <div className="tooltip tooltip-right" data-tip="Insights">
                  <div className="p-2 hover:bg-gray-400 rounded-lg">
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                </div>
              </Link>
            </div>
            <div className="">
              <Link to={"/settings"}>
                <div className="tooltip tooltip-right" data-tip="Settings">
                  <div className="px-2 pt-2 hover:bg-gray-400 rounded-lg">
                    <div className="pb-2">
                      <FontAwesomeIcon icon={faGear} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
