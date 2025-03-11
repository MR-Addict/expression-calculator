export const functions = [
  // Trigonometric functions
  {
    name: "sin",
    args: [1],
    method: (...args: number[]) => Math.sin(args[0])
  },
  {
    name: "cos",
    args: [1],
    method: (...args: number[]) => Math.cos(args[0])
  },
  {
    name: "tan",
    args: [1],
    method: (...args: number[]) => Math.tan(args[0])
  },
  {
    name: "asin",
    args: [1],
    method: (...args: number[]) => Math.asin(args[0])
  },
  {
    name: "acos",
    args: [1],
    method: (...args: number[]) => Math.acos(args[0])
  },
  {
    name: "atan",
    args: [1],
    method: (...args: number[]) => Math.atan(args[0])
  },

  // Logarithmic functions
  {
    name: "pow",
    args: [2],
    method: (...args: number[]) => Math.pow(args[0], args[1])
  },
  {
    name: "max",
    args: [2, Infinity],
    method: (...args: number[]) => Math.max(...args)
  },
  {
    name: "min",
    args: [2, Infinity],
    method: (...args: number[]) => Math.min(...args)
  },
  {
    name: "avg",
    args: [2, Infinity],
    method: (...args: number[]) => args.reduce((acc, curr) => acc + curr, 0) / args.length
  },
  {
    name: "abs",
    args: [1],
    method: (...args: number[]) => Math.abs(args[0])
  },
  {
    name: "sqrt",
    args: [1],
    method: (...args: number[]) => Math.sqrt(args[0])
  }
];
