export const ROMAN_VALUES: Readonly<Record<string, number>> = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};
export function getValue(symbol: string): number {
  const value = ROMAN_VALUES[symbol];
  if (value === undefined) {
    throw new Error(`'${symbol}' is not a Roman numeral character`);
  }
  return value;
}

export function RomanToInt
(s:string): number {
let result : number = 0;
    for (let i : number = 0; i < s.length; i++) {
         // if the current value is less than the next value, subtract current from next and add to result, and skip the next symbol
        if (i + 1 < s.length && getValue(s.charAt(i)) < getValue(s.charAt(i + 1))) {
            result += getValue(s.charAt(i + 1)) - getValue(s.charAt(i));
            i++;
        }
        else {
            // otherwise, add the current value to result
            result += getValue(s.charAt(i));
        }
    }
    return result;
}