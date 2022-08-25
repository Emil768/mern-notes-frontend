import React from "react";
import styles from "./Login.module.scss";

import { Link } from "react-router-dom";

function Login() {
  return (
    <form className={styles.form}>
      <div className={styles.form__content}>
        <h2 className={styles.form__title}>Авторизация</h2>
        <div className={styles.form__inputs}>
          <input
            type="email"
            className={styles.form__inpTitle}
            placeholder="Введите логин"
          />
          <input
            type="password"
            className={styles.form__password}
            placeholder="Введите пароль"
          />
        </div>
        <div className={styles.form__buttons}>
          <button className={styles.form__submit} type="submit">
            Войти
          </button>
          <Link to="/register" className={styles.form__buttonRegister}>
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Login;
