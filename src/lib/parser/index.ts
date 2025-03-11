import { Lexer } from "chevrotain";

import { tokens } from "./data/tokens";
import { calculatorParser } from "./parser";
import { ParseResultType } from "./type";
import { calculatorVisitor } from "./visitor";

const CalculatorLexer = new Lexer(Object.values(tokens), { recoveryEnabled: true });

/**
 *
 * @param expression The raw expression to parse
 * @returns The result of the expression which cloud be **NaN** if any errors that occurred
 */
export function expressionParse(expression: string): ParseResultType {
  // Tokenize the input
  const lexResult = CalculatorLexer.tokenize(expression);
  calculatorParser.input = lexResult.tokens;

  // Parse the input
  const cst = calculatorParser.expression();
  const res = calculatorVisitor.visit(cst);

  // Collect errors
  const errors = calculatorParser.Errors;

  return { res, errors };
}
