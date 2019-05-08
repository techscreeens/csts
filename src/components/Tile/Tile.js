import React, { memo, useCallback, useEffect, useState } from "react";
import cx from "classnames";

import { deleteTile, updateFieldValue } from "../../actions";
import { DATETIME_SHORT_WITH_SECONDS } from "../../utils/DateTimeFormatters";

import { TextArea, TextInput } from "../Form";
import { Delete } from "../Icons";

import s from "./Tile.module.css";

export default memo(function Tile({
  tile: { id, title, description, createdAt, updatedAt },
  className,
  dispatch
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [isDeleting, setIsDeleting]);

  const onFieldChange = useCallback(
    ({ currentTarget: { name, value } }) =>
      dispatch(updateFieldValue({ id, name, value })),
    [id, dispatch]
  );

  const onDelete = useCallback(() => {
    if (isDeleting) {
      dispatch(deleteTile(id));
    } else {
      setIsDeleting(true);
    }
  }, [id, isDeleting, dispatch]);

  return (
    <div className={cx(s.root, className)}>
      <div className={s.content}>
        <TextInput
          name="title"
          label="Title"
          value={title}
          onChange={onFieldChange}
          autoFocus={!title}
        />
        <TextArea
          name="description"
          label="Description"
          description={description}
          value={description}
          maxLength={140}
          onChange={onFieldChange}
          autoExpand
        />
      </div>
      <div className={s.footer}>
        {!isDeleting && (
          <div className={s.info}>
            <p>
              <span>Created: </span>
              {createdAt.toLocaleString([], DATETIME_SHORT_WITH_SECONDS)}
            </p>
            <p>
              <span>Updated: </span>
              {updatedAt.toLocaleString([], DATETIME_SHORT_WITH_SECONDS)}
            </p>
          </div>
        )}
        {isDeleting && (
          <div className={s.confirmDelete}>Click again to confirm</div>
        )}
        <div
          className={s.delete}
          onClick={onDelete}
          role="button"
          aria-label="Delete"
        >
          <Delete />
        </div>
      </div>
    </div>
  );
});
