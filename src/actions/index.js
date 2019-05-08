export const ADD_TILE = "ADD_TILE";
export const DELETE_TILE = "DELETE_TILE";

export const UPDATE_FIELD_VALUE = "UPDATE_FIELD_VALUE";

export const UPDATE_ORDER_BY = "UPDATE_ORDER_BY";

export const addTile = () => ({
  type: ADD_TILE
});

export const deleteTile = id => ({
  type: DELETE_TILE,
  payload: {
    id
  }
});

export const updateFieldValue = ({ id, name, value }) => ({
  type: UPDATE_FIELD_VALUE,
  payload: {
    id,
    name,
    value
  }
});

export const updateOrderBy = orderBy => ({
  type: UPDATE_ORDER_BY,
  payload: {
    orderBy
  }
});
