import React from "react";

import styles from "./Note.module.scss";

function Note() {
  return (
    <div className={styles.note}>
      <span className={styles.note__category}>
        <i className={styles.circle}></i> Заметки
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
    </div>
  );
}

export default Note;
