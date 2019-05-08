import React, { useReducer } from "react";

import { addTile } from "../../actions";
import reducer from "../../reducer";
import { selectTiles, selectOrderBy } from "../../selectors";
import { localStorageKey } from "../../utils/Constants";
import getInitialState from "../../utils/getInitialState";

import Button from "../Button";
import { Plus } from "../Icons";
import Tile from "../Tile";
import EmptyState from "./components/EmptyState";
import Header from "./components/Header";
import usePersistToLocalStorage from "./hooks/usePersistToLocalStorage";

import s from "./App.module.css";

export default function App() {
  const [state, dispatch] = useReducer(
    reducer,
    getInitialState(localStorageKey)
  );

  usePersistToLocalStorage(localStorageKey, state);

  const tiles = selectTiles(state);
  const orderBy = selectOrderBy(state);

  return (
    <div className={s.root}>
      <Header orderBy={orderBy} dispatch={dispatch} />
      {!tiles.length && <EmptyState dispatch={dispatch} />}
      {!!tiles.length && (
        <div className={s.tiles}>
          {tiles.map(tile => (
            <Tile
              key={tile.id}
              className={s.tile}
              tile={tile}
              dispatch={dispatch}
            />
          ))}
        </div>
      )}
      <Button className={s.addTileBtn} onClick={() => dispatch(addTile())}>
        <Plus />
      </Button>
    </div>
  );
}
