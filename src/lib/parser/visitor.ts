import { CstNode, tokenMatcher } from "chevrotain";

import { tokens } from "./data/tokens";
import { functions } from "./data/functions";

import { calculatorParser } from "./parser";
import { CalculatorVisitorCtx } from "./type";
import { validNumber } from "./lib/validNumber";

class CalculatorVisitor extends calculatorParser.getBaseCstVisitorConstructor() {
  constructor() {
    super();
    this.validateVisitor();
  }

  // Override the visit method to return number
  visit(node: CstNode | CstNode[]): number {
    return super.visit(node) as number;
  }

  expression(ctx: CalculatorVisitorCtx): number {
    return this.visit(ctx.additionExpression);
  }

  additionExpression(ctx: CalculatorVisitorCtx): number {
    let res = this.visit(ctx.lhs);
    if (!validNumber(res)) return NaN;

    // "rhs" key may be undefined as the grammar defines it as optional (MANY === zero or more).
    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
        // there will be one operator for each rhs operand
        let rhsValue = this.visit(rhsOperand);
        let operator = ctx.AdditionOperator[idx];
        if (!validNumber(rhsValue)) return (res = NaN);

        if (tokenMatcher(operator, tokens.Plus)) {
          res += rhsValue;
        } else {
          res -= rhsValue;
        }
      });
    }

    return res;
  }

  multiplicationExpression(ctx: CalculatorVisitorCtx): number {
    let res = this.visit(ctx.lhs);
    if (!validNumber(res)) return NaN;

    // "rhs" key may be undefined as the grammar defines it as optional (MANY === zero or more).
    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
        // there will be one operator for each rhs operand
        let rhsValue = this.visit(rhsOperand);
        let operator = ctx.MultiplicationOperator[idx];
        if (!validNumber(rhsValue)) return (res = NaN);

        if (tokenMatcher(operator, tokens.Multi)) {
          res *= rhsValue;
        } else {
          res /= rhsValue;
        }
      });
    }

    return res;
  }

  atomicExpression(ctx: CalculatorVisitorCtx): number {
    if (ctx.parenthesisExpression) {
      // passing an array to "this.visit" is equivalent
      // to passing the array's first element
      return this.visit(ctx.parenthesisExpression);
    } else if (ctx.Number) {
      if (tokenMatcher(ctx.Number[0], tokens.IntegerNumber)) {
        return parseInt(ctx.Number[0].image);
      } else {
        return parseFloat(ctx.Number[0].image);
      }
    } else if (ctx.function) {
      return this.visit(ctx.function);
    }
    return NaN;
  }

  parenthesisExpression(ctx: CalculatorVisitorCtx): number {
    // The ctx will also contain the parenthesis tokens, but we don't care about those
    // in the context of calculating the result.
    return this.visit(ctx.expression);
  }

  function(ctx: CalculatorVisitorCtx): number {
    const name = ctx.Identifier[0].image;
    const args = ctx.args?.map((arg) => this.visit(arg)).filter(validNumber) ?? [];
    const res = functions.find((fn) => fn.name === name)?.method(...args) ?? NaN;
    return res;
  }
}

export const calculatorVisitor = new CalculatorVisitor();
