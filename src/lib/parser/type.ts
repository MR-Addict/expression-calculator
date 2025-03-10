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
export type ParseResultType = { res: number | null; errors: ParseErrorType[] };

// Visitor
export interface CalculatorVisitorCtx {
  // ast context
  expression: CstNode | CstNode[];
  additionExpression: CstNode | CstNode[];
  parenthesisExpression: CstNode | CstNode[];
  lhs: CstNode | CstNode[];
  rhs?: CstNode[];

  // token context
  AdditionOperator: IToken[];
  MultiplicationOperator: IToken[];
  NumberLiteral: IToken[];
}
