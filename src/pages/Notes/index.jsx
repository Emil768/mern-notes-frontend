import React, { useEffect } from "react";
import Note from "../../components/Note";

import styles from "./Notes.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { fetchNotes } from "../../redux/slices/notes";

import { ClipLoader } from "react-spinners";

function Notes() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.notes);
  const isLoading = Boolean(status === "loading");
  const isError = Boolean(status === "error");

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  return (
    <main className={styles.notes}>
      <div
        className={
          isLoading
            ? [styles.notes__content, styles.notes__contentLoading].join(" ")
            : styles.notes__content
        }
      >
        {!isError ? (
          (isLoading ? [...Array(1)] : items).map((item, index) =>
            isLoading ? (
              <ClipLoader loading={isLoading} color="#39ca81" key={index} />
            ) : (
              <Note {...item} key={item._id} />
            )
          )
        ) : (
          <img
            className={styles.notes__error}
            src="https://i.pinimg.com/originals/27/4b/41/274b41ea9f730396bfd8f0eb19edfa86.gif"
            alt=""
          />
        )}
      </div>
    </main>
  );
}

export default Notes;
