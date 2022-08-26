import React, { useEffect } from "react";
import Note from "../../components/Note";

import styles from "./Notes.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { fetchNotes } from "../../redux/slices/notes";
import Loader from "../../components/Loader";

function Notes() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.notes);
  const { name } = useParams();

  const isLoading = Boolean(status === "loading");

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  return (
    <>
      {name && <h1 className={styles.notes__category}>#{name}</h1>}
      <main className={styles.notes}>
        {(isLoading ? [...Array(6)] : items).map((item, index) =>
          isLoading ? <Loader key={index} /> : <Note {...item} key={item._id} />
        )}
      </main>
    </>
  );
}

export default Notes;
