import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/utils/tests";
import { TokensPair, UserType } from "@/types/usersTypes";
import SidebarPersonal from "./SidebarPersonal";
import { getEmptyError } from "@/types/errorsTypes";

function renderSidebarPersonal(username: string) {
  const user: UserType = {
    username,
    _id: 0,
    first_name: "test",
    last_name: "test",
    email: "t@t.t",
  };

  const tokens: TokensPair = {
    access: "1",
    refresh: "1",
  };

  renderWithProviders(<SidebarPersonal />, {
    preloadedState: {
      user: {
        user,
        tokens,
        errorMsg: getEmptyError(),
      },
    },
  });
}

describe("SidebarPersonal Component", () => {
  it("renders correctly without user", () => {
    renderWithProviders(<SidebarPersonal />);

    const elements = screen.queryAllByRole("paragraph");
    expect(elements.length).toEqual(0);
  });
  it("renders correctly with user", () => {
    const name = "John Connor";

    renderSidebarPersonal(name);

    const element = screen.getByRole("paragraph");
    expect(element.textContent).toEqual(name);
  });
});
