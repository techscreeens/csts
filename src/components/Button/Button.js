import React from "react";
import cx from "classnames";

import s from "./Button.module.css";

export default function Button({ children, onClick, className }) {
  return (
    <button className={cx(s.root, className)} onClick={onClick}>
      {children}
    </button>
  );
}
