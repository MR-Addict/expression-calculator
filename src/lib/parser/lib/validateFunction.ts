import { IToken } from "chevrotain";

import { validNumber } from "./validNumber";
import { functions } from "../data/functions";
import { ParseErrorType, Range } from "../type";

export function validateFunction(
  args: number,
  FunctionToken: IToken,
  LParenToken: IToken,
  RParenToken: IToken
): ParseErrorType | null {
  // Find the function
  const found = functions.find((f) => f.name === FunctionToken.image);
  if (!found) {
    const message = `Function ${FunctionToken.image} not supported`;
    const { startLine, startColumn, endLine, endColumn } = FunctionToken;
    const parsedRange = Range.safeParse({ startLine, startColumn, endLine, endColumn });
    if (parsedRange.success) return { message, ...parsedRange.data };
    return null;
  }

  // Validate the arguments length
  let [min, max] = found.args;
  const { startLine, startColumn } = LParenToken;
  const { endLine, endColumn } = RParenToken;
  const parsedRange = Range.safeParse({ startLine, startColumn, endLine, endColumn });
  if (!parsedRange.success) return null;

  // Less than the minimum
  if (args < min) {
    const message = `Function ${FunctionToken.image} requires at least ${min} arguments`;
    return { message, ...parsedRange.data };
  }

  // More than the maximum
  max = validNumber(max) ? max : min;
  if (args > max) {
    const message = `Function ${FunctionToken.image} requires at most ${max} arguments`;
    return { message, ...parsedRange.data };
  }

  return null;
}
