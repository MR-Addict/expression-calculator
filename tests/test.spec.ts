import { expect, test } from "vitest";

import { samples } from "./samples";
import { expressionCalculator } from "../src/lib/parser";

/**
 * Call before all tests
 */
expressionCalculator("1+1");

test.each(samples)("Test $name", ({ name, ...sample }) => {
  const result = expressionCalculator(sample.expression);
  expect(result).toEqual(sample.token);
});
