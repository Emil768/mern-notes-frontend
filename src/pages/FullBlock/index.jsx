import React, { useEffect, useState } from "react";

import styles from "./FullBlock.module.scss";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate, useParams } from "react-router-dom";

import axios from "../../axios";

import { useDispatch, useSelector } from "react-redux";
import { fetchRemoveNote } from "../../redux/slices/notes";
import { ClipLoader } from "react-spinners";

function FullBlock() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);

  useEffect(() => {
    axios
      .get(`/notes/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Не удалось получить заметку");
      });
  }, []);

  const isEditable = data && userData ? data.user._id === userData._id : null;

  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите удалить заметку?")) {
      dispatch(fetchRemoveNote(id));
      navigate("/");
    }
  };

  const date = new Date(data && data.createdAt);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour24: true,
    day: "numeric",
  };

  return (
    <main className={styles.fullBlock}>
      <div
        className={
          isLoading
            ? [
                styles.fullBlock__content,
                styles.fullBlock__contentLoading,
              ].join(" ")
            : styles.fullBlock__content
        }
      >
        {isLoading ? (
          <ClipLoader
            loading={isLoading}
            color="#39ca81"
            className={styles.spinner}
          />
        ) : (
          <>
            <h1 className={styles.fullBlock__title}>{data.title}</h1>
            {isEditable && (
              <div className={styles.fullBlock__popup}>
                <Link to={`/notes/${id}/edit`}>
                  <span className={styles.popup__item}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M1.438 16.875l5.688 5.689-7.126 1.436 1.438-7.125zm22.562-11.186l-15.46 15.46-5.688-5.689 15.459-15.46 5.689 5.689zm-4.839-2.017l-.849-.849-12.614 12.599.85.849 12.613-12.599z" />
                    </svg>
                  </span>
                </Link>
                <span className={styles.popup__item} onClick={onClickRemove}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" />
                  </svg>
                </span>
              </div>
            )}
            <div className={styles.fullBlock__info}>
              <span>
                <i className={styles.circle}></i>{" "}
                <Link
                  to={`/category/${data.category}`}
                  className={styles.fullBlock__category}
                >
                  {data.category}
                </Link>
              </span>
              <span className={styles.fullBlock__icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
                </svg>
                {data.viewsCount}
              </span>
              <span className={styles.fullBlock__date}>
                {date.toLocaleDateString("ru-RU", options)}
              </span>
              <span className={styles.author}>
                <img
                  src={`${data.user.avatarUrl}`}
                  alt=""
                  className={styles.author__avatar}
                />
                <span className={styles.author__name}>
                  {data.user.fullName}
                </span>
              </span>
            </div>
            <ReactMarkdown
              className={styles.fullBlock__text}
              children={data.text}
            />
          </>
        )}
      </div>
    </main>
  );
}

export default FullBlock;
