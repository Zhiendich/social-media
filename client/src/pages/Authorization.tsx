import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "..//UI/Loader/Loader";

import TextField from "../UI/TextField/TextField";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { isPasswordValid, isValidEmail } from "../hooks/useValidate";
import {
  selectIsAuthError,
  selectIsAuthLoading,
  selectToken,
} from "../store/selectors/userSelectors";

const Authorization = () => {
  const [email, setEmail] = useState("nikita@gmail.com");
  const [password, setPassword] = useState("123zxcqwe");
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const token = useTypedSelector(selectToken);
  const isAuthLoading = useTypedSelector(selectIsAuthLoading);
  const isAuthError = useTypedSelector(selectIsAuthError);
  const { userAuth } = useActions();
  const authHandler = async () => {
    if (isValidEmail(email)) {
      if (isPasswordValid(password)) {
        userAuth({ email, password });
      } else {
        setErrorPassword("Некорректный пароль");
      }
    } else {
      setErrorEmail("Некорректный email");
    }
  };
  if (token) {
    window.localStorage.setItem("token", token);
  }
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="p-5 bg-[#E5E5E5] rounded-2xl w-[500px] h-[300px] flex flex-col justify-between">
        <h1 className="text-center text-[30px]">Авторизация</h1>
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
            value={password}
            setValue={setPassword}
            fieldName="Password"
            fieldType="password"
            key="Password"
            error={errorPassword}
            setError={setErrorPassword}
          />
        </div>
        {isAuthError && (
          <h1 className="text-[red] text-center">{isAuthError}</h1>
        )}
        <p className="text-[18px] text-center">
          Еще нет аккаунта? Вы можете{" "}
          <Link className="text-[blue] cursor-pointer" to={"/register"}>
            зарегистрироваться
          </Link>
        </p>
        {isAuthLoading ? (
          <Loader />
        ) : (
          <button
            onClick={authHandler}
            className="p-3 w-full bg-black text-[white] rounded-2xl mx-auto "
          >
            Авторизация
          </button>
        )}
      </div>
    </div>
  );
};

export default Authorization;
