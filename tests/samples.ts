export const samples = [
  {
    name: "Plus",
    expression: "1 + 1",
    token: { res: 2, errors: [] }
  },
  {
    name: "Minus",
    expression: "1 - 1",
    token: { res: 0, errors: [] }
  },
  {
    name: "Multi",
    expression: "2 * 2",
    token: { res: 4, errors: [] }
  },
  {
    name: "Div",
    expression: "4 / 2",
    token: { res: 2, errors: [] }
  },
  {
    name: "Parenthesis",
    expression: "(1 + 1) * 2",
    token: { res: 4, errors: [] }
  },
  {
    name: "Function",
    expression: "avg(1,2,3)",
    token: { res: 2, errors: [] }
  }
];
