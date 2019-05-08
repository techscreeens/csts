import MockDate from "mockdate";

import {
  addTile,
  deleteTile,
  updateFieldValue,
  updateOrderBy
} from "../actions";
import { localStorageKey } from "../utils/Constants";
import getInitialState from "../utils/getInitialState";

import reducer from "./";

jest.mock("uuid/v4", () => () => "test123");

describe("reducer", () => {
  let initialState;
  const mockDate = "2019-05-06T12:00:00.000Z";

  beforeEach(() => {
    MockDate.set(mockDate);
    initialState = getInitialState(localStorageKey);
  });

  afterEach(() => {
    MockDate.reset();
  });

  describe("ADD_TILE", () => {
    it("should create a new idea", () => {
      expect(reducer(initialState, addTile())).toEqual({
        ...initialState,
        ideas: {
          test123: {
            id: "test123",
            title: "",
            description: "",
            createdAt: new Date(mockDate),
            updatedAt: new Date(mockDate)
          }
        }
      });
    });
  });

  describe("DELETE_TILE", () => {
    const tile = {
      id: "test456",
      title: "Title",
      description: "Description",
      createdAt: new Date(mockDate),
      updatedAt: new Date(mockDate)
    };

    it("should delete the specified idea", () => {
      expect(
        reducer(
          { ...initialState, ideas: { [tile.id]: tile } },
          deleteTile(tile.id)
        )
      ).toEqual(initialState);
    });
  });

  describe("UPDATE_FIELD_VALUE", () => {
    const tile = {
      id: "test456",
      title: "Title",
      description: "Description",
      createdAt: new Date(mockDate),
      updatedAt: new Date(mockDate)
    };

    it("should update the specified idea field", () => {
      let state = { ...initialState, ideas: { [tile.id]: tile } };
      expect(
        reducer(
          state,
          updateFieldValue({
            id: tile.id,
            name: "title",
            value: "overwritten"
          })
        )
      ).toEqual({
        ...state,
        ideas: {
          ...state.ideas,
          [tile.id]: { ...state.ideas[tile.id], title: "overwritten" }
        }
      });
    });
  });

  describe("UPDATE_ORDER_BY", () => {
    it("should update the sort order", () => {
      expect(reducer(initialState, updateOrderBy("title"))).toEqual({
        ...initialState,
        orderBy: "title"
      });
    });
  });
});
