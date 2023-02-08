import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { selectUser } from "../store/selectors/userSelectors";

const Home = () => {
  const user = useTypedSelector(selectUser);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (user?._id) {
      navigate(`profile/${user._id}`);
    }
  }, [user?._id]);

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
