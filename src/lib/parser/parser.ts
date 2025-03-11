import { CstNode, CstParser } from "chevrotain";

import { tokens } from "./tokens";

class CalculatorParser extends CstParser {
  public expression!: () => CstNode;

  // helper functions
  private additionExpression!: () => CstNode;
  private multiplicationExpression!: () => CstNode;
  private atomicExpression!: () => CstNode;
  private parenthesisExpression!: () => CstNode;

  // grammar rules
  constructor() {
    super(tokens, {
      recoveryEnabled: true
    });

    const $ = this;

    $.RULE("expression", () => $.SUBRULE($.additionExpression));

    $.RULE("additionExpression", () => {
      $.SUBRULE($.multiplicationExpression, { LABEL: "lhs" });
      $.MANY(() => {
        // consuming 'AdditionOperator' will consume either Plus or Minus as they are subclasses of AdditionOperator
        $.CONSUME(tokens.AdditionOperator);
        //  the index "2" in SUBRULE2 is needed to identify the unique position in the grammar during runtime
        $.SUBRULE2($.multiplicationExpression, { LABEL: "rhs" });
      });
    });

    $.RULE("multiplicationExpression", () => {
      $.SUBRULE($.atomicExpression, { LABEL: "lhs" });
      $.MANY(() => {
        $.CONSUME(tokens.MultiplicationOperator);
        //  the index "2" in SUBRULE2 is needed to identify the unique position in the grammar during runtime
        $.SUBRULE2($.atomicExpression, { LABEL: "rhs" });
      });
    });

    $.RULE("atomicExpression", () =>
      $.OR([
        // parenthesisExpression has the highest precedence and thus it appears
        // in the "lowest" leaf in the expression ParseTree.
        { ALT: () => $.SUBRULE($.parenthesisExpression) },
        { ALT: () => $.CONSUME(tokens.Number) }
      ])
    );

    $.RULE("parenthesisExpression", () => {
      $.CONSUME(tokens.LParen);
      $.SUBRULE($.expression);
      $.CONSUME(tokens.RParen);
    });

    // very important to call this after all the rules have been defined.
    // otherwise the parser may not work correctly as it will lack information
    // derived during the self analysis phase.
    this.performSelfAnalysis();
  }
}

export const calculatorParser = new CalculatorParser();
