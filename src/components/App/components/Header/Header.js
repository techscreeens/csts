import React, { useCallback } from "react";

import { updateOrderBy } from "../../../../actions";

import logo from "./logo.png";

import s from "./Header.module.css";

const orderByOptions = {
  createdAt: "Created At",
  title: "Title"
};

export default function Header({ orderBy, dispatch }) {
  const onOrderByChange = useCallback(
    ({ currentTarget: { value } }) => dispatch(updateOrderBy(value)),
    [dispatch]
  );

  return (
    <header className={s.root}>
      <img src={logo} alt="Logo" />
      <h1>Idea Board</h1>
      <div className={s.orderBy}>
        <label htmlFor="orderBy">Order by:</label>
        <select name="orderBy" value={orderBy} onChange={onOrderByChange}>
          {Object.entries(orderByOptions).map(([value, displayName]) => (
            <option key={value} value={value}>
              {displayName}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
