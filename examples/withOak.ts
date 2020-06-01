import { Application } from "https://deno.land/x/oak/mod.ts";

import { getPort, portRange } from "https://deno.land/x/port/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Response from server!";
});

// const port = getPort(); // EXAMPLE 1: Get random port

const port = portRange(3000, 3011, { log: true }); // Get port from 3000 to 3011, also log the port

await app.listen({ port });
