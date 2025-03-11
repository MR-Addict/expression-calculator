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

// Numbers
const Number = createToken({
  name: "Number",
  pattern: Lexer.NA
});

const ScientificNumber = createToken({
  name: "ScientificNumber",
  pattern: /0|[1-9]\d*\.\d+[eE][+-]?\d+/,
  categories: Number
});

const DecimalNumber = createToken({
  name: "DecimalNumber",
  pattern: /0|[1-9]\d*\.\d+/,
  categories: Number
});

const IntegerNumber = createToken({
  name: "IntegerNumber",
  pattern: /0|[1-9]\d*/,
  categories: Number,
  longer_alt: DecimalNumber
});

// Other Tokens
const Comma = createToken({ label: ",", name: "Comma", pattern: /,/ });
const LParen = createToken({ label: "(", name: "LParen", pattern: /\(/ });
const RParen = createToken({ label: ")", name: "RParen", pattern: /\)/ });

// marking WhiteSpace as 'SKIPPED' makes the lexer skip it.
const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED
});

export const tokens = {
  WhiteSpace,
  Comma,
  LParen,
  RParen,

  Plus,
  Minus,
  AdditionOperator,

  Multi,
  Div,
  MultiplicationOperator,

  ScientificNumber,
  DecimalNumber,
  IntegerNumber,
  Number
};
