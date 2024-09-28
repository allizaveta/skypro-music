import Menu from "./Menu";

import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/utils/tests";
import { TokensPair, UserType } from "@/types/usersTypes";
import { getEmptyError } from "@/types/errorsTypes";

function renderMenu() {
  const user: UserType = {
    _id: 0,
    username: "test",
    first_name: "test",
    last_name: "test",
    email: "t@t.t",
  };

  const tokens: TokensPair = {
    access: "1",
    refresh: "1",
  };

  renderWithProviders(<Menu setIsOpened={() => {}} />, {
    preloadedState: {
      user: {
        user,
        tokens,
        errorMsg: getEmptyError(),
      },
    },
  });
}

describe("Menu Component", () => {
  describe("renders correctly without user", () => {
    it("Just two link there", () => {
      renderWithProviders(<Menu setIsOpened={() => {}} />);

      const links = screen.getAllByRole("link");
      expect(links.length).toEqual(2);
    });
    it("Link with 'sing in' there", () => {
      renderWithProviders(<Menu setIsOpened={() => {}} />);

      const links = screen.getAllByText("Войти");
      expect(links.length).toEqual(1);
    });
  });

  describe("renders correctly with user", () => {
    it("All three links there", () => {
      renderMenu();

      const links = screen.getAllByRole("link");
      expect(links.length).toEqual(3);
    });
    it("Link with 'favorite tracks' there", () => {
      renderMenu();

      const links = screen.getAllByText("Любимые треки");
      expect(links.length).toEqual(1);
    });
    it("Link with 'sign out' there", () => {
      renderMenu();

      const links = screen.getAllByText("Выйти");
      expect(links.length).toEqual(1);
    });
  });
});
