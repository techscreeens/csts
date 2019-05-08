import React from "react";

import FormField from "../FormField";

import s from "./TextInput.module.css";

export default function TextInput({
  label,
  name,
  placeholder,
  value,
  onChange,
  maxLength,
  autoFocus
}) {
  return (
    <FormField
      className={s.input}
      name={name}
      label={label}
      value={value}
      maxLength={maxLength}
    >
      <input
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        maxLength={maxLength}
        autoFocus={autoFocus}
      />
    </FormField>
  );
}
