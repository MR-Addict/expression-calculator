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

  // Exponential functions
  {
    name: "pow",
    args: [2],
    method: (...args: number[]) => Math.pow(args[0], args[1])
  }
];
