import React from "react";

import BaseIcon from './BaseIcon';

export default function Delete({ className, width = 20, height = 20 }) {
  return (
    <BaseIcon className={className}>
      <svg
        viewBox="2 2 20 20"
        width={width}
        height={height}
        fill="currentColor"
      >
        <path
          fill="currentColor"
          d="M13 11V5.003A.999.999 0 0 0 12 4c-.552 0-1 .438-1 1.003V11H5.003A.999.999 0 0 0 4 12c0 .552.438 1 1.003 1H11v5.997A.999.999 0 0 0 12 20c.552 0 1-.438 1-1.003V13h5.997A.999.999 0 0 0 20 12c0-.552-.438-1-1.003-1H13z"
        />
      </svg>
    </BaseIcon>
  );
}
