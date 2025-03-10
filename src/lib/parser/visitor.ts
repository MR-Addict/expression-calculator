import { CstNode, tokenMatcher } from "chevrotain";

import { tokens } from "./tokens";
import { calculatorParser } from "./parser";
import { CalculatorVisitorCtx } from "./type";

type CalculatorVisitorResult = number | null;

class CalculatorVisitor extends calculatorParser.getBaseCstVisitorConstructor() {
  constructor() {
    super();
    this.validateVisitor();
  }

  // Override the visit method to return CalculatorVisitorResult
  visit(node: CstNode | CstNode[]): CalculatorVisitorResult {
    return super.visit(node) as CalculatorVisitorResult;
  }

  expression(ctx: CalculatorVisitorCtx): CalculatorVisitorResult {
    return this.visit(ctx.additionExpression);
  }

  additionExpression(ctx: CalculatorVisitorCtx): CalculatorVisitorResult {
    const res = this.visit(ctx.lhs);
    if (res === null) return null;

    let newRes = res;

    // "rhs" key may be undefined as the grammar defines it as optional (MANY === zero or more).
    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
        // there will be one operator for each rhs operand
        let rhsValue = this.visit(rhsOperand);
        let operator = ctx.AdditionOperator[idx];
        if (rhsValue === null) return;

        if (tokenMatcher(operator, tokens.Plus)) {
          newRes += rhsValue;
        } else {
          newRes -= rhsValue;
        }
      });
    }

    return newRes;
  }

  multiplicationExpression(ctx: CalculatorVisitorCtx): CalculatorVisitorResult {
    const res = this.visit(ctx.lhs);
    if (res === null) return null;

    let newRes = res;

    // "rhs" key may be undefined as the grammar defines it as optional (MANY === zero or more).
    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
        // there will be one operator for each rhs operand
        let rhsValue = this.visit(rhsOperand);
        let operator = ctx.MultiplicationOperator[idx];
        if (rhsValue === null) return;

        if (tokenMatcher(operator, tokens.Multi)) {
          newRes *= rhsValue;
        } else {
          newRes /= rhsValue;
        }
      });
    }

    return newRes;
  }

  atomicExpression(ctx: CalculatorVisitorCtx): CalculatorVisitorResult {
    if (ctx.parenthesisExpression) {
      // passing an array to "this.visit" is equivalent
      // to passing the array's first element
      return this.visit(ctx.parenthesisExpression);
    } else if (ctx.NumberLiteral) {
      // If a key exists on the ctx, at least one element is guaranteed
      return parseInt(ctx.NumberLiteral[0].image);
    }
    return null;
  }

  parenthesisExpression(ctx: CalculatorVisitorCtx): CalculatorVisitorResult {
    // The ctx will also contain the parenthesis tokens, but we don't care about those
    // in the context of calculating the result.
    return this.visit(ctx.expression);
  }
}

export const calculatorVisitor = new CalculatorVisitor();
