import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import styles from "./AddNote.module.scss";
import "easymde/dist/easymde.min.css";

import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { Navigate, useNavigate, useParams } from "react-router-dom";

function AddNote() {
  const isAuth = useSelector((state) => Boolean(state.auth.data));
  const [text, setText] = useState("");
  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.addNote}>
      <div className={styles.addNote__content}>
        <input
          type="text"
          className={styles.addNote__title}
          placeholder="Название"
        />
        <input
          type="text"
          className={styles.addNote__category}
          placeholder="Категория"
        />{" "}
        <SimpleMDE
          className={styles.editor}
          value={text}
          onChange={onChange}
          options={options}
        />
        <div className={styles.addNote__buttons}>
          <button className={styles.addNote__confirm}>Опубликовать</button>
          <button className={styles.addNote__cancel}>Отмена</button>
        </div>
      </div>
    </div>
  );
}

export default AddNote;
