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
import {
  selectIsRegister,
  selectIsRegisterError,
} from "../store/selectors/userSelectors";
const Registration = () => {
  const { userRegister } = useActions();
  const isRegisterLoading = useTypedSelector(selectIsRegister);
  const isRegisterError = useTypedSelector(selectIsRegisterError);
  const [email, setEmail] = useState("nikita@gmail.com");
  const [phone, setPhone] = useState("+380973169033");
  const [fullName, setFullName] = useState("Nikita Potapow");
  const [password, setPassword] = useState("123zxcqwe");
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorPhone, setErrorPhone] = useState<string | null>(null);
  const [errorName, setErrorName] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const registerHandler = async () => {
    let validation = false;
    switch (validation) {
      case isValidEmail(email):
        setErrorEmail("Некорректный email");
        break;
      case isPhoneValid(phone):
        setErrorPhone("Некорректный телефон");
        break;
      case isPasswordValid(password):
        setErrorPassword("Некорректный пароль");
        break;
      case fullName.trim() !== "":
        setErrorName("Имя не может быть пустым");
        break;
      default:
        validation = true;
    }
    if (validation) {
      const newUser = {
        email,
        phone,
        fullName,
        password,
      };
      await userRegister(newUser);
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
        {isRegisterError && (
          <h1 className="text-[red] text-center">{isRegisterError}</h1>
        )}
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
