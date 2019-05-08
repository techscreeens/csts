import React from "react";
import cx from "classnames";

import s from './BaseIcon.module.css';

export default function Delete({ children, className }) {
  return (
    <div className={cx(s.root, className)}>
      {children}
    </div>
  );
}
