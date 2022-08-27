import React from "react";

import styles from "./Note.module.scss";
import { Link } from "react-router-dom";
function Note({ _id, title, text, category, user }) {
  return (
    <Link to={`/notes/${_id}`} className={styles.note}>
      <span className={styles.note__category}>
        <span>
          <i className={styles.circle}></i> {category}
        </span>
        <span className={styles.author}>
          <img
            src={`http://localhost:3001${user.avatarUrl}`}
            alt=""
            className={styles.author__avatar}
          />
          <span className={styles.author__name}>{user.fullName}</span>
        </span>
      </span>
      <h2 className={styles.note__title} title={title}>
        {title}
      </h2>
      <p className={styles.note__text}>{text}</p>
    </Link>
  );
}

export default Note;
