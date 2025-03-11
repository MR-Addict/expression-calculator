import { CstNode, CstParser } from "chevrotain";

import { tokens } from "./data/tokens";
import { ParseError, ParseErrorType } from "./type";
import { validateFunction } from "./lib/validateFunction";

class CalculatorParser extends CstParser {
  public expression!: () => CstNode;

  // helper functions
  private additionExpression!: () => CstNode;
  private multiplicationExpression!: () => CstNode;
  private atomicExpression!: () => CstNode;
  private parenthesisExpression!: () => CstNode;
  private function!: () => CstNode;

  private customErrors: ParseErrorType[] = [];

  // grammar rules
  constructor() {
    super(tokens, { recoveryEnabled: true });

    this.RULE("expression", () => this.SUBRULE(this.additionExpression));

    this.RULE("additionExpression", () => {
      this.SUBRULE(this.multiplicationExpression, { LABEL: "lhs" });
      this.MANY(() => {
        // consuming 'AdditionOperator' will consume either Plus or Minus as they are subclasses of AdditionOperator
        this.CONSUME(tokens.AdditionOperator);
        //  the index "2" in SUBRULE2 is needed to identify the unique position in the grammar during runtime
        this.SUBRULE2(this.multiplicationExpression, { LABEL: "rhs" });
      });
    });

    this.RULE("multiplicationExpression", () => {
      this.SUBRULE(this.atomicExpression, { LABEL: "lhs" });
      this.MANY(() => {
        this.CONSUME(tokens.MultiplicationOperator);
        //  the index "2" in SUBRULE2 is needed to identify the unique position in the grammar during runtime
        this.SUBRULE2(this.atomicExpression, { LABEL: "rhs" });
      });
    });

    this.RULE("atomicExpression", () =>
      this.OR([
        // parenthesisExpression has the highest precedence and thus it appears
        // in the "lowest" leaf in the expression ParseTree.
        { ALT: () => this.SUBRULE(this.parenthesisExpression) },
        { ALT: () => this.CONSUME(tokens.Number) },
        { ALT: () => this.SUBRULE(this.function) }
      ])
    );

    this.RULE("parenthesisExpression", () => {
      this.CONSUME(tokens.LParen);
      this.SUBRULE(this.expression);
      this.CONSUME(tokens.RParen);
    });

    this.RULE("function", () => {
      const args = [];
      const FunctionToken = this.CONSUME(tokens.Identifier);
      const LParenToken = this.CONSUME(tokens.LParen);

      this.OPTION(() => {
        args.push(this.SUBRULE(this.expression, { LABEL: "args" }));
        this.MANY(() => {
          this.CONSUME(tokens.Comma);
          args.push(this.SUBRULE2(this.expression, { LABEL: "args" }));
        });
      });

      const RParenToken = this.CONSUME(tokens.RParen);

      /**
       * Validate the function arguments
       */
      const error = validateFunction(args.length, FunctionToken, LParenToken, RParenToken);
      if (error) this.customErrors.push(error);
    });

    this.performSelfAnalysis();
  }

  get Errors(): ParseErrorType[] {
    const errors = this.errors
      .map(({ message, token }) => ({ ...token, message }))
      .map((error) => ParseError.safeParse(error).data ?? null)
      .filter((error): error is ParseErrorType => error !== null)
      .concat(this.customErrors)
      .map((error) => ({ ...error, startColumn: error.startColumn - 1 }));

    this.customErrors = [];

    return errors;
  }
}

export const calculatorParser = new CalculatorParser();
