                            Roman numeral converter

A command-line tool that converts Roman numerals to decimal numbers. Input is validated by hand-written rules (no regular expressions), and an invalid numeral gets a message that explains what is wrong.

Supported range: I (1) to MMMCMXCIX (3999). Input is case-insensitive and surrounding spaces are ignored.

                                        Getting started

open terminal in roman-numeral directory
run command to install dependencies: npm install
run command to launch project: npm start

to run tests run command: npm test

                                        How it works

The program asks for a Roman numeral in a loop. Type exit to quit or press cntrl+C.

1.  User enters Roman numeral.
2.  Input goes through validator.
    3.1 If there is nothing against Roman Numeral Rules, the input is sent to convertor and user gets decimal output.
    3.2 If there is something wrong with input, user gets error message explaining it and input does not go to convertor.

                                            Project structure

    File What it does
    src/index.ts Command-line interface: reads input, validates it, prints the result
    src/validator.ts validateRomanNumeral: checks the numeral and explains the first problem it finds
    src/convertor.ts RomanToInt converts a numeral to a number; ROMAN_VALUES and getValue hold the symbol values
    test/convertor.test.ts Tests for the conversion
    test/validator.test.ts Tests for every validation rules

                                            How validation works

validateRomanNumeral returns { isValid: true } or { isValid: false, errorMessage }. The checks run in this order and the first problem found is reported:

1. Empty input: something must be entered.
2. Characters: only I V X L C D M are allowed. The message names the character and its position.
3. Repetitions: I, X, C and M may appear at most 3 times in a row; V, L and D may not be repeated.
4. Subtractive combinations and ordering:
   4.1 Only I before V/X, X before L/C and C before D/M may be subtracted.
   4.2 The subtracted symbol cannot be repeated before its pair (IIX).
   4.3 Symbols must not increase from left to right (VIX), but XIX and CXC are fine.
   4.4 V, L and D cannot be repeated through a pair (VIV, LXL, DCD).
   4.5 Only smaller symbols may follow a pair (IVI, IXV, XCX are wrong).
5. Valid: if nothing above fails, the numeral is accepted.
