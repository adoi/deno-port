import { serve } from "https://deno.land/std/http/server.ts";

import { logger } from "./utils/logger.ts";
import { portValidation } from "./utils/validationChecks.ts";

/**
  * Provides a port to listen to for requests.
  * If no port is specified in the arguments, a random port is assigned from the OS.
  * 
  * @param {?number} port
  * @param {{ log: boolean}} options
  * 
  * @returns {number} The port to listen to
  * @public
 */
export function getPort(
  port = 0,
  options = { log: false }, // by default we don't log the port running
): number {
  try {
    if (port !== 0) {
      portValidation(port);
    }
    const server = serve({ port });
    switch (server.listener.addr.transport) {
      case "tcp" || "udp":
        const serPort = server.listener.addr.port;
        logger({ log: options.log, status: "success", port: serPort });
        server.close();
        return serPort;
      default:
        server.close();
        return getPort(0, options);
    }
  } catch (err) {
    if (err.name.includes("AddrInUse")) {
      logger({ log: options.log, status: "error", message: err.message });
      return getPort(0, options);
    }
    throw err;
  }
}
