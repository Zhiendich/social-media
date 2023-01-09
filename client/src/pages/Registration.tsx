import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../UI/Loader/Loader";
import TextField from "../UI/TextField/TextField";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import {
  isPasswordValid,
  isPhoneValid,
  isValidEmail,
} from "../hooks/useValidate";
import { selectIsRegister } from "../store/selectors/userSelectors";
const Registration = () => {
  const { userRegister } = useActions();
  const isRegisterLoading = useTypedSelector(selectIsRegister);
  const [email, setEmail] = useState("nikita@gmail.com");
  const [phone, setPhone] = useState("+380973169033");
  const [fullName, setFullName] = useState("Nikita Potapow");
  const [password, setPassword] = useState("123zxcqwe");
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorPhone, setErrorPhone] = useState<string | null>(null);
  const [errorName, setErrorName] = useState<string | null>(null);
  const [errorLastName, setErrorLastName] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);

  const registerHandler = async () => {
    // if (isValidEmail(email)) {
    //   if (isPhoneValid(phone)) {
    //     if (isPasswordValid(password)) {
    //       if (name.trim() !== "") {
    //         if (lastName.trim() !== "") {
    //           const newUser = {
    //             email,
    //             phone,
    //             name,
    //             lastName,
    //             password,
    //           };
    //           userRegister(newUser);
    //         } else {
    //           setErrorName("Фамилия не может быть пустым");
    //         }
    //       } else {
    //         setErrorName("Имя не может быть пустым");
    //       }
    //     } else {
    //       setErrorPassword("Пароль min 6 символов");
    //     }
    //   } else {
    //     setErrorPhone("Некорректный телефон");
    //   }
    // } else {
    //   setErrorEmail("Некорректный email");
    // }
    if (
      isValidEmail(email) &&
      isPhoneValid(phone) &&
      isPasswordValid(password) &&
      fullName.trim() !== ""
    ) {
      const newUser = {
        email,
        phone,
        fullName,
        password,
      };
      userRegister(newUser);
    } else {
      alert("Непрошло");
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="p-5 bg-[#E5E5E5] rounded-2xl w-[500px] h-[400px] flex flex-col justify-between">
        <h1 className="text-center text-[30px]">Регистрация</h1>
        <div className="flex flex-wrap justify-between">
          <TextField
            value={email}
            setValue={setEmail}
            fieldName="Email"
            fieldType="text"
            key="Email"
            error={errorEmail}
            setError={setErrorEmail}
          />
          <TextField
            value={phone}
            setValue={setPhone}
            fieldName="Phone"
            fieldType="text"
            key="Phone"
            error={errorPhone}
            setError={setErrorPhone}
          />
          <TextField
            value={fullName}
            setValue={setFullName}
            fieldName="Full Name"
            fieldType="text"
            key="Name"
            error={errorName}
            setError={setErrorName}
          />
          <TextField
            value={password}
            setValue={setPassword}
            fieldName="Password"
            fieldType="password"
            key="Password"
            error={errorPassword}
            setError={setErrorPassword}
          />
        </div>
        <p className="text-[18px] text-center mt-3">
          Вернуться на страницу
          <Link className="text-[blue] cursor-pointer ml-1" to={"/login"}>
            авторизации
          </Link>
        </p>
        {isRegisterLoading ? (
          <Loader />
        ) : (
          <button
            onClick={registerHandler}
            className="p-3 w-full bg-black text-[white] rounded-2xl mx-auto mt-2 "
          >
            Авторизация
          </button>
        )}
      </div>
    </div>
  );
};

export default Registration;
