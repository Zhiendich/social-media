import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="w-full h-screen bg-[#1267A8] flex justify-center items-center">
      <Link to={"/"} className="text-[white] text-[25px] font-bold">
        Такой странницы не существует. Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFoundPage;
