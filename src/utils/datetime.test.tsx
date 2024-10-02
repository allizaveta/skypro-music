import { getDateNumber, printTime } from "./datetime";

describe("datetime utils:", () => {
  describe("Seconds render correctly", () => {
    it("from number #1", () => {
      expect(printTime(0)).toEqual("0:00");
    });
    it("from number #2", () => {
      expect(printTime(30)).toEqual("0:30");
    });
    it("from number #3", () => {
      expect(printTime(60)).toEqual("1:00");
    });
    it("from number #4", () => {
      expect(printTime(120)).toEqual("2:00");
    });
    it("from number #4", () => {
      expect(printTime(125)).toEqual("2:05");
    });
  });

  describe("Dates render correctly", () => {
    it("from empty string", () => {
      expect(getDateNumber("")).toEqual(0);
    });
    it("from broken string", () => {
      expect(getDateNumber("---")).toEqual(0);
    });
    it("from usual string", () => {
      expect(getDateNumber("False")).toEqual(0);
    });
    it("from string", () => {
      expect(getDateNumber("2024-08-20")).toEqual(20240820);
    });
  });
});
