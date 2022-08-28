import React, { useState } from "react";
import styles from "./Register.module.scss";

import { Link, Navigate, resolvePath, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fethAuthRegister } from "../../redux/slices/auth";

import axios from "../../axios";

function Register() {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const isAuth = useSelector((state) => Boolean(state.auth.data));
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();

  const onSubmit = async ({ fullName, email, password, avatarUrl }) => {
    try {
      // const file = values.file[0];
      // const formData = new FormData();
      // formData.append("image", file);
      // const { data } = await axios.post("/uploads", formData);

      const field = {
        fullName,
        email,
        password,
        avatarUrl:
          avatarUrl === ""
            ? "https://media.baamboozle.com/uploads/images/6046/1541846791_543433"
            : avatarUrl,
      };

      const user = await dispatch(fethAuthRegister({ ...field }));
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
            {...register("fullName", { required: true })}
          />
          {errors.fullName && <p>{errors.fullName.message}</p>}
          <input
            type="email"
            className={styles.register__inpTitle}
            placeholder="Введите email"
            {...register("email", { required: true })}
          />
          <input
            type="password"
            className={styles.register__password}
            placeholder="Введите пароль"
            {...register("password", { required: true })}
          />
          <input
            type="text"
            className={styles.register__password}
            placeholder="Введите ссылку на аватарку"
            {...register("avatarUrl")}
          />
          <span className={styles.sign}>(Не обязательно)</span>
          {/* <input
            type="file"
            
            className={styles.register__password}
            {...register("file", { required: "Укажите файл" })}
          /> */}
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
