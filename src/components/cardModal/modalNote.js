import React from "react";
import style from "./index.css";

const Note = ({ note }) => (
  <div className={style.content_note}>
    <h3 className={style.note_desc}>
      <span className={style.note_icon} />
      {note}
    </h3>
  </div>
);

export default Note;
