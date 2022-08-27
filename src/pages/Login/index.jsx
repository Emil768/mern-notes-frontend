import React from "react";
import styles from "./Login.module.scss";

import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth } from "../../redux/slices/auth";

function Login() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => Boolean(state.auth.data));

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert("Пользователь не найден");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form__content}>
        <h2 className={styles.form__title}>Авторизация</h2>
        <div className={styles.form__inputs}>
          <input
            type="email"
            className={styles.form__inpTitle}
            placeholder="Введите логин (e-mail)"
            {...register("email", { required: "Укажите e-mail" })}
          />
          <input
            type="password"
            className={styles.form__password}
            placeholder="Введите пароль"
            {...register("password", { required: "Укажите пароль" })}
          />
        </div>
        <div className={styles.form__buttons}>
          <button className={styles.form__submit} type="submit">
            Войти
          </button>
          <Link to="/auth/register" className={styles.form__buttonRegister}>
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Login;
