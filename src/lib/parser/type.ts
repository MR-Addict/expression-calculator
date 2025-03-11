import { z } from "zod";
import { CstNode, IToken } from "chevrotain";

// Errors
const Range = z.object({
  startLine: z.number(),
  startColumn: z.number(),
  endLine: z.number(),
  endColumn: z.number()
});

export const ParseError = z.object({ message: z.string() }).merge(Range);

export type RangeType = z.infer<typeof Range>;
export type ParseErrorType = z.infer<typeof ParseError>;
export type ParseResultType = { res: number; errors: ParseErrorType[] };

// Visitor
export interface CalculatorVisitorCtx {
  /**
   * Helper functions
   */
  expression: CstNode | CstNode[];
  additionExpression: CstNode | CstNode[];
  parenthesisExpression: CstNode | CstNode[];
  lhs: CstNode | CstNode[];
  rhs?: CstNode[];

  /**
   * Tokens
   */
  // Symbols
  LParen: IToken[];
  RParen: IToken[];
  Comma: IToken[];

  // Operators
  Plus: IToken[];
  Minus: IToken[];
  AdditionOperator: IToken[];

  Multi: IToken[];
  Div: IToken[];
  MultiplicationOperator: IToken[];

  // Numbers
  ScientificNumber: IToken[];
  DecimalNumber: IToken[];
  IntergerNumber: IToken[];
  Number: IToken[];
}
