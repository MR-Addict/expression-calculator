import { createToken, Lexer } from "chevrotain";

// using the NA pattern marks this Token class as 'irrelevant' for the Lexer.
// AdditionOperator defines a Tokens hierarchy but only the leafs in this hierarchy define
// actual Tokens that can appear in the text

// Addition Operators
const AdditionOperator = createToken({
  name: "AdditionOperator",
  pattern: Lexer.NA
});

const Plus = createToken({
  label: "+",
  name: "Plus",
  pattern: /\+/,
  categories: AdditionOperator
});

const Minus = createToken({
  label: "-",
  name: "Minus",
  pattern: /-/,
  categories: AdditionOperator
});

// Multiplication Operators
const MultiplicationOperator = createToken({
  name: "MultiplicationOperator",
  pattern: Lexer.NA
});

const Multi = createToken({
  label: "*",
  name: "Multi",
  pattern: /\*/,
  categories: MultiplicationOperator
});

const Div = createToken({
  label: "/",
  name: "Div",
  pattern: /\//,
  categories: MultiplicationOperator
});

// Other Tokens
const LParen = createToken({ label: "(", name: "LParen", pattern: /\(/ });
const RParen = createToken({ label: ")", name: "RParen", pattern: /\)/ });
const NumberLiteral = createToken({
  name: "NumberLiteral",
  pattern: /[1-9]\d*/
});

const Comma = createToken({ label: ",", name: "Comma", pattern: /,/ });

// marking WhiteSpace as 'SKIPPED' makes the lexer skip it.
const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED
});

export const tokens = {
  WhiteSpace,
  Plus,
  Minus,
  Multi,
  Div,
  LParen,
  RParen,
  NumberLiteral,
  AdditionOperator,
  MultiplicationOperator,
  Comma
};
