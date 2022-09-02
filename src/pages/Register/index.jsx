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

import { ErrorMessage } from "@hookform/error-message";

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
            {...register("fullName", {
              required: true,
              minLength: {
                value: 5,
                message: "Минимум 5 символов",
              },
            })}
          />

          <ErrorMessage
            errors={errors}
            name="fullName"
            render={({ message }) =>
              message && (
                <div className={styles.register__error}>
                  <p className={styles.register__message}>
                    <svg
                      clipRule="evenodd"
                      fillRule="evenodd"
                      strokeLinejoin="round"
                      strokeMiterlimit="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#dd2727"
                    >
                      <path
                        d="m12.002 21.534c5.518 0 9.998-4.48 9.998-9.998s-4.48-9.997-9.998-9.997c-5.517 0-9.997 4.479-9.997 9.997s4.48 9.998 9.997 9.998zm0-1.5c-4.69 0-8.497-3.808-8.497-8.498s3.807-8.497 8.497-8.497 8.498 3.807 8.498 8.497-3.808 8.498-8.498 8.498zm0-6.5c-.414 0-.75-.336-.75-.75v-5.5c0-.414.336-.75.75-.75s.75.336.75.75v5.5c0 .414-.336.75-.75.75zm-.002 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"
                        fillRule="nonzero"
                      />
                    </svg>
                    {message}
                  </p>
                </div>
              )
            }
          />

          <input
            type="email"
            className={styles.register__inpTitle}
            placeholder="Введите email"
            {...register("email", {
              required: true,
            })}
          />
          <input
            type="password"
            className={styles.register__password}
            placeholder="Введите пароль"
            {...register("password", {
              required: true,
              minLength: {
                value: 5,
                message: "Минимум 5 символов",
              },
            })}
          />

          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) =>
              message && (
                <div className={styles.register__error}>
                  <p className={styles.register__message}>
                    <svg
                      clipRule="evenodd"
                      fillRule="evenodd"
                      strokeLinejoin="round"
                      strokeMiterlimit="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#dd2727"
                    >
                      <path
                        d="m12.002 21.534c5.518 0 9.998-4.48 9.998-9.998s-4.48-9.997-9.998-9.997c-5.517 0-9.997 4.479-9.997 9.997s4.48 9.998 9.997 9.998zm0-1.5c-4.69 0-8.497-3.808-8.497-8.498s3.807-8.497 8.497-8.497 8.498 3.807 8.498 8.497-3.808 8.498-8.498 8.498zm0-6.5c-.414 0-.75-.336-.75-.75v-5.5c0-.414.336-.75.75-.75s.75.336.75.75v5.5c0 .414-.336.75-.75.75zm-.002 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"
                        fillRule="nonzero"
                      />
                    </svg>
                    {message}
                  </p>
                </div>
              )
            }
          />

          <input
            type="file"
            className={styles.register__password}
            accept="image/jpeg,image/png,image/gif"
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
