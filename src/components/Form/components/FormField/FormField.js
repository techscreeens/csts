import React from "react";
import cx from "classnames";

import s from "./FormField.module.css";

export default function FormField({
  name,
  label,
  children,
  value,
  maxLength,
  className
}) {
  let remainingCharacters =
    typeof maxLength === "number" ? maxLength - value.length : null;

  return (
    <div className={s.root}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className={cx(s.input, className)}>{children}</div>
      {remainingCharacters !== null && (
        <div
          className={cx(s.countdown, {
            [s.nearLimit]: remainingCharacters < maxLength / 5 + 1
          })}
        >
          {remainingCharacters} character
          {remainingCharacters !== 1 ? "s " : " "}
          remaining
        </div>
      )}
    </div>
  );
}
