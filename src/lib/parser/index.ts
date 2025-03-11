import { Lexer } from "chevrotain";

import { tokens } from "./tokens";
import { calculatorParser } from "./parser";
import { calculatorVisitor } from "./visitor";
import { ParseError, ParseErrorType, ParseResultType } from "./type";

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
  const errors = calculatorParser.errors
    .map(({ message, token }) => ({ ...token, message }))
    .map((error) => ParseError.safeParse(error).data ?? null)
    .filter((error): error is ParseErrorType => error !== null)
    .map((error) => ({ ...error, startColumn: error.startColumn - 1 }));

  return { res, errors };
}
