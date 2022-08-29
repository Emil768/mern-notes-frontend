import React from "react";
import styles from "./Register.module.scss";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fethAuthRegister,
  fethAuthUploadAvatar,
} from "../../redux/slices/auth";

import { ClipLoader } from "react-spinners";

function Register() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.auth);

  const isLoading = Boolean(status === "loading");

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
      const formData = new FormData();
      formData.append("image", avatarUrl[0]);

      const newAvatarUrl = await dispatch(fethAuthUploadAvatar(formData));

      const fields = {
        fullName,
        email,
        password,
        avatarUrl: {
          public_id: newAvatarUrl.payload.public_id,
          url: newAvatarUrl.payload.secure_url,
        },
      };

      const user = await dispatch(fethAuthRegister(fields));
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

  if (data) {
    return <Navigate to="/" />;
  }

  return (
    <form className={styles.register} onSubmit={handleSubmit(onSubmit)}>
      <ClipLoader loading={isLoading} color="#39ca81" />
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
            type="file"
            className={styles.register__password}
            {...register("avatarUrl", { required: true })}
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
