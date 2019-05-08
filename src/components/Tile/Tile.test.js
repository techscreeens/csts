import React from "react";
import { render, fireEvent, act } from "react-testing-library";

import { updateFieldValue, deleteTile } from "../../actions";

import Tile from "./Tile";

describe("Tile", () => {
  const dispatchMock = jest.fn();
  const tile = {
    id: "8ea381a4-a477-4258-b2fd-8a23e544457e",
    title: "Title Field",
    description: "Description Field",
    createdAt: new Date("2019-05-05T12:00:00.000Z"),
    updatedAt: new Date("2019-05-06T12:00:00.000Z")
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render correctly", () => {
    const { asFragment } = render(
      <Tile className="testClassName" tile={tile} dispatch={dispatchMock} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should have a title field", () => {
    const { getByLabelText } = render(
      <Tile tile={tile} dispatch={dispatchMock} />
    );
    expect(() => getByLabelText("Title")).not.toThrow();
  });

  it("should have a description field", () => {
    const { getByLabelText } = render(
      <Tile tile={tile} dispatch={dispatchMock} />
    );
    expect(() => getByLabelText("Description")).not.toThrow();
  });

  it("should have a created date field", () => {
    const { getByText } = render(<Tile tile={tile} dispatch={dispatchMock} />);
    expect(() => getByText("Created:")).not.toThrow();
  });

  it("should have an updated date field", () => {
    const { getByText } = render(<Tile tile={tile} dispatch={dispatchMock} />);
    expect(() => getByText("Updated:")).not.toThrow();
  });

  it("should have a max limit of 140 characters in the description field", () => {
    const { getByLabelText } = render(
      <Tile tile={tile} dispatch={dispatchMock} />
    );
    const description = getByLabelText("Description");
    expect(description).toHaveAttribute("maxLength", "140");
  });

  it("should dispatch an updateFieldValue action when the title field is typed into", () => {
    const { getByLabelText } = render(
      <Tile tile={tile} dispatch={dispatchMock} />
    );

    const title = getByLabelText("Title");
    fireEvent.change(title, { target: { name: "title", value: "abc" } });

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(
      updateFieldValue({
        id: tile.id,
        name: title.name,
        value: "abc"
      })
    );
  });

  it("should dispatch an updateFieldValue action when the description field is typed into", () => {
    const { getByLabelText } = render(
      <Tile tile={tile} dispatch={dispatchMock} />
    );

    const description = getByLabelText("Description");
    fireEvent.change(description, {
      target: { name: "Description", value: "def" }
    });

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(
      updateFieldValue({
        id: tile.id,
        name: description.name,
        value: "def"
      })
    );
  });

  it("should show confirmation text when the delete button is pressed for the first time", () => {
    const { getByLabelText, getByText } = render(
      <Tile tile={tile} dispatch={dispatchMock} />
    );
    fireEvent.click(getByLabelText("Delete"));

    expect(() => getByText("Click again to confirm")).not.toThrow();
    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it("should delete the idea when the delete button is pressed while the confirmation text is displayed", () => {
    const { getByLabelText } = render(
      <Tile tile={tile} dispatch={dispatchMock} />
    );
    fireEvent.click(getByLabelText("Delete"));
    fireEvent.click(getByLabelText("Delete"));

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(deleteTile(tile.id));
  });

  it("should reset the deletion state after 3 seconds", () => {
    jest.useFakeTimers();

    const { getByLabelText, getByText } = render(
      <Tile tile={tile} dispatch={dispatchMock} />
    );
    fireEvent.click(getByLabelText("Delete"));

    expect(() => getByText("Click again to confirm")).not.toThrow();

    act(() => {
      jest.advanceTimersByTime(3000);
      jest.runAllTimers();
    });
    expect(() => getByText("Click again to confirm")).toThrow();
  });

  it("should focus the title field on mount if title is empty", () => {
    const { getByLabelText } = render(
      <Tile tile={{ ...tile, title: "" }} dispatch={dispatchMock} />
    );

    expect(getByLabelText("Title")).toHaveFocus();
  });

  it("should not focus the title field on mount if title isn't empty", () => {
    const { getByLabelText } = render(
      <Tile tile={tile} dispatch={dispatchMock} />
    );

    expect(getByLabelText("Title")).not.toHaveFocus();
  });
});
