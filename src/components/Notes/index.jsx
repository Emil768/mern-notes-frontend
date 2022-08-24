import React from "react";
import Note from "../Note";

import styles from "./Notes.module.scss";

function Notes() {
  return (
    <main className={styles.notes}>
      {[...Array(6)].map((item) => (
        <Note />
      ))}
    </main>
  );
}

export default Notes;
