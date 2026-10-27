import * as readline from "readline";
import * as convertor from "./convertor.js";
import * as validator from "./validator.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function main() {
  rl.question('\nEnter a Roman numeral > ', (answer) => {
    try {
    const trimmed: string = answer.trim().toUpperCase();

    if (trimmed.toLowerCase() === 'exit') {
      console.log('Bye!');
      rl.close();
      return;
    }

    const validation: validator.ValidationResult = validator.validateRomanNumeral(trimmed);

    if (!validation.isValid) {
      console.log(`❌ Error: ${validation.errorMessage}`);
    } else {
      const result: number = convertor.RomanToInt(trimmed);
      console.log(`✅ Value in decimal: ${result}`);
    }

    main();
  }catch (error) {
    console.error(`❌ Error: ${error instanceof Error ? error.message : String(error)}`);
    main();
  }
});
}
main();