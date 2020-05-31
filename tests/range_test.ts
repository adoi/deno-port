import { portRange } from "../mod.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.54.0/testing/asserts.ts";

Deno.test({
  name: "should return `invalid arguments` error when port range is not valid",
  fn: () => {
    assertThrows(
      function () {
        portRange(1001, 3011);
      },
      Error,
      "Invalid arguments",
    );
  },
});

Deno.test({
  name: "should return port within the specified range",
  fn: () => {
    const port = portRange(3000, 3011);
    const isWithinRange = (num: number) => num >= 3000 && num <= 3011;

    assertEquals(true, isWithinRange(port));
  },
});
