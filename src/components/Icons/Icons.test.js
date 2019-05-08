import React from "react";
import { render } from "react-testing-library";

import * as icons from "./";

describe("Icons", () => {
  it("should render icons correctly", () => {
    expect.assertions(icons.length);
    Object.values(icons).forEach(Icon =>
      expect(render(<Icon />).asFragment()).toMatchSnapshot()
    );
  });
});
