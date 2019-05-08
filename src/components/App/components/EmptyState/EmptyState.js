import React from "react";

import { addTile } from "../../../../actions";

import s from "./EmptyState.module.css";

export default function EmptyState({ dispatch }) {
  return (
    <div className={s.root}>
      <div className={s.title}>You have not added any Ideas</div>
      <div className={s.subtitle}>
        Why not{" "}
        <button onClick={() => dispatch(addTile())}>create one now</button>?
      </div>
    </div>
  );
}
