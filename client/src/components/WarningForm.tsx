import React from "react";
import { useParams } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import Button from "../UI/Button/Button";

interface IWarningForm {
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

const WarningForm = ({ setFlag }: IWarningForm) => {
  const { id } = useParams();
  const { deleteProfile } = useActions();
  const hideForm = () => {
    setFlag(false);
  };
  const deleteUser = () => {
    if (id) {
      deleteProfile(id);
      setFlag(false);
    }
  };
  return (
    <div className="absolute top-0 left-0 flex justify-center items-center w-full h-screen bg-[#E5E5E5]">
      <div className="relative bg-white max-w-[500px] w-full h-[170px] rounded-2xl flex flex-col justify-center p-3">
        <div className="delete-buttom" onClick={hideForm}></div>
        <h1 className="text-center text-[red] text-[20px] mt-2">
          Вы действительно хотите безвозвратно удалить этот аккаунт?
        </h1>
        <Button
          text="Удалить"
          className="red-button mt-3"
          onClick={deleteUser}
        />
      </div>
    </div>
  );
};

export default WarningForm;
