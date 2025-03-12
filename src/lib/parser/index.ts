import { Lexer } from "chevrotain";

import { tokens } from "./data/tokens";
import { ParseResultType } from "./type";
import { calculatorParser } from "./parser";
import { calculatorVisitor } from "./visitor";

const CalculatorLexer = new Lexer(Object.values(tokens), { recoveryEnabled: true });

/**
 *
 * @param expression The raw expression to parse
 * @returns The result of the expression which cloud be **NaN** and errors occurred
 */
export function expressionCalculator(expression: string): ParseResultType {
  // Tokenize the input
  const { tokens } = CalculatorLexer.tokenize(expression);

  // Parse the input
  calculatorParser.input = tokens;
  const cst = calculatorParser.expression();
  const res = calculatorVisitor.visit(cst);

  // Collect errors
  const errors = calculatorParser.Errors;

  return { res, errors };
}
