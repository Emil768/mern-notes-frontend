import React from "react";
import Note from "../../Note";

import styles from "./Notes.module.scss";

import { useParams } from "react-router-dom";

function Notes() {
  const { name } = useParams();

  return (
    <>
      {name && <h1 className={styles.notes__category}>#{name}</h1>}
      <main className={styles.notes}>
        {[...Array(6)].map((item) => (
          <Note />
        ))}
      </main>
    </>
  );
}

export default Notes;
