import { describe, expect, test } from 'vitest';
import { validateRomanNumeral} from "../src/validator.js";
describe("validateRomanNumeral", () => {
  describe("1. empty string", () => {
    test("should return invalid for empty string", () => {
      const result = validateRomanNumeral("");
      expect(result.isValid).toBe(false);
    });
  });
  describe("2. invalid characters", () => {
    test("should return invalid for string with invalid characters", () => {
      const result = validateRomanNumeral("ABCD");
      expect(result.isValid).toBe(false);
    });
    test("should return invalid for string with invalid characters", () => {
      const result = validateRomanNumeral("XVA");
      expect(result.isValid).toBe(false);
    });
  });
  describe("3. invalid repetitions", () => {
    test("should return invalid for string with invalid repetitions", () => {
      const result = validateRomanNumeral("IIII");
      expect(result.isValid).toBe(false);
    });
    test("should return valid for string with valid repetitions", () => {
      const result = validateRomanNumeral("III");
      expect(result.isValid).toBe(true);
    });
  });
  describe("4. invalid subtractive combinations", () => {
    test("should return invalid for string with invalid subtractive combinations", () => {
      const result = validateRomanNumeral("IL");
      expect(result.isValid).toBe(false);
    });
    test("should return valid for string with valid subtractive combinations", () => {
      const result = validateRomanNumeral("IV");
      expect(result.isValid).toBe(true);
    });
  });
  describe("5. valid Roman numeral", () => {
    test("should return valid for a valid Roman numeral", () => {
      const result = validateRomanNumeral("MCMXCIV");
      expect(result.isValid).toBe(true);
    });
  });
  describe("6. invalid Roman numeral with subtractive pair followed by larger value", () => {
    test("should return invalid for a Roman numeral with subtractive pair followed by larger value", () => {
      const result = validateRomanNumeral("IXL");
      expect(result.isValid).toBe(false);
    });
  });
  describe("7. valid Roman numeral with subtractive pair followed by smaller value", () => {
    test("should return valid for a Roman numeral with subtractive pair followed by smaller value", () => {
      const result = validateRomanNumeral("XIV");
      expect(result.isValid).toBe(true);
    });
  });
  describe("8. valid Roman numeral with multiple subtractive pairs", () => {
    test("should return valid for a Roman numeral with multiple subtractive pairs", () => {
      const result = validateRomanNumeral("MCMXCIV");
      expect(result.isValid).toBe(true);
    });
  });
  describe("9. valid Roman numeral with a subtractive pair after the same symbol", () => {
    test("should return valid for XIX, XXIX and CXC", () => {
      expect(validateRomanNumeral("XIX").isValid).toBe(true);
      expect(validateRomanNumeral("XXIX").isValid).toBe(true);
      expect(validateRomanNumeral("CXC").isValid).toBe(true);
    });
  });
  describe("10. invalid Roman numeral with a subtractive pair followed by the same or larger value", () => {
    test("should return invalid for IVI, IXV and XCX", () => {
      expect(validateRomanNumeral("IVI").isValid).toBe(false);
      expect(validateRomanNumeral("IXV").isValid).toBe(false);
      expect(validateRomanNumeral("XCX").isValid).toBe(false);
    });
  });
  describe("11. invalid Roman numeral with a pair after V, L or D", () => {
    test("should return invalid for VIV, LXL and DCD", () => {
      expect(validateRomanNumeral("VIV").isValid).toBe(false);
      expect(validateRomanNumeral("LXL").isValid).toBe(false);
      expect(validateRomanNumeral("DCD").isValid).toBe(false);
    });
  });
});