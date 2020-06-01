import { serve } from "https://deno.land/std/http/server.ts";

import {
  getPort,
  portRange,
  portSelection,
} from "https://deno.land/x/port/mod.ts";

const serverOne = serve({ port: getPort(3001) });
for await (const req of serverOne) {
  req.respond({ body: "Response from server one\n" });
}

// const serverTwo = serve({ port: portRange(3011, 3040, { log: true}) });
// for await (const req of serverTwo) {
// req.respond({ body: "Response from server two\n" });
// }

// const serverThree = serve({ port: portSelection([3011, 8080]) });
// for await (const req of serverThree) {
//   req.respond({ body: "Response from server three\n" });
// }
