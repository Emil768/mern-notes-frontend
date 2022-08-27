import React from "react";
import styles from "./Register.module.scss";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fethAuthRegister } from "../../redux/slices/auth";

import axios from "../../axios";

function Register() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => Boolean(state.auth.data));
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const file = values.file[0];
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await axios.post("/uploads", formData);

      const user = await dispatch(
        fethAuthRegister({ ...values, avatarUrl: data.url })
      );

      if (!user.payload) {
        return alert("Не удалось зарегистрироваться");
      }
      if ("token" in user.payload) {
        window.localStorage.setItem("token", user.payload.token);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      alert("Не удалось зарегистрироваться");
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <form className={styles.register} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.register__content}>
        <h2 className={styles.register__title}>Регистрация</h2>
        <div className={styles.register__inputs}>
          <input
            type="text"
            className={styles.register__inpTitle}
            placeholder="Введите никнейм"
            {...register("fullName", { required: "Укажите никнейм" })}
          />
          {errors.fullName && <p>{errors.fullName.message}</p>}
          <input
            type="email"
            className={styles.register__inpTitle}
            placeholder="Введите email"
            {...register("email", { required: "Укажите e-mail" })}
          />
          <input
            type="password"
            className={styles.register__password}
            placeholder="Введите пароль"
            {...register("password", { required: "Укажите пароль" })}
          />
          <input
            type="file"
            className={styles.register__password}
            {...register("file", { required: "Укажите файл" })}
          />
        </div>
        <div className={styles.register__buttons}>
          <button className={styles.register__submit} type="submit">
            Зарегистрироваться
          </button>
          <Link to="/auth/login" className={styles.register__buttonLogin}>
            Авторизоваться
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Register;
