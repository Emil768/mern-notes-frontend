import React, { useEffect, useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import styles from "./AddNote.module.scss";
import "easymde/dist/easymde.min.css";

import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";

import axios from "../../axios";

function AddNote() {
  const isAuth = useSelector((state) => Boolean(state.auth.data));

  const navigate = useNavigate();
  const { id } = useParams();

  const isEditable = Boolean(id);

  const [data, setData] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  useEffect(() => {
    if (id) {
      axios.get(`/notes/${id}`).then((res) => {
        setData(res.data);
        setText(res.data.text);
        setCategory(res.data.category);
        setTitle(res.data.title);
      });
    }
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const field = { title, category, text };

    try {
      const { data } = isEditable
        ? await axios.patch(`/notes/${id}`, field)
        : await axios.post("/notes", field);
      const _id = isEditable ? id : data._id;
      navigate(`/notes/${_id}`);
    } catch (err) {
      alert("Не удалось создать пост");
    }
  };

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <form className={styles.addNote} onSubmit={onSubmit}>
      <div className={styles.addNote__content}>
        <input
          type="text"
          className={styles.addNote__title}
          placeholder="Название"
          defaultValue={data && data.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className={styles.addNote__category}
          placeholder="Категория"
          defaultValue={data && data.category}
          onChange={(e) => setCategory(e.target.value)}
        />{" "}
        <SimpleMDE
          className={styles.editor}
          value={text}
          onChange={onChange}
          options={options}
        />
        <div className={styles.addNote__buttons}>
          <button className={styles.addNote__confirm}>
            {isEditable ? "Сохранить" : "Опубликовать"}
          </button>
          <Link
            to={isEditable ? `/notes/${id}` : "/"}
            className={styles.addNote__cancel}
          >
            Отмена
          </Link>
        </div>
      </div>
    </form>
  );
}

export default AddNote;
