import produce from "immer";
import uuidv4 from "uuid/v4";

import { localStorageKey } from "../utils/Constants";
import getInitialState from "../utils/getInitialState";

import {
  ADD_TILE,
  DELETE_TILE,
  UPDATE_FIELD_VALUE,
  UPDATE_ORDER_BY
} from "../actions";

export default produce((draft, action) => {
  console.debug("Reducing", action);
  switch (action.type) {
    case ADD_TILE: {
      const id = uuidv4();
      draft.ideas[id] = {
        id,
        title: "",
        description: "",
        createdAt: new Date(),
        updatedAt: new Date()
      };
      break;
    }
    case DELETE_TILE:
      delete draft.ideas[action.payload.id];
      break;
    case UPDATE_FIELD_VALUE: {
      const { id, name, value } = action.payload;

      draft.ideas[id] = {
        ...draft.ideas[id],
        [name]: value,
        updatedAt: new Date()
      };
      break;
    }
    case UPDATE_ORDER_BY:
      draft.orderBy = action.payload.orderBy;
      break;
    default:
      return;
  }
}, getInitialState(localStorageKey));
