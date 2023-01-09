import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="flex justify-between mt-4 mr-5">
        <SideBar />
        <div className="w-[80%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
