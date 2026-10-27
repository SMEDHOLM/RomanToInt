import { ROMAN_VALUES, getValue } from "./convertor.js";

export type ValidationResult = {
  isValid: boolean;
  errorMessage?: string;
};

export function validateRomanNumeral(s: string): ValidationResult {
  const chars: string[] = s.split("");

  // 1. Check if the string is empty
  if (chars.length === 0) {
    return { isValid: false, errorMessage: "Input string is empty, enter a Roman numeral" };
  }

  // 2. Check if the string contains only valid Roman numeral characters
  for (const char of chars) {
    if (!(char in ROMAN_VALUES)) {
      return {
        isValid: false,
        errorMessage: `Invalid character '${char}' at position ${chars.indexOf(char) + 1}, only I, V, X, L, C, D and M are allowed`,
      };
    }
  }

  // 3. Check for invalid repetitions in a row
  const allowedRepetitions: Readonly<Record<string, number>> = {
    I: 3,
    V: 1,
    X: 3,
    L: 1,
    C: 3,
    D: 1,
    M: 3,
  };

  let appearanceCount: number = 1;
  for (let i: number = 1; i < chars.length; i++) {
    if (chars[i] === chars[i - 1]) {
      appearanceCount++;
      const symbol: string = s.charAt(i);
      const maxRepeats: number = allowedRepetitions[symbol] ?? 1;
      if (appearanceCount > maxRepeats) {
        const message: string =
          maxRepeats === 1
            ? `${symbol} cannot be repeated (extra ${symbol} at position ${i + 1})`
            : `${symbol} appears more than ${maxRepeats} times in a row (extra ${symbol} at position ${i + 1})`;
        return { isValid: false, errorMessage: message };
      }
    } else {
      appearanceCount = 1;
    }
  }

  // 4. Check for invalid subtractive combinations & non-standard ordering
  const cannotsubtract: ReadonlySet<string> = new Set(['V', 'L', 'D']);
  const allowedSubtractivePairs: ReadonlyMap<string, ReadonlySet<string>> = new Map([
    ['I', new Set(['V', 'X'])],
    ['X', new Set(['L', 'C'])],
    ['C', new Set(['D', 'M'])]
  ]);
  for (let i = 0; i < s.length - 1; i++) {
    const previousSymbol: string = s.charAt(i - 1);
    const currentSymbol: string = s.charAt(i);
    const nextSymbol: string = s.charAt(i + 1);
    const currentValue: number = getValue(currentSymbol);
    const nextValue: number = getValue(nextSymbol);

    if (currentValue < nextValue) {
      const pair: string = currentSymbol + nextSymbol;
      // Check if the current symbol can be used in a subtractive combination
      if (cannotsubtract.has(currentSymbol)) {
        return { isValid: false, errorMessage: `${currentSymbol} cannot be used in a subtractive combination (${pair} at position ${i + 1})` };
      }
      // Check if the subtractive combination is valid
      if (allowedSubtractivePairs.has(currentSymbol)) {
        const validNextSymbols = allowedSubtractivePairs.get(currentSymbol);
        // Check if the next symbol is valid for the current subtractive combination
        if (!validNextSymbols?.has(nextSymbol)) {
          return {
            isValid: false,
            errorMessage: `${pair} at position ${i + 1} is not a valid subtractive combination, ${currentSymbol} can only be placed before ${[...(validNextSymbols ?? [])].join(" or ")}`,
          };
        }
      }
      // Check if the previous symbol is the same as the current symbol (e.g., IIV is invalid)
      if (i > 0 && previousSymbol === currentSymbol) {
        return { isValid: false, errorMessage: `${currentSymbol} cannot be repeated before the subtractive combination ${pair} (position ${i + 1})` };
      }
      // the previous symbol must be at least as big as the big half of the pair (VIX is wrong, XIX is fine)
      if (i > 0 && getValue(previousSymbol) < nextValue) {
        return { isValid: false, errorMessage: `${pair} at position ${i + 1} cannot follow ${previousSymbol}, symbols must not increase from left to right` };
      }
      // V, L and D cannot repeat, so VIV, LXL and DCD are wrong (IX, XC and CM are the right forms)
      if (i > 0 && previousSymbol === nextSymbol && cannotsubtract.has(nextSymbol)) {
        return { isValid: false, errorMessage: `${nextSymbol} cannot be repeated, so ${pair} at position ${i + 1} cannot follow ${previousSymbol}` };
      }
      // after a subtractive pair only smaller symbols are allowed (IVI, XCX and IXV are wrong)
      const symbolAfterPair: string = s.charAt(i + 2);
      if (symbolAfterPair !== "" && getValue(symbolAfterPair) >= currentValue) {
        return { isValid: false, errorMessage: `${symbolAfterPair} at position ${i + 3} cannot follow the subtractive combination ${pair}` };
      }
    }
  }

  // 5. If all checks pass, return valid
  return { isValid: true };
}
