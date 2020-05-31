import { portSelection } from "../mod.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.54.0/testing/asserts.ts";

Deno.test({
  name:
    "should return `invalid arguments` error when one of the specified ports is not valid",
  fn: () => {
    assertThrows(
      function () {
        portSelection([1000, 3011]);
      },
      Error,
      "Invalid arguments",
    );
  },
});

Deno.test({
  name: "should return the first port from the selection",
  fn: () => {
    const port = portSelection([3011, 8080]);

    assertEquals(port, 3011);
  },
});

Deno.test({
  name:
    "should return the second port from the selection if the first one is already in use",
  fn: () => {
    const server = Deno.listen({ port: 3011 });
    const port = portSelection([3011, 8080]);
    server.close();

    assertEquals(port, 8080);
  },
});

Deno.test({
  name:
    "should return a random port when all the specified ports are already in use",
  fn: () => {
    const server = Deno.listen({ port: 3011 });
    const serverTwo = Deno.listen({ port: 8080 });
    const port = portSelection([3011, 8080]);
    server.close();
    serverTwo.close();

    assertEquals("number", typeof port);
  },
});
