import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashFavorite from "../components/Dashboard/DashFavorite";
import DashProfile from "../components/Dashboard/DashProfile";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  //khi thay đổi trên thanh địa chỉ url sẽ render lại
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Thanh sidebar */}
      {/* <div>
        <DashSidebar />
      </div> */}
      {/* Profile */}
      {tab === "profile" && <DashProfile />}
      {/* favorite */}
      {tab === "favorite" && <DashFavorite />}
    </div>
  );
};

export default Dashboard;
