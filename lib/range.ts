import { serve } from "https://deno.land/std/http/server.ts";

import { getPort } from "./port.ts";
import { portRangeValidation } from "./utils/validationChecks.ts";
import { logger } from "./utils/logger.ts";

function rand(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
  * Provides a port to listen to for requests based on a range we specify.
  * 
  * @param {number} from
  * @param {number} to
  * @param {{ log: boolean}} options
  * 
  * @returns {number} The port to listen to
  * @public
 */
export function portRange(
  from: number,
  to: number,
  options: { log?: boolean } = {}, // by default we don't log the port running
): number {
  try {
    portRangeValidation(from, to);
    const server = serve({ port: rand(from, to) });
    switch (server.listener.addr.transport) {
      case "tcp" || "udp":
        const serPort = server.listener.addr.port;
        logger({ log: options.log, status: "success", port: serPort });
        server.close();
        return serPort;
      default: {
        server.close();
        return getPort();
      }
    }
  } catch (err) {
    if (err.name.includes("AddrInUse")) {
      if (options.log) {
        logger({ log: options.log, status: "error", message: err.message });
      }
      return portRange(from, to, options);
    }
    throw err;
  }
}
