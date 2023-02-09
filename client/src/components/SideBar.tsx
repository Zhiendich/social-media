import { NavLink } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { selectUser } from "../store/selectors/userSelectors";

const SideBar = () => {
  const user = useTypedSelector(selectUser);
  return (
    <div className="p-5 bg-[#E5E5E5] rounded-2xl w-[200px] h-[250px] flex flex-col justify-between  ml-5 text-center">
      <NavLink
        className={(navData) =>
          navData.isActive
            ? "text-[20px] font-bold underline"
            : "text-[20px] font-semibold"
        }
        to={`profile/${user?._id}`}
      >
        Профиль
      </NavLink>
      <NavLink
        className={(navData) =>
          navData.isActive
            ? "text-[20px] font-bold underline"
            : "text-[20px] font-semibold"
        }
        to={"friends/"}
      >
        Друзья
      </NavLink>
      <NavLink
        className={(navData) =>
          navData.isActive
            ? "text-[20px] font-bold underline"
            : "text-[20px] font-semibold"
        }
        to={"chats/"}
      >
        Чат
      </NavLink>
      <NavLink
        className={(navData) =>
          navData.isActive
            ? "text-[20px] font-bold underline"
            : "text-[20px] font-semibold"
        }
        to={"news"}
      >
        Новости
      </NavLink>
    </div>
  );
};

export default SideBar;
