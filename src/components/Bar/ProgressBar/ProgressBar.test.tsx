import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProgressBar from "./ProgressBar";

describe("ProgressBar", () => {
  it("renders correctly", () => {
    render(<ProgressBar position={50} max={100} handleSeek={() => {}} />);

    const input = screen.getByDisplayValue(50);
    expect(input).toBeInTheDocument();
  });
});
