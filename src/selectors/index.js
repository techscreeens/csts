import isSame from "date-fns/is_same_second";
import isAfter from "date-fns/is_after";

function sortByCreatedAt(a, b) {
  if (isSame(a.createdAt, b.createdAt)) {
    return 0;
  } else if (isAfter(a.createdAt, b.createdAt)) {
    return -1;
  } else {
    return 1;
  }
}

function sortByTitle(a, b) {
  return a.title.localeCompare(b.title);
}

export function selectTiles(state) {
  return Object.values(state.ideas).sort(
    state.orderBy === "createdAt" ? sortByCreatedAt : sortByTitle
  );
}

export function selectOrderBy(state) {
  return state.orderBy;
}
