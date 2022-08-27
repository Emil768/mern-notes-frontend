import React, { useEffect } from "react";
import Note from "../../components/Note";

import styles from "./Notes.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { fetchCategoryNotes, fetchNotes } from "../../redux/slices/notes";
import Loader from "../../components/Loader";

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
      <div className={styles.notes__content}>
        {!isError ? (
          (isLoading ? [...Array(6)] : items).map((item, index) =>
            isLoading ? (
              <Loader key={index} />
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
