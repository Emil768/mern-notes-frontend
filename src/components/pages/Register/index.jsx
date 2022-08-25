import React from "react";
import styles from "./Register.module.scss";

import { Link } from "react-router-dom";

function Register() {
  return (
    <form className={styles.register}>
      <div className={styles.register__content}>
        <h2 className={styles.register__title}>Регистрация</h2>
        <div className={styles.register__inputs}>
          <input
            type="email"
            className={styles.register__inpTitle}
            placeholder="Введите логин"
          />
          <input
            type="password"
            className={styles.register__password}
            placeholder="Введите пароль"
          />
          <input
            type="file"
            className={styles.register__password}
            placeholder="Введите пароль"
          />
        </div>
        <div className={styles.register__buttons}>
          <button className={styles.register__submit} type="submit">
            Зарегистрироваться
          </button>
          <Link to="/login" className={styles.register__buttonLogin}>
            Авторизоваться
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Register;
