import ProgressBar from "./ProgressBar";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";

describe("ProgressBar", () => {
  it("renders correctly", () => {
    const ref = createRef<HTMLAudioElement>();

    render(<ProgressBar audioRef={ref} defaultMax={100} position={50} />);

    const input = screen.getByDisplayValue(50);
    expect(input).toBeInTheDocument();
  });
});
