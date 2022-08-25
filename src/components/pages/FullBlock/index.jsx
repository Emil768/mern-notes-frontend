import React from "react";

import styles from "./FullBlock.module.scss";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

function FullBlock() {
  const isEditable = false;
  return (
    <main className={styles.fullBlock}>
      <h1 className={styles.fullBlock__title}>
        Как я оптимизировал нынешний проект
      </h1>
      {isEditable && (
        <div className={styles.fullBlock__popup}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M1.438 16.875l5.688 5.689-7.126 1.436 1.438-7.125zm22.562-11.186l-15.46 15.46-5.688-5.689 15.459-15.46 5.689 5.689zm-4.839-2.017l-.849-.849-12.614 12.599.85.849 12.613-12.599z" />
            </svg>
          </span>
          <span>
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
        <i className={styles.circle}></i>{" "}
        <Link to={`/category/Заметки`} className={styles.fullBlock__category}>
          Заметки
        </Link>
        <span className={styles.fullBlock__icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
          </svg>
          {0}
        </span>
        <span className={styles.fullBlock__date}>
          Дата 05.08.2021 в 23:55:21
        </span>
        <span className={styles.author}>
          <img
            src="https://i.pinimg.com/originals/fd/17/51/fd175129e200299ec0dba35fcffd87fc.gif"
            alt=""
            className={styles.author__avatar}
          />
          <span className={styles.author__name}>Emilka228</span>
        </span>
      </div>
      <ReactMarkdown
        className={styles.fullBlock__text}
        children={`# VK-loader
  ## 🛠 Технологии:
  - ReactJS 18
  - NodeJs
  - Axios
  - Express (Простой сервер)
  - Multer (Помощник загрузки файлов на стороне сервера)



  Веб-сайт 👉 https://emilmurahas228.github.io/vk-loader/

  [ice_video_20220819-173745.webm](https://user-images.githubusercontent.com/60827113/185643294-5007dd5b-c92f-4a06-9b93-535eef725760.webm)
  `}
      />
    </main>
  );
}

export default FullBlock;
