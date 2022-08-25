import React from "react";

import styles from "./Note.module.scss";
import { Link } from "react-router-dom";
function Note() {
  return (
    <Link to="/notes/:id" className={styles.note}>
      <span className={styles.note__category}>
        <span>
          <i className={styles.circle}></i> Заметки
        </span>
        <span className={styles.author}>
          <img
            src="https://i.pinimg.com/originals/fd/17/51/fd175129e200299ec0dba35fcffd87fc.gif"
            alt=""
            className={styles.author__avatar}
          />
          <span className={styles.author__name}>Emilka228</span>
        </span>
      </span>
      <h2 className={styles.note__title}>
        Как я оптимизировал нынешний проект
      </h2>
      <p className={styles.note__text}>
        Я тут один сервис нашёл — haveibeenpwned.com, который показывает, была
        ли взломана ваша почта или нет. Работает очень просто. В их базе
        хранятся все взломанные почты, которые были опубликованы с паролями в
        публичном доступе. Если же ваша почта когда-либо взламывалась, то
        вероятней всего, пароль с почтой на каком-нибудь хакерском форуме уже
        опубликовали.
      </p>
    </Link>
  );
}

export default Note;
