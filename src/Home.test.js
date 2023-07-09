import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Home from "./Home";

it("renders without crashing", () => {
    render(<Home />);
});

