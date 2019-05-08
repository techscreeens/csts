import React, { useRef, useLayoutEffect, useState } from "react";

import FormField from "../FormField";

import s from "./TextArea.module.css";

export default function TextArea({
  label,
  name,
  placeholder,
  value,
  onChange,
  maxLength,
  autoFocus,
  autoExpand
}) {
  const measurer = useRef(null);
  const [height, setHeight] = useState(24);

  useLayoutEffect(() => {
    if (autoExpand && measurer.current) {
      setHeight(measurer.current.offsetHeight);
    }
  }, [autoExpand, value]);

  return (
    <FormField
      className={s.input}
      name={name}
      label={label}
      maxLength={maxLength}
      value={value}
    >
      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        maxLength={maxLength}
        autoFocus={autoFocus}
        style={autoExpand && { height }}
      />
      <div ref={measurer} className={s.measurer}>
        {value}
      </div>
    </FormField>
  );
}
