import {describe, expect, test} from 'vitest';
import { RomanToInt } from "../src/convertor.js";  

describe("RomanToInt", () => {
  test("should convert I to 1", () => {
    expect(RomanToInt("I")).toBe(1);
  });
  test("should convert IV to 4", () => {
    expect(RomanToInt("IV")).toBe(4);
  });
  test("should convert IX to 9", () => {
    expect(RomanToInt("IX")).toBe(9);
  });
  describe("should convert LVIII to 58", () => {
    test("should convert LVIII to 58", () => {
      expect(RomanToInt("LVIII")).toBe(58);
    });
    test("should convert MCMXCIV to 1994", () => {
      expect(RomanToInt("MCMXCIV")).toBe(1994);
    });
  });
  test("should convert MMMCMXCIX to 3999", () => {
    expect(RomanToInt("MMMCMXCIX")).toBe(3999);
  });
});