import { getPort } from "../mod.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.54.0/testing/asserts.ts";

Deno.test({
  name:
    "should return `invalid arguments` error when the specified port is not valid",
  fn: () => {
    assertThrows(
      function () {
        getPort(1000);
      },
      Error,
      "Invalid arguments",
    );
  },
});

Deno.test({
  name: "should return a random port",
  fn: () => {
    const port = getPort();

    assertEquals("number", typeof port);
  },
});

Deno.test({
  name: "should return the specified port",
  fn: () => {
    const port = getPort(3011);

    assertEquals(port, 3011);
  },
});

Deno.test({
  name: "should return a random port when the specified port is already in use",
  fn: () => {
    const server = Deno.listen({ port: 3011 });
    const port = getPort(3011);
    server.close();

    assertEquals("number", typeof port);
  },
});
